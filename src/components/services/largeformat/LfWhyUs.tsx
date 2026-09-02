import { SectionLabel } from "@/components/ui/SectionLabel";
import { CropMarks, CmykTicks, RegistrationMark } from "@/components/ui/PrintMarks";
import { Reveal } from "@/components/motion/Reveal";
import { lfWhyUs } from "@/data/largeFormatPage";
import { LfIcon } from "./LfIcons";

const accentStyles: Record<string, {
  glow: string;
  beam: string;
  iconIdle: string;
  iconFill: string;
  ring: string;
  line: string;
}> = {
  cyan: {
    glow: "bg-[radial-gradient(ellipse_at_top,rgba(0,153,218,0.28)_0%,transparent_65%)]",
    beam: "via-cyan",
    iconIdle: "border-cyan/25 bg-cyan/[0.08] text-cyan-bright",
    iconFill: "group-hover:bg-cyan group-hover:border-cyan group-hover:text-white",
    ring: "shadow-[0_0_0_1px_rgba(0,153,218,0.12),0_18px_45px_-20px_rgba(0,153,218,0.55)]",
    line: "bg-cyan",
  },
  magenta: {
    glow: "bg-[radial-gradient(ellipse_at_top,rgba(236,39,144,0.24)_0%,transparent_65%)]",
    beam: "via-magenta",
    iconIdle: "border-magenta/25 bg-magenta/[0.08] text-magenta",
    iconFill: "group-hover:bg-magenta group-hover:border-magenta group-hover:text-white",
    ring: "shadow-[0_0_0_1px_rgba(236,39,144,0.12),0_18px_45px_-20px_rgba(236,39,144,0.5)]",
    line: "bg-magenta",
  },
  yellow: {
    glow: "bg-[radial-gradient(ellipse_at_top,rgba(255,241,18,0.18)_0%,transparent_65%)]",
    beam: "via-yellow",
    iconIdle: "border-yellow/30 bg-yellow/[0.07] text-yellow",
    iconFill: "group-hover:bg-yellow group-hover:border-yellow group-hover:text-navy-900",
    ring: "shadow-[0_0_0_1px_rgba(255,241,18,0.1),0_18px_45px_-20px_rgba(255,241,18,0.4)]",
    line: "bg-yellow",
  },
};

export function LfWhyUs() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-24 text-white lg:py-32">
      {/* Ambient tint */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.12)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.08)_0%,transparent_70%)]" />

      {/* Fine engineering grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none whitespace-nowrap text-[13vw] font-extrabold leading-none tracking-tight text-white/[0.03] lg:text-[9rem]"
      >
        PROOF
      </span>

      <div className="shell relative z-10">
        {/* ── Header — editorial split ─────────────────────────────── */}
        <div className="grid items-end gap-10 lg:grid-cols-12">
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

          <Reveal from="up" delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="lede text-white/60">
              Four disciplines, one production standard. Every large-format
              project is measured against the same colour, material and
              finishing expectations — whatever the size.
            </p>
            <div className="mt-6 flex items-center gap-5">
              <CmykTicks className="h-[3px] w-16" />
              <span className="label-wide text-white/45">
                Print · Finish · Install — In-House Coordination
              </span>
            </div>
          </Reveal>
        </div>

        {/* ── Premium glass benefit cards ──────────────────────────── */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:gap-6">
          {lfWhyUs.map((item, i) => {
            const a = accentStyles[item.accent] ?? accentStyles.cyan!;
            return (
              <Reveal key={item.index} from="up" delay={i * 0.09}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm transition-[transform,border-color,background-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.05] sm:p-8 lg:p-9">
                  {/* Accent spotlight — blooms on hover */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -top-28 left-1/2 h-56 w-[130%] -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-700 ease-[var(--ease-out-expo)] group-hover:opacity-100 ${a.glow}`}
                  />

                  {/* Top beam — sweeps in from the left on hover */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 ${a.beam}`}
                  />

                  {/* Crop-mark corner detail */}
                  <span aria-hidden className="absolute inset-3 opacity-20">
                    <CropMarks color="white" size={11} />
                  </span>

                  {/* Ghost index */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-4 right-5 select-none text-[5.5rem] font-extrabold leading-none tracking-tight text-white/[0.045] transition-colors duration-500 group-hover:text-white/[0.08]"
                  >
                    {item.index}
                  </span>

                  <div className="relative flex h-full flex-col">
                    {/* Icon tile */}
                    <span
                      className={`grid size-14 shrink-0 place-items-center rounded-2xl border transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:shadow-lg ${a.iconIdle} ${a.iconFill} ${a.ring}`}
                    >
                      <LfIcon name={item.icon} className="size-6" />
                    </span>

                    <h3 className="mt-7 text-base font-bold tracking-tight text-white sm:text-lg">
                      <span className="label-wide mr-2.5 align-middle text-white/35">
                        {item.index}
                      </span>
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                      {item.body}
                    </p>

                    {/* Accent underline — expands on hover */}
                    <span
                      aria-hidden
                      className={`mt-auto block h-[2px] w-10 pt-8 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-20 ${a.line}`}
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* ── Bottom credential strip ──────────────────────────────── */}
        <Reveal from="up" delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8 lg:mt-16">
            <div className="flex items-center gap-4">
              <RegistrationMark className="text-white/30" />
              <span className="label-wide text-white/45">
                Express Advertising — Large Format Division
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="label-wide text-white/30">Colour</span>
              <span className="size-1.5 rounded-full bg-cyan" />
                              <span className="label-wide text-white/30">Material</span>
              <span className="size-1.5 rounded-full bg-magenta" />
                              <span className="label-wide text-white/30">Finish</span>
              <span className="size-1.5 rounded-full bg-yellow" />
                              <span className="label-wide text-white/30">Install</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
