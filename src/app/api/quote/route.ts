/**
 * POST /api/quote — secure server-side submission for the quotation form.
 *
 * The client never touches email or any secret: it only sends the field
 * values plus a Cloudflare Turnstile token. This handler validates with
 * zod, rejects honeypot submissions, verifies Turnstile, then sends two
 * emails through Resend (never exposing RESEND_API_KEY to the browser):
 *
 *   1. A branded brief notification to the team (QUOTE_EMAIL_TO), with
 *      Reply-To set to the customer's address.
 *   2. A confirmation to the customer.
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
  type QuoteSubmission,
} from "@/lib/quote-email";

export const runtime = "nodejs";

/* ── Validation ───────────────────────────────────────────────────────── */

/** Control characters are never legitimately part of a form field. */
const CONTROL_RE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;

const PREFERRED_CONTACT_METHODS = ["Phone", "WhatsApp", "Email"] as const;

/** Trim, strip control characters, cap length, keep optional. */
function field(max: number) {
  return z.preprocess(
    (v) => (typeof v === "string" ? v.replace(CONTROL_RE, "").trim() : ""),
    z.string().max(max),
  );
}

const bodySchema = z.object({
  service: field(160),
  name: field(120),
  company: field(160),
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.replace(CONTROL_RE, "").trim().toLowerCase() : ""),
    z.email().max(254),
  ),
  phone: field(40),
  details: field(5000),
  quantity: field(80),
  size: field(160),
  material: field(300),
  requiredDate: field(160),
  notes: field(3000),
  location: field(160),
  preferredContact: field(40).refine(
    (v) => v === "" || PREFERRED_CONTACT_METHODS.includes(v as (typeof PREFERRED_CONTACT_METHODS)[number]),
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

function errorBody(code: string) {
  return json(400, { ok: false, error: code });
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
  // 1. Parse the JSON body defensively.
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return errorBody("invalid");
  }

  // 2. Server-side validation + sanitization (zod).
  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return errorBody("invalid");
  }
  const data = parsed.data;

  // 3. Honeypot: pretend success, drop silently. Never send mail.
  if (data.website) {
    console.info("Quote submission dropped — honeypot field was filled.");
    return json(200, { ok: true });
  }

  // 4. Turnstile — enforced whenever a secret key is configured.
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

  // 5. Resend credentials — always from the environment, never the client.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_EMAIL_TO;
  const from = process.env.QUOTE_EMAIL_FROM;
  if (!apiKey || !to || !from) {
    console.error("Email not configured: RESEND_API_KEY / QUOTE_EMAIL_TO / QUOTE_EMAIL_FROM missing.");
    return json(500, { ok: false, error: "internal" });
  }

  const submission: QuoteSubmission = {
    service: sanitizeText(data.service || "General enquiry"),
    name: sanitizeText(data.name),
    company: sanitizeText(data.company),
    email: data.email,
    phone: sanitizeText(data.phone),
    details: sanitizeText(data.details),
    quantity: sanitizeText(data.quantity),
    size: sanitizeText(data.size),
    material: sanitizeText(data.material),
    requiredDate: sanitizeText(data.requiredDate),
    notes: sanitizeText(data.notes),
    location: sanitizeText(data.location),
    preferredContact: sanitizeText(data.preferredContact),
  };

  const submittedAt = new Date();
  const sender = `Express Advertising <${from}>`;

  const resend = new Resend(apiKey);

  try {
    const [notification, confirmation] = await Promise.allSettled([
      resend.emails.send({
        from: sender,
        to: [to],
        replyTo: submission.email,
        subject: notificationEmailSubject(submission),
        html: notificationEmailHtml(submission, submittedAt),
        text: notificationEmailText(submission, submittedAt),
      }),
      resend.emails.send({
        from: sender,
        to: [submission.email],
        replyTo: to,
        subject: "We've received your quote request — Express Advertising",
        html: confirmationEmailHtml(submission),
        text: confirmationEmailText(submission),
      }),
    ]);

    if (notification.status === "rejected") {
      console.error("Quote notification email failed to send.", notification.reason);
      return json(502, { ok: false, error: "send_failed" });
    }
    if (confirmation.status === "rejected") {
      // The team still has the brief — the customer confirmation is best-effort.
      console.error("Quote confirmation email failed to send.", confirmation.reason);
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error("Unexpected error sending quote emails.", err);
    return json(500, { ok: false, error: "internal" });
  }
}
