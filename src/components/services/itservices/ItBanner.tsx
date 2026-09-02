import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function ItBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="relative h-[460px] min-h-[420px] w-full lg:h-[500px]">
        {/* Background image — bright business technology environment */}
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=85"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/55" />
        <div aria-hidden className="absolute inset-0 hero-vignette" />

        {/* Faint network architecture linework */}
        <svg
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-1/2 hidden h-[220px] w-[320px] -translate-y-1/2 opacity-[0.15] lg:block"
          viewBox="0 0 320 220"
          fill="none"
        >
          {/* Network nodes + data-flow lines */}
          <path d="M40 60h80v50h80v60" stroke="var(--color-cyan)" strokeWidth="1" />
          <path d="M40 60v80h100" stroke="var(--color-cyan)" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M120 170h160" stroke="var(--color-yellow)" strokeWidth="0.75" strokeDasharray="4 6" />
          {/* Nodes */}
          <rect x="32" y="52" width="16" height="16" stroke="var(--color-cyan)" />
          <rect x="112" y="102" width="16" height="16" stroke="var(--color-magenta)" />
          <rect x="192" y="162" width="16" height="16" stroke="var(--color-cyan)" />
          <circle cx="280" cy="170" r="5" stroke="var(--color-yellow)" />
          <circle cx="40" cy="140" r="4" stroke="var(--color-cyan)" />
          {/* Status dots */}
          <circle cx="40" cy="60" r="2" fill="var(--color-cyan)" />
          <circle cx="120" cy="110" r="2" fill="var(--color-magenta)" />
          <circle cx="200" cy="170" r="2" fill="var(--color-cyan)" />
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
                    BUSINESS IT SERVICES
                  </p>
                </Reveal>

                <Reveal from="up" delay={0.18}>
                  <h1 className="display-md mt-3 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] font-extrabold text-white">
                    Technology That Keeps
                    <br />
                    Your Business{" "}
                    <span className="text-cyan-bright">Moving.</span>
                  </h1>
                </Reveal>

                <Reveal from="up" delay={0.26}>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
                    From digital systems and online infrastructure to ongoing
                    technical support, we help businesses build and maintain
                    reliable technology that supports everyday operations and
                    long-term growth.
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
                  <span className="text-cyan-bright">IT Services</span>
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
