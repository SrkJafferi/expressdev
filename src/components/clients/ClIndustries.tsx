import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const environments = [
  {
    label: "RETAIL",
    body: "Storefronts, promotional campaigns, displays and customer-facing print.",
    image:
      "https://images.unsplash.com/photo-1659993447069-e00b561168d4?auto=format&fit=crop&w=800&q=85",
    alt: "Dimensional storefront lettering",
  },
  {
    label: "CORPORATE",
    body: "Business stationery, presentations, signage and branded environments.",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=85",
    alt: "Corporate branded environment",
  },
  {
    label: "HOSPITALITY",
    body: "Guest-facing graphics, signage, collateral and promotional material.",
    image:
      "https://images.unsplash.com/photo-1704275542846-62b8604b0d1e?auto=format&fit=crop&w=800&q=85",
    alt: "Hospitality signage and collateral",
  },
  {
    label: "EVENTS & EXHIBITIONS",
    body: "Backdrops, displays, promotional products and visual environments.",
    image: "/banner3.avif",
    alt: "Exhibition graphics and displays",
  },
  {
    label: "REAL ESTATE & PROPERTY",
    body: "Signage, display graphics, presentations and project communication.",
    image:
      "https://images.unsplash.com/photo-1774271694280-97afcef90ded?auto=format&fit=crop&w=800&q=85",
    alt: "Property signage and display graphics",
  },
  {
    label: "SMEs & GROWING BRANDS",
    body: "Connected print, design and production support as requirements expand.",
    image:
      "https://images.unsplash.com/photo-1568548832288-4efc2396649f?auto=format&fit=crop&w=800&q=85",
    alt: "Growing brand stationery and print support",
  },
];

export function ClIndustries() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f8ff] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="navy">
              Where our work shows up
            </SectionLabel>
            <h2 className="display-md mt-6 overflow-visible pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Built For Different
              <br />
              Business{" "}
              <span className="whitespace-nowrap text-gradient-deep">
                Environments.
              </span>
            </h2>
            <p className="lede mt-4 max-w-xl text-ink-2">
              Our production supports many kinds of businesses — the examples
              below show the environments our work is built for, not a list of
              client categories.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Environment cards — swipeable on mobile, grid on desktop */}
      <div className="relative z-10 mt-14 lg:mt-16">
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:snap-none lg:overflow-visible lg:px-0">
          {environments.map((env, i) => (
            <Reveal
              key={env.label}
              from="up"
              delay={i * 0.07}
              className="w-[240px] shrink-0 snap-center lg:w-auto"
            >
              <article className="group relative h-[300px] overflow-hidden rounded-2xl border border-white/60 shadow-[0_18px_45px_-18px_rgba(16,48,90,0.4)]">
                <Image
                  src={env.image}
                  alt={env.alt}
                  fill
                  sizes="(max-width: 640px) 80vw, 16vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="label-wide text-cyan-bright">{env.label}</p>
                  <p className="mt-2 text-[0.75rem] leading-snug text-white/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {env.body}
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
              Swipe to explore environments
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
