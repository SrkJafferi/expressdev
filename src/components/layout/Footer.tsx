import Image from "next/image";
import Link from "next/link";
import { nav, site, socials } from "@/data/site";
import { services, serviceHref } from "@/data/services";
import { ArrowUpRight } from "@/components/ui/Icons";
import { CmykTicks } from "@/components/ui/PrintMarks";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import {
  AboutIcon,
  ContactIcon,
  CrosshairIcon,
  FacebookIcon,
  GiftIcon,
  GridIcon,
  HomeIcon,
  ImageIcon,
  InstagramIcon,
  LayersIcon,
  LinkedInIcon,
  MonitorIcon,
  PenToolIcon,
  PinterestIcon,
  PrinterIcon,
  ScanLineIcon,
  SignpostIcon,
  StoreIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/ui/FooterIcons";

type IconType = (props: { className?: string }) => React.ReactElement;

/**
 * Social label → line icon.
 *
 * The row below renders whatever is in `socials` (src/data/site.ts) instead of
 * hardcoding links: six `href="#"` placeholders shipped here before and every
 * one of them was a dead end that looked broken to anyone who tapped it.
 * No verified profile → no link → nothing rendered. Add a real URL to
 * `socials` and it appears here automatically.
 */
const socialIcons: Record<string, IconType> = {
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
  Pinterest: PinterestIcon,
  TikTok: TikTokIcon,
};

/** Nav href → line icon. */
const navIcons: Record<string, IconType> = {
  "/": HomeIcon,
  "/about": AboutIcon,
  "/services": GridIcon,
  "/clients": ImageIcon,
  "/contact": ContactIcon,
};

/** Service slug → line icon (one consistent stroke language). */
const serviceIcons: Record<string, IconType> = {
  "printing-services": PrinterIcon,
  signage: SignpostIcon,
  "large-format-printing": ScanLineIcon,
  "promotional-items": GiftIcon,
  "brand-collateral": LayersIcon,
  "retail-events-exhibition": StoreIcon,
  "cnc-laser-cutting": CrosshairIcon,
  "digital-design": PenToolIcon,
  "it-services": MonitorIcon,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#f0f4f8] via-[#e8f0fb] to-[#f5eef8] bg-[url(/footerback.avif)] bg-cover bg-center bg-no-repeat">
      {/* Soft decorative gradient blobs for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.12)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.08)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(27,77,133,0.07)_0%,transparent_70%)]"
      />

      {/* Registration line — the single visual entrance into the footer. */}
      <div
        aria-hidden
        className="h-1 w-full bg-[linear-gradient(to_right,var(--color-cyan)_0%,var(--color-cyan)_33%,var(--color-magenta)_33%,var(--color-magenta)_66%,var(--color-yellow)_66%,var(--color-yellow)_100%)]"
      />

      <div className="shell relative z-10 py-16 lg:py-20">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          {/* COLUMN 1 — BRAND */}
          <div className="order-1 md:order-none lg:col-span-4 lg:pr-6">
            <Link
              href="/"
              aria-label={`${site.name} — home`}
              className="inline-flex items-center transition-opacity hover:opacity-90"
            >
              <Image
                src="/logo.webp"
                alt={site.name}
                width={220}
                height={80}
                className="h-auto w-[200px] sm:w-[220px] object-contain"
                priority
              />
            </Link>
            <div className="body-sm mt-6 max-w-sm space-y-1.5 !text-ink-2">
              <p className="font-medium text-navy-900">
                Crafting bold brand experiences through print, signage and
                production across the UAE.
              </p>
              <p>
                From concept to installation, we bring ideas to life with
                precision, quality and impact.
              </p>
            </div>
            <CmykTicks className="mt-7 h-1 w-20" />

            {socials.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {socials.map((s) => {
                  const Icon = socialIcons[s.label];
                  if (!Icon) return null;
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="grid size-9 place-items-center rounded-full border border-navy-300/60 bg-white/60 text-navy/80 shadow-xs backdrop-blur-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan hover:bg-cyan hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
                      >
                        <Icon className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* COLUMN 2 — NAVIGATE */}
          <nav aria-label="Footer navigation" className="order-3 md:order-none lg:col-span-2">
            <p className="label mb-5 text-navy/50">Navigate</p>
            <ul className="space-y-1">
              {nav.map((item) => {
                const Icon = navIcons[item.href];
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2.5 py-1.5 text-sm text-ink-2 transition-colors hover:text-navy-900"
                    >
                      {Icon && (
                        <Icon className="size-[16px] shrink-0 text-navy-900 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cyan" />
                      )}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* COLUMN 3 — SERVICES */}
          <nav aria-label="Footer services" className="order-4 md:order-none lg:col-span-3">
            <p className="label mb-5 text-navy/50">Services</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-1">
              {services.map((s) => {
                const Icon = serviceIcons[s.slug];
                return (
                  <li key={s.slug}>
                    <Link
                      href={serviceHref(s.slug)}
                      className="group flex items-center gap-2.5 py-1.5 text-sm text-ink-2 transition-colors hover:text-navy-900"
                    >
                      {Icon && (
                        <Icon className="size-[16px] shrink-0 text-navy-900 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cyan" />
                      )}
                      <span>{s.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* COLUMN 4 — NEWSLETTER */}
          <div className="order-2 md:order-none lg:col-span-3">
            <p className="label mb-5 text-navy/50">Stay in the loop</p>
            <h3 className="text-lg font-semibold leading-snug text-navy-900">
              New work. New materials.
              <br />
              Straight to your inbox.
            </h3>
            <p className="body-sm mt-3 !text-ink-2">
              Occasional updates on new printing capabilities, materials, offers
              and production ideas.
            </p>
            <NewsletterForm variant="light" />

            {/* QR Code Section */}
            <div className="mt-6 flex items-center gap-3.5 rounded-xl border border-navy-100 bg-white/70 p-3 shadow-xs backdrop-blur-xs">
              <div className="shrink-0 overflow-hidden rounded-lg border border-navy-100 bg-white p-1">
                <Image
                  src="/qrcode.png"
                  alt="Scan QR Code"
                  width={80}
                  height={80}
                  className="size-16 object-contain"
                />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-navy-900">
                  Scan to Connect
                </p>
                <p className="text-[11px] leading-tight text-ink-3">
                  Quick access to our catalog, shop & WhatsApp support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 border-t border-navy-100">
        <div className="shell flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-wide text-navy/45">
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span className="label-wide text-navy/35">Built for the UAE</span>
            <a
              href={site.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-wide group inline-flex items-center gap-1 text-navy/60 transition-colors hover:text-cyan"
            >
              Shop Online
              <ArrowUpRight className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
