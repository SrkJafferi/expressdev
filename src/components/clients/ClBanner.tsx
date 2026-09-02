import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function ClBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="relative h-[420px] min-h-[380px] w-full lg:h-[460px]">
        {/* Background image — brand production composition */}
        <Image
          src="/banner01.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/55" />
        <div aria-hidden className="absolute inset-0 hero-vignette" />

        {/* Faint logo-grid texture — oversized alignment grid */}
        <svg
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-1/2 hidden h-[240px] w-[340px] -translate-y-1/2 opacity-[0.12] lg:block"
          viewBox="0 0 340 240"
          fill="none"
        >
          {/* Logo grid cells */}
          <rect x="20" y="20" width="90" height="60" stroke="var(--color-cyan)" strokeWidth="1" />
          <rect x="125" y="20" width="90" height="60" stroke="var(--color-magenta)" strokeWidth="1" />
          <rect x="230" y="20" width="90" height="60" stroke="var(--color-yellow)" strokeWidth="1" />
          <rect x="20" y="95" width="90" height="60" stroke="var(--color-magenta)" strokeWidth="1" />
          <rect x="125" y="95" width="90" height="60" stroke="var(--color-cyan)" strokeWidth="1" />
          <rect x="230" y="95" width="90" height="60" stroke="var(--color-cyan)" strokeWidth="1" />
          <rect x="20" y="170" width="90" height="60" stroke="var(--color-yellow)" strokeWidth="1" />
          <rect x="125" y="170" width="90" height="60" stroke="var(--color-cyan)" strokeWidth="1" />
          <rect x="230" y="170" width="90" height="60" stroke="var(--color-magenta)" strokeWidth="1" />
          {/* Registration marks */}
          <circle cx="20" cy="20" r="2.5" fill="var(--color-cyan)" />
          <circle cx="320" cy="230" r="2.5" fill="var(--color-magenta)" />
        </svg>

        {/* Corner crop marks */}
        <span aria-hidden className="absolute left-6 top-20 h-5 w-5 border-l border-t border-white/25 lg:left-10 lg:top-24" />
        <span aria-hidden className="absolute right-6 top-20 h-5 w-5 border-r border-t border-white/25 lg:right-10 lg:top-24" />

        <div className="absolute inset-0 z-10 flex items-center pt-40 pb-12 lg:pt-44 lg:pb-16">
          <div className="shell w-full">
            <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-8">
              {/* Left — eyebrow, heading, description */}
              <div className="max-w-3xl">
                <Reveal from="up" delay={0.1}>
                  <p className="label-wide text-cyan-bright">
                    TRUSTED ACROSS THE UAE
                  </p>
                </Reveal>

                <Reveal from="up" delay={0.18}>
                  <h1 className="display-md mt-3 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] font-extrabold text-white">
                    Brands That Trust Us
                    <br />
                    To Show Up{" "}
                    <span className="text-cyan-bright">Right.</span>
                  </h1>
                </Reveal>

                <Reveal from="up" delay={0.26}>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
                    From everyday print requirements to high-visibility brand
                    production, we support businesses across the UAE with
                    consistent execution.
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
                  <span className="text-cyan-bright">Clients</span>
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
