import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CropMarks } from "@/components/ui/PrintMarks";
import { Reveal } from "@/components/motion/Reveal";

export function PrGifting() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-24 text-white lg:py-32">
      {/* Ambient tint */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.12)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.08)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none whitespace-nowrap text-[13vw] font-extrabold leading-none tracking-tight text-white/[0.03] lg:text-[9rem]"
      >
        PREMIUM
      </span>

      <div className="shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ── Left — editorial content ────────────────────────────── */}
          <div className="lg:col-span-6">
            <Reveal from="up">
              <SectionLabel accent="cyan" invert>
                When the gift needs to feel premium
              </SectionLabel>
            </Reveal>

            <Reveal from="up" delay={0.1}>
              <h2 className="display-md mt-7 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
                Presentation Is Part
                <br />
                Of The{" "}
                <span className="text-gradient-hero">Experience.</span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.2}>
              <div className="mt-8 max-w-lg space-y-4">
                <p className="lede text-white/65">
                  For executive gifts, awards and special campaigns, the way
                  an item is presented matters as much as the product itself.
                </p>
                <p className="lede text-white/65">
                  We can coordinate suitable branded presentation elements
                  such as gift boxes, sleeves, tags and supporting collateral
                  where required.
                </p>
              </div>
            </Reveal>

            {/* Premium detail list */}
            <Reveal from="up" delay={0.3}>
              <ul className="mt-8 space-y-3">
                {["Awards & Trophies", "Executive Pens", "Premium Diaries", "Presentation Boxes"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full border border-cyan/40 bg-cyan/10 text-cyan-bright">
                        <svg className="size-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="2.5 8.5 6 12 13.5 4" />
                        </svg>
                      </span>
                      <span className="text-sm font-medium text-white/80">
                        {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </Reveal>
          </div>

          {/* ── Right — luxury composition ──────────────────────────── */}
          <Reveal
            from="right"
            delay={0.2}
            className="h-full lg:col-span-6 lg:col-start-7"
          >
            <div className="relative h-full min-h-[420px]">
              {/* Offset gradient frame */}
              <div
                aria-hidden
                className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-gradient-to-br from-cyan/25 via-transparent to-yellow/15"
              />

              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_70px_-28px_rgba(0,0,0,0.6)]">
                <Image
                  src="https://images.unsplash.com/photo-1568912872277-31089abcfe50?auto=format&fit=crop&w=1000&h=1250&q=85"
                  alt="Premium crystal award and executive gift presentation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-transparent" />

                {/* Bottom dark caption strip */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/15 bg-navy-900/75 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="label-wide text-cyan-bright">
                      Executive Gifting
                    </p>
                    <p className="label-wide mt-0.5 text-white/55">
                      Awards · Pens · Diaries · Boxes
                    </p>
                  </div>
                  <CropMarks
                    color="white"
                    size={10}
                    className="hidden shrink-0 sm:block"
                  />
                </div>
              </div>

              {/* Floating badge — top left */}
              <div className="absolute -left-4 top-6 rounded-xl border border-white/20 bg-white/95 px-4 py-3 shadow-[0_16px_40px_-14px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:-left-6">
                <p className="label-wide text-cyan">Gift Sets Available</p>
                <p className="mt-0.5 text-[0.6875rem] font-semibold text-navy-900">
                  Curated · Coordinated · Presented
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
