import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { PrIcon } from "./PrIcons";

const benefits = [
  {
    title: "Product + Branding Guidance",
    body: "We help match the product and decoration method to your intended use.",
    icon: "compass",
    accent: "cyan",
  },
  {
    title: "Consistent Brand Application",
    body: "Artwork placement, colour and presentation coordinated across the range.",
    icon: "branding",
    accent: "magenta",
  },
  {
    title: "Campaign-Scale Production",
    body: "Suitable for individual gifting, events and larger campaigns.",
    icon: "scale",
    accent: "yellow",
  },
  {
    title: "UAE-Focused Service",
    body: "Promotional production for companies and events across the UAE.",
    icon: "campaign",
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

export function PrWhyUs() {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-24 lg:py-32">
      {/* Dotted grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(27,77,133,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        PROOF
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan">Why Express Advertising</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Merchandise That Feels
              <br />
              Like{" "}
              <span className="text-gradient-deep">Your Brand.</span>
            </h2>
          </Reveal>
        </div>

        {/* 4-across benefit cards — big icon + title + short body */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {benefits.map((item, i) => {
            const a = accentStyles[item.accent] ?? accentStyles.cyan!;
            return (
              <Reveal key={item.title} from="up" delay={i * 0.1}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rule/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/40 hover:shadow-[0_18px_45px_-18px_rgba(27,77,133,0.35)] sm:p-7">
                  <span
                    className={`grid size-16 shrink-0 place-items-center rounded-2xl border transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:scale-105 ${a.badge} ${a.fill}`}
                  >
                    <PrIcon name={item.icon} className="size-9" />
                  </span>

                  <h3 className="mt-5 text-base font-bold leading-tight tracking-tight text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-snug text-ink-2">
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
