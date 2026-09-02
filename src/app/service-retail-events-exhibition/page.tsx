import type { Metadata } from "next";
import { ReBanner } from "@/components/services/retailevents/ReBanner";
import { ReIntro } from "@/components/services/retailevents/ReIntro";
import { ReProcess } from "@/components/services/retailevents/ReProcess";
import { ReCatalogue } from "@/components/services/retailevents/ReCatalogue";
import { ReRetail } from "@/components/services/retailevents/ReRetail";
import { ReEvents } from "@/components/services/retailevents/ReEvents";
import { ReConsistency } from "@/components/services/retailevents/ReConsistency";
import { ReUseCases } from "@/components/services/retailevents/ReUseCases";
import { ReWhyUs } from "@/components/services/retailevents/ReWhyUs";
import { ReQuoteCta } from "@/components/services/retailevents/ReQuoteCta";

const RE_TITLE =
  "Retail, Event & Exhibition Branding UAE | Express Advertising";
const RE_DESCRIPTION =
  "Retail, storefront, event and exhibition branding in the UAE including roll-ups, pop-up displays, promotional tables, branded backdrops and visual display solutions.";
const RE_URL =
  "https://new.expressadvertising.ae/service-retail-events-exhibition";

export const metadata: Metadata = {
  title: { absolute: RE_TITLE },
  description: RE_DESCRIPTION,
  alternates: { canonical: RE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: RE_URL,
    siteName: "Express Advertising",
    title: RE_TITLE,
    description: RE_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — Retail, Event & Exhibition Branding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: RE_TITLE,
    description: RE_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function RetailEventsExhibitionPage() {
  return (
    <>
      <ReBanner />
      <ReIntro />
      <ReProcess />
      <ReCatalogue />
      <ReRetail />
      <ReEvents />
      <ReConsistency />
      <ReUseCases />
      <ReWhyUs />
      <ReQuoteCta />
    </>
  );
}
