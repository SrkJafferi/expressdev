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
  phone?: string;
};

/**
 * Builds the structured quotation message. Kept deliberately generic so
 * future service detail pages can pass a `service` and reuse the same shape.
 */
export function buildQuoteMessage(ctx: QuoteContext = {}): string {
  const lines = [
    `Hello ${site.name},`,
    "",
    ctx.service
      ? `I'm interested in ${ctx.service}.`
      : "I'd like to request a quotation.",
    "",
    `Project details: ${ctx.details ?? ""}`.trimEnd(),
    `Quantity: ${ctx.quantity ?? ""}`.trimEnd(),
    `Size: ${ctx.size ?? ""}`.trimEnd(),
    `Material / finish: ${ctx.material ?? ""}`.trimEnd(),
    `Required date: ${ctx.requiredDate ?? ""}`.trimEnd(),
    `Notes: ${ctx.notes ?? ""}`.trimEnd(),
  ];

  // Contact identity block — only rendered when at least one field is set.
  if (ctx.name || ctx.company || ctx.phone) {
    lines.push("", "— Contact —");
    if (ctx.name) lines.push(`Name: ${ctx.name}`);
    if (ctx.company) lines.push(`Company: ${ctx.company}`);
    if (ctx.phone) lines.push(`WhatsApp: ${ctx.phone}`);
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
