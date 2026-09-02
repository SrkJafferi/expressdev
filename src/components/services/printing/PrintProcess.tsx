import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { printProcess } from "@/data/printingPage";

const stepMeta = [
  {
    accent: "cyan",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15.5 2.5 6 6L9 21H3v-6z" />
        <path d="m14 4 6 6" />
      </svg>
    ),
  },
  {
    accent: "magenta",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
        <path d="m14.5 15.5 1.5 1.5 3-3" />
      </svg>
    ),
  },
  {
    accent: "navy",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 8V3h10v5" />
        <rect x="4" y="8" width="16" height="9" rx="2" />
        <path d="M7 14v7h10v-7" />
        <circle cx="17" cy="11" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    accent: "yellow",
    icon: (
      <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7h11v10H3z" />
        <path d="M14 10h4l3 3v4h-7" />
        <circle cx="7" cy="19" r="1.75" />
        <circle cx="17.5" cy="19" r="1.75" />
      </svg>
    ),
  },
];

const accentStyles: Record<string, { badge: string; fill: string; num: string; line: string; glow: string }> = {
  cyan: {
    badge: "border-cyan/25 bg-cyan/8 text-cyan-bright",
    fill: "group-hover:bg-cyan group-hover:border-cyan group-hover:text-white",
    num: "text-cyan/12 group-hover:text-cyan/25",
    line: "bg-cyan",
    glow: "group-hover:shadow-[0_18px_45px_-16px_rgba(0,153,218,0.4)] group-hover:border-cyan/50",
  },
  magenta: {
    badge: "border-magenta/25 bg-magenta/8 text-magenta",
    fill: "group-hover:bg-magenta group-hover:border-magenta group-hover:text-white",
    num: "text-magenta/12 group-hover:text-magenta/25",
    line: "bg-magenta",
    glow: "group-hover:shadow-[0_18px_45px_-16px_rgba(236,39,144,0.4)] group-hover:border-magenta/50",
  },
  navy: {
    badge: "border-navy/25 bg-navy/8 text-navy",
    fill: "group-hover:bg-navy group-hover:border-navy group-hover:text-white",
    num: "text-navy/12 group-hover:text-navy/25",
    line: "bg-navy",
    glow: "group-hover:shadow-[0_18px_45px_-16px_rgba(27,77,133,0.4)] group-hover:border-navy/50",
  },
  yellow: {
    badge: "border-yellow/40 bg-yellow/10 text-[#c9a800]",
    fill: "group-hover:bg-yellow group-hover:border-yellow group-hover:text-navy-900",
    num: "text-yellow/18 group-hover:text-yellow/35",
    line: "bg-yellow",
    glow: "group-hover:shadow-[0_18px_45px_-16px_rgba(229,160,0,0.4)] group-hover:border-yellow/60",
  },
};

export function PrintProcess() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
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
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.06)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />

      {/* Oversized watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        WORKFLOW
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan">How we handle your print job</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              From File To{" "}
              <span className="text-gradient-deep">Finished Piece.</span>
            </h2>
          </Reveal>
          <Reveal
            from="up"
            delay={0.12}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            <p className="lede text-ink-2">
              A short, controlled production path — four stages between your
              artwork and the delivered box.
            </p>
          </Reveal>
        </div>

        {/* Technical 4-step rail with connector arrows */}
        <div className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {printProcess.map((step, i) => {
            const meta = stepMeta[i] ?? stepMeta[0]!;
            const a =
              accentStyles[meta.accent as keyof typeof accentStyles] ??
              accentStyles.cyan!;
            return (
              <Reveal key={step.index} from="up" delay={i * 0.1} className="relative">
                {/* Connector chevron between cards (desktop) */}
                {i < printProcess.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-[18px] top-1/2 z-10 hidden -translate-y-1/2 lg:block"
                  >
                    <svg
                      className="size-5 text-cyan"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 3l6 7-6 7" />
                    </svg>
                  </span>
                )}

                <article
                  className={`group relative h-full overflow-hidden rounded-2xl border border-rule/70 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 sm:p-8 ${a.glow}`}
                >
                  {/* Header — icon badge + ghost numeral */}
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid size-12 place-items-center rounded-xl border transition-colors duration-300 ${a.badge} ${a.fill}`}
                    >
                      {meta.icon}
                    </span>
                    <span
                      aria-hidden
                      className={`select-none text-4xl font-extrabold leading-none tracking-tight transition-colors duration-300 ${a.num}`}
                    >
                      {step.index}
                    </span>
                  </div>

                  <h3 className="mt-6 text-base font-bold tracking-tight text-navy-900 sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-2">
                    {step.body}
                  </p>

                  {/* Bottom accent line — fills across on hover */}
                  <span
                    aria-hidden
                    className={`absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full ${a.line}`}
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
