export type Client = {
  /** Brand name — used for the alt text and the accessible label. */
  name: string;
  /** Path to the logo asset under /public/images/clients/. */
  logo: string;
  /** Region — only UAE clients are shown on this homepage. */
  region: "UAE";
};

/**
 * Verified UAE clients — the same roster shown under safiz.pk → Our Clients →
 * UAE Clients (shared ownership with Express Advertising). Logo assets were
 * copied from the original safiz.pk /clients/uae/ WebP files into
 * /public/images/clients/. Filenames preserve the source spellings.
 * Add ONLY UAE clients here — never Pakistan clients.
 */
export const clients: Client[] = [
  { name: "Ajman Police", logo: "/images/clients/ajman-police.webp", region: "UAE" },
  { name: "Al Haaj Bando Khan", logo: "/images/clients/al-haaj-bando-khan.webp", region: "UAE" },
  { name: "Al Takamul", logo: "/images/clients/al-takamul.webp", region: "UAE" },
  { name: "Amer", logo: "/images/clients/amer.webp", region: "UAE" },
  { name: "Ana Medical Equipment", logo: "/images/clients/ana-medical-equipment.webp", region: "UAE" },
  { name: "BNI", logo: "/images/clients/bni.webp", region: "UAE" },
  { name: "Cosmedent Clinic", logo: "/images/clients/cosmedent-cilinic.webp", region: "UAE" },
  { name: "First Motors", logo: "/images/clients/first-motors.webp", region: "UAE" },
  { name: "GEMS Westminster School", logo: "/images/clients/gems-westminister-school.webp", region: "UAE" },
  { name: "Gulf & World", logo: "/images/clients/gulf-and-world.webp", region: "UAE" },
  { name: "HBC", logo: "/images/clients/hbc.webp", region: "UAE" },
  { name: "La Mariques", logo: "/images/clients/la-mariques.webp", region: "UAE" },
  { name: "Makkah Pharmacy", logo: "/images/clients/makkah-pharmacy.webp", region: "UAE" },
  { name: "Mashriq Elite", logo: "/images/clients/mashriq-elite.webp", region: "UAE" },
  { name: "Medtra", logo: "/images/clients/medtra.webp", region: "UAE" },
  { name: "Student Biryani", logo: "/images/clients/student-biryani.webp", region: "UAE" },
  { name: "Subway", logo: "/images/clients/subway.webp", region: "UAE" },
  { name: "TP-Link", logo: "/images/clients/tp-link.webp", region: "UAE" },
  { name: "Tad-beer", logo: "/images/clients/tad-beer.webp", region: "UAE" },
  { name: "Tas-heel", logo: "/images/clients/tas-heel.webp", region: "UAE" },
  { name: "Taw-jeeh", logo: "/images/clients/taw-jeeh.webp", region: "UAE" },
  { name: "UAE Hockey Federation", logo: "/images/clients/uae-hockey-federation.webp", region: "UAE" },
  { name: "W3 Canada", logo: "/images/clients/w3-canada.webp", region: "UAE" },
  { name: "YOKO Spa Beauty", logo: "/images/clients/yoko-spa-beuty.webp", region: "UAE" },
  { name: "Dubai Police", logo: "/images/clients/dubai-police.webp", region: "UAE" },
  { name: "Easytruck", logo: "/images/clients/easytruck.webp", region: "UAE" },
  { name: "University of Sharjah", logo: "/images/clients/univesity-of-sharjah.webp", region: "UAE" },
];
