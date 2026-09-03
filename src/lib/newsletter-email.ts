/**
 * Branded HTML email builders for the newsletter-subscription pipeline.
 *
 * Server-only module (imported by the /api/newsletter route handler).
 * Email clients do not support CSS variables, so the brand hex values are
 * mirrored here — same tokens as src/lib/quote-email.ts.
 */
import { contact, site } from "@/data/site";

export const EMAIL_NAVY = "#10305a";
export const EMAIL_CYAN = "#0099da";
export const EMAIL_MAGENTA = "#ec2790";
export const EMAIL_YELLOW = "#fff112";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cmykBarHtml(): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr>
        <td style="height:3px;width:25%;background:${EMAIL_CYAN};"></td>
        <td style="height:3px;width:25%;background:${EMAIL_MAGENTA};"></td>
        <td style="height:3px;width:25%;background:${EMAIL_YELLOW};"></td>
        <td style="height:3px;width:25%;background:#191b1e;"></td>
      </tr>
    </table>`;
}

type LayoutOptions = {
  preheader: string;
  kicker: string;
  heading: string;
  bodyHtml: string;
  footerNote: string;
};

function layout({ preheader, kicker, heading, bodyHtml, footerNote }: LayoutOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>${esc(heading)}</title>
  </head>
  <body style="margin:0;padding:0;background:#eef2f7;">
    <span style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;mso-hide:all;font-size:0;">${esc(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #dce4ed;">
            <tr>
              <td style="background:${EMAIL_NAVY};padding:26px 30px 22px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="font-size:20px;font-weight:800;letter-spacing:0.04em;color:#ffffff;font-family:Arial,Helvetica,sans-serif;line-height:1.2;">${esc(site.name).toUpperCase()}</div>
                      <div style="margin-top:3px;font-size:11px;letter-spacing:0.14em;color:#9fb8d4;text-transform:uppercase;">Printing · Signage · Large Format · Brand Production</div>
                    </td>
                    <td align="right" style="vertical-align:middle;">
                      <div style="display:inline-block;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);border-radius:999px;padding:5px 12px;font-size:10px;font-weight:700;letter-spacing:0.12em;color:${EMAIL_CYAN};text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">${esc(kicker)}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td>${cmykBarHtml()}</td></tr>
            <tr>
              <td style="padding:26px 30px 8px;font-family:Arial,Helvetica,sans-serif;">
                <h1 style="margin:0;font-size:21px;line-height:1.3;color:#10233f;font-weight:700;">${heading}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 30px 26px;font-family:Arial,Helvetica,sans-serif;">
                ${bodyHtml}
              </td>
            </tr>
            <tr><td>${cmykBarHtml()}</td></tr>
            <tr>
              <td style="background:${EMAIL_NAVY};padding:22px 30px 24px;font-family:Arial,Helvetica,sans-serif;">
                <div style="font-size:12px;font-weight:700;letter-spacing:0.1em;color:#ffffff;text-transform:uppercase;">Express Advertising — Ajman, UAE</div>
                <div style="margin-top:7px;font-size:12px;line-height:1.7;color:#a9c4dd;">
                  ${esc(contact.addressOneLine)}<br />
                  <a href="tel:${esc(contact.phoneE164)}" style="color:#7fc4ea;text-decoration:none;">${esc(contact.phoneDisplay)}</a>
                  &nbsp;·&nbsp;
                  <a href="mailto:${esc(contact.emailPrimary)}" style="color:#7fc4ea;text-decoration:none;">${esc(contact.emailPrimary)}</a>
                </div>
                <div style="margin-top:12px;font-size:10.5px;line-height:1.5;color:#6f8db0;">${esc(footerNote)}</div>
              </td>
            </tr>
          </table>
          <div style="padding-top:14px;font-size:10px;color:#8b98a8;font-family:Arial,Helvetica,sans-serif;text-align:center;">© ${new Date().getFullYear()} ${esc(site.name)} — ${esc(site.url.replace("https://", ""))}</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/* ── Internal notification (new subscriber) ───────────────────────────── */

export function subscriberNotificationSubject(email: string): string {
  return `New Newsletter Subscriber — ${email}`;
}

export function subscriberNotificationHtml(email: string, submittedAt: Date): string {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    dateStyle: "long",
    timeStyle: "short",
  }).format(submittedAt);
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td style="padding:0 0 14px;font-size:13px;line-height:1.6;color:#3d5068;">
          A new address subscribed to the website newsletter. Add it to your mailing list to start sending updates.
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#5a6b80;text-transform:uppercase;">Subscribed ${esc(time)} (GST)</td>
      </tr>
      <tr>
        <td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e3e9f1;border-radius:10px;border-collapse:separate;overflow:hidden;">
            <tbody>
              <tr>
                <td style="padding:10px 16px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5a6b80;background:#f7f9fc;border-bottom:1px solid #e3e9f1;vertical-align:top;width:34%;">Email</td>
                <td style="padding:10px 16px;font-size:14px;line-height:1.5;color:#10233f;border-bottom:1px solid #e3e9f1;vertical-align:top;word-break:break-word;">${esc(email)}</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>`;
  return layout({
    preheader: `New newsletter subscriber — ${email}`,
    kicker: "New Subscriber",
    heading: "A new address joined the newsletter.",
    bodyHtml: body,
    footerNote: "This subscription was submitted from expressadvertising.ae. Replying to this email will reach the subscriber.",
  });
}

export function subscriberNotificationText(email: string, submittedAt: Date): string {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    dateStyle: "long",
    timeStyle: "short",
  }).format(submittedAt);
  return [
    `New Newsletter Subscriber — ${email}`,
    "",
    `Subscribed: ${time} (GST)`,
    "",
    `Email: ${email}`,
    "",
    "Express Advertising — Ajman, UAE",
    contact.addressOneLine,
    `${contact.phoneDisplay} · ${contact.emailPrimary}`,
  ].join("\n");
}

/* ── Subscriber confirmation email ────────────────────────────────────── */

export function subscriberConfirmationSubject(): string {
  return "Welcome to Express Advertising Updates";
}

export function subscriberConfirmationHtml(): string {
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td style="padding:0 0 14px;font-size:15px;line-height:1.65;color:#3d5068;">
          Thanks for subscribing to Express Advertising updates. We share new products, services and seasonal offers for printing, signage, large format and brand production — no spam, and you can leave anytime.
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 6px;font-size:15px;line-height:1.65;color:#3d5068;">
          Meanwhile, if you have a project in mind, our team is happy to help — just reply to this email or reach us on the channels below.
        </td>
      </tr>
    </table>`;
  return layout({
    preheader: "You're subscribed to Express Advertising updates",
    kicker: "Subscription confirmed",
    heading: "You're in — welcome aboard.",
    bodyHtml: body,
    footerNote: `You received this because someone subscribed to the newsletter on expressadvertising.ae with this address. If that wasn't you, simply ignore this email — nothing further will be sent.`,
  });
}

export function subscriberConfirmationText(): string {
  return [
    "Welcome to Express Advertising Updates",
    "",
    "Thanks for subscribing. We share new products, services and seasonal offers for printing, signage, large format and brand production — no spam, and you can leave anytime.",
    "",
    "If you have a project in mind, just reply to this email.",
    "",
    "Express Advertising — Ajman, UAE",
    contact.addressOneLine,
    `${contact.phoneDisplay} · ${contact.emailPrimary}`,
  ].join("\n");
}