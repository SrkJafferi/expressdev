import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Printing-services landing page data.
 * Products are the actual Express Advertising printing catalogue — no
 * invented items. Imagery uses the verified Unsplash placeholders already
 * used by the product catalogue (src/data/products.ts overrides list).
 */

export type PrintProduct = {
  name: string;
  description: string;
  image: string;
  alt: string;
};

export const printProducts: PrintProduct[] = [
  {
    name: "Business Cards",
    description:
      "Foil, spot UV, laminated and premium-stock business cards built to make the right first impression.",
    image:
      "https://images.unsplash.com/photo-1704030459056-f31f181a2a4e?w=600&auto=format&fit=crop&q=85",
    alt: "Premium printed business cards stacked on a desk",
  },
  {
    name: "Letterheads",
    description:
      "Professionally produced corporate letterheads with accurate colour and premium paper options.",
    image:
      "https://plus.unsplash.com/premium_photo-1726754742476-915c95b6ed4d?w=600&auto=format&fit=crop&q=85",
    alt: "Corporate letterhead stationery with printed branding",
  },
  {
    name: "Brochures",
    description:
      "Bi-fold, tri-fold and multi-page brochures with crisp reproduction and refined finishing.",
    image:
      "https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?w=600&auto=format&fit=crop&q=85",
    alt: "Printed brochures fanned out on a surface",
  },
  {
    name: "Flyers",
    description:
      "High-impact promotional flyers for campaigns, launches, offers and events.",
    image:
      "https://images.unsplash.com/photo-1754681920848-d20733e4ef23?w=600&auto=format&fit=crop&q=85",
    alt: "Colourful promotional flyers ready for distribution",
  },
  {
    name: "Vouchers",
    description:
      "Branded vouchers and gift certificates with numbering and custom finishing options.",
    image:
      "https://images.unsplash.com/photo-1567748534085-467f8a8a475d?w=600&auto=format&fit=crop&q=85",
    alt: "Branded printed vouchers arranged in a row",
  },
  {
    name: "Invoice Books",
    description:
      "Carbonless NCR invoice books with sequential numbering and custom business details.",
    image:
      "https://images.unsplash.com/photo-1693045181254-08462917f681?w=600&auto=format&fit=crop&q=85",
    alt: "Carbonless invoice books with numbered pages",
  },
  {
    name: "Paper Stickers",
    description:
      "Custom paper labels and stickers in multiple shapes and sizes for packaging and branding.",
    image:
      "https://images.unsplash.com/photo-1572950947476-26a6e4111e80?w=600&auto=format&fit=crop&q=85",
    alt: "Custom shaped paper stickers and labels",
  },
  {
    name: "Customized Stationery",
    description:
      "Branded notebooks, notepads, writing pads and coordinated stationery sets.",
    image:
      "https://images.unsplash.com/photo-1589412336918-bcae3dd7df0e?w=600&auto=format&fit=crop&q=85",
    alt: "Branded notebooks and stationery sets",
  },
  {
    name: "Files & Folders",
    description:
      "Presentation and document folders with custom pockets, die cuts, lamination and foil options.",
    image:
      "https://images.unsplash.com/photo-1740999540787-0b7af428d15d?w=600&auto=format&fit=crop&q=85",
    alt: "Printed presentation folders with document pockets",
  },
  {
    name: "Envelopes",
    description:
      "Branded business and premium envelopes in multiple sizes and paper stocks.",
    image:
      "https://images.unsplash.com/photo-1631010233091-43e8de2f9581?w=600&auto=format&fit=crop&q=85",
    alt: "Branded envelopes stacked in multiple sizes",
  },
];

/** Pre-filled WhatsApp enquiry per product — quotation-intent deep links. */
export function printProductQuoteUrl(product: string): string {
  return whatsappUrl({ service: "Printing Services", details: product });
}

export type PrintFinish = {
  name: string;
  note: string;
  accent: "cyan" | "magenta" | "navy" | "yellow";
  /** When set, the card renders as a full-bleed image with hover overlay. */
  image?: string;
  imageAlt?: string;
};

export const printFinishes: PrintFinish[] = [
  {
    name: "Matte Lamination",
    note: "Smooth, low-sheen surface with a soft even look.",
    accent: "cyan",
    image: "/matt_converted.avif",
    imageAlt: "Matte lamination swatch — smooth, low-sheen surface",
  },
  {
    name: "Gloss Lamination",
    note: "High-shine finish that makes colours pop.",
    accent: "magenta",
    image: "/gloss_converted.avif",
    imageAlt: "Gloss lamination swatch — high-shine reflective surface",
  },
  {
    name: "Soft Touch",
    note: "Velvet-feel laminate with a premium tactile hand.",
    accent: "navy",
    image: "/soft_converted.avif",
    imageAlt: "Soft touch laminate swatch — velvet-feel premium surface",
  },
  {
    name: "Foil Stamping",
    note: "Metallic foil accents in gold, silver and brand colours.",
    accent: "yellow",
    image: "/foil_converted.avif",
    imageAlt: "Foil stamping swatch — metallic foil accents",
  },
  {
    name: "Spot UV",
    note: "Gloss-raised highlights over matte areas for contrast.",
    accent: "cyan",
    image: "/spotuv_converted.avif",
    imageAlt: "Spot UV swatch — gloss-raised highlights over matte",
  },
  {
    name: "Embossing / Debossing",
    note: "Pressed relief that adds dimension to logos and marks.",
    accent: "magenta",
    image: "/emboss_converted.avif",
    imageAlt: "Embossed and debossed swatch — pressed relief detail",
  },
  {
    name: "Die Cutting",
    note: "Custom shapes and cut-outs beyond the standard rectangle.",
    accent: "navy",
    image: "/die_converted.avif",
    imageAlt: "Die cut swatch — custom shapes and cut-outs",
  },
  {
    name: "Premium Textured Stocks",
    note: "Laid, linen and felt-finish papers with real substance.",
    accent: "yellow",
    image: "/premium_converted.avif",
    imageAlt: "Premium textured stock swatch — laid and linen papers",
  },
];

export const printProcess = [
  {
    index: "01",
    title: "Brief & Artwork",
    body: "Share artwork or let our designers prepare press-ready files. Bleed, register and colour build resolved before anything is committed.",
  },
  {
    index: "02",
    title: "Proof & Material Selection",
    body: "Stock, weight and finish confirmed against a proof — so what you approve is exactly what runs on press.",
  },
  {
    index: "03",
    title: "Print & Finish",
    body: "Offset or digital run on the right press for the quantity, followed by lamination, foil, die cut and assembly.",
  },
  {
    index: "04",
    title: "Quality Check & Delivery",
    body: "Every sheet checked against the approved proof, packed and delivered across the UAE on the agreed date.",
  },
] as const;
