import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Why Express Advertising — Premium 4-Card Capability Section
 * Matches the reference design with custom isometric graphics,
 * distinct color-coded icon badges, and bottom trust signals.
 */

const capabilityCards = [
  {
    title: "Premium Quality Printing",
    body: "Colour-managed output on properly specified stock. What we proof is what you receive — and what you receive again on the reprint.",
    image: "/Premium Quality Printing.png",
    cardBg: "bg-[#f5f8ff]",
    accent: {
      num: "text-[#0099da]",
      bg: "bg-[#e8f4fc]",
      text: "text-[#0099da]",
      border: "group-hover:border-[#0099da]/40",
    },
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="9" width="14" height="10" rx="2" />
        <path d="M7 9V4h10v5" />
        <path d="M8 15h8" />
        <circle cx="16" cy="12" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Creative Design Expertise",
    body: "In-house designers who understand production limits, so artwork arrives at the press already correct rather than compromised on press.",
    image: "/Creative Design Expertise.png",
    cardBg: "bg-[#fff6fb]",
    accent: {
      num: "text-[#ec2790]",
      bg: "bg-[#fcebf3]",
      text: "text-[#ec2790]",
      border: "group-hover:border-[#ec2790]/40",
    },
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 8-9 9-4 1 1-4 4-4z" />
        <path d="M15 5l4 4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "All-In-One Branding & Production",
    body: "Print, signage, fabrication, merchandise and installation under one accountable team. One brief, one point of contact, one standard.",
    image: "/All-In-One Branding & Production.png",
    cardBg: "bg-[#f8f9fe]",
    accent: {
      num: "text-[#1b4d85]",
      bg: "bg-[#eaf0f7]",
      text: "text-[#1b4d85]",
      border: "group-hover:border-[#1b4d85]/40",
    },
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 2 10 5.5-10 5.5L2 7.5z" />
        <path d="m2 12.5 10 5.5 10-5.5" />
        <path d="m2 17.5 10 5.5 10-5.5" />
      </svg>
    ),
  },
  {
    title: "Professional Customer Support",
    body: "Direct access to the people running your job — clear timelines, straight answers and follow-through after delivery.",
    image: "/Professional Customer Support.png",
    cardBg: "bg-[#fefaef]",
    accent: {
      num: "text-[#e5a000]",
      bg: "bg-[#fef9e8]",
      text: "text-[#e5a000]",
      border: "group-hover:border-[#e5a000]/40",
    },
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <circle cx="9" cy="11.5" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="12" cy="11.5" r="0.75" fill="currentColor" stroke="none" />
        <circle cx="15" cy="11.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const trustBadges = [
  {
    title: "On-time",
    subtitle: "delivery",
    icon: (
      <svg className="size-5 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: "Consistent",
    subtitle: "quality",
    icon: (
      <svg className="size-5 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: "Accountable",
    subtitle: "team",
    icon: (
      <svg className="size-5 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Built for",
    subtitle: "reliability",
    icon: (
      <svg className="size-5 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        <path d="M12 5l1 2 2 .5-1.5 1.5.5 2-2-1-2 1 .5-2L9 7.5 11 7z" />
      </svg>
    ),
  },
];

export function WhyUs() {
  return (
    <section className="relative isolate bg-[#edf1f5] py-20 lg:py-28">
      <div className="shell">
        {/* Heading + Description side-by-side */}
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan">Why Express Advertising</SectionLabel>
            <h2 className="display-lg mt-6 text-balance text-navy-900">
              Reliability is
              <br />
              <span className="text-ink">a production skill.</span>
            </h2>
          </Reveal>
          <Reveal from="up" delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="lede text-ink-2">
              Anyone can quote a print job — delivering it right, on time, every
              time is the discipline we are built around.
            </p>
          </Reveal>
        </div>

        {/* 2x2 Capability Cards Grid with Dedicated 3D Illustrations */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
          {capabilityCards.map((card, i) => (
            <Reveal key={card.title} from="up" delay={i * 0.08}>
              <article
                className={`group relative flex min-h-[290px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 ${card.cardBg} p-7 sm:p-9 shadow-sm transition-all duration-300 hover:shadow-md ${card.accent.border}`}
              >
                {/* Header: Icon + Number + Title — z-10 keeps text above the scaling illustration */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4">
                    <span
                      className={`grid size-14 shrink-0 place-items-center rounded-2xl ${card.accent.bg} ${card.accent.text} shadow-sm transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105`}
                    >
                      {card.icon}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body text with max-width to not overlap illustration */}
                  <p className="mt-6 max-w-[280px] text-sm leading-relaxed text-ink-2 sm:max-w-[320px] lg:max-w-[340px] sm:text-[0.9375rem]">
                    {card.body}
                  </p>
                </div>

                {/* Isometric Graphic on the right-bottom corner */}
                <div className="pointer-events-none absolute -bottom-1 -right-1 w-[46%] max-w-[240px] select-none sm:w-[48%] sm:max-w-[260px]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={280}
                    height={220}
                    className="h-auto w-full object-contain object-right-bottom transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bottom Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center gap-6 sm:gap-10 pt-4">
          {trustBadges.map((badge) => (
            <div key={badge.title + badge.subtitle} className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-white border border-slate-200/80 shadow-xs">
                {badge.icon}
              </span>
              <div className="text-xs sm:text-sm leading-tight">
                <span className="block font-bold text-navy-900">{badge.title}</span>
                <span className="text-ink-3">{badge.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

