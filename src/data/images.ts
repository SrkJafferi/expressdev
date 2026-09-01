/**
 * Centralised image references.
 *
 * DEVELOPMENT PLACEHOLDERS: the Unsplash URLs below are royalty-free
 * production/printing imagery standing in for real Express Advertising
 * photography. Replace the `src` values with owned assets (ideally moved
 * into /public/media) before launch — nothing else needs to change.
 */

export type Media = {
  src: string;
  alt: string;
  /** Development placeholder flag — flip to false once owned assets land. */
  placeholder?: boolean;
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const media = {
  heroPrimary: {
    src: u("1693031630369-bd429a57f115", 1800),
    alt: "Wide-format printer laying down a large banner graphic",
    placeholder: true,
  },
  heroSecondary: {
    src: u("1503694978374-8a2fa686963a", 900),
    alt: "Printed sheets running through an offset press",
    placeholder: true,
  },
  heroTertiary: {
    src: u("1760720962321-f03e04a03b41", 700),
    alt: "Blank printed card staged for a brand mockup",
    placeholder: true,
  },

  onsite: {
    src: "/onsite.avif",
    alt: "Express Advertising team installing signage on site across the UAE",
  },
  deliver: {
    src: "/deliver.avif",
    alt: "Express Advertising finished job quality-checked and handed over",
  },
  idea: {
    src: "/idea.avif",
    alt: "Express Advertising project brief and scoping session",
  },
  itservices: {
    src: "/itservices.avif",
    alt: "Express Advertising IT services — websites, hosting and support",
  },
  digitalservices: {
    src: "/Digitalservices.avif",
    alt: "Express Advertising digital design studio at work",
  },
  cnclaser: {
    src: "/CNC.webp",
    alt: "Express Advertising CNC routing and laser cutting production",
  },
  retailservices: {
    src: "/Retail.webp",
    alt: "Express Advertising retail storefront and exhibition build",
  },
  brandpromowebp: {
    src: "/brandpromo.webp",
    alt: "Express Advertising brand collateral — stationery suites and printed profiles",
  },
  promotionalwebp: {
    src: "/promotional.webp",
    alt: "Express Advertising promotional items and corporate gifting range",
  },
  largeformatwebp: {
    src: "/largeformat.webp",
    alt: "Express Advertising large-format printer producing a wide graphic",
  },
  signageservices: {
    src: "/signage-services.webp",
    alt: "Express Advertising signage — fabricated illuminated sign installation",
  },
  printingservices: {
    src: "/printing-services.webp",
    alt: "Express Advertising printing services — press running a production job",
  },
  printing: {
    src: u("1718670013921-2f144aba173a", 1200),
    alt: "Foil-detailed business cards stacked on a stone surface",
    placeholder: true,
  },
  signage: {
    src: u("1722020670872-78e4787344fb", 1200),
    alt: "Fabricated lettering sign mounted on a shopfront facade",
    placeholder: true,
  },
  largeFormat: {
    src: u("1758708536058-142d64336046", 1200),
    alt: "Large-format printer producing a full-colour graphic panel",
    placeholder: true,
  },
  promotional: {
    src: u("1776762249700-a65dbfabc9b1", 1200),
    alt: "Branded notebook and pencils arranged for corporate gifting",
    placeholder: true,
  },
  collateral: {
    src: u("1561015314-6bd8c1e875ee", 1200),
    alt: "Stack of printed brand collateral on uncoated stock",
    placeholder: true,
  },
  retail: {
    src: u("1761225646548-bc92fea0dc72", 1200),
    alt: "Retail display counter built out with a printed backdrop",
    placeholder: true,
  },
  cnc: {
    src: u("1735494033576-9c882e80504c", 1200),
    alt: "Laser cutting head profiling sheet material",
    placeholder: true,
  },
  design: {
    src: u("1626785774573-4b799315345d", 1200),
    alt: "Designer working through brand artwork on a calibrated setup",
    placeholder: true,
  },
  it: {
    src: u("1518770660439-4636190af475", 1200),
    alt: "Hardware and network infrastructure detail",
    placeholder: true,
  },

  vehicle: {
    src: u("1646531840695-62810bcd1171", 1400),
    alt: "Installer squeegeeing vinyl wrap onto a vehicle panel",
    placeholder: true,
  },
  finishing: {
    src: u("1693031630157-7ecc8d06de63", 1400),
    alt: "Finishing line detail inside a print production facility",
    placeholder: true,
  },
  inkDetail: {
    src: u("1642480532034-362360552ccb", 1000),
    alt: "Colour reference swatch book opened across the frame",
    placeholder: true,
  },
  paperEdge: {
    src: u("1581079289196-67865ea83118", 1400),
    alt: "Fan deck of paper and colour swatches spread out",
    placeholder: true,
  },
  banner: {
    src: u("1774271694280-97afcef90ded", 1400),
    alt: "Building-scale printed graphic installed across a facade",
    placeholder: true,
  },
  banner01: {
    src: "/banner01.avif",
    alt: "Express Advertising premium printing and brand production showcase",
  },
  banner5: {
    src: "/banner5.avif",
    alt: "Large-format signage production and installation by Express Advertising",
  },
  banner4: {
    src: "/banner4.avif",
    alt: "Branded retail and exhibition environment produced by Express Advertising",
  },
  banner3: {
    src: "/banner3.avif",
    alt: "Large-format signage and visual impact work by Express Advertising",
  },
  banner1: {
    src: "/banner1.avif",
    alt: "Express Advertising production floor with print and branding work in progress",
  },
  banner2: {
    src: "/banner2.avif",
    alt: "Customised branded promotional products arranged on display",
  },
  workshop: {
    src: u("1581508512961-0e3b9524db40", 1600),
    alt: "Press hall of a printing and fabrication workshop",
    placeholder: true,
  },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;

/**
 * Allow overriding a media entry with a direct external URL (e.g. a
 * hand-picked Unsplash photo) without touching local storage.
 */
export function withSrc(media: Media, src: string): Media {
  return { ...media, src };
}
