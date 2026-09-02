import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CropMarks, CmykTicks } from "@/components/ui/PrintMarks";
import { Reveal } from "@/components/motion/Reveal";

const touchpoints = [
  { label: "Stationery", image: "/brandpromo.webp" },
  { label: "Signage", image: "https://images.unsplash.com/photo-1659993447069-e00b561168d4?auto=format&fit=crop&w=600&q=85" },
  { label: "Retail display", image: "https://images.unsplash.com/photo-1761225646548-bc92fea0dc72?auto=format&fit=crop&w=600&q=85" },
  { label: "Merchandise", image: "/banner2.avif" },
];

export function ClConsistency() {
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
        ONE SYSTEM
      </span>

      <div className="shell relative z-10">
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-12">
          {/* ── Left — editorial content ────────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <Reveal from="up">
              <div className="flex items-center gap-3.5">
                <span aria-hidden className="h-px w-10 bg-cyan" />
                <SectionLabel accent="navy">
                  One brand. Many applications.
                </SectionLabel>
                <span aria-hidden className="size-1.5 rounded-full bg-magenta" />
              </div>
            </Reveal>

            <Reveal from="up" delay={0.1}>
              <h2 className="display-md mt-7 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
                Consistency Beyond
                <br />
                A Single{" "}
                <span className="text-gradient-deep">Project.</span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.2}>
              <div className="mt-8 max-w-lg space-y-4">
                <p className="lede text-ink-2">
                  A brand may need a business card today, storefront graphics
                  next month and an exhibition setup later in the year.
                </p>
                <p className="lede text-ink-2">
                  Each piece should still feel like it belongs to the same
                  visual system.
                </p>
                <p className="lede text-ink-2">
                  By working across multiple production categories, we help
                  keep artwork, colour, scale and presentation aligned as the
                  brand moves from one application to another.
                </p>
              </div>
            </Reveal>

            {/* Credential strip */}
            <Reveal from="up" delay={0.3}>
              <div className="mt-10 flex items-center gap-5">
                <CmykTicks className="h-[3px] w-16" />
                <span className="label-wide text-ink-3">
                  Print · Signage · Display · Merchandise
                </span>
              </div>
            </Reveal>
          </div>

          {/* ── Right — one-brand collage ───────────────────────────── */}
          <Reveal
            from="right"
            delay={0.2}
            className="h-full lg:col-span-6 lg:col-start-7"
          >
            <div className="relative h-full min-h-[420px]">
              <div className="grid h-full grid-cols-2 gap-3.5">
                {touchpoints.map((point, i) => (
                  <Reveal
                    key={point.label}
                    from="up"
                    delay={0.25 + i * 0.08}
                    className={`relative overflow-hidden rounded-2xl ${
                      i === 0 ? "row-span-2" : ""
                    }`}
                  >
                    <Image
                      src={point.image}
                      alt={point.label}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/10 to-transparent" />
                    <p className="label-wide absolute bottom-3.5 left-3.5 text-white/90">
                      {point.label}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* Floating badge */}
              <div className="absolute -left-4 bottom-10 rounded-xl border border-navy-100 bg-white/95 px-4 py-3 shadow-[0_14px_36px_-14px_rgba(16,48,90,0.35)] backdrop-blur-sm sm:-left-6">
                <p className="label-wide text-cyan">One Visual Language</p>
                <p className="mt-0.5 text-[0.6875rem] font-semibold text-navy-900">
                  Print · Signage · Display · Merchandise
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
