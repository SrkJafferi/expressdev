/**
 * Single source of truth for company information.
 * All values here are taken from the live Express Advertising website.
 */

export const site = {
  name: "Express Advertising",
  legalName: "Express Advertising",
  tagline: "Advertising Solution",
  positioning:
    "A UAE printing, signage and brand production house — design, print, fabricate, install.",
  url: "https://expressadvertising.ae",
  shopUrl: "https://shop.expressadvertising.ae/",
  mapsUrl: "https://maps.app.goo.gl/VxwNQiXKLSkMq9Qw8",
} as const;

export const contact = {
  /** +971 55 714 7749 — as published on expressadvertising.ae */
  phoneE164: "+971557147749",
  phoneDisplay: "+971 55 714 7749",
  whatsapp: "971557147749",
  emailPrimary: "info@expressadvertising.ae",
  emailSupport: "support@expressadvertising.ae",
  address: {
    line1: "Shop # 7 — A.R.A Building",
    line2: "Sheikh Rashid Bin Humeed St, 6355",
    city: "Ajman",
    country: "United Arab Emirates",
  },
  addressOneLine:
    "Shop # 7 — A.R.A Building, Sheikh Rashid Bin Humeed St, 6355, Ajman, UAE",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Social profiles are intentionally empty: none were verifiable on the
 * current Express Advertising website. Add verified URLs here and the
 * footer will render them automatically.
 */
export const socials: { label: string; href: string }[] = [];
