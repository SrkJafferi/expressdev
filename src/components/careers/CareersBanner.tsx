import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Compact inner-page banner for /careers — same system as CtBanner but with
 * people-first copy and lighter production linework (a subtle grid plus a
 * small team/registration motif rather than the route-map graphic).
 */
export function CareersBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="relative h-[420px] min-h-[380px] w-full lg:h-[460px]">
        {/* Background image — bright production environment, kept low opacity */}
        <div className="absolute inset-0 bg-[url('/banner01.avif')] bg-cover bg-center opacity-25" aria-hidden />

        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/55" />
        <div aria-hidden className="absolute inset-0 hero-vignette" />

        {/* Subtle production grid linework */}
        <svg
          aria-hidden
          className="pointer-events-none absolute right-[5%] top-1/2 hidden h-[240px] w-[340px] -translate-y-1/2 opacity-[0.12] lg:block"
          viewBox="0 0 340 240"
          fill="none"
        >
          <path d="M20 20h300M20 80h300M20 140h300M20 200h300" stroke="var(--color-cyan)" strokeWidth="0.75" opacity="0.6" />
          <path d="M80 20v180M170 20v180M260 20v180" stroke="var(--color-magenta)" strokeWidth="0.75" opacity="0.5" />
          {/* Three-figure team motif — abstract, no faces */}
          <circle cx="110" cy="150" r="10" stroke="var(--color-cyan)" strokeWidth="1.5" />
          <path d="M92 200c0-12 8-22 18-22s18 10 18 22" stroke="var(--color-cyan)" strokeWidth="1.5" />
          <circle cx="170" cy="135" r="10" stroke="var(--color-yellow)" strokeWidth="1.5" />
          <path d="M152 185c0-12 8-22 18-22s18 10 18 22" stroke="var(--color-yellow)" strokeWidth="1.5" />
          <circle cx="230" cy="150" r="10" stroke="var(--color-magenta)" strokeWidth="1.5" />
          <path d="M212 200c0-12 8-22 18-22s18 10 18 22" stroke="var(--color-magenta)" strokeWidth="1.5" />
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
                    CAREERS AT EXPRESS ADVERTISING
                  </p>
                </Reveal>

                <Reveal from="up" delay={0.18}>
                  <h1 className="display-md mt-3 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] font-extrabold text-white">
                    Build Great Work.
                    <br />
                    Grow With{" "}
                    <span className="text-cyan-bright">The Team.</span>
                  </h1>
                </Reveal>

                <Reveal from="up" delay={0.26}>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
                    We&apos;re always interested in meeting talented people who
                    care about creativity, production quality and getting the
                    details right.
                  </p>
                </Reveal>
              </div>

              {/* Right — breadcrumb, vertically aligned with the heading */}
              <Reveal from="up" className="shrink-0">
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center gap-2 text-[0.8125rem] text-white/50"
                >
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                  <span aria-hidden className="text-white/30">/</span>
                  <span className="text-cyan-bright">Careers</span>
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
