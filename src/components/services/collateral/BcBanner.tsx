import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function BcBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="relative h-[460px] min-h-[420px] w-full lg:h-[500px]">
        {/* Background image — coordinated stationery flat-lay */}
        <Image
          src="/brandpromo.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/55" />
        <div aria-hidden className="absolute inset-0 hero-vignette" />

        {/* Faint stationery paper-layer geometry */}
        <svg
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-1/2 hidden h-[220px] w-[300px] -translate-y-1/2 opacity-[0.12] lg:block"
          viewBox="0 0 300 220"
          fill="none"
        >
          <rect x="20" y="40" width="150" height="100" stroke="var(--color-cyan)" strokeWidth="1" transform="rotate(-4 95 90)" />
          <rect x="60" y="60" width="150" height="100" stroke="var(--color-magenta)" strokeWidth="1" transform="rotate(2 135 110)" />
          <rect x="100" y="80" width="150" height="100" stroke="var(--color-yellow)" strokeWidth="1" transform="rotate(-2 175 130)" />
          <circle cx="20" cy="40" r="2.5" fill="var(--color-cyan)" />
          <circle cx="250" cy="140" r="2.5" fill="var(--color-magenta)" />
          <circle cx="230" cy="60" r="2.5" fill="var(--color-yellow)" />
        </svg>

        {/* Corner crop marks */}
        <span aria-hidden className="absolute left-6 top-20 h-5 w-5 border-l border-t border-white/25 lg:left-10 lg:top-24" />
        <span aria-hidden className="absolute right-6 top-20 h-5 w-5 border-r border-t border-white/25 lg:right-10 lg:top-24" />

        <div className="absolute inset-0 z-10 flex items-center pt-32 pb-12 lg:pt-36 lg:pb-16">
          <div className="shell w-full">
            <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-8">
              {/* Left — eyebrow, heading, description */}
              <div className="max-w-3xl">
                <Reveal from="up" delay={0.1}>
                  <p className="label-wide text-cyan-bright">
                    BRAND COLLATERAL
                  </p>
                </Reveal>

                <Reveal from="up" delay={0.18}>
                  <h1 className="display-md mt-3 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] font-extrabold text-white">
                    One Brand.
                    <br />
                    Every{" "}
                    <span className="text-cyan-bright">Touchpoint.</span>
                  </h1>
                </Reveal>

                <Reveal from="up" delay={0.26}>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
                    From letterheads and folders to envelopes, tags and
                    presentation materials, we create coordinated brand
                    collateral that keeps your identity consistent wherever
                    customers, partners and teams interact with it.
                  </p>
                </Reveal>
              </div>

              {/* Right — breadcrumb, vertically aligned with the heading */}
              <Reveal from="up" className="shrink-0">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center gap-2 text-[0.8125rem] text-white/50"
                >
                  <Link
                    href="/"
                    className="transition-colors hover:text-white"
                  >
                    Home
                  </Link>
                  <span aria-hidden className="text-white/30">/</span>
                  <Link
                    href="/#services"
                    className="transition-colors hover:text-white"
                  >
                    Services
                  </Link>
                  <span aria-hidden className="text-white/30">/</span>
                  <span className="text-cyan-bright">Brand Collateral</span>
                </nav>
              </Reveal>
            </div>
          </div>
        </div>

        {/* CMYK hairline */}
        <span aria-hidden className="absolute inset-x-0 bottom-0 z-10 flex h-[3px]">
          <span className="h-full flex-1 bg-cyan" />
          <span className="h-full flex-1 bg-magenta" />
          <span className="h-full flex-1 bg-yellow" />
          <span className="h-full flex-1 bg-charcoal" />
        </span>
      </div>
    </section>
  );
}
