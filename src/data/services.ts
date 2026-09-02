import { media, type Media } from "./images";

export type ServiceAccent = "cyan" | "magenta" | "navy" | "yellow";

export type Service = {
  /** Stable slug — future service detail pages will live at /services/[slug]. */
  slug: string;
  index: string;
  title: string;
  /** Short editorial line used in oversized display type. */
  lede: string;
  description: string;
  /** Genuine offerings, sourced from the live Express Advertising catalogue. */
  items: string[];
  image: Media;
  accent: ServiceAccent;
  /** Layout weight inside the asymmetric services grid. */
  span: "wide" | "tall" | "standard";
};

/**
 * Services that have dedicated landing pages. Links route to the real page
 * URL instead of a homepage anchor, so navigation never produces a
 * "/#section" address. Add a slug here as new service pages go live.
 */
const servicePages: Partial<Record<string, string>> = {
  "printing-services": "/service-printing-services",
  "large-format-printing": "/service-large-format-printing",
  signage: "/service-signage",
  "promotional-items": "/service-promotional-items",
  "brand-collateral": "/service-brand-collateral",
  "retail-events-exhibition": "/service-retail-events-exhibition",
  "cnc-laser-cutting": "/service-cnc-laser-cutting",
  "digital-design": "/service-digital-design",
  "it-services": "/service-it-services",
};

/** Clean URL for a service — dedicated page when available, anchor otherwise. */
export function serviceHref(slug: string): string {
  return servicePages[slug] ?? `/#service-${slug}`;
}

/**
 * True when a service has a dedicated landing page. Lets the services index
 * give every card a meaningful action instead of an anchor that leads back
 * to the homepage: real pages get "View details", everything else routes
 * straight into a pre-filled WhatsApp quotation.
 */
export function hasServicePage(slug: string): boolean {
  return Boolean(servicePages[slug]);
}

export const services: Service[] = [
  {
    slug: "printing-services",
    index: "01",
    title: "Printing Services",
    lede: "Ink, stock, register.",
    description:
      "Everyday business print produced to a standard your brand can stand behind — colour-managed, correctly imposed and cleanly finished.",
    items: [
      "Business Cards",
      "Letterheads",
      "Brochures",
      "Flyers",
      "Invoices & Vouchers",
      "Envelopes",
      "Files & Folders",
      "Computerised Stationery",
      "Tags",
      "Paper Stickers",
    ],
    image: media.printingservices,
    accent: "cyan",
    span: "wide",
  },
  {
    slug: "signage",
    index: "02",
    title: "Signage",
    lede: "Built to be seen.",
    description:
      "Interior and exterior sign systems fabricated in-house, from acrylic faces to illuminated 3D letters — measured, made and installed.",
    items: [
      "3D Signs",
      "2D Signs",
      "Acrylic Boards",
      "Indoor Signs",
      "A-Boards",
      "Flag Stands",
      "Roll-Up Stands",
      "Pop-Up Displays",
    ],
    image: media.signageservices,
    accent: "navy",
    span: "tall",
  },
  {
    slug: "large-format-printing",
    index: "03",
    title: "Large Format Printing",
    lede: "Scale without compromise.",
    description:
      "Wide-format output for facades, fleets and interiors — printed on the right media for UAE sun, dust and humidity.",
    items: [
      "Banners & Flex Printing",
      "Vehicle Stickers",
      "Wall Stickers",
      "One Way Vision",
      "Forex Board",
      "Posters",
      "Canvas & DuraTrans",
      "Print & Cut Stickers",
      "Plotter Cutting",
      "Flag Printing",
    ],
    image: media.largeformatwebp,
    accent: "magenta",
    span: "standard",
  },
  {
    slug: "promotional-items",
    index: "04",
    title: "Promotional Items",
    lede: "Branding you can hold.",
    description:
      "Corporate gifting and giveaway programmes decorated with the right technique for the material — pad print, screen, embroidery, laser, sublimation.",
    items: [
      "Drinkware & Mugs",
      "Notebooks & Pens",
      "Apparel & Caps",
      "Bags & Pouches",
      "Technology Gifts",
      "Awards & Plaques",
      "Pins & Badges",
      "ID Cards & Lanyards",
    ],
    image: media.promotionalwebp,
    accent: "yellow",
    span: "standard",
  },
  {
    slug: "brand-collateral",
    index: "05",
    title: "Brand Collateral",
    lede: "One brand, everywhere.",
    description:
      "The full stationery and touchpoint suite kept consistent across every item, every reprint and every department.",
    items: [
      "Corporate Stationery Suites",
      "Company Profiles",
      "Catalogues",
      "Presentation Folders",
      "Packaging & Labels",
      "Certificates",
    ],
    image: media.brandpromowebp,
    accent: "cyan",
    span: "tall",
  },
  {
    slug: "retail-events-exhibition",
    index: "06",
    title: "Retail & Storefront / Event & Exhibition",
    lede: "Spaces that convert.",
    description:
      "Storefront branding and event build-outs delivered on schedule — shop graphics, display systems and exhibition stands.",
    items: [
      "Shopfront Branding",
      "Window Graphics",
      "Exhibition Stands",
      "Pop-Up & Backdrops",
      "Promotional Tables",
      "Roll-Ups & Flag Stands",
    ],
    image: media.retailservices,
    accent: "magenta",
    span: "wide",
  },
  {
    slug: "cnc-laser-cutting",
    index: "07",
    title: "CNC & Laser Cutting",
    lede: "Tolerances that hold.",
    description:
      "Precision cutting, routing and engraving in acrylic, wood, foam and composite panel — the fabrication layer behind our sign work.",
    items: [
      "Acrylic Laser Cutting",
      "CNC Routing",
      "Laser Engraving",
      "Channel & Built-Up Letters",
      "Panel Profiling",
      "Contour Cutting",
    ],
    image: media.cnclaser,
    accent: "navy",
    span: "standard",
  },
  {
    slug: "digital-design",
    index: "08",
    title: "Digital Design",
    lede: "Artwork that prints right.",
    description:
      "Graphic design and pre-press handled by people who know the press — logos, layouts and production-ready files.",
    items: [
      "Logo & Identity Design",
      "Print Layout & Artwork",
      "Social Media Creatives",
      "Pre-Press & File Setup",
      "Mockups & Visuals",
      "Artwork Redraw & Vectorisation",
    ],
    image: media.digitalservices,
    accent: "cyan",
    span: "standard",
  },
  {
    slug: "it-services",
    index: "09",
    title: "IT Services",
    lede: "The digital side, covered.",
    description:
      "Practical technology support for the same UAE businesses we print for — web presence, hardware and day-to-day IT.",
    items: [
      "Website Development",
      "Domain & Hosting",
      "E-Commerce Setup",
      "IT Support & Maintenance",
      "Networking",
      "Business Email Setup",
    ],
    image: media.itservices,
    accent: "navy",
    span: "standard",
  },
];

/**
 * HERO SLIDES — full-width immersive slider on the homepage.
 * Headlines are structured as explicit lines so they wrap intentionally on
 * every breakpoint, with one restrained accent segment that picks up the
 * cyan highlight in the gradient heading. Imagery is centralised in
 * images.ts; copy is genuine positioning, no fabricated claims.
 */
export type HeroTitleSegment = { text: string; accent?: boolean };

export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: HeroTitleSegment[][];
  body: string;
  image: Media;
  accent: ServiceAccent;
};

/**
 * Catalogue CTA target. No catalogue PDF asset is published yet, so the
 * button points to the on-page catalogue section instead of an invented
 * file URL. Swap this for the PDF path (e.g. "/catalogue.pdf") once the
 * file is uploaded.
 */
export const catalogueUrl = "/#catalogue";

export const heroSlides: HeroSlide[] = [
  {
    id: "production",
    eyebrow: "PREMIUM PRINTING & BRAND PRODUCTION · UAE",
    title: [
      [{ text: "Your Brand Deserves" }],
      [{ text: "To Be " }, { text: "Unforgettable.", accent: true }],
    ],
    body: "From the first idea to the final installation, we turn brands into powerful physical experiences — crafted with precision for businesses across the UAE.",
    image: media.banner01,
    accent: "cyan",
  },
  {
    id: "promotional",
    eyebrow: "CUSTOMIZED PROMOTIONAL ITEMS",
    title: [
      [{ text: "Put Your Brand" }],
      [{ text: "In " }, { text: "Every Hand.", accent: true }],
    ],
    body: "From apparel and drinkware to bags, stationery and packaging, we create custom promotional products that keep your brand visible, useful and unforgettable.",
    image: media.banner2,
    accent: "yellow",
  },
  {
    id: "signage",
    eyebrow: "SIGNAGE · LARGE FORMAT · VISUAL IMPACT",
    title: [
      [{ text: "Built To Be Seen." }],
      [{ text: "Made To Be " }, { text: "Remembered.", accent: true }],
    ],
    body: "From storefront signage to large-format displays, we create bold visual experiences designed to stand out in the UAE's most competitive spaces.",
    image: media.banner5,
    accent: "magenta",
  },
  {
    id: "retail",
    eyebrow: "RETAIL · EVENTS · EXHIBITIONS",
    title: [
      [{ text: "Turn Every Space" }],
      [{ text: "Into A " }, { text: "Brand Experience.", accent: true }],
    ],
    body: "We transform retail stores, exhibitions and events into immersive branded environments that attract attention and leave a lasting impression.",
    image: media.banner3,
    accent: "cyan",
  },
  {
    id: "collateral",
    eyebrow: "DESIGN · PRINT · FABRICATE · INSTALL",
    title: [
      [{ text: "One Partner.", accent: true }],
      [{ text: "Every Brand Touchpoint." }],
    ],
    body: "Printing, signage, fabrication, promotional products and digital design — brought together under one production team for brands across the UAE.",
    image: media.banner4,
    accent: "yellow",
  },
];

/** IDEA → DELIVER narrative used by the signature horizontal scroll section. */
export const processStages = [
  {
    title: "Idea",
    caption: "Brief & scope",
    body: "We start with the outcome — where it goes, who sees it, how long it has to last. Materials and method follow from that, not the other way round.",
    image: media.idea,
  },
  {
    title: "Design",
    caption: "Artwork & pre-press",
    body: "Concepts, layouts and production files prepared to press specification. Bleed, register, colour build and cut paths resolved before anything is committed.",
    image: media.design,
  },
  {
    title: "Print",
    caption: "Colour & stock",
    body: "Digital, offset or wide-format — chosen on quantity, substrate and finish. Proofed, colour-managed, then run.",
    image: media.inkDetail,
  },
  {
    title: "Produce",
    caption: "Cut & fabricate",
    body: "Laser, CNC, mount, laminate, weld, build. This is where flat print becomes a sign, a stand, a storefront.",
    image: media.cnc,
  },
  {
    title: "Install",
    caption: "On site, across the UAE",
    body: "Site measurement, fixing and clean handover — shopfronts, fleets, interiors and exhibition halls.",
    image: media.onsite,
  },
  {
    title: "Deliver",
    caption: "Checked & handed over",
    body: "Quality-checked, packed and delivered on the agreed date. Reorders run from the same approved files.",
    image: media.deliver,
  },
] as const;

/** Compact capability signals — qualities, not invented statistics. */
export const capabilities = [
  "Premium Production",
  "Custom Solutions",
  "Creative Expertise",
  "UAE Service",
  "Quality Finishing",
  "End-to-End Execution",
] as const;

export const strengths = [
  {
    index: "01",
    title: "Premium Quality Printing",
    body: "Colour-managed output on properly specified stock. What we proof is what you receive — and what you receive again on the reprint.",
    accent: "cyan" as ServiceAccent,
  },
  {
    index: "02",
    title: "Creative Design Expertise",
    body: "In-house designers who understand production limits, so artwork arrives at the press already correct rather than compromised on press.",
    accent: "magenta" as ServiceAccent,
  },
  {
    index: "03",
    title: "All-In-One Branding & Production",
    body: "Print, signage, fabrication, merchandise and installation under one accountable team. One brief, one point of contact, one standard.",
    accent: "navy" as ServiceAccent,
  },
  {
    index: "04",
    title: "Professional Customer Support",
    body: "Direct access to the people running your job — clear timelines, straight answers and follow-through after delivery.",
    accent: "yellow" as ServiceAccent,
  },
] as const;

/**
 * Material / capability showcase — real Express Advertising output areas.
 */
export const materials = [
  { title: "Business Printing", spec: "Offset · Digital · Uncoated & coated stock", image: media.printing },
  { title: "Signage", spec: "Acrylic · Illuminated · Built-up letters", image: media.signage },
  { title: "Large Format", spec: "Flex · Vinyl · One way vision", image: media.banner },
  { title: "Branding Materials", spec: "Stationery suites · Company profiles", image: media.collateral },
  { title: "Event Displays", spec: "Roll-ups · Pop-ups · Exhibition builds", image: media.retail },
  { title: "Promotional Merchandise", spec: "Pad print · Laser · Embroidery", image: media.promotional },
  { title: "Precision Fabrication", spec: "CNC routing · Laser cutting · Engraving", image: media.cnc },
  { title: "Vehicle Branding", spec: "Cast vinyl · Contour cut · Fleet rollout", image: media.vehicle },
] as const;
