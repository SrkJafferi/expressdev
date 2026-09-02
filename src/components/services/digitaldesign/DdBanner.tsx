import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function DdBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="relative h-[460px] min-h-[420px] w-full lg:h-[500px]">
        {/* Background image — bright creative workstation */}
        <Image
          src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1920&q=85"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/55" />
        <div aria-hidden className="absolute inset-0 hero-vignette" />

        {/* Faint bezier / vector linework */}
        <svg
          aria-hidden
          className="pointer-events-none absolute right-[6%] top-1/2 hidden h-[220px] w-[320px] -translate-y-1/2 opacity-[0.15] lg:block"
          viewBox="0 0 320 220"
          fill="none"
        >
          {/* Bezier curve with handles + nodes */}
          <path
            d="M30 180 C 80 60, 180 60, 290 160"
            stroke="var(--color-cyan)"
            strokeWidth="1.5"
          />
          <path d="M30 180 L110 90" stroke="var(--color-magenta)" strokeWidth="0.75" strokeDasharray="3 4" />
          <path d="M290 160 L210 118" stroke="var(--color-magenta)" strokeWidth="0.75" strokeDasharray="3 4" />
          <rect x="24" y="174" width="12" height="12" stroke="var(--color-cyan)" />
          <rect x="104" y="84" width="12" height="12" stroke="var(--color-magenta)" />
          <rect x="204" y="112" width="12" height="12" stroke="var(--color-magenta)" />
          <rect x="284" y="154" width="12" height="12" stroke="var(--color-cyan)" />
          {/* Baseline grid hint */}
          <line x1="20" y1="200" x2="300" y2="200" stroke="var(--color-yellow)" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.7" />
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
                  <p className="label-wide text-cyan-bright">DIGITAL DESIGN</p>
                </Reveal>

                <Reveal from="up" delay={0.18}>
                  <h1 className="display-md mt-3 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] font-extrabold text-white">
                    Design That Gives
                    <br />
                    Your Brand A{" "}
                    <span className="text-cyan-bright">Voice.</span>
                  </h1>
                </Reveal>

                <Reveal from="up" delay={0.26}>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-[0.9375rem]">
                    From logos and visual identity to UI/UX and campaign
                    graphics, we create digital design systems that make
                    brands look clear, consistent and confident across every
                    touchpoint.
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
                  <span className="text-cyan-bright">Digital Design</span>
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
