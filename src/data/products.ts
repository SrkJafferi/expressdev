import { media, withSrc, type Media } from "./images";

/**
 * Centralised product catalogue — every capability Express Advertising can
 * produce, grouped into the nine homepage categories.
 *
 * IMAGE STRATEGY: each product points at a verified royalty-free Unsplash
 * placeholder from `media` (see src/data/images.ts). `unsplashQuery` records
 * the intended subject so a more specific per-product image (or owned
 * photography) can be dropped in later without touching the component.
 */

export type ProductCategoryId =
  | "printing"
  | "signage"
  | "large-format"
  | "promotional"
  | "collateral"
  | "retail-events"
  | "cnc-laser"
  | "digital-design"
  | "it-services";

export type Product = {
  name: string;
  slug: string;
  category: ProductCategoryId;
  shortDescription: string;
  image: Media;
  imageAlt: string;
  unsplashQuery: string;
};

export type ProductCategory = {
  id: ProductCategoryId;
  label: string;
  /** Compact label used on the mobile category rail. */
  short: string;
  count: number;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Raw rows: [name, shortDescription, mediaKey, unsplashQuery]. */
type Row = [string, string, keyof typeof media, string];

const build = (category: ProductCategoryId, rows: Row[]): Product[] =>
  rows.map(([name, shortDescription, key, unsplashQuery]) => ({
    name,
    slug: slugify(name),
    category,
    shortDescription,
    image: media[key],
    imageAlt: media[key].alt,
    unsplashQuery,
  }));

const printing = build("printing", [
  ["Business Cards", "Foil, spot-UV and laminated finishes on premium stock.", "printing", "premium printed business cards stationery"],
  ["Letterheads", "Colour-managed corporate letterheads on quality paper.", "collateral", "printed letterhead stationery"],
  ["Brochures", "Folded and stitched brochures, cleanly finished.", "collateral", "folded print brochure material"],
  ["Flyers", "High-impact single-sheet flyers for campaigns.", "printing", "printed flyers leaflet stack"],
  ["Vouchers", "Numbered gift and discount vouchers.", "collateral", "printed voucher coupon cards"],
  ["Invoice Books", "Carbonless duplicate and triplicate invoice books.", "finishing", "printed invoice book stationery"],
  ["Paper Stickers", "Cut-to-shape paper labels and stickers.", "printing", "printed paper stickers labels"],
  ["Customized Stationery", "Cohesive branded stationery sets.", "collateral", "branded corporate stationery set"],
  ["Files & Folders", "Presentation files and document folders.", "collateral", "printed document folder file"],
  ["Envelopes", "Branded envelopes in standard and custom sizes.", "collateral", "printed branded envelopes"],
]);

// Dedicated direct Unsplash images for select printing-tab products
// (remote, not stored locally).
const printingImageOverrides: Partial<Record<string, string>> = {
  Letterheads:
    "https://plus.unsplash.com/premium_photo-1726754742476-915c95b6ed4d?w=600&auto=format&fit=crop&q=85",
  "Business Cards":
    "https://images.unsplash.com/photo-1704030459056-f31f181a2a4e?w=600&auto=format&fit=crop&q=85",
  Brochures:
    "https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?w=600&auto=format&fit=crop&q=85",
  Flyers:
    "https://images.unsplash.com/photo-1754681920848-d20733e4ef23?w=600&auto=format&fit=crop&q=85",
  Vouchers:
    "https://images.unsplash.com/photo-1567748534085-467f8a8a475d?w=600&auto=format&fit=crop&q=85",
  "Invoice Books":
    "https://images.unsplash.com/photo-1693045181254-08462917f681?w=600&auto=format&fit=crop&q=85",
  "Paper Stickers":
    "https://images.unsplash.com/photo-1572950947476-26a6e4111e80?w=600&auto=format&fit=crop&q=85",
  "Customized Stationery":
    "https://images.unsplash.com/photo-1589412336918-bcae3dd7df0e?w=600&auto=format&fit=crop&q=85",
  "Files & Folders":
    "https://images.unsplash.com/photo-1740999540787-0b7af428d15d?w=600&auto=format&fit=crop&q=85",
  Envelopes:
    "https://images.unsplash.com/photo-1631010233091-43e8de2f9581?w=600&auto=format&fit=crop&q=85",
};

for (const p of printing) {
  const url = printingImageOverrides[p.name];
  if (url) p.image = withSrc(p.image, url);
}

const signage = build("signage", [
  ["2D Signs", "Flat fascia and directional signage.", "signage", "flat storefront sign fascia"],
  ["3D Signs", "Built-up and illuminated 3D lettering.", "signage", "illuminated 3d channel letters signage"],
  ["A-Board", "Free-standing pavement A-boards.", "retail", "pavement a-board sidewalk sign"],
  ["Acrylic Board", "Polished acrylic sign panels.", "signage", "acrylic sign board panel"],
  ["Flag Stands", "Indoor and outdoor branded flag stands.", "retail", "branded flag banner stand"],
  ["Flex Signs", "Backlit and frontlit flex sign faces.", "largeFormat", "backlit flex sign light box"],
  ["Indoor Signs", "Reception, wayfinding and interior signs.", "signage", "interior wayfinding office sign"],
  ["Pop-Up", "Portable pop-up display backdrops.", "retail", "pop up exhibition display backdrop"],
  ["Promotional Table", "Branded promotional counters and tables.", "retail", "branded promotional counter table"],
  ["Roll Up", "Retractable roll-up banner stands.", "retail", "roll up banner stand"],
  ["SMD Screens", "Outdoor and indoor LED display screens.", "banner", "led display digital billboard screen"],
]);

// Signage tab — dedicated direct Unsplash images (remote, not stored locally).
const signageImageOverrides: Partial<Record<string, string>> = {
  "2D Signs":
    "https://images.unsplash.com/photo-1704275542846-62b8604b0d1e?w=600&auto=format&fit=crop&q=85",
  "3D Signs":
    "https://images.unsplash.com/photo-1659993447069-e00b561168d4?w=600&auto=format&fit=crop&q=85",
  "A-Board":
    "https://images.unsplash.com/photo-1595234675740-abacff11cc4c?w=600&auto=format&fit=crop&q=85",
  "Acrylic Board":
    "https://images.unsplash.com/photo-1622465911368-72162f8da3e2?w=600&auto=format&fit=crop&q=85",
  "Flag Stands":
    "https://plus.unsplash.com/premium_photo-1697729919016-be572df06535?w=600&auto=format&fit=crop&q=85",
  "Flex Signs":
    "https://plus.unsplash.com/premium_photo-1778709603489-5052cc80ccea?w=600&auto=format&fit=crop&q=85",
  "Indoor Signs":
    "https://images.unsplash.com/photo-1695624825454-7ace45436e27?w=600&auto=format&fit=crop&q=85",
  "Pop-Up":
    "https://images.unsplash.com/photo-1626253274763-bdabe2f097c5?w=600&auto=format&fit=crop&q=85",
  "Promotional Table":
    "https://images.unsplash.com/photo-1759866614103-376bde0fc66f?w=600&auto=format&fit=crop&q=85",
  "Roll Up":
    "https://images.unsplash.com/photo-1652388274774-e312506edea5?w=600&auto=format&fit=crop&q=85",
  "SMD Screens":
    "https://plus.unsplash.com/premium_photo-1679690708684-97aa10d30a80?w=600&auto=format&fit=crop&q=85",
};

for (const p of signage) {
  const url = signageImageOverrides[p.name];
  if (url) p.image = withSrc(p.image, url);
}

const largeFormat = build("large-format", [
  ["Banner", "Weatherproof outdoor and indoor banners.", "banner", "large printed outdoor banner"],
  ["Canvas", "Gallery-wrapped canvas prints.", "largeFormat", "canvas print wall art"],
  ["DuraTrans", "Backlit DuraTrans transparencies.", "largeFormat", "backlit duratrans light box print"],
  ["Flag Printing", "Custom printed flags and bunting.", "banner", "printed custom flag outdoor"],
  ["Flex Printing", "Wide-format flex media printing.", "largeFormat", "wide format flex printing"],
  ["One Way Vision", "See-through window graphics.", "vehicle", "one way vision window graphic"],
  ["Forex Board", "Rigid Forex/PVC foam board prints.", "largeFormat", "forex pvc foam board print"],
  ["Plotter Cutting Sticker", "Precision plotter-cut vinyl.", "largeFormat", "plotter cut vinyl sticker"],
  ["Poster", "Large-format posters on multiple stocks.", "largeFormat", "large format poster print"],
  ["Print & Cut Sticker", "Printed and contour-cut stickers.", "printing", "print and cut contour sticker"],
  ["PVC Sticker", "Durable adhesive PVC stickers.", "vehicle", "pvc adhesive vinyl sticker"],
]);

// Large Format tab — dedicated direct Unsplash images (remote, not stored locally).
const largeFormatImageOverrides: Partial<Record<string, string>> = {
  Banner:
    "https://images.unsplash.com/photo-1513757378314-e46255f6ed16?w=600&auto=format&fit=crop&q=85",
  Canvas:
    "https://images.unsplash.com/photo-1612316704779-3ee09c51944d?w=600&auto=format&fit=crop&q=85",
  DuraTrans:
    "https://images.unsplash.com/photo-1625764325194-c48dc5315175?w=600&auto=format&fit=crop&q=85",
  "Flag Printing":
    "https://images.unsplash.com/photo-1608461687992-22f3b17ac636?w=600&auto=format&fit=crop&q=85",
  "Flex Printing":
    "https://images.unsplash.com/photo-1693031630146-568e2f72db0e?w=600&auto=format&fit=crop&q=85",
  "One Way Vision":
    "https://plus.unsplash.com/premium_photo-1677658295348-7cad7276ffb2?w=600&auto=format&fit=crop&q=85",
  "Forex Board":
    "https://images.unsplash.com/photo-1648098893250-1d03dce92467?w=600&auto=format&fit=crop&q=85",
  "Plotter Cutting Sticker":
    "https://images.unsplash.com/photo-1691052709911-7744a278aa37?w=600&auto=format&fit=crop&q=85",
  Poster:
    "https://images.unsplash.com/photo-1535446937720-e4cad0145efe?w=600&auto=format&fit=crop&q=85",
  "Print & Cut Sticker":
    "https://images.unsplash.com/photo-1551118947-e8ac311d4901?w=600&auto=format&fit=crop&q=85",
  "PVC Sticker":
    "https://images.unsplash.com/photo-1664289192124-f0d784151d11?w=600&auto=format&fit=crop&q=85",
};

for (const p of largeFormat) {
  const url = largeFormatImageOverrides[p.name];
  if (url) p.image = withSrc(p.image, url);
}

const promotional = build("promotional", [
  ["Mugs", "Branded ceramic and travel mugs.", "promotional", "branded promotional mug"],
  ["Bags", "Printed tote, paper and gift bags.", "promotional", "branded promotional tote bag"],
  ["Caps", "Embroidered and printed caps.", "promotional", "branded embroidered cap"],
  ["Pens", "Custom-printed promotional pens.", "promotional", "branded promotional pens"],
  ["Keychains", "Metal and acrylic branded keychains.", "promotional", "custom branded keychain"],
  ["T-Shirts", "Printed and embroidered apparel.", "promotional", "printed branded t-shirt apparel"],
  ["Badges", "Name badges and button badges.", "promotional", "custom name badge button"],
  ["Pin Badges", "Enamel and metal pin badges.", "promotional", "enamel metal pin badge"],
  ["Diaries", "Custom corporate diaries and planners.", "promotional", "corporate branded diary planner"],
  ["Wooden Plaques", "Engraved wooden recognition plaques.", "promotional", "engraved wooden plaque award"],
  ["Trophies & Awards", "Crystal and metal trophies.", "promotional", "crystal metal trophy award"],
  ["Card Holders", "Metal and leather card holders.", "promotional", "metal leather card holder"],
  ["Crystal Shields", "Crystal shield recognition awards.", "promotional", "crystal shield award"],
  ["2D Crystal Awards", "Laser-etched 2D crystal awards.", "promotional", "2d crystal engraved award"],
  ["3D Crystal Awards", "Sub-surface 3D crystal awards.", "promotional", "3d crystal award engraving"],
  ["Gift Sets", "Curated corporate gift sets.", "promotional", "executive corporate gift set"],
  ["Medals", "Custom event and sports medals.", "promotional", "custom event medal"],
  ["Clothing Tags", "Woven and printed garment tags.", "collateral", "clothing garment hang tag"],
  ["Staff Uniforms", "Branded workwear and uniforms.", "promotional", "branded staff uniform workwear"],
]);

// Promotional tab — dedicated direct Unsplash images (remote, not stored locally).
const promotionalImageOverrides: Partial<Record<string, string>> = {
  Mugs:
    "https://images.unsplash.com/photo-1682339374155-6fdc4869a75b?w=600&auto=format&fit=crop&q=85",
  Bags:
    "https://plus.unsplash.com/premium_photo-1779449763411-0d3d0b9932d2?w=600&auto=format&fit=crop&q=85",
  Caps:
    "https://images.unsplash.com/photo-1638884251488-a1a701d6d9a6?w=600&auto=format&fit=crop&q=85",
  Pens:
    "https://images.unsplash.com/photo-1675972130757-46b79a6d8591?w=600&auto=format&fit=crop&q=85",
  Keychains:
    "https://images.unsplash.com/photo-1624207827758-b2edf1709d9e?w=600&auto=format&fit=crop&q=85",
  "T-Shirts":
    "https://images.unsplash.com/photo-1660692694114-9459092dd49f?w=600&auto=format&fit=crop&q=85",
  Badges:
    "https://images.unsplash.com/photo-1712022307720-e3c268f5ea23?w=600&auto=format&fit=crop&q=85",
  "Pin Badges":
    "https://images.unsplash.com/photo-1605007239206-c468e82718fb?w=600&auto=format&fit=crop&q=85",
  Diaries:
    "https://images.unsplash.com/photo-1626036355710-0de0ffac5de4?w=600&auto=format&fit=crop&q=85",
  "Wooden Plaques":
    "https://images.unsplash.com/photo-1576723420195-6ac9d4c71fe8?w=600&auto=format&fit=crop&q=85",
  "Trophies & Awards":
    "https://images.unsplash.com/photo-1757365225083-c1ff9e22dd14?w=600&auto=format&fit=crop&q=85",
  "Card Holders":
    "https://images.unsplash.com/photo-1632459250848-8fbabd9be8d9?w=600&auto=format&fit=crop&q=85",
  "Crystal Shields":
    "https://images.unsplash.com/photo-1568912872277-31089abcfe50?w=600&auto=format&fit=crop&q=85",
  "2D Crystal Awards":
    "https://images.unsplash.com/photo-1580674287546-e5e105fb2541?w=600&auto=format&fit=crop&q=85",
  "3D Crystal Awards":
    "https://images.unsplash.com/photo-1779131982595-69f99b43e0e2?w=600&auto=format&fit=crop&q=85",
  "Gift Sets":
    "https://images.unsplash.com/photo-1521127376958-80338b32f37b?w=600&auto=format&fit=crop&q=85",
  Medals:
    "https://images.unsplash.com/photo-1620764840976-a6752f359c46?w=600&auto=format&fit=crop&q=85",
  "Clothing Tags":
    "https://images.unsplash.com/photo-1579118515201-9d189f1bcbf1?w=600&auto=format&fit=crop&q=85",
  "Staff Uniforms":
    "https://images.unsplash.com/photo-1641122669951-3e2aff778d3b?w=600&auto=format&fit=crop&q=85",
};

for (const p of promotional) {
  const url = promotionalImageOverrides[p.name];
  if (url) p.image = withSrc(p.image, url);
}

const collateral = build("collateral", [
  ["Letterheads", "Coordinated corporate letterheads.", "collateral", "corporate letterhead stationery"],
  ["Tags", "Branded product and price tags.", "collateral", "branded product hang tag"],
  ["Customized Stationery", "Full branded stationery suites.", "collateral", "branded stationery suite"],
  ["File Folders", "Presentation and document folders.", "collateral", "presentation document folder"],
  ["Envelopes", "Custom branded envelopes.", "collateral", "custom branded envelope"],
  ["Invoice Books", "Duplicate and triplicate invoice books.", "finishing", "invoice book carbonless"],
]);

// Brand Collateral tab — dedicated direct Unsplash images (remote, not stored locally).
const collateralImageOverrides: Partial<Record<string, string>> = {
  Letterheads:
    "https://plus.unsplash.com/premium_photo-1726754742476-915c95b6ed4d?w=600&auto=format&fit=crop&q=85",
  Tags:
    "https://plus.unsplash.com/premium_photo-1691223714409-b0cb1629f0f7?w=600&auto=format&fit=crop&q=85",
  "Customized Stationery":
    "https://plus.unsplash.com/premium_photo-1770394076474-56462b843763?w=600&auto=format&fit=crop&q=85",
  "File Folders":
    "https://images.unsplash.com/photo-1627897181132-735874e6251f?w=600&auto=format&fit=crop&q=85",
  Envelopes:
    "https://images.unsplash.com/photo-1623668192713-c10cfb272b41?w=600&auto=format&fit=crop&q=85",
  "Invoice Books":
    "https://images.unsplash.com/photo-1631557777127-6495c07ba6b9?w=600&auto=format&fit=crop&q=85",
};

for (const p of collateral) {
  const url = collateralImageOverrides[p.name];
  if (url) p.image = withSrc(p.image, url);
}

const retailEvents = build("retail-events", [
  ["Media Wall", "Step-and-repeat media walls for events.", "retail", "event media wall backdrop"],
  ["Flag with Stand", "Feather and teardrop flags with base.", "retail", "feather flag with stand event"],
  ["Acrylic Sign", "Illuminated and plain acrylic signs.", "signage", "acrylic sign display retail"],
  ["LED Neon Sign", "Custom flexible LED neon signs.", "signage", "led neon sign custom"],
]);

// Retail & Storefront / Event & Exhibition tab — dedicated direct Unsplash
// images (remote, not stored locally).
const retailEventsImageOverrides: Partial<Record<string, string>> = {
  "Media Wall":
    "https://images.unsplash.com/photo-1621618765466-a0e74bd22170?w=600&auto=format&fit=crop&q=85",
  "Flag with Stand":
    "https://images.unsplash.com/photo-1781112981223-c0027e745765?w=600&auto=format&fit=crop&q=85",
  "Acrylic Sign":
    "https://images.unsplash.com/photo-1622964318124-d87cb88d24e2?w=600&auto=format&fit=crop&q=85",
  "LED Neon Sign":
    "https://plus.unsplash.com/premium_photo-1674670903811-4612032be58c?w=600&auto=format&fit=crop&q=85",
};

for (const p of retailEvents) {
  const url = retailEventsImageOverrides[p.name];
  if (url) p.image = withSrc(p.image, url);
}

const cncLaser = build("cnc-laser", [
  ["Acrylic Laser Cutting", "Precision laser-cut acrylic parts.", "cnc", "laser cutting acrylic"],
  ["Wood & MDF Cutting", "CNC-routed wood and MDF.", "cnc", "cnc router wood mdf cutting"],
  ["Metal & Steel Laser Cutting", "Laser-cut metal and steel profiles.", "cnc", "metal steel laser cutting"],
  ["Custom Fabrication", "Bespoke fabrication and assembly.", "workshop", "custom fabrication workshop"],
]);

// CNC & Laser Cutting tab — dedicated direct Unsplash images (remote, not
// stored locally).
const cncLaserImageOverrides: Partial<Record<string, string>> = {
  "Acrylic Laser Cutting":
    "https://images.unsplash.com/photo-1615286922420-c6b348ffbd62?w=600&auto=format&fit=crop&q=85",
  "Wood & MDF Cutting":
    "https://plus.unsplash.com/premium_photo-1682146121756-10d8209fe077?w=600&auto=format&fit=crop&q=85",
  "Metal & Steel Laser Cutting":
    "https://images.unsplash.com/photo-1764114235891-66ff86abaf87?w=600&auto=format&fit=crop&q=85",
  "Custom Fabrication":
    "https://images.unsplash.com/photo-1772351721250-58367a2aecba?w=600&auto=format&fit=crop&q=85",
};

for (const p of cncLaser) {
  const url = cncLaserImageOverrides[p.name];
  if (url) p.image = withSrc(p.image, url);
}

const digitalDesign = build("digital-design", [
  ["Logo Design", "Distinctive, scalable brand logos.", "design", "logo design workspace"],
  ["UI/UX Design", "Interface and experience design.", "design", "ui ux interface design workspace"],
  ["Social Media Graphics", "On-brand social content graphics.", "design", "social media graphic design"],
  ["Brand Identity", "Complete visual identity systems.", "design", "brand identity design system"],
]);

// Digital Design tab — dedicated direct Unsplash images (remote, not stored
// locally).
const digitalDesignImageOverrides: Partial<Record<string, string>> = {
  "Logo Design":
    "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=600&auto=format&fit=crop&q=85",
  "UI/UX Design":
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&auto=format&fit=crop&q=85",
  "Social Media Graphics":
    "https://images.unsplash.com/photo-1759215524484-89c8d7ae28f2?w=600&auto=format&fit=crop&q=85",
  "Brand Identity":
    "https://images.unsplash.com/photo-1633533451638-32f1e337d254?w=600&auto=format&fit=crop&q=85",
};

for (const p of digitalDesign) {
  const url = digitalDesignImageOverrides[p.name];
  if (url) p.image = withSrc(p.image, url);
}

const itServices = build("it-services", [
  ["Website Development", "Responsive, fast corporate websites.", "it", "developer workstation web code"],
  ["Mobile App Development", "iOS and Android app builds.", "it", "mobile app development screen"],
  ["E-commerce Solutions", "Online stores and payment flows.", "it", "ecommerce website interface"],
  ["Domain Registration", "Domain search and registration.", "it", "domain registration server"],
  ["Web Hosting", "Managed, reliable web hosting.", "it", "web hosting server rack"],
  ["VPS Servers", "Scalable virtual private servers.", "it", "vps server infrastructure"],
  ["Dedicated Servers", "High-performance dedicated servers.", "it", "dedicated server data center"],
  ["SEO", "Search visibility and optimisation.", "design", "seo analytics dashboard"],
  ["Social Media Marketing", "Managed social campaigns.", "design", "social media marketing analytics"],
  ["SMS Marketing", "Bulk SMS campaign delivery.", "it", "sms marketing mobile messaging"],
  ["IT Support", "Ongoing technical support and maintenance.", "it", "it support technician"],
]);

// IT Services tab — dedicated direct Unsplash images (remote, not stored
// locally).
const itServicesImageOverrides: Partial<Record<string, string>> = {
  "Website Development":
    "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=85",
  "Mobile App Development":
    "https://images.unsplash.com/photo-1633250391894-397930e3f5f2?w=600&auto=format&fit=crop&q=85",
  "E-commerce Solutions":
    "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?w=600&auto=format&fit=crop&q=85",
  "Domain Registration":
    "https://images.unsplash.com/photo-1687524690542-2659f268cde8?w=600&auto=format&fit=crop&q=85",
  "Web Hosting":
    "https://images.unsplash.com/photo-1554098415-788601c80aef?w=600&auto=format&fit=crop&q=85",
  "VPS Servers":
    "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=600&auto=format&fit=crop&q=85",
  "Dedicated Servers":
    "https://images.unsplash.com/photo-1783419231367-89bd75443ad7?w=600&auto=format&fit=crop&q=85",
  SEO:
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&auto=format&fit=crop&q=85",
  "Social Media Marketing":
    "https://images.unsplash.com/photo-1676276375742-9e3d10e39d45?w=600&auto=format&fit=crop&q=85",
  "SMS Marketing":
    "https://images.unsplash.com/photo-1556204976-d25efd967cba?w=600&auto=format&fit=crop&q=85",
  "IT Support":
    "https://images.unsplash.com/photo-1640163561346-7778a2edf353?w=600&auto=format&fit=crop&q=85",
};

for (const p of itServices) {
  const url = itServicesImageOverrides[p.name];
  if (url) p.image = withSrc(p.image, url);
}

export const products: Product[] = [
  ...printing,
  ...signage,
  ...largeFormat,
  ...promotional,
  ...collateral,
  ...retailEvents,
  ...cncLaser,
  ...digitalDesign,
  ...itServices,
];

export const productCategories: ProductCategory[] = (
  [
    ["printing", "Printing Services", "Printing"],
    ["signage", "Signage", "Signage"],
    ["large-format", "Large Format Printing", "Large Format"],
    ["promotional", "Promotional Items", "Promotional"],
    ["collateral", "Brand Collateral", "Collateral"],
    ["retail-events", "Retail & Storefront / Event & Exhibition", "Retail & Events"],
    ["cnc-laser", "CNC & Laser Cutting", "CNC & Laser"],
    ["digital-design", "Digital Design", "Design"],
    ["it-services", "IT Services", "IT"],
  ] as const
).map(([id, label, short]) => ({
  id,
  label,
  short,
  count: products.filter((p) => p.category === id).length,
}));
