import type { Metadata } from "next";
import { BcBanner } from "@/components/services/collateral/BcBanner";
import { BcIntro } from "@/components/services/collateral/BcIntro";
import { BcCatalogue } from "@/components/services/collateral/BcCatalogue";
import { BcFinishes } from "@/components/services/collateral/BcFinishes";
import { BcConsistency } from "@/components/services/collateral/BcConsistency";
import { BcUseCases } from "@/components/services/collateral/BcUseCases";
import { BcWhyUs } from "@/components/services/collateral/BcWhyUs";
import { BcProcess } from "@/components/services/collateral/BcProcess";
import { BcQuoteCta } from "@/components/services/collateral/BcQuoteCta";

const BC_TITLE =
  "Brand Collateral UAE | Corporate Stationery & Presentation Materials | Express Advertising";
const BC_DESCRIPTION =
  "Brand collateral services in the UAE including letterheads, customized stationery, folders, envelopes, tags and coordinated corporate print for consistent brand presentation.";
const BC_URL = "https://new.expressadvertising.ae/service-brand-collateral";

export const metadata: Metadata = {
  title: { absolute: BC_TITLE },
  description: BC_DESCRIPTION,
  alternates: { canonical: BC_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: BC_URL,
    siteName: "Express Advertising",
    title: BC_TITLE,
    description: BC_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — Brand Collateral",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BC_TITLE,
    description: BC_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function BrandCollateralPage() {
  return (
    <>
      <BcBanner />
      <BcIntro />
      <BcProcess />
      <BcCatalogue />
      <BcFinishes />
      <BcConsistency />
      <BcUseCases />
      <BcWhyUs />
      <BcQuoteCta />
    </>
  );
}
