import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function CnBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="relative h-[460px] min-h-[420px] w-full lg:h-[500px]">
        {/* Background image — laser cutting detail */}
        <Image
          src="/CNC.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/55" />
        <div aria-hidden className="absolute inset-0 hero-vignette" />

        {/* Faint technical cut-path geometry */}
        <svg
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-1/2 hidden h-[220px] w-[300px] -translate-y-1/2 opacity-[0.14] lg:block"
          viewBox="0 0 300 220"
          fill="none"
        >
          {/* Vector cut-path with node points */}
          <path
            d="M30 170 L30 80 Q30 50 60 50 L150 50 L150 120 L230 120 L230 190"
            stroke="var(--color-cyan)"
            strokeWidth="1"
          />
          <path
            d="M60 90 L120 90 L120 150 L60 150 Z"
            stroke="var(--color-magenta)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {/* Node markers */}
          <circle cx="30" cy="170" r="3" fill="var(--color-cyan)" />
          <circle cx="30" cy="80" r="2.5" fill="var(--color-cyan)" />
          <circle cx="150" cy="50" r="2.5" fill="var(--color-magenta)" />
          <circle cx="230" cy="120" r="2.5" fill="var(--color-yellow)" />
          <circle cx="230" cy="190" r="3" fill="var(--color-cyan)" />
          {/* Measurement ticks */}
          <line x1="24" y1="110" x2="36" y2="110" stroke="var(--color-yellow)" strokeWidth="0.75" />
          <line x1="90" y1="44" x2="90" y2="56" stroke="var(--color-yellow)" strokeWidth="0.75" />
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
                    PRECISION FABRICATION
                  </p>
                </Reveal>

                <Reveal from="up" delay={0.18}>
                  <h1 className="display-md mt-3 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] font-extrabold text-white">
                    Cut With Precision.
                    <br />
                    Built To{" "}
                    <span className="text-cyan-bright">Fit.</span>
                  </h1>
                </Reveal>

                <Reveal from="up" delay={0.26}>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
                    From custom shapes and sign components to engraved panels
                    and fabricated elements, we use CNC and laser processes to
                    turn accurate digital artwork into clean, repeatable
                    physical pieces.
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
                  <span className="text-cyan-bright">CNC &amp; Laser Cutting</span>
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
