import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { CnIcon } from "./CnIcons";

const processes = [
  {
    name: "CNC ROUTING",
    tagline:
      "Best suited to routed, milled or shaped components in materials such as acrylic, PVC, wood and selected panel products.",
    icon: "cnc",
    accent: "cyan",
    uses: [
      "Thicker materials",
      "Shaping",
      "Grooves",
      "Dimensional components",
      "Routed signage elements",
    ],
  },
  {
    name: "LASER CUTTING / ENGRAVING",
    tagline:
      "Best suited to fine detail, clean contour cutting and engraving on compatible materials.",
    icon: "laser",
    accent: "magenta",
    uses: [
      "Intricate shapes",
      "Fine detail",
      "Engraving",
      "Lettering",
      "Decorative components",
    ],
  },
] as const;

const panelAccent: Record<string, { bar: string; label: string; chip: string }> = {
  cyan: {
    bar: "from-cyan via-cyan/60 to-transparent",
    label: "text-cyan-bright",
    chip: "border-cyan/30 bg-cyan/10 text-cyan-bright",
  },
  magenta: {
    bar: "from-magenta via-magenta/60 to-transparent",
    label: "text-magenta",
    chip: "border-magenta/30 bg-magenta/10 text-magenta",
  },
};

export function CnCompare() {
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
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.06)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="navy">CNC vs laser</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Choose The Process
              <br />
              That Fits The{" "}
              <span className="text-gradient-deep">Material.</span>
            </h2>
          </Reveal>
          <Reveal
            from="up"
            delay={0.12}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            <p className="lede text-ink-2">
              Two digital production methods, two strengths. We recommend the
              right process once we know the material and the detail level
              your project needs.
            </p>
          </Reveal>
        </div>

        {/* Comparison panels */}
        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2">
          {processes.map((process, i) => {
            const a = panelAccent[process.accent] ?? panelAccent.cyan!;
            return (
              <Reveal key={process.name} from="up" delay={i * 0.12}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-rule/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_18px_45px_-18px_rgba(27,77,133,0.35)]">
                  {/* Top accent bar */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${a.bar}`}
                  />

                  <div className="p-8 sm:p-10">
                    <span
                      className={`grid size-16 place-items-center rounded-2xl border ${a.chip}`}
                    >
                      <CnIcon name={process.icon} className="size-9" />
                    </span>

                    <h3 className="mt-6 text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
                      {process.name}
                    </h3>

                    <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink-2">
                      {process.tagline}
                    </p>

                    <p className="label-wide mt-6 text-ink-3">Useful for</p>
                    <ul className="mt-3 grid max-w-md grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                      {process.uses.map((use) => (
                        <li
                          key={use}
                          className="flex items-center gap-2.5 text-sm text-ink-2"
                        >
                          <span className="size-1.5 shrink-0 rounded-full bg-cyan" />
                          {use}
                        </li>
                      ))}
                    </ul>
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
