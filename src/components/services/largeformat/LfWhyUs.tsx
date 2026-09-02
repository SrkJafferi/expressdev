import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { lfWhyUs } from "@/data/largeFormatPage";
import { LfIcon } from "./LfIcons";

const accentStyles: Record<string, { badge: string; fill: string; num: string; line: string }> = {
  cyan: {
    badge: "border-cyan/30 bg-cyan/10 text-cyan-bright",
    fill: "group-hover:bg-cyan group-hover:border-cyan group-hover:text-white",
    num: "text-cyan/20 group-hover:text-cyan/40",
    line: "bg-cyan",
  },
  magenta: {
    badge: "border-magenta/30 bg-magenta/10 text-magenta",
    fill: "group-hover:bg-magenta group-hover:border-magenta group-hover:text-white",
    num: "text-magenta/20 group-hover:text-magenta/40",
    line: "bg-magenta",
  },
  yellow: {
    badge: "border-yellow/40 bg-yellow/10 text-yellow",
    fill: "group-hover:bg-yellow group-hover:border-yellow group-hover:text-navy-900",
    num: "text-yellow/25 group-hover:text-yellow/45",
    line: "bg-yellow",
  },
};

export function LfWhyUs() {
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
              Made To Be Seen.
              <br />
              Produced To{" "}
              <span className="text-gradient-hero">Perform.</span>
            </h2>
          </Reveal>
        </div>

        {/* 2x2 benefit blocks — open editorial rows */}
        <div className="mt-14 grid gap-x-14 lg:mt-16 lg:grid-cols-2">
          {lfWhyUs.map((item, i) => {
            const a = accentStyles[item.accent] ?? accentStyles.cyan!;
            return (
              <Reveal key={item.index} from="up" delay={(i % 2) * 0.1}>
                <article
                  className={`group relative py-8 ${
                    i > 1 ? "lg:border-t lg:border-white/10" : ""
                  } ${i % 2 === 1 ? "lg:border-t lg:border-white/10" : ""} border-t border-white/10 lg:!border-t-0 first:border-t-0 lg:first:border-t-0`}
                >
                  <div className="flex items-start gap-5">
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-xl border transition-colors duration-300 ${a.badge} ${a.fill}`}
                    >
                      <LfIcon name={item.icon} className="size-6" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">
                          {item.title}
                        </h3>
                        <span
                          aria-hidden
                          className={`select-none text-2xl font-extrabold leading-none tracking-tight transition-colors duration-300 ${a.num}`}
                        >
                          {item.index}
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm leading-relaxed text-white/60">
                        {item.body}
                      </p>
                    </div>
                  </div>

                  {/* Accent underline — expands on hover */}
                  <span
                    aria-hidden
                    className={`mt-5 block h-[2px] w-10 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-20 ${a.line}`}
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
