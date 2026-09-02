import type { Metadata } from "next";
import { DdBanner } from "@/components/services/digitaldesign/DdBanner";
import { DdIntro } from "@/components/services/digitaldesign/DdIntro";
import { DdProcess } from "@/components/services/digitaldesign/DdProcess";
import { DdCatalogue } from "@/components/services/digitaldesign/DdCatalogue";
import { DdSystem } from "@/components/services/digitaldesign/DdSystem";
import { DdStory } from "@/components/services/digitaldesign/DdStory";
import { DdUiux } from "@/components/services/digitaldesign/DdUiux";
import { DdCampaign } from "@/components/services/digitaldesign/DdCampaign";
import { DdWhyUs } from "@/components/services/digitaldesign/DdWhyUs";
import { DdQuoteCta } from "@/components/services/digitaldesign/DdQuoteCta";

const DD_TITLE =
  "Digital Design UAE | Logo, UI/UX & Brand Identity | Express Advertising";
const DD_DESCRIPTION =
  "Digital design services in the UAE including logo design, UI/UX design, social media graphics and brand identity systems for consistent digital and physical brand experiences.";
const DD_URL = "https://new.expressadvertising.ae/service-digital-design";

export const metadata: Metadata = {
  title: { absolute: DD_TITLE },
  description: DD_DESCRIPTION,
  alternates: { canonical: DD_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: DD_URL,
    siteName: "Express Advertising",
    title: DD_TITLE,
    description: DD_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — Digital Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DD_TITLE,
    description: DD_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function DigitalDesignPage() {
  return (
    <>
      <DdBanner />
      <DdIntro />
      <DdProcess />
      <DdCatalogue />
      <DdSystem />
      <DdStory />
      <DdUiux />
      <DdCampaign />
      <DdWhyUs />
      <DdQuoteCta />
    </>
  );
}
