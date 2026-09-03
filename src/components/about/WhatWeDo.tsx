import Image from "next/image";
import Link from "next/link";
import { serviceHref, services, type ServiceAccent } from "@/data/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

const accentBar: Record<ServiceAccent, string> = {
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  navy: "bg-navy",
  yellow: "bg-yellow",
};

const accentText: Record<ServiceAccent, string> = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  navy: "text-navy",
  yellow: "text-[#b08d00]",
};

const accentRing: Record<ServiceAccent, string> = {
  cyan: "group-hover:border-cyan/40",
  magenta: "group-hover:border-magenta/40",
  navy: "group-hover:border-navy/40",
  yellow: "group-hover:border-yellow/50",
};

const accentCta: Record<ServiceAccent, string> = {
  cyan: "group-hover:bg-cyan",
  magenta: "group-hover:bg-magenta",
  navy: "group-hover:bg-navy",
  yellow: "group-hover:bg-yellow",
};

const accentCtaText: Record<ServiceAccent, string> = {
  cyan: "group-hover:text-white",
  magenta: "group-hover:text-white",
  navy: "group-hover:text-white",
  yellow: "group-hover:text-navy-900",
};

/**
 * What We Do — every capability rendered as an image card, same visual
 * language as the Services index grid (photo plate + index chip + lede),
 * so the About page shows the actual work rather than icon tiles.
 */
export function WhatWeDo() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f8ff] py-20 lg:py-28">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.08)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.06)_0%,transparent_70%)]" />

      {/* Oversized watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none whitespace-nowrap text-[15vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[10rem]"
      >
        CAPABILITIES
      </span>

      <div className="shell relative z-10">
        {/* Section heading */}
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="navy">What We Do</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Nine Capabilities.{" "}
              <span className="text-gradient-deep">
                One Accountable Team.
              </span>
            </h2>
          </Reveal>
          <Reveal
            from="up"
            delay={0.12}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            <p className="lede text-ink-2">
              From print and signage to fabrication and digital support, we
              keep every brand touchpoint aligned under one production partner.
            </p>
          </Reveal>
        </div>

        {/* Service cards grid — image-first, matching the services index */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} from="up" delay={(i % 3) * 0.08} className="h-full">
              <Link
                href={serviceHref(service.slug)}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1.5",
                  accentRing[service.accent],
                )}
              >
                {/* Image plate */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-paper-2">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />

                  {/* Dark gradient scrim for the chip */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/45 via-transparent to-transparent"
                  />

                  {/* Index chip */}
                  <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-navy-900/70 px-3 py-1 backdrop-blur-sm">
                    <span
                      aria-hidden
                      className={cn("size-1.5 rounded-full", accentBar[service.accent])}
                    />
                    <span className="label-wide text-white/85">{service.index}</span>
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold tracking-tight text-navy-900 transition-colors duration-300 sm:text-xl">
                    {service.title}
                  </h3>

                  <p className={cn("label mt-2 font-bold", accentText[service.accent])}>
                    {service.lede}
                  </p>

                  <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink-2">
                    {service.description}
                  </p>

                  {/* Footer row */}
                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="label-wide text-ink-3">View details</span>
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-full border border-slate-200 text-ink-3 transition-all duration-300 group-hover:border-transparent",
                        accentCta[service.accent],
                        accentCtaText[service.accent],
                      )}
                    >
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
