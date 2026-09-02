import type { Metadata } from "next";
import { ServiceBanner } from "@/components/services/printing/ServiceBanner";
import { ServiceIntro } from "@/components/services/printing/ServiceIntro";
import { PrintExplorer } from "@/components/services/printing/PrintExplorer";
import { PrintFinishes } from "@/components/services/printing/PrintFinishes";
import { PrintShowcase } from "@/components/services/printing/PrintShowcase";
import { PrintProcess } from "@/components/services/printing/PrintProcess";
import { PrintQuoteCta } from "@/components/services/printing/PrintQuoteCta";

const PRINTING_TITLE = "Printing Services UAE | Express Advertising";
const PRINTING_DESCRIPTION =
  "Premium business cards, brochures, flyers, stationery, invoice books, stickers, folders and custom commercial printing services across the UAE.";
const PRINTING_URL =
  "https://new.expressadvertising.ae/service-printing-services";

export const metadata: Metadata = {
  title: { absolute: PRINTING_TITLE },
  description: PRINTING_DESCRIPTION,
  alternates: { canonical: PRINTING_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: PRINTING_URL,
    siteName: "Express Advertising",
    title: PRINTING_TITLE,
    description: PRINTING_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — Printing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PRINTING_TITLE,
    description: PRINTING_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function PrintingServicesPage() {
  return (
    <>
      <ServiceBanner />
      <ServiceIntro />
      <PrintExplorer />
      <PrintFinishes />
      <PrintShowcase />
      <PrintProcess />
      <PrintQuoteCta />
    </>
  );
}
