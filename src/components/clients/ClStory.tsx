import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const proofs = [
  {
    title: "Brand Familiarity",
    body: "We work from established brand assets and approved visual direction.",
    icon: (
      <svg className="size-9" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="13" />
        <path d="M18 11v7l5 3" />
      </svg>
    ),
    accent: "cyan",
  },
  {
    title: "Multi-Service Support",
    body: "Print, signage, promotional items, displays and digital design connect within one workflow.",
    icon: (
      <svg className="size-9" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="4" />
        <rect x="24" y="4" width="8" height="8" rx="1.5" />
        <rect x="24" y="24" width="8" height="8" rx="1.5" />
        <circle cx="8" cy="28" r="4" />
        <path d="M11 9h11M11 27h11M8 12v12" />
      </svg>
    ),
    accent: "magenta",
  },
  {
    title: "Production Continuity",
    body: "Repeat requirements can follow previously approved specifications where appropriate.",
    icon: (
      <svg className="size-9" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m28 6 4 4-4 4" />
        <path d="M4 17v-2a5 5 0 0 1 5-5h23" />
        <path d="m8 30-4-4 4-4" />
        <path d="M32 19v2a5 5 0 0 1-5 5H4" />
      </svg>
    ),
    accent: "yellow",
  },
  {
    title: "One Point Of Coordination",
    body: "A more connected process across multiple physical brand touchpoints.",
    icon: (
      <svg className="size-9" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="4" />
        <circle cx="18" cy="5" r="2.5" />
        <circle cx="31" cy="18" r="2.5" />
        <circle cx="18" cy="31" r="2.5" />
        <circle cx="5" cy="18" r="2.5" />
        <path d="M18 7.5v6.5M23 18h5.5M18 22.5V28.5M13 18H7.5" />
      </svg>
    ),
    accent: "cyan",
  },
] as const;

const accentStyles: Record<string, { badge: string; fill: string }> = {
  cyan: {
    badge: "border-cyan/30 bg-cyan/10 text-cyan-bright",
    fill: "group-hover:bg-cyan group-hover:border-cyan group-hover:text-white",
  },
  magenta: {
    badge: "border-magenta/30 bg-magenta/10 text-magenta",
    fill: "group-hover:bg-magenta group-hover:border-magenta group-hover:text-white",
  },
  yellow: {
    badge: "border-yellow/40 bg-yellow/10 text-yellow",
    fill: "group-hover:bg-yellow group-hover:border-yellow group-hover:text-navy-900",
  },
};

export function ClStory() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-24 text-white lg:py-32">
      {/* Ambient tint */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.12)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.08)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none whitespace-nowrap text-[13vw] font-extrabold leading-none tracking-tight text-white/[0.03] lg:text-[9rem]"
      >
        CONTINUITY
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan" invert>
              More than a supplier
            </SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
              Built To Support
              <br />
              The Next{" "}
              <span className="text-gradient-hero">Requirement Too.</span>
            </h2>
            <p className="lede mt-5 max-w-xl text-white/60">
              The strongest production relationships are built when every new
              requirement does not have to start from zero.
            </p>
          </Reveal>
        </div>

        {/* 4-across proof cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {proofs.map((item, i) => {
            const a = accentStyles[item.accent] ?? accentStyles.cyan!;
            return (
              <Reveal key={item.title} from="up" delay={i * 0.1}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 sm:p-7">
                  <span
                    className={`grid size-16 shrink-0 place-items-center rounded-2xl border transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:scale-105 ${a.badge} ${a.fill}`}
                  >
                    {item.icon}
                  </span>

                  <h3 className="mt-5 text-base font-bold leading-tight tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-snug text-white/60">
                    {item.body}
                  </p>

                  {/* Accent underline — expands on hover */}
                  <span
                    aria-hidden
                    className={`mt-5 block h-[2px] w-10 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full ${a.badge.split(" ").find((c) => c.includes("text-"))?.replace("text-", "bg-") ?? "bg-cyan"}`}
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
