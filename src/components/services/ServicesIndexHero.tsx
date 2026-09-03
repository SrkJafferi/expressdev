import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Services index hero — same visual language as the about/service heroes
 * (full-bleed image + hero overlay + CMYK hairline) but shorter, since this
 * page is a navigation hub rather than a landing page.
 */
export function ServicesIndexHero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div className="relative h-[58svh] min-h-[420px] w-full lg:h-[64svh]">
        <Image
          src="/banner1.avif"
          alt="Express Advertising production floor — print, signage and fabrication in progress"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div aria-hidden className="absolute inset-0 hero-overlay" />
        <div aria-hidden className="absolute inset-0 hero-vignette" />

        {/* Ambient brand glows */}
        <div
          aria-hidden
          className="hero-float pointer-events-none absolute right-[10%] top-[20%] h-40 w-40 rounded-full bg-cyan/25 blur-3xl"
        />
        <div
          aria-hidden
          className="hero-float-slow pointer-events-none absolute left-[6%] bottom-[22%] h-52 w-52 rounded-full bg-magenta/20 blur-3xl"
        />

        {/* Corner crop marks */}
        <span
          aria-hidden
          className="absolute left-6 top-24 h-6 w-6 border-l border-t border-white/25 lg:left-10 lg:top-28"
        />
        <span
          aria-hidden
          className="absolute right-6 top-24 h-6 w-6 border-r border-t border-white/25 lg:right-10 lg:top-28"
        />

        <div className="relative z-20 flex h-full items-end pb-14 lg:items-center lg:pb-10">
          <div className="shell w-full">
            <Reveal from="up">
              <div className="mt-[50px] flex items-center gap-3">
                <span aria-hidden className="h-1 w-10 bg-cyan" />
                <SectionLabel accent="cyan" invert>
                  Our capabilities
                </SectionLabel>
              </div>
            </Reveal>

            <Reveal from="up" delay={0.1}>
              <h1 className="display-hero text-gradient-hero mt-5 overflow-visible pt-[0.06em] pb-[0.14em] pl-[0.03em] font-extrabold tracking-tight">
                Express Advertising.
                <br />
                <span className="text-cyan [-webkit-text-fill-color:currentColor]">
                  One Team. Every Stage of Production.
                </span>
              </h1>
            </Reveal>

            <Reveal from="up" delay={0.2}>
              <p className="lede mt-5 max-w-2xl text-white/90">
                Design, print, fabrication, merchandise and installation handled
                under one roof in Ajman — serving brands across the UAE. Pick a
                capability below for detail, or send us the brief directly.
              </p>
            </Reveal>
          </div>
        </div>

        {/* CMYK hairline */}
        <span aria-hidden className="absolute inset-x-0 bottom-0 z-20 flex h-[3px] w-full">
          <span className="h-full flex-1 bg-cyan" />
          <span className="h-full flex-1 bg-magenta" />
          <span className="h-full flex-1 bg-yellow" />
          <span className="h-full flex-1 bg-charcoal" />
        </span>
      </div>
    </section>
  );
}
