import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ServiceMarquee } from "@/components/home/ServiceMarquee";
import { CapabilityStrip } from "@/components/home/CapabilityStrip";
import { FeatureTriad } from "@/components/home/FeatureTriad";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { ProcessScroll } from "@/components/home/ProcessScroll";
import { ProductCatalogue } from "@/components/home/ProductCatalogue";
import { WhyUs } from "@/components/home/WhyUs";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { ShopBridge } from "@/components/home/ShopBridge";
import { QuoteSection } from "@/components/home/QuoteSection";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import { LocationContact } from "@/components/home/LocationContact";

const HOME_TITLE =
  "Express Advertising UAE | Printing, Signage & Brand Production";
const HOME_DESCRIPTION =
  "Premium printing, signage, large format, promotional products, brand collateral, CNC & laser cutting, digital design and IT services across the UAE.";

/**
 * Homepage-only social sharing + SEO metadata. Resolved against the global
 * metadataBase (https://expressadvertising.ae) so relative OG image paths
 * render as absolute URLs for WhatsApp/Facebook/LinkedIn/X crawlers.
 */
export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://new.expressadvertising.ae/",
    siteName: "Express Advertising",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — Printing, Signage and Brand Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ServiceMarquee />
      <CapabilityStrip />
      <FeatureTriad />
      <ServicesShowcase />
      <ProcessScroll />
      <ProductCatalogue />
      <WhyUs />
      <ClientMarquee />
      <ShopBridge />
      <QuoteSection />
      <GoogleReviews />
      <LocationContact />
    </>
  );
}
