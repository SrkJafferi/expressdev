/**
 * Branded HTML email builders for the quote-request pipeline.
 *
 * Server-only module (imported by the /api/quote route handler). The site's
 * CMYK brand tokens live in globals.css as CSS variables; email clients do
 * not support CSS variables, so the hex values are mirrored here as
 * constants. If the design tokens change, update both places.
 */
import { contact, site } from "@/data/site";

export const EMAIL_NAVY = "#10305a";
export const EMAIL_CYAN = "#0099da";
export const EMAIL_MAGENTA = "#ec2790";
export const EMAIL_YELLOW = "#fff112";

/**
 * Sanitized quote submission — every field is already trimmed and capped by
 * the zod schema in the route handler before this is called.
 */
export type QuoteSubmission = {
  service: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  details: string;
  quantity: string;
  size: string;
  material: string;
  requiredDate: string;
  notes: string;
  location: string;
  preferredContact: string;
};

/* ── Text helpers ─────────────────────────────────────────────────────── */

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape then preserve intentional line breaks. */
function escLines(value: string): string {
  return esc(value).replace(/\r?\n/g, "<br/>");
}

const CONTROL_CHARS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g;

/** Defensive final pass — belt and braces on top of the zod schema. */
export function sanitizeText(value: string): string {
  return value.replace(CONTROL_CHARS, "").trim();
}

/** Gulf-standard local time (the business operates from Ajman, UAE). */
export function formatSubmissionTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

/* ── Shared layout ────────────────────────────────────────────────────── */

const FIELD_ROWS: { key: keyof QuoteSubmission; label: string }[] = [
  { key: "name", label: "Full name" },
  { key: "company", label: "Company" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone / WhatsApp" },
  { key: "service", label: "Service" },
  { key: "details", label: "Project details" },
  { key: "quantity", label: "Quantity" },
  { key: "size", label: "Size / dimensions" },
  { key: "material", label: "Material / finish" },
  { key: "requiredDate", label: "Required date" },
  { key: "location", label: "Project location" },
  { key: "preferredContact", label: "Preferred contact method" },
  { key: "notes", label: "Notes" },
];

function valueOrDash(d: QuoteSubmission, key: keyof QuoteSubmission): string {
  const value = d[key] ?? "";
  return value.trim() === "" ? "—" : value;
}

function rowsHtml(d: QuoteSubmission, keys: (keyof QuoteSubmission)[]): string {
  const rows = keys
    .map((key) => {
      const label = FIELD_ROWS.find((r) => r.key === key)?.label ?? key;
      const raw = valueOrDash(d, key);
      const isLong = key === "details" || key === "notes";
      const value = isLong ? escLines(raw) : esc(raw);
      return `
        <tr>
          <td style="padding:10px 16px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5a6b80;background:#f7f9fc;border-bottom:1px solid #e3e9f1;vertical-align:top;width:34%;">${label}</td>
          <td style="padding:10px 16px;font-size:14px;line-height:1.5;color:#10233f;border-bottom:1px solid #e3e9f1;vertical-align:top;word-break:break-word;">${value}</td>
        </tr>`;
    })
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e3e9f1;border-radius:10px;border-collapse:separate;overflow:hidden;">
      <tbody>${rows}</tbody>
    </table>`;
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
  kickerColor?: string;
  heading: string;
  bodyHtml: string;
  footerNote: string;
};

function layout({ preheader, kicker, kickerColor = EMAIL_CYAN, heading, bodyHtml, footerNote }: LayoutOptions): string {
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
                      <div style="display:inline-block;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);border-radius:999px;padding:5px 12px;font-size:10px;font-weight:700;letter-spacing:0.12em;color:${kickerColor};text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">${esc(kicker)}</div>
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

/* ── Internal notification email ──────────────────────────────────────── */

export function notificationEmailSubject(d: QuoteSubmission): string {
  const subjectWho = d.name || d.company || "Website";
  const subjectService = d.service || "General enquiry";
  return `New Quote Request — ${subjectService} — ${subjectWho}`;
}

export function notificationEmailHtml(d: QuoteSubmission, submittedAt: Date): string {
  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td style="padding:0 0 18px;font-size:13px;line-height:1.6;color:#3d5068;">
          A new quotation request was submitted through the website. Full brief below — reply to this email or call the customer to follow up.
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#5a6b80;text-transform:uppercase;">Submitted ${esc(formatSubmissionTime(submittedAt))} (GST)</td>
      </tr>
      <tr>
        <td>${rowsHtml(d, FIELD_ROWS.map((r) => r.key))}</td>
      </tr>
    </table>`;
  return layout({
    preheader: `New quote request — ${d.service} — ${d.name || d.company || "Website"}`,
    kicker: "New Quote Request",
    heading: `A new brief from ${esc(d.name || d.company || "the website")}`,
    bodyHtml: body,
    footerNote: "This request was submitted from expressadvertising.ae. Replying to this message will reach the customer directly.",
  });
}

export function notificationEmailText(d: QuoteSubmission, submittedAt: Date): string {
  const lines: string[] = [];
  for (const row of FIELD_ROWS) {
    lines.push(`${row.label}: ${valueOrDash(d, row.key)}`);
  }
  return [
    `New Quote Request — ${d.service} — ${d.name || d.company || "Website"}`,
    "",
    `Submitted: ${formatSubmissionTime(submittedAt)} (GST)`,
    "",
    ...lines,
    "",
    "Express Advertising — Ajman, UAE",
    contact.addressOneLine,
    `${contact.phoneDisplay} · ${contact.emailPrimary}`,
  ].join("\n");
}

/* ── Customer confirmation email ──────────────────────────────────────── */

export function confirmationEmailHtml(d: QuoteSubmission): string {
  const firstName = (d.name || "").split(/\s+/)[0] || "there";
  const summaryCandidates: (keyof QuoteSubmission)[] = [
    "service",
    "details",
    "quantity",
    "size",
    "material",
    "requiredDate",
    "location",
  ];
  const summaryKeys = summaryCandidates.filter(
    (k) => (d[k] ?? "").trim() !== "",
  );

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td style="padding:0 0 14px;font-size:15px;line-height:1.65;color:#3d5068;">
          Hi ${esc(firstName)},<br /><br />
          Thank you for your request${d.service ? ` regarding <strong>${esc(d.service)}</strong>` : ""}. Our production team has received your brief and will come back to you with a quotation — usually within <strong>one business day</strong>, often sooner.
        </td>
      </tr>
      ${summaryKeys.length > 0
        ? `<tr>
            <td style="padding:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#5a6b80;text-transform:uppercase;">Your request at a glance</td>
          </tr>
          <tr>
            <td style="padding:0 0 18px;">${rowsHtml(d, summaryKeys)}</td>
          </tr>`
        : ""}
      <tr>
        <td style="padding:0 0 6px;font-size:15px;line-height:1.65;color:#3d5068;">
          If anything changes — quantities, timelines or artwork — just reply to this email and the details will reach our team.
        </td>
      </tr>
    </table>`;
  return layout({
    preheader: `We've received your quote request${d.service ? ` for ${d.service}` : ""} — Express Advertising`,
    kicker: "Request received",
    kickerColor: "#ffffff",
    heading: `Thank you, ${esc(firstName)} — we've got your brief.`,
    bodyHtml: body,
    footerNote: `You received this because a quote request was submitted on expressadvertising.ae with this email address.`,
  });
}

export function confirmationEmailText(d: QuoteSubmission): string {
  const firstName = (d.name || "").split(/\s+/)[0] || "there";
  const lines: string[] = [
    `Hi ${firstName},`,
    "",
    `Thank you for your request${d.service ? ` regarding ${d.service}` : ""}. Our production team has received your brief and will reply with a quotation, usually within one business day.`,
  ];
  const summary = FIELD_ROWS.filter(
    (r) => r.key !== "notes" && (d[r.key] ?? "").trim() !== "",
  );
  if (summary.length > 0) {
    lines.push("", "Your request at a glance:", "");
    for (const row of summary) lines.push(`${row.label}: ${valueOrDash(d, row.key)}`);
  }
  lines.push(
    "",
    "If anything changes, just reply to this email.",
    "",
    "Express Advertising — Ajman, UAE",
    contact.addressOneLine,
    `${contact.phoneDisplay} · ${contact.emailPrimary}`,
  );
  return lines.join("\n");
}
