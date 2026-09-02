import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CropMarks, CmykTicks } from "@/components/ui/PrintMarks";
import { Reveal } from "@/components/motion/Reveal";

const stages = [
  {
    label: "DESIGN",
    caption: "Artwork & layout",
    icon: (
      <svg className="size-8" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m13 2 5 5-9.5 9.5L3 18l1.5-5.5z" />
        <path d="m12 3 5 5" />
      </svg>
    ),
  },
  {
    label: "PRE-PRESS",
    caption: "Proof & plates",
    icon: (
      <svg className="size-8" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="13" height="13" rx="1.5" />
        <path d="M6.5 7h7M6.5 10h7M6.5 13h4" />
      </svg>
    ),
  },
  {
    label: "PRINT",
    caption: "Colour-managed run",
    icon: (
      <svg className="size-8" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5.5 7V3h9v4" />
        <rect x="3.5" y="7" width="13" height="7" rx="1.5" />
        <path d="M5.5 12v5h9v-5" />
        <circle cx="14" cy="9.75" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "FINISH",
    caption: "Laminate · Foil · Cut",
    icon: (
      <svg className="size-8" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5.5" cy="5.5" r="2" />
        <circle cx="5.5" cy="14.5" r="2" />
        <path d="M7 7l10 10M7 13 17 3" />
      </svg>
    ),
  },
];

export function PrintShowcase() {
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
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Oversized watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        CONSISTENCY
      </span>

      <div className="shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* ── Left — editorial content ────────────────────────────── */}
          <div className="lg:col-span-6">
            <Reveal from="up">
              <SectionLabel accent="navy">One brand, one standard</SectionLabel>
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
              <div className="mt-6 max-w-lg space-y-4">
                <p className="lede text-ink-2">
                  Your stationery, brochures, vouchers and promotional print
                  should all feel like they came from the same brand. We manage
                  artwork preparation, colour, paper and finishing so every item
                  works together.
                </p>
                <p className="lede text-ink-2">
                  From the first proof to the final piece, every detail is
                  checked for consistency, accuracy and finish. This ensures
                  your brand looks polished and recognisable across every
                  printed touchpoint.
                </p>
                <p className="lede text-ink-2">
                  With production handled under one roof, we maintain tighter
                  control over quality, colour and turnaround at every stage.
                  The result is professional print that strengthens your
                  identity and delivers a consistent brand experience across
                  the UAE.
                </p>
              </div>
            </Reveal>

            {/* Production route — technical dashed line with captions */}
            <Reveal from="up" delay={0.3}>
              <div className="relative mt-12 max-w-lg">
                {/* Connecting dashed route — aligned to icon centres, draws on load */}
                <svg
                  aria-hidden
                  className="absolute left-2 right-2 top-8 h-0.5 w-[calc(100%-1rem)]"
                  viewBox="0 0 400 2"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 1H400"
                    stroke="var(--color-cyan)"
                    strokeWidth="1.5"
                    strokeDasharray="6 5"
                    className="route-line"
                    pathLength="1"
                  />
                </svg>

                <ul className="flex items-start justify-between">
                  {stages.map((stage, i) => (
                    <li
                      key={stage.label}
                      className="flex w-1/4 flex-col items-center gap-2.5"
                    >
                      <span
                        className={`relative z-10 grid size-16 place-items-center rounded-full border-2 bg-surface shadow-[0_4px_12px_-4px_rgba(16,48,90,0.2)] transition-colors duration-300 ${
                          i === 0
                            ? "border-cyan text-cyan-bright"
                            : "border-cyan/40 text-cyan/60"
                        }`}
                      >
                        {stage.icon}
                      </span>
                      <span className="label-wide text-navy-900">
                        {stage.label}
                      </span>
                      <span className="text-center text-[0.6875rem] leading-tight text-ink-3">
                        {stage.caption}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Credential strip */}
            <Reveal from="up" delay={0.4}>
              <div className="mt-12 flex items-center gap-5">
                <CmykTicks className="h-[3px] w-16" />
                <span className="label-wide text-ink-3">
                  Every item checked against the same approved proof
                </span>
              </div>
            </Reveal>
          </div>

          {/* ── Right — compact layered image ───────────────────────── */}
          <Reveal
            from="right"
            delay={0.2}
            className="lg:col-span-6 lg:col-start-7"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Offset gradient frame */}
              <div
                aria-hidden
                className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-gradient-to-br from-cyan/20 via-transparent to-magenta/20"
              />

              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(16,48,90,0.4)]">
                <Image
                  src="/brandpromo.webp"
                  alt="Premium printed brand collateral produced by Express Advertising"
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/45 via-transparent to-transparent" />

                {/* Bottom label strip inside image */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/15 bg-navy-900/70 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="text-xs font-bold text-white sm:text-sm">
                      Brand Collateral Suite
                    </p>
                    <p className="label-wide mt-0.5 text-white/50">
                      Cards · Stationery · Profiles
                    </p>
                  </div>
                  <CropMarks color="white" size={10} className="hidden shrink-0 sm:block" />
                </div>
              </div>

              {/* Floating accent chip — top left */}
              <div className="absolute -left-4 top-6 rounded-xl border border-navy-100 bg-white/95 px-4 py-3 shadow-[0_14px_36px_-14px_rgba(16,48,90,0.35)] backdrop-blur-sm sm:-left-6">
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
