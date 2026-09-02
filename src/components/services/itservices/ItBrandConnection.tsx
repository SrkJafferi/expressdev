import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import Link from "next/link";

export function ItBrandConnection() {
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

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        CONNECTED
      </span>

      <div className="shell relative z-10">
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-12">
          {/* ── Left — editorial content ────────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <Reveal from="up">
              <div className="flex items-center gap-3.5">
                <span aria-hidden className="h-px w-10 bg-cyan" />
                <SectionLabel accent="cyan">
                  One brand. Online and offline.
                </SectionLabel>
                <span aria-hidden className="size-1.5 rounded-full bg-magenta" />
              </div>
            </Reveal>

            <Reveal from="up" delay={0.1}>
              <h2 className="display-md mt-7 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
                Your Digital Presence
                <br />
                Should Feel Like The{" "}
                <span className="text-gradient-deep">Same Brand.</span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.2}>
              <div className="mt-8 max-w-lg space-y-4">
                <p className="lede text-ink-2">
                  Customers do not separate your website, social content,
                  printed material and physical environment into different
                  departments.
                </p>
                <p className="lede text-ink-2">
                  They experience one brand.
                </p>
                <p className="lede text-ink-2">
                  Because Express Advertising works across digital design,
                  print, signage and production, technology projects can stay
                  visually connected to the wider identity.
                </p>
              </div>
            </Reveal>

            {/* Cross-links to related services */}
            <Reveal from="up" delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/service-digital-design"
                  className="group inline-flex items-center gap-2 rounded-lg border border-rule/70 bg-white px-4 py-2.5 text-sm font-medium text-navy transition-all duration-300 hover:border-cyan/40 hover:text-cyan"
                >
                  Digital Design
                  <svg
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 8h11M9 4l4 4-4 4" />
                  </svg>
                </Link>
                <Link
                  href="/service-printing-services"
                  className="group inline-flex items-center gap-2 rounded-lg border border-rule/70 bg-white px-4 py-2.5 text-sm font-medium text-navy transition-all duration-300 hover:border-cyan/40 hover:text-cyan"
                >
                  Printing Services
                  <svg
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 8h11M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ── Right — brand ecosystem collage ─────────────────────── */}
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
                  src="https://images.unsplash.com/photo-1633250391894-397930e3f5f2?auto=format&fit=crop&w=1000&h=1250&q=85"
                  alt="Digital brand presence across web, mobile and physical touchpoints"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />

                {/* Bottom dark caption strip */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/15 bg-navy-900/75 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="label-wide text-cyan-bright">
                      One Brand System
                    </p>
                    <p className="label-wide mt-0.5 text-white/55">
                      Digital · Print · Physical
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
              <div className="absolute -left-4 top-6 rounded-xl border border-navy-100 bg-white/95 px-4 py-3 shadow-[0_16px_40px_-14px_rgba(16,48,90,0.35)] backdrop-blur-sm sm:-left-6">
                <p className="label-wide text-cyan">One Brand System</p>
                <p className="mt-0.5 text-[0.6875rem] font-semibold text-navy-900">
                  Digital · Print · Physical
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
