import type { Metadata } from "next";
import { ItBanner } from "@/components/services/itservices/ItBanner";
import { ItIntro } from "@/components/services/itservices/ItIntro";
import { ItProcess } from "@/components/services/itservices/ItProcess";
import { ItCatalogue } from "@/components/services/itservices/ItCatalogue";
import { ItInfrastructure } from "@/components/services/itservices/ItInfrastructure";
import { ItStory } from "@/components/services/itservices/ItStory";
import { ItBrandConnection } from "@/components/services/itservices/ItBrandConnection";
import { ItUseCases } from "@/components/services/itservices/ItUseCases";
import { ItWhyUs } from "@/components/services/itservices/ItWhyUs";
import { ItQuoteCta } from "@/components/services/itservices/ItQuoteCta";

const IT_TITLE =
  "IT Services UAE | Business Technology & Digital Support | Express Advertising";
const IT_DESCRIPTION =
  "IT services for businesses in the UAE including website and app development, e-commerce, domains, web hosting, VPS and dedicated servers, SEO, social campaigns and ongoing IT support.";
const IT_URL = "https://new.expressadvertising.ae/service-it-services";

export const metadata: Metadata = {
  title: { absolute: IT_TITLE },
  description: IT_DESCRIPTION,
  alternates: { canonical: IT_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: IT_URL,
    siteName: "Express Advertising",
    title: IT_TITLE,
    description: IT_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — IT Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: IT_TITLE,
    description: IT_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function ItServicesPage() {
  return (
    <>
      <ItBanner />
      <ItIntro />
      <ItProcess />
      <ItCatalogue />
      <ItInfrastructure />
      <ItStory />
      <ItBrandConnection />
      <ItUseCases />
      <ItWhyUs />
      <ItQuoteCta />
    </>
  );
}
