import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const useCases = [
  {
    label: "STARTUPS & NEW BUSINESSES",
    body: "Foundational websites, domains and hosting to get online properly.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=85",
    alt: "New business setting up digital systems",
  },
  {
    label: "SMEs",
    body: "Reliable digital infrastructure and ongoing technical support.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=85",
    alt: "SME workstation with business systems",
  },
  {
    label: "RETAIL",
    body: "Technology supporting online presence and everyday operations.",
    image:
      "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?auto=format&fit=crop&w=800&q=85",
    alt: "Retail business technology and e-commerce setup",
  },
  {
    label: "CORPORATE",
    body: "Professional digital systems, communication and maintenance.",
    image:
      "https://images.unsplash.com/photo-1640163561346-7778a2edf353?auto=format&fit=crop&w=800&q=85",
    alt: "Corporate IT environment with professional systems",
  },
  {
    label: "HOSPITALITY",
    body: "Customer-facing and operational digital support where applicable.",
    image:
      "https://images.unsplash.com/photo-1556204976-d25efd967cba?auto=format&fit=crop&w=800&q=85",
    alt: "Hospitality digital communication setup",
  },
  {
    label: "MULTI-LOCATION BUSINESSES",
    body: "Connected hosting and support across business locations.",
    image:
      "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=800&q=85",
    alt: "Connected server infrastructure for multi-location business",
  },
];

export function ItUseCases() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f8ff] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="navy">Technology for real businesses</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Built Around
              <br />
              How Companies{" "}
              <span className="whitespace-nowrap text-gradient-deep">
                Work.
              </span>
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Editorial visual cards — swipeable on mobile, grid on desktop */}
      <div className="relative z-10 mt-14 lg:mt-16">
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:snap-none lg:overflow-visible lg:px-0">
          {useCases.map((useCase, i) => (
            <Reveal
              key={useCase.label}
              from="up"
              delay={i * 0.07}
              className="w-[240px] shrink-0 snap-center lg:w-auto"
            >
              <article className="group relative h-[300px] overflow-hidden rounded-2xl border border-white/60 shadow-[0_18px_45px_-18px_rgba(16,48,90,0.4)]">
                <Image
                  src={useCase.image}
                  alt={useCase.alt}
                  fill
                  sizes="(max-width: 640px) 80vw, 16vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="label-wide text-cyan-bright">{useCase.label}</p>
                  <p className="mt-2 text-[0.75rem] leading-snug text-white/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {useCase.body}
                  </p>
                </div>

                {/* Accent top bar on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-cyan transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
              </article>
            </Reveal>
          ))}
        </div>

        <div className="shell">
          <Reveal from="up" delay={0.2}>
            <p className="label-wide mt-6 text-ink-3 lg:hidden">
              Swipe to explore applications
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
