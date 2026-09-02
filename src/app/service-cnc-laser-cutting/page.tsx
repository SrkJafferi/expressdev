import type { Metadata } from "next";
import { CnBanner } from "@/components/services/cnclaser/CnBanner";
import { CnIntro } from "@/components/services/cnclaser/CnIntro";
import { CnProcess } from "@/components/services/cnclaser/CnProcess";
import { CnCatalogue } from "@/components/services/cnclaser/CnCatalogue";
import { CnMaterials } from "@/components/services/cnclaser/CnMaterials";
import { CnStory } from "@/components/services/cnclaser/CnStory";
import { CnApplications } from "@/components/services/cnclaser/CnApplications";
import { CnCompare } from "@/components/services/cnclaser/CnCompare";
import { CnWhyUs } from "@/components/services/cnclaser/CnWhyUs";
import { CnQuoteCta } from "@/components/services/cnclaser/CnQuoteCta";

const CN_TITLE =
  "CNC & Laser Cutting UAE | Custom Fabrication | Express Advertising";
const CN_DESCRIPTION =
  "CNC routing and laser cutting services in the UAE for custom signs, acrylic components, engraved panels, dimensional pieces and precision fabrication projects.";
const CN_URL = "https://new.expressadvertising.ae/service-cnc-laser-cutting";

export const metadata: Metadata = {
  title: { absolute: CN_TITLE },
  description: CN_DESCRIPTION,
  alternates: { canonical: CN_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: CN_URL,
    siteName: "Express Advertising",
    title: CN_TITLE,
    description: CN_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — CNC & Laser Cutting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CN_TITLE,
    description: CN_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function CncLaserCuttingPage() {
  return (
    <>
      <CnBanner />
      <CnIntro />
      <CnProcess />
      <CnCatalogue />
      <CnMaterials />
      <CnStory />
      <CnApplications />
      <CnCompare />
      <CnWhyUs />
      <CnQuoteCta />
    </>
  );
}
