import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const features = [
  {
    title: "End-to-End Production",
    body: "Design, print, fabrication and installation handled by one accountable team. One brief, one point of contact, one consistent standard from start to finish.",
    image:
      "https://images.unsplash.com/photo-1581508512961-0e3b9524db40?auto=format&fit=crop&w=1200&q=80",
    alt: "Press hall of a printing and fabrication workshop",
    accent: "cyan",
    icon: (
      <svg className="size-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 26s10-5 10-12V6l-10-4-10 4v8c0 7 10 12 10 12z" />
        <path d="m10 13.5 3 3 5.5-5.5" />
      </svg>
    ),
  },
  {
    title: "Premium Quality",
    body: "Colour-managed output, durable materials and refined finishing — proofed before production and consistent across every reprint.",
    image:
      "https://images.unsplash.com/photo-1718670013921-2f144aba173a?auto=format&fit=crop&w=1200&q=80",
    alt: "Foil-detailed premium business cards stacked on a stone surface",
    accent: "magenta",
    icon: (
      <svg className="size-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2.5 17.6 10l8.4 1.2-6 5.9 1.4 8.4L14 21.6l-7.4 3.9L8 17.1l-6-5.9L10.4 10z" />
      </svg>
    ),
  },
  {
    title: "Fast Turnaround",
    body: "Streamlined production and clear timelines keep urgent jobs moving — dependable delivery dates without compromising the finish.",
    image:
      "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&w=1200&q=80",
    alt: "Printed sheets running through a high-speed offset press",
    accent: "yellow",
    icon: (
      <svg className="size-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2 4 16h9l-1 10 11-14h-9l1-10z" />
      </svg>
    ),
  },
  {
    title: "UAE-Focused Delivery",
    body: "Based in Ajman and delivering across all Emirates — local market understanding, site visits and on-time installation support.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    alt: "Dubai skyline at dusk representing UAE-wide coverage",
    accent: "navy",
    icon: (
      <svg className="size-7" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25 12c0 8-11 14-11 14S3 20 3 12a11 11 0 0 1 22 0z" />
        <circle cx="14" cy="12" r="4" />
        <circle cx="14" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const accentStyles: Record<
  string,
  {
    iconWrap: string;
    iconText: string;
    topBar: string;
    hoverBorder: string;
    glow: string;
    underline: string;
  }
> = {
  cyan: {
    iconWrap: "bg-cyan/15 border border-cyan/30 backdrop-blur-sm",
    iconText: "text-cyan-bright",
    topBar: "from-cyan via-cyan/60 to-transparent",
    hoverBorder: "group-hover:border-cyan/60",
    glow: "group-hover:shadow-[0_18px_50px_-15px_rgba(0,153,218,0.45)]",
    underline: "bg-cyan",
  },
  magenta: {
    iconWrap: "bg-magenta/15 border border-magenta/30 backdrop-blur-sm",
    iconText: "text-magenta",
    topBar: "from-magenta via-magenta/60 to-transparent",
    hoverBorder: "group-hover:border-magenta/60",
    glow: "group-hover:shadow-[0_18px_50px_-15px_rgba(236,39,144,0.45)]",
    underline: "bg-magenta",
  },
  yellow: {
    iconWrap: "bg-yellow/15 border border-yellow/40 backdrop-blur-sm",
    iconText: "text-yellow",
    topBar: "from-yellow via-yellow/60 to-transparent",
    hoverBorder: "group-hover:border-yellow/70",
    glow: "group-hover:shadow-[0_18px_50px_-15px_rgba(229,160,0,0.45)]",
    underline: "bg-yellow",
  },
  navy: {
    iconWrap: "bg-navy/25 border border-cyan/25 backdrop-blur-sm",
    iconText: "text-cyan-bright",
    topBar: "from-cyan via-navy/60 to-transparent",
    hoverBorder: "group-hover:border-cyan/50",
    glow: "group-hover:shadow-[0_18px_50px_-15px_rgba(27,77,133,0.55)]",
    underline: "bg-cyan",
  },
};

export function WhyChooseUs() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-20 lg:py-28">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.06)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      <div className="shell relative z-10">
        {/* Section heading */}
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="yellow">Why Clients Choose Us</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              From Idea To Installation —{" "}
              <span className="text-gradient-deep">
                Handled In One Place.
              </span>
            </h2>
          </Reveal>
          <Reveal
            from="up"
            delay={0.12}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            <p className="lede text-ink-2">
              Four reasons businesses across the UAE trust us with their brand
              production — and come back for every reorder.
            </p>
          </Reveal>
        </div>

        {/* Feature cards — image backgrounds */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16">
          {features.map((feature, i) => {
            const a = accentStyles[feature.accent] ?? accentStyles.cyan!;
            return (
              <Reveal key={feature.title} from="up" delay={(i % 2) * 0.1}>
                <article
                  className={`group relative flex min-h-[360px] flex-col justify-end overflow-hidden rounded-2xl border border-slate-200/60 p-8 transition-all duration-300 hover:-translate-y-1.5 sm:p-10 ${a.hoverBorder} ${a.glow}`}
                >
                  {/* Background image */}
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />

                  {/* Dark gradient overlay for readability */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/75 to-navy-900/35 transition-opacity duration-500"
                  />

                  {/* Top accent bar — grows on hover */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 ${a.topBar}`}
                  />

                  {/* Corner crop marks */}
                  <span aria-hidden className="absolute left-4 top-4 z-10 h-4 w-4 border-l border-t border-white/25" />
                  <span aria-hidden className="absolute right-4 top-4 z-10 h-4 w-4 border-r border-t border-white/25" />

                  <div className="relative z-10">
                    {/* Icon badge */}
                    <span
                      className={`grid size-14 place-items-center rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:-rotate-3 ${a.iconWrap} ${a.iconText}`}
                    >
                      {feature.icon}
                    </span>

                    <h3 className="mt-6 text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {feature.title}
                    </h3>

                    {/* Accent underline — expands on hover */}
                    <span
                      aria-hidden
                      className={`mt-4 block h-[2px] w-12 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-20 ${a.underline}`}
                    />

                    <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/70 sm:text-base">
                      {feature.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
