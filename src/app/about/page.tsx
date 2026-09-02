import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { MissionVision } from "@/components/about/MissionVision";
import { WhatWeDo } from "@/components/about/WhatWeDo";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { AboutCta } from "@/components/about/AboutCta";

const ABOUT_TITLE =
  "About Us | Express Advertising UAE — Printing, Signage & Brand Production";
const ABOUT_DESCRIPTION =
  "Learn about Express Advertising — a UAE-based printing, signage and brand production house delivering design, print, fabrication and installation under one accountable team across the Emirates.";

export const metadata: Metadata = {
  title: { absolute: ABOUT_TITLE },
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "/about" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://new.expressadvertising.ae/about",
    siteName: "Express Advertising",
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Express Advertising UAE — About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <MissionVision />
      <WhatWeDo />
      <WhyChooseUs />
      <AboutCta />
    </>
  );
}
