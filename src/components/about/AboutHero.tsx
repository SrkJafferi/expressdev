import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/Icons";

const stats = [
  { value: "20+", label: "Years of Excellence", accent: "cyan", icon: (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      <path d="M12 5l1 2 2 .5-1.5 1.5.5 2-2-1-2 1 .5-2L9 7.5 11 7z" />
    </svg>
  )},
  { value: "100+", label: "Brands Served", accent: "magenta", icon: (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )},
  { value: "UAE-Wide", label: "Production & Delivery", accent: "yellow", icon: (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )},
] as const;

const accentStyles = {
  cyan: {
    value: "text-cyan-bright",
    bar: "bg-cyan",
    glow: "hover:shadow-[0_12px_36px_-12px_rgba(0,153,218,0.5)] hover:border-cyan/40",
    iconBg: "bg-cyan/15 border-cyan/25",
  },
  magenta: {
    value: "text-magenta",
    bar: "bg-magenta",
    glow: "hover:shadow-[0_12px_36px_-12px_rgba(236,39,144,0.5)] hover:border-magenta/40",
    iconBg: "bg-magenta/15 border-magenta/25",
  },
  yellow: {
    value: "text-yellow",
    bar: "bg-yellow",
    glow: "hover:shadow-[0_12px_36px_-12px_rgba(255,241,18,0.4)] hover:border-yellow/40",
    iconBg: "bg-yellow/15 border-yellow/25",
  },
} as const;

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="relative h-[86svh] min-h-[560px] w-full lg:h-[88svh]">
        {/* Full-bleed background image — same as homepage */}
        <Image
          src="/aboutusbanner.avif"
          alt="Express Advertising UAE — About Us"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlays — same as homepage */}
        <div aria-hidden className="absolute inset-0 hero-overlay" />
        <div aria-hidden className="absolute inset-0 hero-vignette" />

        {/* Decorative glow orbs */}
        <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.15)_0%,transparent_70%)]" />
        <div aria-hidden className="pointer-events-none absolute -right-32 top-1/3 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.1)_0%,transparent_70%)]" />

        {/* Corner crop marks */}
        <span aria-hidden className="absolute left-6 top-24 h-6 w-6 border-l border-t border-white/25 lg:left-10 lg:top-28" />
        <span aria-hidden className="absolute right-6 top-24 h-6 w-6 border-r border-t border-white/25 lg:right-10 lg:top-28" />

        {/* Floating accent dots */}
        <span aria-hidden className="hero-float absolute right-[12%] top-[22%] h-40 w-40 rounded-full bg-cyan/25 blur-3xl" />
        <span aria-hidden className="hero-float-slow absolute left-[8%] bottom-[26%] h-52 w-52 rounded-full bg-magenta/20 blur-3xl" />

        {/* Content */}
        <div className="relative z-20 flex h-full items-end pb-16 lg:items-center lg:pb-12">
          <div className="shell w-full">
            <div>
              <Reveal from="up">
                <div className="mt-[50px] flex items-center gap-3">
                  <span aria-hidden className="h-1 w-10 bg-cyan" />
                  <SectionLabel accent="cyan" invert>
                    About Express Advertising
                  </SectionLabel>
                </div>
              </Reveal>

              <Reveal from="up" delay={0.1}>
                <h1 className="display-hero text-gradient-hero mt-5 overflow-visible pt-[0.06em] pb-[0.14em] pl-[0.03em] font-extrabold tracking-tight">
                  Built To Make Brands
                  <br />
                  <span className="text-cyan [-webkit-text-fill-color:currentColor]">
                    Visible Across The UAE.
                  </span>
                </h1>
              </Reveal>

              <Reveal from="up" delay={0.2}>
                <p className="lede mt-5 max-w-2xl text-white/90">
                  Express Advertising is a UAE-based printing, signage and brand
                  production house delivering design, print, fabrication and
                  installation under one accountable team.
                </p>
              </Reveal>

              <Reveal from="up" delay={0.3}>
                <Link
                  href="/#services"
                  className="btn btn-primary group mt-8 px-7"
                >
                  Explore Our Services
                  <ArrowRight className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Stats Cards — modern glassmorphism counters */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="shell pb-6 lg:pb-8">
            <Reveal from="up" delay={0.4}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {stats.map((stat) => {
                  const a = accentStyles[stat.accent];
                  return (
                    <div
                      key={stat.value}
                      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 sm:px-6 sm:py-5 ${a.glow}`}
                    >
                      {/* Left accent bar */}
                      <span
                        aria-hidden
                        className={`absolute inset-y-4 left-0 w-[3px] rounded-full ${a.bar}`}
                      />

                      <div className="flex items-center gap-4">
                        {/* Icon badge */}
                        <span
                          className={`grid size-12 shrink-0 place-items-center rounded-xl border backdrop-blur-sm transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 ${a.iconBg} ${a.value}`}
                        >
                          {stat.icon}
                        </span>

                        <div className="min-w-0">
                          <span
                            className={`block text-2xl font-extrabold leading-none tracking-tight sm:text-3xl ${a.value}`}
                          >
                            {stat.value}
                          </span>
                          <span className="mt-1.5 block text-xs font-medium leading-snug text-white/60 sm:text-[0.8125rem]">
                            {stat.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          {/* CMYK hairline */}
          <span aria-hidden className="flex h-[3px] w-full">
            <span className="h-full flex-1 bg-cyan" />
            <span className="h-full flex-1 bg-magenta" />
            <span className="h-full flex-1 bg-yellow" />
            <span className="h-full flex-1 bg-charcoal" />
          </span>
        </div>
      </div>
    </section>
  );
}
