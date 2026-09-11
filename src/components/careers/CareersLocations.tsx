import { PinIcon } from "@/components/ui/Icons";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CmykTicks } from "@/components/ui/PrintMarks";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Team presence — verified locations only (mirrors the Contact page
 * network). No hiring details invented, no "Safiz" references.
 *
 * Layout: three premium location cards on a light section. The section sits
 * between CareersValues (grey) and CareersCta (navy), so it stays light to
 * keep the page rhythm; depth comes from accent glows, ghost country codes
 * and a CMYK summary rail instead of a dark background.
 */

type Accent = "cyan" | "magenta" | "yellow";

const locations: {
  country: string;
  code: string;
  city: string;
  role: string;
  accent: Accent;
}[] = [
  { country: "UAE", code: "AE", city: "Ajman", role: "Production Base", accent: "cyan" },
  { country: "Pakistan", code: "PK", city: "Islamabad", role: "Coordination Office", accent: "magenta" },
  { country: "Pakistan", code: "PK", city: "Karachi", role: "Headquarters", accent: "yellow" },
];

const accentStyles: Record<
  Accent,
  { pin: string; chip: string; glow: string; bar: string; dot: string }
> = {
  cyan: {
    pin: "border-cyan/30 bg-cyan/[0.07] text-cyan",
    chip: "border-cyan/25 bg-cyan/[0.06] text-cyan",
    glow: "bg-[radial-gradient(circle,rgba(0,153,218,0.20)_0%,transparent_70%)]",
    bar: "bg-cyan",
    dot: "bg-cyan",
  },
  magenta: {
    pin: "border-magenta/30 bg-magenta/[0.07] text-magenta",
    chip: "border-magenta/25 bg-magenta/[0.06] text-magenta",
    glow: "bg-[radial-gradient(circle,rgba(236,39,144,0.18)_0%,transparent_70%)]",
    bar: "bg-magenta",
    dot: "bg-magenta",
  },
  yellow: {
    pin: "border-yellow/45 bg-yellow/[0.14] text-[#b8a400]",
    chip: "border-yellow/45 bg-yellow/[0.14] text-[#b8a400]",
    glow: "bg-[radial-gradient(circle,rgba(255,241,18,0.22)_0%,transparent_70%)]",
    bar: "bg-yellow",
    dot: "bg-yellow",
  },
};

export function CareersLocations() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24 lg:py-32">
      {/* Ambient tint + fine dotted map texture */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.08)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.06)_0%,transparent_70%)]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,black,transparent)]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(27,77,133,0.10) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="shell relative z-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal from="up">
              <SectionLabel accent="yellow">Where we work</SectionLabel>
            </Reveal>
            <Reveal from="up" delay={0.08}>
              <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
                Connected Across
                <br />
                The UAE{" "}
                <span className="text-gradient-deep">And Pakistan.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal from="up" delay={0.16} className="lg:col-span-5 lg:self-end">
            <p className="lede text-ink-2 lg:pb-2">
              Our teams and coordination points support creative, production
              and business operations across multiple locations.
            </p>
          </Reveal>
        </div>

        {/* Location cards */}
        <ul className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {locations.map((loc, i) => {
            const a = accentStyles[loc.accent];
            return (
              <Reveal as="li" key={`${loc.city}-${i}`} delay={0.08 * i} from="up">
                <article className="group relative h-full overflow-hidden rounded-2xl border border-[#e4ebf5] bg-white p-7 shadow-[0_16px_40px_-24px_rgba(16,48,90,0.28)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-navy-300 hover:shadow-[0_30px_60px_-26px_rgba(16,48,90,0.38)]">
                  {/* Accent glow — blooms on hover */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-0 blur-2xl transition-opacity duration-700 ease-[var(--ease-out-expo)] group-hover:opacity-100 ${a.glow}`}
                  />

                  {/* Ghost country code */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-5 top-3 select-none text-[3.25rem] font-extrabold leading-none tracking-tight text-navy/[0.055] transition-colors duration-500 group-hover:text-navy/[0.09]"
                  >
                    {loc.code}
                  </span>

                  <div className="relative">
                    <span
                      className={`grid size-12 place-items-center rounded-full border transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105 ${a.pin}`}
                    >
                      <PinIcon className="size-5" />
                    </span>

                    <p className="mt-6 text-2xl font-extrabold tracking-tight text-navy-900">
                      {loc.city}
                    </p>
                    <p className="label-wide mt-1.5 text-ink-3">{loc.country}</p>

                    <p
                      className={`label-wide mt-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${a.chip}`}
                    >
                      <span aria-hidden className={`size-1.5 rounded-full ${a.dot}`} />
                      {loc.role}
                    </p>
                  </div>

                  {/* Accent underline — expands on hover */}
                  <span
                    aria-hidden
                    className={`mt-6 block h-[2px] w-10 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-20 ${a.bar}`}
                  />
                </article>
              </Reveal>
            );
          })}
        </ul>

        {/* Summary rail */}
        <Reveal from="up" delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-[#e9eff7] pt-8 lg:mt-16">
            <div className="flex items-center gap-5">
              <CmykTicks className="h-[3px] w-16" />
              <span className="label-wide text-ink-3">
                3 Locations · 2 Countries · One Coordinated Team
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {locations.map((loc) => (
                <span
                  key={`rail-${loc.city}`}
                  className="label-wide inline-flex items-center gap-2 text-ink-3"
                >
                  <span
                    aria-hidden
                    className={`size-1.5 rounded-full ${accentStyles[loc.accent].dot}`}
                  />
                  {loc.city}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
