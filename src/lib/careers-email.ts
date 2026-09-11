/**
 * Branded HTML email builders for the careers application pipeline.
 *
 * Server-only module (imported by the /api/careers route handler). It
 * mirrors the visual language of quote-email.ts — same navy header, CMYK
 * bars, table styling — but for job applications. Email clients do not
 * support CSS variables so the brand hex values are repeated here; if the
 * tokens change, update both places.
 */
import { contact, site } from "@/data/site";

export const EMAIL_NAVY = "#10305a";
export const EMAIL_CYAN = "#0099da";
export const EMAIL_MAGENTA = "#ec2790";
export const EMAIL_YELLOW = "#fff112";

/**
 * Sanitized career application — every field is trimmed, stripped of
 * control characters and capped by the zod schema in the route handler
 * before this is called.
 */
export type CareerApplication = {
  name: string;
  email: string;
  phone: string;
  location: string;
  area: string;
  role: string;
  experience: string;
  linkedin: string;
  portfolio: string;
  coverNote: string;
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
                      <div style="margin-top:3px;font-size:11px;letter-spacing:0.14em;color:#9fb8d4;text-transform:uppercase;">Print · Signage · Brand</div>
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

/* ── Detail table ─────────────────────────────────────────────────────── */

function rowsHtml(
  rows: { label: string; value: string; long?: boolean }[],
): string {
  const html = rows
    .map(({ label, value, long }) => {
      const shown = value.trim() === "" ? "—" : long ? escLines(value) : esc(value);
      return `
        <tr>
          <td style="padding:10px 16px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5a6b80;background:#f7f9fc;border-bottom:1px solid #e3e9f1;vertical-align:top;width:34%;">${esc(label)}</td>
          <td style="padding:10px 16px;font-size:14px;line-height:1.5;color:#10233f;border-bottom:1px solid #e3e9f1;vertical-align:top;word-break:break-word;">${shown}</td>
        </tr>`;
    })
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e3e9f1;border-radius:10px;border-collapse:separate;overflow:hidden;">
      <tbody>${html}</tbody>
    </table>`;
}

/* ── Employer notification email ──────────────────────────────────────── */

export function notificationEmailSubject(d: CareerApplication): string {
  return `New Career Application — ${d.area || "General"} — ${d.name || "Candidate"}`;
}

export function notificationEmailHtml(
  d: CareerApplication,
  submittedAt: Date,
  resumeLink: { filename: string; url: string } | null,
  portfolioLink: { filename: string; url: string } | null,
): string {
  const candidateRows = rowsHtml([
    { label: "Full name", value: d.name },
    { label: "Email", value: d.email },
    { label: "Phone / WhatsApp", value: d.phone },
    { label: "Current location", value: d.location },
  ]);

  const professionalRows = rowsHtml([
    { label: "Area of interest", value: d.area },
    { label: "Current / recent role", value: d.role },
    { label: "Years of experience", value: d.experience },
    { label: "LinkedIn", value: d.linkedin },
    { label: "Portfolio / website", value: d.portfolio },
    { label: "Preferred contact", value: d.preferredContact },
  ]);

  const filesHtml =
    resumeLink || portfolioLink
      ? `
      <tr>
        <td style="padding:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#5a6b80;text-transform:uppercase;">Files</td>
      </tr>
      <tr>
        <td style="padding:0 0 18px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e3e9f1;border-radius:10px;border-collapse:separate;overflow:hidden;">
            <tbody>
              ${
                resumeLink
                  ? `<tr>
                      <td style="padding:12px 16px;font-size:14px;color:#10233f;border-bottom:1px solid #e3e9f1;font-family:Arial,Helvetica,sans-serif;">
                        <strong>Resume / CV:</strong>
                        <a href="${esc(resumeLink.url)}" style="color:${EMAIL_CYAN};font-weight:700;">View Resume</a>
                        <span style="color:#5a6b80;"> — ${esc(resumeLink.filename)}</span>
                      </td>
                    </tr>`
                  : ""
              }
              ${
                portfolioLink
                  ? `<tr>
                      <td style="padding:12px 16px;font-size:14px;color:#10233f;font-family:Arial,Helvetica,sans-serif;">
                        <strong>Portfolio:</strong>
                        <a href="${esc(portfolioLink.url)}" style="color:${EMAIL_CYAN};font-weight:700;">View Portfolio</a>
                        <span style="color:#5a6b80;"> — ${esc(portfolioLink.filename)}</span>
                      </td>
                    </tr>`
                  : ""
              }
            </tbody>
          </table>
        </td>
      </tr>`
      : `
      <tr>
        <td style="padding:0 0 18px;font-size:13px;color:#8b98a8;font-family:Arial,Helvetica,sans-serif;">
          No file links were generated for this application — the resume is attached to this email.
        </td>
      </tr>`;

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td style="padding:0 0 18px;font-size:13px;line-height:1.6;color:#3d5068;">
          A new career application was submitted through the website. Details below — the candidate's email is in Reply-To, so replying reaches them directly.
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#5a6b80;text-transform:uppercase;">Candidate — submitted ${esc(formatSubmissionTime(submittedAt))} (GST)</td>
      </tr>
      <tr><td style="padding:0 0 16px;">${candidateRows}</td></tr>
      <tr>
        <td style="padding:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#5a6b80;text-transform:uppercase;">Professional details</td>
      </tr>
      <tr><td style="padding:0 0 16px;">${professionalRows}</td></tr>
      <tr>
        <td style="padding:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#5a6b80;text-transform:uppercase;">Introduction</td>
      </tr>
      <tr><td style="padding:0 0 16px;">${rowsHtml([{ label: "Cover note", value: d.coverNote, long: true }])}</td></tr>
      ${filesHtml}
      <tr>
        <td style="padding:14px 0 0;font-size:12px;color:#8b98a8;font-family:Arial,Helvetica,sans-serif;">
          Source: Express Advertising Careers Page
        </td>
      </tr>
    </table>`;

  return layout({
    preheader: `New career application — ${d.area} — ${d.name}`,
    kicker: "Career Application",
    kickerColor: EMAIL_MAGENTA,
    heading: `New application from ${esc(d.name || "a candidate")}`,
    bodyHtml: body,
    footerNote:
      "This application was submitted from expressadvertising.ae/careers. Replying to this message will reach the candidate directly.",
  });
}

export function notificationEmailText(
  d: CareerApplication,
  submittedAt: Date,
  resumeLink: { filename: string; url: string } | null,
  portfolioLink: { filename: string; url: string } | null,
): string {
  const lines = [
    `NEW CAREER APPLICATION — ${d.area || "General"} — ${d.name}`,
    "",
    `Submitted: ${formatSubmissionTime(submittedAt)} (GST)`,
    "",
    "CANDIDATE",
    `Full name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone / WhatsApp: ${d.phone}`,
    `Current location: ${d.location}`,
    "",
    "PROFESSIONAL DETAILS",
    `Area of interest: ${d.area}`,
    `Current / recent role: ${d.role || "—"}`,
    `Years of experience: ${d.experience || "—"}`,
    `LinkedIn: ${d.linkedin || "—"}`,
    `Portfolio / website: ${d.portfolio || "—"}`,
    `Preferred contact: ${d.preferredContact || "—"}`,
    "",
    "INTRODUCTION",
    d.coverNote,
    "",
    "FILES",
    resumeLink ? `Resume: ${resumeLink.url} (${resumeLink.filename})` : "Resume: attached to this email",
    portfolioLink ? `Portfolio: ${portfolioLink.url} (${portfolioLink.filename})` : "Portfolio: not provided",
    "",
    "Source: Express Advertising Careers Page",
    "",
    "Express Advertising — Ajman, UAE",
    contact.addressOneLine,
    `${contact.phoneDisplay} · ${contact.emailPrimary}`,
  ];
  return lines.join("\n");
}

/* ── Candidate confirmation (auto-reply) email ────────────────────────── */

export function confirmationEmailHtml(d: CareerApplication): string {
  const firstName = (d.name || "").split(/\s+/)[0] || "there";

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td style="padding:0 0 14px;font-size:15px;line-height:1.65;color:#3d5068;">
          Hi ${esc(firstName)},<br /><br />
          Thank you for your interest in joining <strong>${esc(site.name)}</strong>.
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 14px;font-size:15px;line-height:1.65;color:#3d5068;">
          We&apos;ve received your application and resume successfully.
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 14px;font-size:15px;line-height:1.65;color:#3d5068;">
          Our team will review your details, and if your experience matches a current or future opportunity, we&apos;ll get in touch.
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.1em;color:#5a6b80;text-transform:uppercase;">Your application at a glance</td>
      </tr>
      <tr>
        <td style="padding:0 0 18px;">
          ${rowsHtml([
            { label: "Area of interest", value: d.area },
            { label: "Current / recent role", value: d.role },
            { label: "Email", value: d.email },
          ])}
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 6px;font-size:15px;line-height:1.65;color:#3d5068;">
          We appreciate the time you took to apply.
        </td>
      </tr>
    </table>`;

  return layout({
    preheader: "We've received your application — Express Advertising",
    kicker: "Application received",
    kickerColor: "#ffffff",
    heading: `Thank you, ${esc(firstName)} — your application is in.`,
    bodyHtml: body,
    footerNote:
      "You received this because an application was submitted on expressadvertising.ae/careers with this email address.",
  });
}

export function confirmationEmailText(d: CareerApplication): string {
  const firstName = (d.name || "").split(/\s+/)[0] || "there";
  return [
    `Hi ${firstName},`,
    "",
    "Thank you for your interest in joining Express Advertising.",
    "",
    "We've received your application and resume successfully.",
    "",
    "Our team will review your details, and if your experience matches a current or future opportunity, we'll get in touch.",
    "",
    `Area of interest: ${d.area}`,
    `Email: ${d.email}`,
    "",
    "We appreciate the time you took to apply.",
    "",
    "Express Advertising",
    "Print · Signage · Brand",
    "",
    contact.addressOneLine,
    `${contact.phoneDisplay} · ${contact.emailPrimary}`,
  ].join("\n");
}
