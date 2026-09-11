import type { Metadata } from "next";
import { Suspense } from "react";
import { CareersBanner } from "@/components/careers/CareersBanner";
import { CareersIntro } from "@/components/careers/CareersIntro";
import { CareersAreas } from "@/components/careers/CareersAreas";
import { CareersForm } from "@/components/careers/CareersForm";
import { CareersValues } from "@/components/careers/CareersValues";
import { CareersLocations } from "@/components/careers/CareersLocations";
import { CareersCta } from "@/components/careers/CareersCta";

const CAREERS_TITLE = "Careers at Express Advertising UAE | Submit Your Resume";
const CAREERS_DESCRIPTION =
  "Explore career opportunities with Express Advertising and submit your resume for roles across design, printing, signage, production, sales, digital and operations.";
const CAREERS_URL = "https://new.expressadvertising.ae/careers";

export const metadata: Metadata = {
  title: { absolute: CAREERS_TITLE },
  description: CAREERS_DESCRIPTION,
  alternates: { canonical: CAREERS_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: CAREERS_URL,
    siteName: "Express Advertising",
    title: CAREERS_TITLE,
    description: CAREERS_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Careers at Express Advertising UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CAREERS_TITLE,
    description: CAREERS_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

/**
 * CareersPage structured data — a general-application page, not a job
 * listing board, so no JobPosting entities are emitted.
 */
const careersSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Careers at Express Advertising",
  url: CAREERS_URL,
  description: CAREERS_DESCRIPTION,
  isPartOf: {
    "@type": "Organization",
    name: "Express Advertising",
    url: "https://new.expressadvertising.ae",
  },
};

export default function CareersPage() {
  return (
    <>
      <CareersBanner />
      <CareersIntro />
      <CareersAreas />
      <Suspense fallback={null}>
        <CareersForm />
      </Suspense>
      <CareersValues />
      <CareersLocations />
      <CareersCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careersSchema) }}
      />
    </>
  );
}
