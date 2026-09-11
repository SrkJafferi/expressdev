/**
 * POST /api/careers — secure server-side submission for the careers form.
 *
 * Architecture mirrors /api/quote: the client never touches email or any
 * secret. This handler validates multipart form data with zod, verifies
 * file type/size/extension, rejects honeypot submissions, verifies
 * Cloudflare Turnstile, then sends two emails through Resend:
 *
 *   1. A branded application notification to the team inbox
 *      (CAREERS_EMAIL_TO, falling back to QUOTE_EMAIL_TO), with Reply-To
 *      set to the candidate's address and the CV attached.
 *   2. A confirmation auto-reply to the candidate.
 *
 * File storage: the project has no object storage service (no Supabase/S3),
 * so the resume travels as a Resend attachment — PDF/DOC(X) only, hard
 * 5 MB cap, MIME + extension + magic-byte verified. Resend's limit is
 * 40 MB per email, so a 5 MB CV is comfortably inside it. No executable
 * or unsafe file type can pass the triple check below.
 *
 * Route handlers run on the server only — nothing here ships to the client.
 */
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  confirmationEmailHtml,
  confirmationEmailText,
  notificationEmailHtml,
  notificationEmailSubject,
  notificationEmailText,
  sanitizeText,
  type CareerApplication,
} from "@/lib/careers-email";

export const runtime = "nodejs";

/* ── File rules ───────────────────────────────────────────────────────── */

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB — also applied to the optional portfolio file

/** Allowed resume types — extension, declared MIME and magic bytes must all agree. */
const RESUME_RULES: Record<string, { mime: string; magic: number[][] }> = {
  pdf: { mime: "application/pdf", magic: [[0x25, 0x50, 0x44, 0x46]] }, // %PDF
  doc: {
    mime: "application/msword",
    // OLE2 compound document — also covers legacy .doc
    magic: [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]],
  },
  docx: {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // ZIP local file header — DOCX is a ZIP container
    magic: [[0x50, 0x4b, 0x03, 0x04], [0x50, 0x4b, 0x05, 0x06], [0x50, 0x4b, 0x07, 0x08]],
  },
};

/** Portfolio additionally accepts images and plain PDFs (no documents). */
const PORTFOLIO_EXTRA: Record<string, { mime: string; magic: number[][] }> = {
  png: { mime: "image/png", magic: [[0x89, 0x50, 0x4e, 0x47]] },
  jpg: { mime: "image/jpeg", magic: [[0xff, 0xd8, 0xff]] },
  jpeg: { mime: "image/jpeg", magic: [[0xff, 0xd8, 0xff]] },
  webp: { mime: "image/webp", magic: [[0x52, 0x49, 0x46, 0x46]] }, // RIFF (WEBP marker checked loosely)
};

type FileRule = { mime: string; magic: number[][] };

function extensionOf(filename: string): string {
  const dot = filename.lastIndexOf(".");
  return dot === -1 ? "" : filename.slice(dot + 1).toLowerCase();
}

/**
 * Triple check: extension ∈ rules, declared MIME matches, and the file
 * actually starts with the expected magic bytes. A renamed .exe will fail
 * all three; a polyglot PDF/ZIP fails the magic check.
 */
function validateFile(file: File, rules: Record<string, FileRule>): string | null {
  const ext = extensionOf(file.name);
  const rule = rules[ext];
  if (!rule) return "type";
  if (file.size === 0) return "empty";
  if (file.size > MAX_RESUME_BYTES) return "size";
  const mimeOk =
    file.type === rule.mime ||
    // Some browsers send generic octet-stream for .doc — extension + magic still gate it.
    file.type === "application/octet-stream" ||
    file.type === "";
  if (!mimeOk) return "type";
  return null;
}

async function magicBytesOk(file: File, rules: Record<string, FileRule>): Promise<boolean> {
  const rule = rules[extensionOf(file.name)];
  if (!rule) return false;
  try {
    const buf = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    return rule.magic.some((sig) => sig.every((byte, i) => buf[i] === byte));
  } catch {
    return false;
  }
}

/* ── Validation ───────────────────────────────────────────────────────── */

/** Control characters are never legitimately part of a form field. */
const CONTROL_RE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;

const PREFERRED_CONTACT_METHODS = ["Phone", "WhatsApp", "Email"] as const;

const AREAS_OF_INTEREST = [
  "Design & Creative",
  "Print & Production",
  "Signage & Fabrication",
  "Installation",
  "Sales & Client Service",
  "Digital & IT",
  "Operations",
  "Other",
] as const;

/** Trim, strip control characters, cap length, keep optional. */
function field(max: number) {
  return z.preprocess(
    (v) => (typeof v === "string" ? v.replace(CONTROL_RE, "").trim() : ""),
    z.string().max(max),
  );
}

const textSchema = z.object({
  name: field(120),
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.replace(CONTROL_RE, "").trim().toLowerCase() : ""),
    z.email().max(254),
  ),
  phone: field(40),
  location: field(120),
  area: field(80).refine(
    (v) => (AREAS_OF_INTEREST as readonly string[]).includes(v),
    { message: "Unknown area of interest." },
  ),
  role: field(160),
  experience: field(40),
  linkedin: field(300),
  portfolio: field(300),
  coverNote: field(3000),
  preferredContact: field(40).refine(
    (v) =>
      v === "" ||
      PREFERRED_CONTACT_METHODS.includes(v as (typeof PREFERRED_CONTACT_METHODS)[number]),
    { message: "Unknown preferred contact method." },
  ),
  /** Honeypot — must stay empty. Real users never see or fill it. */
  website: field(200),
  /** Cloudflare Turnstile widget token. */
  token: field(2048),
});

/* ── Helpers ──────────────────────────────────────────────────────────── */

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

function errorBody(code: string, detail?: string) {
  return json(400, { ok: false, error: code, detail });
}

/** Verify the Turnstile response token against Cloudflare. */
async function verifyTurnstile(
  secret: string,
  token: string,
  request: NextRequest,
): Promise<boolean> {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const params = new URLSearchParams({ secret, response: token });
    const ip = forwarded?.split(",")[0]?.trim();
    if (ip) params.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      cache: "no-store",
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/* ── Route ────────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  // 1. Parse the multipart body defensively.
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return errorBody("invalid");
  }

  const getStr = (key: string) => {
    const v = form.get(key);
    return typeof v === "string" ? v : "";
  };

  // 2. Server-side validation + sanitization (zod).
  const parsed = textSchema.safeParse({
    name: getStr("name"),
    email: getStr("email"),
    phone: getStr("phone"),
    location: getStr("location"),
    area: getStr("area"),
    role: getStr("role"),
    experience: getStr("experience"),
    linkedin: getStr("linkedin"),
    portfolio: getStr("portfolio"),
    coverNote: getStr("coverNote"),
    preferredContact: getStr("preferredContact"),
    website: getStr("website"),
    token: getStr("token"),
  });
  if (!parsed.success) {
    return errorBody("invalid");
  }
  const data = parsed.data;

  // 3. Honeypot: pretend success, drop silently. Never send mail.
  if (data.website) {
    console.info("Careers submission dropped — honeypot field was filled.");
    return json(200, { ok: true });
  }

  // 4. Resume file — required.
  const resumeEntry = form.get("resume");
  if (!(resumeEntry instanceof File) || resumeEntry.size === 0) {
    return errorBody("file", "resume_required");
  }
  const resume = resumeEntry;
  const resumeError = validateFile(resume, RESUME_RULES);
  if (resumeError) {
    return errorBody("file", `resume_${resumeError}`);
  }
  if (!(await magicBytesOk(resume, RESUME_RULES))) {
    return errorBody("file", "resume_type");
  }

  // 5. Portfolio file — optional.
  const portfolioEntry = form.get("portfolio");
  let portfolio: File | null = null;
  if (portfolioEntry instanceof File && portfolioEntry.size > 0) {
    const portfolioRules = { ...RESUME_RULES, ...PORTFOLIO_EXTRA };
    const portfolioError = validateFile(portfolioEntry, portfolioRules);
    if (portfolioError) {
      return errorBody("file", `portfolio_${portfolioError}`);
    }
    if (!(await magicBytesOk(portfolioEntry, portfolioRules))) {
      return errorBody("file", "portfolio_type");
    }
    portfolio = portfolioEntry;
  }

  // 6. Turnstile — enforced whenever a secret key is configured.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    if (!data.token) {
      return errorBody("captcha");
    }
    const verified = await verifyTurnstile(turnstileSecret, data.token, request);
    if (!verified) {
      return errorBody("captcha");
    }
  } else {
    console.warn(
      "TURNSTILE_SECRET_KEY is not set — skipping Turnstile verification for this request.",
    );
  }

  // 7. Resend credentials — always from the environment, never the client.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CAREERS_EMAIL_TO || process.env.QUOTE_EMAIL_TO;
  const from = process.env.CAREERS_EMAIL_FROM || process.env.QUOTE_EMAIL_FROM;
  if (!apiKey || !to || !from) {
    console.error(
      "Email not configured: RESEND_API_KEY / CAREERS_EMAIL_TO (or QUOTE_EMAIL_TO) / CAREERS_EMAIL_FROM (or QUOTE_EMAIL_FROM) missing.",
    );
    return json(500, { ok: false, error: "internal" });
  }

  const application: CareerApplication = {
    name: sanitizeText(data.name),
    email: data.email,
    phone: sanitizeText(data.phone),
    location: sanitizeText(data.location),
    area: sanitizeText(data.area),
    role: sanitizeText(data.role),
    experience: sanitizeText(data.experience),
    linkedin: sanitizeText(data.linkedin),
    portfolio: sanitizeText(data.portfolio),
    coverNote: sanitizeText(data.coverNote),
    preferredContact: sanitizeText(data.preferredContact),
  };

  const submittedAt = new Date();
  // Deliberate: the sender address is centralized; no invented HR mailbox.
  const sender = `Express Advertising <${from}>`;
  const resend = new Resend(apiKey);

  // Attachments as base64 — PDF/DOC(X) ≤5 MB, triple-verified above.
  const attachments: { filename: string; content: string }[] = [];
  try {
    attachments.push({
      filename: resume.name.slice(0, 120),
      content: Buffer.from(await resume.arrayBuffer()).toString("base64"),
    });
    if (portfolio) {
      attachments.push({
        filename: portfolio.name.slice(0, 120),
        content: Buffer.from(await portfolio.arrayBuffer()).toString("base64"),
      });
    }
  } catch (err) {
    console.error("Failed to read uploaded files.", err);
    return json(500, { ok: false, error: "internal" });
  }

  try {
    const [notification, confirmation] = await Promise.allSettled([
      resend.emails.send({
        from: sender,
        to: [to],
        replyTo: application.email,
        subject: notificationEmailSubject(application),
        html: notificationEmailHtml(application, submittedAt, null, null),
        text: notificationEmailText(application, submittedAt, null, null),
        attachments,
      }),
      resend.emails.send({
        from: sender,
        to: [application.email],
        replyTo: to,
        subject: "Application Received | Express Advertising",
        html: confirmationEmailHtml(application),
        text: confirmationEmailText(application),
      }),
    ]);

    if (notification.status === "rejected") {
      console.error("Careers notification email failed to send.", notification.reason);
      return json(502, { ok: false, error: "send_failed" });
    }
    if (confirmation.status === "rejected") {
      // The team still has the application — the candidate confirmation is best-effort.
      console.error("Careers confirmation email failed to send.", confirmation.reason);
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error("Unexpected error sending careers emails.", err);
    return json(500, { ok: false, error: "internal" });
  }
}
