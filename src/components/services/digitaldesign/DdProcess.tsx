import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { DdIcon } from "./DdIcons";

const steps = [
  {
    index: "01",
    label: "DISCOVER",
    caption: "Brand · Audience · Objective",
    icon: "discover",
    accent: "border-cyan text-cyan-bright",
  },
  {
    index: "02",
    label: "DEFINE",
    caption: "Direction · Style · System",
    icon: "define",
    accent: "border-magenta/60 text-magenta",
  },
  {
    index: "03",
    label: "DESIGN",
    caption: "Identity · Interface · Creative",
    icon: "design",
    accent: "border-navy/50 text-navy",
  },
  {
    index: "04",
    label: "REFINE",
    caption: "Review · Adapt · Deliver",
    icon: "refine",
    accent: "border-yellow/70 text-[#c9a800]",
  },
] as const;

export function DdProcess() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.06)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        PROCESS
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan">Digital design process</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              From Idea
              <br />
              To Visual{" "}
              <span className="text-gradient-deep">System.</span>
            </h2>
          </Reveal>
          <Reveal
            from="up"
            delay={0.12}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            <p className="lede text-ink-2">
              Strong design starts with understanding the business, audience
              and application before choosing colours, type or layout.
            </p>
          </Reveal>
        </div>

        {/* 2x2 / 4-across circular node timeline with bezier connector */}
        <Reveal from="up" delay={0.2}>
          <ol className="relative mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-x-16 gap-y-10 lg:grid-cols-4">
            {/* Connecting line — desktop only, behind nodes */}
            <span
              aria-hidden
              className="absolute left-[12%] right-[12%] top-12 hidden border-t-2 border-dashed border-cyan/35 lg:block"
            />

            {steps.map((step) => (
              <li
                key={step.index}
                className="group relative flex flex-col items-center text-center"
              >
                <span
                  className={`relative z-10 grid size-24 place-items-center rounded-full border-[2.5px] bg-white shadow-[0_6px_18px_-8px_rgba(16,48,90,0.25)] transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 ${step.accent}`}
                >
                  <DdIcon name={step.icon} className="size-16" />
                </span>

                <span className="mt-4 text-sm font-bold tracking-tight text-navy-900">
                  {step.label}
                </span>
                <span className="mt-1 text-[0.75rem] leading-snug text-ink-3">
                  {step.caption}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Bottom micro-copy */}
        <Reveal from="up" delay={0.3}>
          <p className="label-wide mt-14 text-center text-ink-3">
            Every design built around a clear visual direction
          </p>
        </Reveal>
      </div>
    </section>
  );
}
