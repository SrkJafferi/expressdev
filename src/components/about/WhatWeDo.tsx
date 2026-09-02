import Link from "next/link";
import { services } from "@/data/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import {
  PrinterIcon,
  SignpostIcon,
  ScanLineIcon,
  GiftIcon,
  LayersIcon,
  StoreIcon,
  CrosshairIcon,
  PenToolIcon,
  MonitorIcon,
} from "@/components/ui/FooterIcons";

const serviceIcons: Record<string, (p: { className?: string }) => React.ReactElement> = {
  "printing-services": PrinterIcon,
  signage: SignpostIcon,
  "large-format-printing": ScanLineIcon,
  "promotional-items": GiftIcon,
  "brand-collateral": LayersIcon,
  "retail-events-exhibition": StoreIcon,
  "cnc-laser-cutting": CrosshairIcon,
  "digital-design": PenToolIcon,
  "it-services": MonitorIcon,
};

const accentStyles: Record<
  string,
  {
    iconWrap: string;
    iconText: string;
    line: string;
    hoverBorder: string;
    glow: string;
    indexText: string;
  }
> = {
  cyan: {
    iconWrap: "bg-cyan/10 group-hover:bg-cyan",
    iconText: "text-cyan-bright group-hover:text-white",
    line: "bg-cyan",
    hoverBorder: "group-hover:border-cyan/50",
    glow: "group-hover:shadow-[0_18px_45px_-15px_rgba(0,153,218,0.35)]",
    indexText: "text-cyan/15",
  },
  magenta: {
    iconWrap: "bg-magenta/10 group-hover:bg-magenta",
    iconText: "text-magenta group-hover:text-white",
    line: "bg-magenta",
    hoverBorder: "group-hover:border-magenta/50",
    glow: "group-hover:shadow-[0_18px_45px_-15px_rgba(236,39,144,0.35)]",
    indexText: "text-magenta/15",
  },
  navy: {
    iconWrap: "bg-navy/10 group-hover:bg-navy",
    iconText: "text-navy group-hover:text-white",
    line: "bg-navy",
    hoverBorder: "group-hover:border-navy/50",
    glow: "group-hover:shadow-[0_18px_45px_-15px_rgba(27,77,133,0.35)]",
    indexText: "text-navy/15",
  },
  yellow: {
    iconWrap: "bg-yellow/15 group-hover:bg-yellow",
    iconText: "text-[#c9a800] group-hover:text-navy-900",
    line: "bg-yellow",
    hoverBorder: "group-hover:border-yellow/60",
    glow: "group-hover:shadow-[0_18px_45px_-15px_rgba(229,160,0,0.35)]",
    indexText: "text-yellow/20",
  },
};

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

        {/* Service cards grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.slug];
            const a = accentStyles[service.accent] ?? accentStyles.cyan!;
            return (
              <Reveal key={service.slug} from="up" delay={(i % 3) * 0.08}>
                <Link
                  href={`/services#${service.slug}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 ${a.hoverBorder} ${a.glow}`}
                >
                  {/* Oversized index number */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -right-1 -top-3 select-none text-[5.5rem] font-extrabold leading-none ${a.indexText} transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1`}
                  >
                    {service.index}
                  </span>

                  {/* Top accent line — grows on hover */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 ${a.line} transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100`}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    {/* Icon badge */}
                    <span
                      className={`grid size-14 place-items-center rounded-2xl transition-colors duration-300 ${a.iconWrap} ${a.iconText}`}
                    >
                      {Icon && <Icon className="size-6" />}
                    </span>

                    <h3 className="mt-6 text-lg font-bold tracking-tight text-navy-900 transition-colors duration-300 sm:text-xl">
                      {service.title}
                    </h3>

                    <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink-2">
                      {service.description}
                    </p>

                    {/* Footer row */}
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <span className="label-wide text-ink-3">
                        {service.lede}
                      </span>
                      <span className="grid size-8 place-items-center rounded-full border border-slate-200 text-ink-3 transition-all duration-300 group-hover:border-transparent group-hover:bg-cyan group-hover:text-white">
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
