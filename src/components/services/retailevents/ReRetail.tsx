import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const retailZones = [
  "Storefront promotions",
  "Launch campaigns",
  "Seasonal activations",
  "In-store graphics",
  "Display zones",
  "Promotional counters",
  "Customer wayfinding",
  "Temporary campaign installations",
];

export function ReRetail() {
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
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-6 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        RETAIL
      </span>

      <div className="shell relative z-10">
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-12">
          {/* ── Left — editorial content ────────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <Reveal from="up">
              <div className="flex items-center gap-3.5">
                <span aria-hidden className="h-px w-10 bg-cyan" />
                <SectionLabel accent="cyan">Built for retail</SectionLabel>
                <span aria-hidden className="size-1.5 rounded-full bg-magenta" />
              </div>
            </Reveal>

            <Reveal from="up" delay={0.1}>
              <h2 className="display-md mt-7 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
                Make The Store
                <br />
                Part Of The{" "}
                <span className="text-gradient-deep">Campaign.</span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.2}>
              <p className="lede mt-8 max-w-lg text-ink-2">
                Retail branding works best when windows, walls, counters,
                displays and promotional zones all speak the same visual
                language.
              </p>
            </Reveal>

            <Reveal from="up" delay={0.3}>
              <p className="label-wide mt-8 text-ink-3">
                We help create branded retail environments for
              </p>
              <ul className="mt-4 grid max-w-lg grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {retailZones.map((zone) => (
                  <li key={zone} className="flex items-center gap-2.5">
                    <span className="size-1.5 shrink-0 rounded-full bg-cyan" />
                    <span className="text-sm text-ink-2">{zone}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ── Right — retail environment visual ───────────────────── */}
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
                  src="https://images.unsplash.com/photo-1761225646548-bc92fea0dc72?auto=format&fit=crop&w=1000&h=1250&q=85"
                  alt="Branded retail display zone with campaign graphics"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/45 via-transparent to-transparent" />

                {/* Bottom label strip */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/15 bg-navy-900/70 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="label-wide text-cyan-bright">
                      Retail Environments
                    </p>
                    <p className="label-wide mt-0.5 text-white/50">
                      Storefront · Graphics · Displays
                    </p>
                  </div>
                  <span className="hidden shrink-0 gap-1.5 sm:flex">
                    <span className="size-2 rounded-full bg-cyan" />
                    <span className="size-2 rounded-full bg-magenta" />
                    <span className="size-2 rounded-full bg-yellow" />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
