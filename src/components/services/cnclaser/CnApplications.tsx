import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { CnIcon } from "./CnIcons";

const applications = [
  {
    label: "SIGNAGE COMPONENTS",
    body: "Cut letters, panels and dimensional sign elements.",
    icon: "letters3d",
    accent: "cyan",
  },
  {
    label: "RETAIL DISPLAYS",
    body: "Custom shapes and fabricated elements for branded environments.",
    icon: "display",
    accent: "magenta",
  },
  {
    label: "EXHIBITIONS",
    body: "Display components, panels and custom-fit visual structures.",
    icon: "exhibition",
    accent: "navy",
  },
  {
    label: "OFFICE & INTERIORS",
    body: "Engraved plates, decorative components and branded interior elements.",
    icon: "office",
    accent: "yellow",
  },
  {
    label: "PROTOTYPES & CUSTOM PIECES",
    body: "One-off fabricated parts based on approved digital artwork.",
    icon: "prototype",
    accent: "cyan",
  },
  {
    label: "REPEAT PRODUCTION",
    body: "Consistent cut components produced from the same approved file.",
    icon: "repeat",
    accent: "magenta",
  },
] as const;

const chipAccent: Record<string, string> = {
  cyan: "border-cyan/25 bg-cyan/8 text-cyan-bright group-hover:bg-cyan group-hover:border-cyan group-hover:text-white",
  magenta:
    "border-magenta/25 bg-magenta/8 text-magenta group-hover:bg-magenta group-hover:border-magenta group-hover:text-white",
  navy: "border-navy/25 bg-navy/8 text-navy group-hover:bg-navy group-hover:border-navy group-hover:text-white",
  yellow:
    "border-yellow/40 bg-yellow/10 text-[#c9a800] group-hover:bg-yellow group-hover:border-yellow group-hover:text-navy-900",
};

export function CnApplications() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.06)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[13vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9rem]"
      >
        APPLICATIONS
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan">Where precision matters</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Built For More Than
              <br />
              Just{" "}
              <span className="text-gradient-deep">Straight Lines.</span>
            </h2>
          </Reveal>
          <Reveal
            from="up"
            delay={0.12}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            <p className="lede text-ink-2">
              From single engraved plates to full component sets, precision
              fabrication supports signage, retail, exhibition and interior
              projects alike.
            </p>
          </Reveal>
        </div>

        {/* Application cards — icon chips + hover accents */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {applications.map((app, i) => (
            <Reveal key={app.label} from="up" delay={(i % 3) * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-rule/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_18px_45px_-18px_rgba(27,77,133,0.35)] sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-xl border transition-colors duration-300 ${
                      chipAccent[app.accent] ?? chipAccent.cyan
                    }`}
                  >
                    <CnIcon name={app.icon} className="size-6" />
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold tracking-tight text-navy-900">
                  {app.label}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-2">
                  {app.body}
                </p>

                {/* Bottom accent line — fills across on hover */}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[3px] w-0 bg-cyan transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
