import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CropMarks, CmykTicks } from "@/components/ui/PrintMarks";
import { Reveal } from "@/components/motion/Reveal";

export function ReConsistency() {
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

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-6 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        CAMPAIGN
      </span>

      <div className="shell relative z-10">
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-12">
          {/* ── Left — editorial content ────────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <Reveal from="up">
              <div className="flex items-center gap-3.5">
                <span aria-hidden className="h-px w-10 bg-cyan" />
                <SectionLabel accent="navy">
                  One campaign. Every surface.
                </SectionLabel>
                <span aria-hidden className="size-1.5 rounded-full bg-magenta" />
              </div>
            </Reveal>

            <Reveal from="up" delay={0.1}>
              <h2 className="display-md mt-7 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
                Consistency From
                <br />
                Entrance To{" "}
                <span className="text-gradient-deep">Experience.</span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.2}>
              <div className="mt-8 max-w-lg space-y-4">
                <p className="lede text-ink-2">
                  A customer may first see your brand on the storefront, then
                  on a promotional counter, wall graphic, backdrop or event
                  display. Every element should still feel like part of the
                  same campaign.
                </p>
                <p className="lede text-ink-2">
                  We coordinate scale, colour, artwork and production across
                  different surfaces so the visual language stays consistent
                  throughout the environment.
                </p>
                <p className="lede text-ink-2">
                  From the first layout to the final installed piece, each
                  touchpoint is checked against the same approved campaign
                  direction.
                </p>
              </div>
            </Reveal>

            {/* Credential strip */}
            <Reveal from="up" delay={0.3}>
              <div className="mt-10 flex items-center gap-5">
                <CmykTicks className="h-[3px] w-16" />
                <span className="label-wide text-ink-3">
                  Scaled · Matched · Installed — One Team
                </span>
              </div>
            </Reveal>
          </div>

          {/* ── Right — branded environment collage ─────────────────── */}
          <Reveal
            from="right"
            delay={0.2}
            className="h-full lg:col-span-6 lg:col-start-7"
          >
            <div className="relative h-full min-h-[420px]">
              {/* Offset gradient frame */}
              <div
                aria-hidden
                className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-gradient-to-br from-cyan/20 via-transparent to-magenta/20"
              />

              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/60 shadow-[0_30px_70px_-28px_rgba(16,48,90,0.45)]">
                <Image
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&h=1250&q=85"
                  alt="Branded campaign environment across retail and event surfaces"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />

                {/* Bottom dark caption strip */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/15 bg-navy-900/75 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="label-wide text-cyan-bright">
                      Campaign Environment
                    </p>
                    <p className="label-wide mt-0.5 text-white/55">
                      Store · Event · Exhibition
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
              <div className="absolute -left-4 top-6 rounded-xl border border-navy-100 bg-white/95 px-4 py-3 shadow-[0_16px_40px_-14px_rgba(16,48,90,0.35)] backdrop-blur-sm sm:-left-6">
                <p className="label-wide text-cyan">One Visual System</p>
                <p className="mt-0.5 text-[0.6875rem] font-semibold text-navy-900">
                  Scaled · Matched · Installed
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
