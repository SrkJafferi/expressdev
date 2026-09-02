import type { Metadata } from "next";
import { SgBanner } from "@/components/services/signage/SgBanner";
import { SgIntro } from "@/components/services/signage/SgIntro";
import { SgProcess } from "@/components/services/signage/SgProcess";
import { SgCatalogue } from "@/components/services/signage/SgCatalogue";
import { SgMaterials } from "@/components/services/signage/SgMaterials";
import { SgConsistency } from "@/components/services/signage/SgConsistency";
import { SgApplications } from "@/components/services/signage/SgApplications";
import { SgWhyUs } from "@/components/services/signage/SgWhyUs";
import { SgQuoteCta } from "@/components/services/signage/SgQuoteCta";

const SG_TITLE =
  "Signage Services UAE | 3D Signs, Acrylic & Indoor Signage | Express Advertising";
const SG_DESCRIPTION =
  "Custom signage services in the UAE including 3D signs, 2D signs, acrylic boards, indoor signage and complete fabricated sign solutions for retail, offices and commercial spaces.";
const SG_URL = "https://new.expressadvertising.ae/service-signage";

export const metadata: Metadata = {
  title: { absolute: SG_TITLE },
  description: SG_DESCRIPTION,
  alternates: { canonical: SG_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SG_URL,
    siteName: "Express Advertising",
    title: SG_TITLE,
    description: SG_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — Signage Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SG_TITLE,
    description: SG_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function SignagePage() {
  return (
    <>
      <SgBanner />
      <SgIntro />
      <SgProcess />
      <SgCatalogue />
      <SgMaterials />
      <SgConsistency />
      <SgApplications />
      <SgWhyUs />
      <SgQuoteCta />
    </>
  );
}
