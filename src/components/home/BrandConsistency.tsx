import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CropMarks, CmykTicks } from "@/components/ui/PrintMarks";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Premium brand-consistency editorial section.
 * Two-column: editorial process timeline (left) + layered collateral
 * presentation card (right). Light premium aesthetic per reference.
 */

const stages = [
  {
    index: "01",
    label: "DESIGN",
    caption: "Artwork & layout",
    accent: "cyan",
    icon: (
      <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m13 2 5 5-9.5 9.5L3 18l1.5-5.5z" />
        <path d="m12 3 5 5" />
      </svg>
    ),
  },
  {
    index: "02",
    label: "PRE-PRESS",
    caption: "Proof & plates",
    accent: "magenta",
    icon: (
      <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="13" height="13" rx="1.5" />
        <path d="M6.5 7h7M6.5 10h7M6.5 13h4" />
      </svg>
    ),
  },
  {
    index: "03",
    label: "PRINT",
    caption: "Colour-managed run",
    accent: "navy",
    icon: (
      <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5.5 7V3h9v4" />
        <rect x="3.5" y="7" width="13" height="7" rx="1.5" />
        <path d="M5.5 12v5h9v-5" />
        <circle cx="14" cy="9.75" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    index: "04",
    label: "FINISH",
    caption: "Laminate · Foil · Cut",
    accent: "yellow",
    icon: (
      <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="5.5" r="2" />
        <circle cx="5.5" cy="14.5" r="2" />
        <path d="M7 7l10 10M7 13 17 3" />
      </svg>
    ),
  },
];

const accentRing: Record<string, string> = {
  cyan: "border-cyan/50 text-cyan-bright group-hover:border-cyan group-hover:bg-cyan group-hover:text-white",
  magenta:
    "border-magenta/50 text-magenta group-hover:border-magenta group-hover:bg-magenta group-hover:text-white",
  navy: "border-navy/50 text-navy group-hover:border-navy group-hover:bg-navy group-hover:text-white",
  yellow:
    "border-yellow/60 text-[#c9a800] group-hover:border-yellow group-hover:bg-yellow group-hover:text-navy-900",
};

export function BrandConsistency() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f8ff] py-24 lg:py-32">
      {/* Soft dotted texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(27,77,133,0.06) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Faint oversized background word */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-10 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.04] lg:text-[10rem]"
      >
        CONSISTENCY
      </span>

      <div className="shell relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-14">
          {/* ── LEFT — editorial process ────────────────────────────── */}
          <div className="lg:col-span-6">
            <Reveal from="up">
              <div className="flex items-center gap-3.5">
                <span aria-hidden className="h-px w-10 bg-cyan" />
                <SectionLabel accent="cyan">
                  One Brand, One Standard
                </SectionLabel>
                <span aria-hidden className="size-1.5 rounded-full bg-magenta" />
              </div>
            </Reveal>

            <Reveal from="up" delay={0.1}>
              <h2 className="display-md mt-7 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
                Consistency From
                <br />
                Card To{" "}
                <span className="text-gradient-deep">Campaign.</span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.2}>
              <p className="lede mt-6 max-w-lg text-ink-2">
                Your stationery, brochures, vouchers and promotional print
                should all feel like they came from the same brand. We manage
                artwork preparation, colour, paper and finishing so every item
                works together.
              </p>
            </Reveal>

            {/* Process timeline — 4 circular icon points */}
            <Reveal from="up" delay={0.3}>
              <ol className="relative mt-12 grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4 sm:gap-x-4">
                {/* Connecting hairline (desktop only) */}
                <span
                  aria-hidden
                  className="absolute left-0 right-[12%] top-[26px] hidden border-t border-dashed border-cyan/40 sm:block"
                />

                {stages.map((stage) => (
                  <li
                    key={stage.index}
                    className="group relative flex flex-col items-start"
                  >
                    {/* Circular icon point */}
                    <span
                      className={`relative z-10 grid size-[54px] place-items-center rounded-full border-2 bg-white shadow-[0_6px_18px_-8px_rgba(16,48,90,0.25)] transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 ${accentRing[stage.accent]}`}
                    >
                      {stage.icon}
                    </span>

                    <span className="mt-4 text-[0.6875rem] font-bold tabular-nums tracking-[0.18em] text-ink-3">
                      {stage.index}
                    </span>
                    <span className="mt-1 text-sm font-bold tracking-tight text-navy-900">
                      {stage.label}
                    </span>
                    <span className="mt-1 text-[0.75rem] leading-snug text-ink-3">
                      {stage.caption}
                    </span>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* CMYK accent line + bottom note */}
            <Reveal from="up" delay={0.4}>
              <div className="mt-12 border-t border-rule/70 pt-6">
                <div className="flex items-center gap-5">
                  <CmykTicks className="h-[3px] w-16" />
                  <span className="label-wide text-ink-3">
                    Every item checked against the same approved proof
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT — layered collateral presentation ─────────────── */}
          <Reveal
            from="right"
            delay={0.2}
            className="lg:col-span-5 lg:col-start-8"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Offset tint frame */}
              <div
                aria-hidden
                className="absolute -right-4 -top-4 h-full w-full rounded-2xl border border-cyan/15 bg-gradient-to-br from-cyan/10 via-transparent to-magenta/10"
              />

              {/* Main image card */}
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/60 shadow-[0_30px_70px_-28px_rgba(16,48,90,0.45)]">
                <Image
                  src="/brandpromo.webp"
                  alt="Corporate brand collateral suite — business cards, folders, letterheads and printed profiles"
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/45 via-transparent to-transparent" />

                {/* Bottom dark caption strip */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/15 bg-navy-900/75 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="label-wide text-cyan-bright">
                      Brand Collateral Suite
                    </p>
                    <p className="label-wide mt-1 text-white/55">
                      Cards · Stationery · Profiles
                    </p>
                  </div>
                  <CropMarks
                    color="white"
                    size={10}
                    className="hidden shrink-0 sm:block"
                  />
                </div>
              </div>

              {/* Floating top badge card */}
              <div className="absolute -left-4 top-6 rounded-xl border border-navy-100 bg-white/95 px-4 py-3 shadow-[0_16px_40px_-14px_rgba(16,48,90,0.35)] backdrop-blur-sm sm:-left-8">
                <p className="label-wide text-cyan">100% In-House</p>
                <p className="mt-0.5 text-[0.6875rem] font-semibold text-navy-900">
                  Prepared · Proofed · Finished
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
