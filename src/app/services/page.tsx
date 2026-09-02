import type { Metadata } from "next";
import { ServicesIndexHero } from "@/components/services/ServicesIndexHero";
import { ServicesIndexGrid } from "@/components/services/ServicesIndexGrid";
import { ServicesIndexCta } from "@/components/services/ServicesIndexCta";

const SERVICES_TITLE = "Services | Express Advertising UAE — Print, Signage & Fabrication";
const SERVICES_DESCRIPTION =
  "Printing, signage, large format, promotional items, brand collateral, retail and exhibition builds, CNC and laser cutting, digital design and IT services — all produced in-house in Ajman, UAE.";
const SERVICES_URL = "https://new.expressadvertising.ae/services";

export const metadata: Metadata = {
  title: { absolute: SERVICES_TITLE },
  description: SERVICES_DESCRIPTION,
  alternates: { canonical: SERVICES_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SERVICES_URL,
    siteName: "Express Advertising",
    title: SERVICES_TITLE,
    description: SERVICES_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SERVICES_TITLE,
    description: SERVICES_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesIndexHero />
      <ServicesIndexGrid />
      <ServicesIndexCta />
    </>
  );
}
