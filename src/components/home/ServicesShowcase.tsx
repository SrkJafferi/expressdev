import { services } from "@/data/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceIndex } from "./ServiceIndex";

export function ServicesShowcase() {
  return (
    <section
      id="services"
      className="scroll-mt-24 bg-surface bg-[url(/product-background.avif)] bg-cover bg-center bg-no-repeat py-20 lg:py-28"
    >
      <div className="shell">
        {/* Section head — asymmetric, not centred */}
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="magenta">What we produce</SectionLabel>
            <h2 className="display-lg mt-6 text-balance text-navy-900">
              Nine capabilities.
              <br />
              <span className="text-ink">One production floor.</span>
            </h2>
          </Reveal>
          <Reveal from="up" delay={0.12} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="lede">
              Most suppliers hand part of your job to someone else. We keep
              design, print, fabrication and installation together — which is
              why the colour matches, the deadline holds and the finish is
              consistent across every item.
            </p>
          </Reveal>
        </div>

        {/* All nine capabilities in one consistent, luxury scroll index */}
        <ServiceIndex services={services} />
      </div>
    </section>
  );
}
