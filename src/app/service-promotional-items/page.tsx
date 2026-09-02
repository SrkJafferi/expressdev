import type { Metadata } from "next";
import { PrBanner } from "@/components/services/promotional/PrBanner";
import { PrIntro } from "@/components/services/promotional/PrIntro";
import { PrProcess } from "@/components/services/promotional/PrProcess";
import { PrCatalogue } from "@/components/services/promotional/PrCatalogue";
import { PrMethods } from "@/components/services/promotional/PrMethods";
import { PrStory } from "@/components/services/promotional/PrStory";
import { PrUseCases } from "@/components/services/promotional/PrUseCases";
import { PrGifting } from "@/components/services/promotional/PrGifting";
import { PrWhyUs } from "@/components/services/promotional/PrWhyUs";
import { PrQuoteCta } from "@/components/services/promotional/PrQuoteCta";

const PI_TITLE =
  "Promotional Items UAE | Corporate Gifts & Branded Merchandise | Express Advertising";
const PI_DESCRIPTION =
  "Custom promotional items and corporate gifts in the UAE including mugs, bags, caps, pens, apparel, awards, diaries and branded merchandise for events and business campaigns.";
const PI_URL = "https://new.expressadvertising.ae/service-promotional-items";

export const metadata: Metadata = {
  title: { absolute: PI_TITLE },
  description: PI_DESCRIPTION,
  alternates: { canonical: PI_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: PI_URL,
    siteName: "Express Advertising",
    title: PI_TITLE,
    description: PI_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — Promotional Items & Corporate Gifts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PI_TITLE,
    description: PI_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function PromotionalItemsPage() {
  return (
    <>
      <PrBanner />
      <PrIntro />
      <PrProcess />
      <PrCatalogue />
      <PrMethods />
      <PrStory />
      <PrUseCases />
      <PrGifting />
      <PrWhyUs />
      <PrQuoteCta />
    </>
  );
}
