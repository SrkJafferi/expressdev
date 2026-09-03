import { contact, site } from "@/data/site";

export type QuoteContext = {
  /** Service or product the enquiry relates to. */
  service?: string;
  details?: string;
  quantity?: string;
  size?: string;
  requiredDate?: string;
  /** Material / finish preference. */
  material?: string;
  notes?: string;
  /** Contact identity — optional, appended only when provided. */
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  /** Where the project will be delivered/installed. */
  location?: string;
  /** Preferred reply channel: Phone | WhatsApp | Email. */
  preferredContact?: string;
};

/**
 * Builds the structured quotation message. Kept deliberately generic so
 * future service detail pages can pass a `service` and reuse the same shape.
 */
export function buildQuoteMessage(ctx: QuoteContext = {}): string {
  const lines: string[] = [
    `Hello ${site.name},`,
    "",
    ctx.service
      ? `I'm interested in ${ctx.service}.`
      : "I'd like to request a quotation.",
    "",
  ];
  lines.push(`Project details: ${ctx.details ?? ""}`.trimEnd());
  lines.push(`Quantity: ${ctx.quantity ?? ""}`.trimEnd());
  lines.push(`Size: ${ctx.size ?? ""}`.trimEnd());
  lines.push(`Material / finish: ${ctx.material ?? ""}`.trimEnd());
  lines.push(`Required date: ${ctx.requiredDate ?? ""}`.trimEnd());
  if (ctx.location) lines.push(`Project location: ${ctx.location}`);
  lines.push(`Notes: ${ctx.notes ?? ""}`.trimEnd());

  // Contact identity block — only rendered when at least one field is set.
  if (ctx.name || ctx.company || ctx.email || ctx.phone || ctx.preferredContact) {
    lines.push("", "— Contact —");
    if (ctx.name) lines.push(`Name: ${ctx.name}`);
    if (ctx.company) lines.push(`Company: ${ctx.company}`);
    if (ctx.email) lines.push(`Email: ${ctx.email}`);
    if (ctx.phone) lines.push(`WhatsApp: ${ctx.phone}`);
    if (ctx.preferredContact) lines.push(`Preferred contact: ${ctx.preferredContact}`);
  }

  return lines.join("\n");
}

/** WhatsApp deep link with an optional pre-filled, service-aware message. */
export function whatsappUrl(ctx?: QuoteContext): string {
  const text = encodeURIComponent(buildQuoteMessage(ctx));
  return `https://wa.me/${contact.whatsapp}?text=${text}`;
}

export const telUrl = `tel:${contact.phoneE164}`;
export const mailUrl = `mailto:${contact.emailPrimary}`;
