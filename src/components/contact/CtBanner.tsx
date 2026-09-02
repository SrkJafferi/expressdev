import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function CtBanner() {
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

        {/* Faint communication / location grid linework */}
        <svg
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-1/2 hidden h-[220px] w-[320px] -translate-y-1/2 opacity-[0.13] lg:block"
          viewBox="0 0 320 220"
          fill="none"
        >
          {/* Map grid */}
          <path d="M20 20h280M20 80h280M20 140h280M20 200h280" stroke="var(--color-cyan)" strokeWidth="0.75" opacity="0.6" />
          <path d="M80 20v180M160 20v180M240 20v180" stroke="var(--color-magenta)" strokeWidth="0.75" opacity="0.6" />
          {/* Route path with pins */}
          <path d="M60 190 C 100 150, 140 110, 200 70" stroke="var(--color-cyan)" strokeWidth="1.5" />
          <circle cx="60" cy="190" r="4" fill="var(--color-cyan)" />
          <circle cx="200" cy="70" r="4" fill="var(--color-yellow)" />
          <rect x="196" y="40" width="8" height="12" fill="var(--color-magenta)" />
          <path d="M200 40 196 44h8z" />
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
                  <p className="label-wide text-cyan-bright">LET&apos;S TALK</p>
                </Reveal>

                <Reveal from="up" delay={0.18}>
                  <h1 className="display-md mt-3 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] font-extrabold text-white">
                    Let&apos;s Make Something
                    <br />
                    Worth Being{" "}
                    <span className="text-cyan-bright">Seen.</span>
                  </h1>
                </Reveal>

                <Reveal from="up" delay={0.26}>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
                    Whether you need printing, signage, promotional products,
                    retail graphics, digital design or a complete branded
                    production requirement.
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
                  <span className="text-cyan-bright">Contact</span>
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
