import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const useCases = [
  {
    label: "CORPORATE GIFTING",
    body: "Professional merchandise and presentation pieces for clients, partners and teams.",
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=85",
    alt: "Premium gift boxes prepared for corporate gifting",
  },
  {
    label: "EVENTS & EXHIBITIONS",
    body: "Portable branded giveaways and event merchandise designed for high-footfall environments.",
    image: "/banner2.avif",
    alt: "Branded promotional merchandise displayed at an event",
  },
  {
    label: "EMPLOYEE KITS",
    body: "Coordinated branded items for onboarding, recognition and internal programmes.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
    alt: "Branded apparel folded for employee kits",
  },
  {
    label: "CUSTOMER CAMPAIGNS",
    body: "Useful promotional products for launches, loyalty initiatives and marketing campaigns.",
    image:
      "https://images.unsplash.com/photo-1776762249700-a65dbfabc9b1?auto=format&fit=crop&w=800&q=85",
    alt: "Branded notebooks and pencils for a customer campaign",
  },
  {
    label: "HOSPITALITY",
    body: "Branded merchandise for guest experiences, events and corporate hospitality.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=85",
    alt: "Hospitality setting with branded touches",
  },
  {
    label: "BRAND ACTIVATIONS",
    body: "Campaign-ready merchandise for launches, retail promotions and experiential marketing.",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=85",
    alt: "Brand activation event with campaign merchandise",
  },
];

export function PrUseCases() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.06)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="navy">Built for real campaigns</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Products People Keep.
              <br />
              Branding They{" "}
              <span className="whitespace-nowrap text-gradient-deep">
                Remember.
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
