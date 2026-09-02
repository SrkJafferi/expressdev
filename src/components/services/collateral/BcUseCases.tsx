import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { BcIcon } from "./BcIcons";

const useCases = [
  {
    label: "SALES & PRESENTATIONS",
    body: "Company profiles, folders and supporting print for meetings, proposals and presentations.",
    icon: "sales",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=85",
    alt: "Presentation materials arranged for a business meeting",
  },
  {
    label: "CORPORATE COMMUNICATION",
    body: "Letterheads, envelopes and official business stationery.",
    icon: "communication",
    image:
      "https://plus.unsplash.com/premium_photo-1726754742476-915c95b6ed4d?auto=format&fit=crop&w=800&q=85",
    alt: "Corporate letterhead and official stationery",
  },
  {
    label: "RETAIL & PRODUCT",
    body: "Tags, inserts and supporting collateral for products and customer-facing environments.",
    icon: "retailTag",
    image:
      "https://plus.unsplash.com/premium_photo-1691223714409-b0cb1629f0f7?auto=format&fit=crop&w=800&q=85",
    alt: "Branded product tags on retail packaging",
  },
  {
    label: "EVENTS & EXHIBITIONS",
    body: "Presentation materials and branded print for meetings, exhibitions and conferences.",
    icon: "event",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=85",
    alt: "Branded print materials at a conference setting",
  },
  {
    label: "EMPLOYEE / INTERNAL",
    body: "Branded notebooks, folders and internal documentation.",
    icon: "employee",
    image:
      "https://images.unsplash.com/photo-1626036355710-0de0ffac5de4?auto=format&fit=crop&w=800&q=85",
    alt: "Branded notebooks for internal documentation",
  },
  {
    label: "EXECUTIVE PRESENTATION",
    body: "Premium collateral for high-level meetings, proposals and business introductions.",
    icon: "executive",
    image:
      "https://images.unsplash.com/photo-1627897181132-735874e6251f?auto=format&fit=crop&w=800&q=85",
    alt: "Premium presentation folder for executive meetings",
  },
];

export function BcUseCases() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.06)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="navy">Where brand collateral matters</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Professional At
              <br />
              Every{" "}
              <span className="whitespace-nowrap text-gradient-deep">
                Interaction.
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
