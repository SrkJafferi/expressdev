import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppDock } from "@/components/layout/WhatsAppDock";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { InitialPageLoader } from "@/components/providers/InitialPageLoader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { contact, site } from "@/data/site";

/**
 * Typography system mirrors safiz.pk: Plus Jakarta Sans used for both
 * display and body, weights 300–800, tight tracking on display sizes and
 * wide tracking on uppercase labels.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Express Advertising — Printing, Signage & Brand Production in the UAE",
    template: "%s · Express Advertising",
  },
  description:
    "Express Advertising is a UAE printing, signage and brand production house. Design, print, fabricate and install — business print, large format, signage, promotional items, CNC and laser cutting.",
  icons: {
    icon: "/logosmall.png",
    apple: "/logosmall.png",
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: site.name,
    title: "Express Advertising — Printing, Signage & Brand Production in the UAE",
    description:
      "Design, print, fabricate, install. Complete brand production for UAE businesses.",
    url: site.url,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#1b4d85",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    telephone: contact.phoneE164,
    email: contact.emailPrimary,
    hasMap: site.mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${contact.address.line1}, ${contact.address.line2}`,
      addressLocality: contact.address.city,
      addressCountry: "AE",
    },
  };

  return (
    <html lang="en" className={jakarta.variable} style={{ background: "#10305a" }}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <SmoothScroll />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppDock />
        <CustomCursor />
        <InitialPageLoader />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
