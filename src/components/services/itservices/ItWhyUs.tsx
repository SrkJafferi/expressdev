import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { ItIcon } from "./ItIcons";

const benefits = [
  {
    title: "Practical Solutions",
    body: "Technology selected around real business requirements, not complexity.",
    icon: "compass",
    accent: "cyan",
  },
  {
    title: "Connected Capabilities",
    body: "Digital, design and physical production in one creative ecosystem.",
    icon: "workflow",
    accent: "magenta",
  },
  {
    title: "Ongoing Support",
    body: "Technical assistance and maintenance where included in the engagement.",
    icon: "headset",
    accent: "yellow",
  },
  {
    title: "UAE-Focused Service",
    body: "Technology support for businesses operating across the UAE.",
    icon: "pin",
    accent: "cyan",
  },
] as const;

const accentStyles: Record<string, { badge: string; fill: string; line: string }> = {
  cyan: {
    badge: "border-cyan/30 bg-cyan/10 text-cyan-bright",
    fill: "group-hover:bg-cyan group-hover:border-cyan group-hover:text-white",
    line: "bg-cyan",
  },
  magenta: {
    badge: "border-magenta/30 bg-magenta/10 text-magenta",
    fill: "group-hover:bg-magenta group-hover:border-magenta group-hover:text-white",
    line: "bg-magenta",
  },
  yellow: {
    badge: "border-yellow/40 bg-yellow/10 text-yellow",
    fill: "group-hover:bg-yellow group-hover:border-yellow group-hover:text-navy-900",
    line: "bg-yellow",
  },
};

export function ItWhyUs() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-24 text-white lg:py-32">
      {/* Ambient tint */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.12)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.08)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none whitespace-nowrap text-[13vw] font-extrabold leading-none tracking-tight text-white/[0.03] lg:text-[9rem]"
      >
        PROOF
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan" invert>
              Why Express Advertising
            </SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
              Technology With
              <br />
              A Business{" "}
              <span className="text-gradient-hero">Purpose.</span>
            </h2>
          </Reveal>
        </div>

        {/* 4-across benefit cards — big icon + title + short body */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {benefits.map((item, i) => {
            const a = accentStyles[item.accent] ?? accentStyles.cyan!;
            return (
              <Reveal key={item.title} from="up" delay={i * 0.1}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 sm:p-7">
                  <span
                    className={`grid size-16 shrink-0 place-items-center rounded-2xl border transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:scale-105 ${a.badge} ${a.fill}`}
                  >
                    <ItIcon name={item.icon} className="size-9" />
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
                    className={`mt-5 block h-[2px] w-10 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full ${a.line}`}
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
