import type { Metadata } from "next";
import { LfBanner } from "@/components/services/largeformat/LfBanner";
import { LfIntro } from "@/components/services/largeformat/LfIntro";
import { LfProcess } from "@/components/services/largeformat/LfProcess";
import { LfSolutions } from "@/components/services/largeformat/LfSolutions";
import { LfMaterials } from "@/components/services/largeformat/LfMaterials";
import { LfConsistency } from "@/components/services/largeformat/LfConsistency";
import { LfWhyUs } from "@/components/services/largeformat/LfWhyUs";
import { LfUseCases } from "@/components/services/largeformat/LfUseCases";
import { LfQuoteCta } from "@/components/services/largeformat/LfQuoteCta";

const LF_TITLE =
  "Large Format Printing UAE | Banners, Vinyl & Displays | Express Advertising";
const LF_DESCRIPTION =
  "Large format printing in the UAE for banners, posters, vinyl graphics, roll-up displays, window graphics, one-way vision, vehicle graphics and commercial visual applications.";
const LF_URL = "https://new.expressadvertising.ae/service-large-format-printing";

export const metadata: Metadata = {
  title: { absolute: LF_TITLE },
  description: LF_DESCRIPTION,
  alternates: { canonical: LF_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: LF_URL,
    siteName: "Express Advertising",
    title: LF_TITLE,
    description: LF_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — Large Format Printing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: LF_TITLE,
    description: LF_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function LargeFormatPrintingPage() {
  return (
    <>
      <LfBanner />
      <LfIntro />
      <LfProcess />
      <LfSolutions />
      <LfMaterials />
      <LfConsistency />
      <LfWhyUs />
      <LfUseCases />
      <LfQuoteCta />
    </>
  );
}
