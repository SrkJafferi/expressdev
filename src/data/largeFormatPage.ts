import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Large-format printing landing page data — genuine Express Advertising
 * large-format catalogue. Imagery reuses verified project assets and
 * Unsplash placeholders already referenced across the site.
 */

export type LfSolution = {
  index: string;
  name: string;
  description: string;
  icon: "flag" | "poster" | "rollup" | "vinyl" | "building" | "window" | "vision" | "floor" | "vehicle" | "board";
  image: string;
  imageAlt: string;
};

export const lfSolutions: LfSolution[] = [
  {
    index: "01",
    name: "Banners & Flex",
    description:
      "High-visibility indoor and outdoor banners for promotions, campaigns, events, construction sites and commercial spaces.",
    icon: "flag",
    image:
      "https://images.unsplash.com/photo-1513757378314-e46255f6ed16?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Large printed outdoor banner",
  },
  {
    index: "02",
    name: "Posters",
    description:
      "High-resolution promotional and display posters for retail, campaigns, launches, exhibitions and interior spaces.",
    icon: "poster",
    image:
      "https://images.unsplash.com/photo-1535446937720-e4cad0145efe?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Large-format poster print display",
  },
  {
    index: "03",
    name: "Roll-Up & Display Stands",
    description:
      "Portable printed display solutions for exhibitions, conferences, presentations, receptions and promotional activations.",
    icon: "rollup",
    image: "/banner2.avif",
    imageAlt: "Roll-up display stands at a promotional activation",
  },
  {
    index: "04",
    name: "Vinyl Graphics",
    description:
      "Custom vinyl graphics for glass, walls, counters, displays, equipment, vehicles and retail surfaces — temporary or permanent.",
    icon: "vinyl",
    image:
      "https://images.unsplash.com/photo-1691052709911-7744a278aa37?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Plotter-cut vinyl graphics being applied",
  },
  {
    index: "05",
    name: "Building & Façade Graphics",
    description:
      "Large visual treatments designed to transform commercial building surfaces into high-impact brand communication.",
    icon: "building",
    image:
      "https://images.unsplash.com/photo-1774271694280-97afcef90ded?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Building-scale printed graphic across a facade",
  },
  {
    index: "06",
    name: "Window Graphics",
    description:
      "Printed and cut window films for promotions, privacy, store branding, seasonal campaigns and decorative applications.",
    icon: "window",
    image:
      "https://images.unsplash.com/photo-1572950947476-26a6e4111e80?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Printed window graphics on a storefront",
  },
  {
    index: "07",
    name: "One-Way Vision",
    description:
      "Perforated window graphics that display branding externally while maintaining useful visibility from inside.",
    icon: "vision",
    image:
      "https://plus.unsplash.com/premium_photo-1677658295348-7cad7276ffb2?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Perforated one-way vision window graphic",
  },
  {
    index: "08",
    name: "Floor Graphics",
    description:
      "Printed floor graphics for retail, exhibitions, promotions, directional communication and campaign branding.",
    icon: "floor",
    image:
      "https://images.unsplash.com/photo-1693045181254-08462917f681?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Printed floor graphics in a retail space",
  },
  {
    index: "09",
    name: "Vehicle Graphics",
    description:
      "Printed and cut graphics for commercial vehicles, fleet branding, promotional applications and mobile visibility.",
    icon: "vehicle",
    image:
      "https://images.unsplash.com/photo-1646531840695-62810bcd1171?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Vehicle graphics wrap installation",
  },
  {
    index: "10",
    name: "Display Boards",
    description:
      "Rigid printed display solutions including suitable board-based applications for retail, exhibitions, presentations and temporary signage.",
    icon: "board",
    image:
      "https://images.unsplash.com/photo-1648098893250-1d03dce92467?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Rigid forex board display print",
  },
];

export function lfSolutionQuoteUrl(solution: string): string {
  return whatsappUrl({
    service: "Large Format Printing",
    details: solution,
  });
}

export const lfMaterials = [
  {
    name: "VINYL",
    note: "For windows, walls, displays and promotional graphics.",
    accent: "cyan",
    icon: "roll",
    image:
      "https://images.unsplash.com/photo-1612316704779-3ee09c51944d?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Printed wall graphics applied across an interior wall",
  },
  {
    name: "FLEX",
    note: "For high-visibility banners and selected outdoor applications.",
    accent: "magenta",
    icon: "flag",
    image:
      "https://images.unsplash.com/photo-1693031630146-568e2f72db0e?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Wide-format flex media running through production",
  },
  {
    name: "ONE-WAY VISION",
    note: "For branded glazing with controlled visibility.",
    accent: "navy",
    icon: "vision",
    image:
      "https://images.unsplash.com/photo-1722020670872-78e4787344fb?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Branded commercial glazing with printed film",
  },
  {
    name: "POSTER MEDIA",
    note: "For promotional, campaign and interior display graphics.",
    accent: "yellow",
    icon: "poster",
    image:
      "https://images.unsplash.com/photo-1693031630369-bd429a57f115?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Wide-format printer laying down a poster graphic",
  },
  {
    name: "RIGID BOARD",
    note: "For mounted display and presentation applications.",
    accent: "cyan",
    icon: "board",
    image:
      "https://images.unsplash.com/photo-1735494033576-9c882e80504c?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Rigid board material being profiled on production equipment",
  },
  {
    name: "LAMINATION",
    note: "For selected graphics requiring additional surface protection or finish.",
    accent: "magenta",
    icon: "layers",
    image:
      "https://images.unsplash.com/photo-1693031630157-7ecc8d06de63?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Finishing line detail inside a print production facility",
  },
] as const;

export const lfProcess = [
  {
    index: "01",
    label: "PLAN",
    caption: "Application & dimensions",
    icon: "ruler",
  },
  {
    index: "02",
    label: "PRE-PRESS",
    caption: "Artwork · Scale · Colour",
    icon: "doc",
  },
  {
    index: "03",
    label: "PRINT",
    caption: "High-resolution production",
    icon: "printer",
  },
  {
    index: "04",
    label: "FINISH",
    caption: "Cut · Mount · Laminate · Install",
    icon: "scissors",
  },
] as const;

export const lfWhyUs = [
  {
    index: "01",
    title: "COLOUR CONTROL",
    body: "Artwork and output prepared for consistent visual reproduction across different formats.",
    icon: "colour",
    accent: "cyan",
  },
  {
    index: "02",
    title: "APPLICATION-LED MATERIALS",
    body: "Media and finishing selected around the surface and intended environment.",
    icon: "layers",
    accent: "magenta",
  },
  {
    index: "03",
    title: "PRODUCTION + INSTALLATION",
    body: "One team can coordinate production and appropriate installation requirements for suitable projects.",
    icon: "tools",
    accent: "yellow",
  },
  {
    index: "04",
    title: "UAE-FOCUSED EXECUTION",
    body: "Commercial printing and visual production designed around local business, retail, event and promotional requirements.",
    icon: "pin",
    accent: "cyan",
  },
] as const;

export const lfUseCases = [
  {
    label: "RETAIL",
    body: "Window campaigns, in-store graphics and promotional displays.",
    image:
      "https://images.unsplash.com/photo-1761225646548-bc92fea0dc72?auto=format&fit=crop&w=800&q=80",
    alt: "Retail display counter with large printed backdrop",
  },
  {
    label: "EVENTS & EXHIBITIONS",
    body: "Backdrops, roll-ups, branded environments and display graphics.",
    image: "/banner3.avif",
    alt: "Exhibition and event large-format graphics by Express Advertising",
  },
  {
    label: "CORPORATE",
    body: "Office branding, internal graphics and presentation displays.",
    image: "/onsite.avif",
    alt: "Express Advertising team installing interior graphics",
  },
  {
    label: "OUTDOOR",
    body: "Large-format promotional graphics and suitable exterior applications.",
    image:
      "https://images.unsplash.com/photo-1774271694280-97afcef90ded?auto=format&fit=crop&w=800&q=80",
    alt: "Building-scale printed graphic installed across a facade",
  },
  {
    label: "AUTOMOTIVE",
    body: "Commercial vehicle and fleet graphics.",
    image:
      "https://images.unsplash.com/photo-1646531840695-62810bcd1171?auto=format&fit=crop&w=800&q=80",
    alt: "Installer applying vinyl wrap to a vehicle panel",
  },
] as const;
