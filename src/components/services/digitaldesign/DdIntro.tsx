import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { DdIcon } from "./DdIcons";

const proofPoints = [
  {
    label: "BRAND-LED THINKING",
    body: "Design built around identity, audience and purpose.",
    icon: "compass",
  },
  {
    label: "DIGITAL + PHYSICAL",
    body: "Creative systems prepared to work across screens and print.",
    icon: "hierarchy",
  },
  {
    label: "CONSISTENT VISUAL LANGUAGE",
    body: "Colours, type and layout coordinated across touchpoints.",
    icon: "palette",
  },
  {
    label: "PRODUCTION-AWARE DESIGN",
    body: "Artwork prepared with real-world output in mind.",
    icon: "layout",
  },
];

export function DdIntro() {
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
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Oversized watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[15vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[10rem]"
      >
        IDENTITY
      </span>

      <div className="shell relative z-10">
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-12">
          {/* ── Left — editorial content ────────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <Reveal from="up">
              <div className="flex items-center gap-3.5">
                <span aria-hidden className="h-px w-10 bg-cyan" />
                <SectionLabel accent="cyan">Design with purpose</SectionLabel>
                <span aria-hidden className="size-1.5 rounded-full bg-magenta" />
              </div>
            </Reveal>

            <Reveal from="up" delay={0.1}>
              <h2 className="display-md mt-7 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
                More Than
                <br />
                Making Things{" "}
                <span className="text-gradient-deep">Look Good.</span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.2}>
              <div className="mt-8 max-w-lg space-y-4">
                <p className="lede text-ink-2">
                  Good design helps people understand a brand before they
                  read a single line of copy.
                </p>
                <p className="lede text-ink-2">
                  Express Advertising creates digital design systems for
                  businesses across the UAE — from logos and brand identities
                  to UI/UX, social graphics and campaign creatives.
                </p>
                <p className="lede text-ink-2">
                  We combine visual clarity, consistency and commercial
                  thinking so the design works across websites, presentations,
                  social platforms, print and physical production.
                </p>
                <p className="lede text-ink-2">
                  Because our design team works alongside print, signage and
                  production, concepts can move from screen to finished
                  physical output without losing their visual intent.
                </p>
              </div>
            </Reveal>

            {/* Proof points — compact 2x2 grid */}
            <Reveal from="up" delay={0.3}>
              <div className="mt-10 grid max-w-lg grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {proofPoints.map((point) => (
                  <div key={point.label} className="group flex gap-3.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-cyan/25 bg-cyan/5 text-cyan-bright transition-colors duration-300 group-hover:bg-cyan group-hover:text-white">
                      <DdIcon name={point.icon} className="size-4.5" />
                    </span>
                    <div>
                      <p className="label-wide text-navy-900">{point.label}</p>
                      <p className="mt-1 text-[0.8125rem] leading-snug text-ink-3">
                        {point.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Right — bright design visual ────────────────────────── */}
          <Reveal
            from="right"
            delay={0.2}
            className="h-full lg:col-span-6 lg:col-start-7"
          >
            <div className="relative h-full min-h-[420px]">
              {/* Offset gradient frame */}
              <div
                aria-hidden
                className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-gradient-to-br from-cyan/15 via-transparent to-magenta/15"
              />

              <div className="group relative h-full overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(16,48,90,0.4)]">
                <Image
                  src="https://images.unsplash.com/photo-1633533451638-32f1e337d254?auto=format&fit=crop&w=1000&h=1250&q=85"
                  alt="Digital design workstation with brand identity and interface screens"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />

                {/* Bottom label strip */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/15 bg-navy-900/70 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="label-wide text-cyan-bright">
                      Digital Creative Suite
                    </p>
                    <p className="label-wide mt-0.5 text-white/50">
                      Identity · Interface · Campaigns
                    </p>
                  </div>
                  <span className="hidden shrink-0 gap-1.5 sm:flex">
                    <span className="size-2 rounded-full bg-cyan" />
                    <span className="size-2 rounded-full bg-magenta" />
                    <span className="size-2 rounded-full bg-yellow" />
                  </span>
                </div>
              </div>

              {/* Floating badge — top left */}
              <div className="absolute -left-4 top-6 rounded-xl border border-navy-100 bg-white/95 px-4 py-3 shadow-[0_14px_36px_-14px_rgba(16,48,90,0.35)] backdrop-blur-sm sm:-left-6">
                <p className="label-wide text-cyan">Design System</p>
                <p className="mt-0.5 text-[0.6875rem] font-semibold text-navy-900">
                  Logo · UI · Social · Brand
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
