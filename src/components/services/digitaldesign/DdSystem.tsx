import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { DdIcon } from "./DdIcons";

const systemCards = [
  {
    name: "LOGO SYSTEM",
    note: "Primary, secondary and appropriate logo applications.",
    icon: "logo",
    accent: "cyan",
  },
  {
    name: "COLOUR PALETTE",
    note: "Brand colours selected for consistency across digital and physical use.",
    icon: "palette",
    accent: "magenta",
  },
  {
    name: "TYPOGRAPHY",
    note: "Type hierarchy that supports recognition, clarity and tone.",
    icon: "typography",
    accent: "navy",
  },
  {
    name: "GRAPHIC LANGUAGE",
    note: "Shapes, lines, patterns and visual elements that give the brand personality.",
    icon: "language",
    accent: "yellow",
  },
  {
    name: "LAYOUT SYSTEM",
    note: "Consistent structure for presentations, social media and marketing material.",
    icon: "layout",
    accent: "cyan",
  },
  {
    name: "IMAGE DIRECTION",
    note: "A defined visual style for photography and supporting imagery.",
    icon: "imagery",
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

export function DdSystem() {
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
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.06)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        SYSTEM
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan">Build the system</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              A Logo Is Only
              <br />
              The{" "}
              <span className="text-gradient-deep">Beginning.</span>
            </h2>
          </Reveal>
          <Reveal
            from="up"
            delay={0.12}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            <p className="lede text-ink-2">
              A strong identity needs more than one mark. It needs colours,
              typography, layout rules and visual elements that work together
              consistently.
            </p>
          </Reveal>
        </div>

        {/* Identity system cards — icon chips + hover accent */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {systemCards.map((card, i) => (
            <Reveal key={card.name} from="up" delay={(i % 3) * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-rule/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_18px_45px_-18px_rgba(27,77,133,0.35)] sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-xl border transition-colors duration-300 ${
                      chipAccent[card.accent] ?? chipAccent.cyan
                    }`}
                  >
                    <DdIcon name={card.icon} className="size-6" />
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold tracking-tight text-navy-900">
                  {card.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-2">
                  {card.note}
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
