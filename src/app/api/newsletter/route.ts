/**
 * POST /api/newsletter — server-side newsletter subscription.
 *
 * The client only sends the email address (plus a honeypot field). This
 * handler validates with zod, silently drops honeypot submissions, then:
 *
 *   1. Emails a subscriber notification to the team (QUOTE_EMAIL_TO).
 *   2. Emails a branded confirmation to the subscriber.
 *   3. Best-effort: adds the contact to the Resend audience when
 *      RESEND_AUDIENCE_ID is configured (for real list management).
 *
 * Credentials stay in the environment — never ship to the browser.
 */
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  subscriberConfirmationHtml,
  subscriberConfirmationSubject,
  subscriberConfirmationText,
  subscriberNotificationHtml,
  subscriberNotificationSubject,
  subscriberNotificationText,
} from "@/lib/newsletter-email";

export const runtime = "nodejs";

/* ── Validation ───────────────────────────────────────────────────────── */

const CONTROL_RE = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;

const bodySchema = z.object({
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.replace(CONTROL_RE, "").trim().toLowerCase() : ""),
    z.email().max(254),
  ),
  /** Honeypot — must stay empty. Real users never see or fill it. */
  website: z.preprocess(
    (v) => (typeof v === "string" ? v.replace(CONTROL_RE, "").trim() : ""),
    z.string().max(200),
  ),
});

/* ── Route ────────────────────────────────────────────────────────────── */

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const { email, website } = parsed.data;

  // Honeypot: pretend success, drop silently. Never send mail.
  if (website) {
    console.info("Newsletter submission dropped — honeypot field was filled.");
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_EMAIL_TO;
  const from = process.env.NEWSLETTER_EMAIL_FROM || process.env.QUOTE_EMAIL_FROM;
  if (!apiKey || !to || !from) {
    console.error(
      "Newsletter email not configured: RESEND_API_KEY / QUOTE_EMAIL_TO / QUOTE_EMAIL_FROM missing.",
    );
    return NextResponse.json({ ok: false, error: "internal" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const sender = `Express Advertising <${from}>`;
  const submittedAt = new Date();

  // Optional real-list management — best-effort, non-blocking.
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (audienceId) {
    resend.contacts
      .create({ audienceId, email })
      .catch((err) => console.error("Failed to add newsletter contact to audience.", err));
  } else {
    console.warn("RESEND_AUDIENCE_ID is not set — subscriber was emailed but not added to an audience list.");
  }

  const [notification, confirmation] = await Promise.allSettled([
    resend.emails.send({
      from: sender,
      to: [to],
      subject: subscriberNotificationSubject(email),
      html: subscriberNotificationHtml(email, submittedAt),
      text: subscriberNotificationText(email, submittedAt),
    }),
    resend.emails.send({
      from: sender,
      to: [email],
      subject: subscriberConfirmationSubject(),
      html: subscriberConfirmationHtml(),
      text: subscriberConfirmationText(),
    }),
  ]);

  if (notification.status === "rejected") {
    console.error("Newsletter notification email failed to send.", notification.reason);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
  if (confirmation.status === "rejected") {
    // The team still has the address — the confirmation is best-effort.
    console.error("Newsletter confirmation email failed to send.", confirmation.reason);
  }

  return NextResponse.json({ ok: true });
}