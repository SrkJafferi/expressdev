import { services } from "@/data/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceIndex } from "./ServiceIndex";

export function ServicesShowcase() {
  return (
    <section
      id="services"
      className="relative isolate scroll-mt-24 overflow-hidden bg-surface bg-[url(/product-background.avif)] bg-cover bg-center bg-no-repeat py-20 lg:py-28"
    >
      {/* Oversized watermark — echoes the section label, like the clients
          page "TRUST" word */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[15vw] font-extrabold leading-none tracking-tight text-navy/[0.035] lg:text-[10rem]"
      >
        PRODUCE
      </span>

      <div className="shell relative z-10">
        {/* Section head — asymmetric, not centred */}
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <div className="flex items-center gap-3.5">
              <span aria-hidden className="h-px w-10 bg-cyan" />
              <SectionLabel accent="cyan">What we produce</SectionLabel>
              <span aria-hidden className="size-1.5 rounded-full bg-magenta" />
            </div>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] font-extrabold text-navy-900 text-[clamp(1.5rem,3.2vw,3rem)]">
              From concept to completion,{" "}
              <span className="text-gradient-deep">all in one place.</span>
            </h2>
          </Reveal>
          <Reveal from="up" delay={0.12} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="lede">
              Most suppliers hand part of your job to someone else. We keep
              design, print, fabrication and installation together.
            </p>
          </Reveal>
        </div>

        {/* All nine capabilities in one consistent, luxury scroll index */}
        <ServiceIndex services={services} />
      </div>
    </section>
  );
}
