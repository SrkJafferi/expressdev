import type { Metadata } from "next";
import { CtBanner } from "@/components/contact/CtBanner";
import { CtContact } from "@/components/contact/CtContact";
import { CtUaeOffice } from "@/components/contact/CtUaeOffice";
import { CtNetwork } from "@/components/contact/CtNetwork";
import { CtTypes } from "@/components/contact/CtTypes";
import { CtQuoteCta } from "@/components/contact/CtQuoteCta";

const CT_TITLE = "Contact Express Advertising UAE | Ajman Office";
const CT_DESCRIPTION =
  "Contact Express Advertising for printing, signage, promotional products, retail graphics, digital design and production services. Visit our Ajman office or connect with our team online.";
const CT_URL = "https://new.expressadvertising.ae/contact";

export const metadata: Metadata = {
  title: { absolute: CT_TITLE },
  description: CT_DESCRIPTION,
  alternates: { canonical: CT_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: CT_URL,
    siteName: "Express Advertising",
    title: CT_TITLE,
    description: CT_DESCRIPTION,
    images: [
      {
        url: "/images/og/express-advertising-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Contact Express Advertising UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CT_TITLE,
    description: CT_DESCRIPTION,
    images: ["/images/og/express-advertising-og.jpg"],
  },
};

/**
 * ContactPage structured data — verified addresses only. No invented
 * phones, emails, hours or coordinates for the Pakistan offices.
 */
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Express Advertising",
  url: CT_URL,
  mainEntity: {
    "@type": "Organization",
    name: "Express Advertising",
    url: "https://new.expressadvertising.ae",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+971557147749",
        contactType: "sales",
        email: "info@expressadvertising.ae",
        areaServed: "AE",
        availableLanguage: ["English", "Arabic"],
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Shop # 7, A.R.A Building, Sheikh Rashid Bin Humeed St, 6355",
        addressLocality: "Ajman",
        addressCountry: "AE",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <CtBanner />
      <CtContact />
      <CtUaeOffice />
      <CtNetwork />
      <CtTypes />
      <CtQuoteCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
    </>
  );
}
