import type { Metadata } from "next";
import { ClBanner } from "@/components/clients/ClBanner";
import { ClIntro } from "@/components/clients/ClIntro";
import { ClLogoWall } from "@/components/clients/ClLogoWall";
import { ClStory } from "@/components/clients/ClStory";
import { ClIndustries } from "@/components/clients/ClIndustries";
import { ClMarquee } from "@/components/clients/ClMarquee";

const CL_TITLE = "Our Clients UAE | Express Advertising";
const CL_DESCRIPTION =
  "Explore the brands and organisations that trust Express Advertising for printing, signage, promotional products, retail graphics and brand production across the UAE.";
const CL_URL = "https://new.expressadvertising.ae/clients";

export const metadata: Metadata = {
  title: { absolute: CL_TITLE },
  description: CL_DESCRIPTION,
  alternates: { canonical: CL_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: CL_URL,
    siteName: "Express Advertising",
    title: CL_TITLE,
    description: CL_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — Our Clients",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CL_TITLE,
    description: CL_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function ClientsPage() {
  return (
    <>
      <ClBanner />
      <ClIntro />
      <ClLogoWall />
      <ClStory />
      <ClIndustries />
      <ClMarquee />
    </>
  );
}
