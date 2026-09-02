import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const showFloorItems = [
  "Backdrops",
  "Counters",
  "Roll-ups",
  "Pop-ups",
  "Media walls",
  "Flags",
  "Directional signage",
  "Branded display areas",
];

export function ReEvents() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-24 text-white lg:py-32">
      {/* Ambient tint */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.12)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.08)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-6 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-white/[0.03] lg:text-[9.5rem]"
      >
        SHOW FLOOR
      </span>

      <div className="shell relative z-10">
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-12">
          {/* ── Left — editorial content ────────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <Reveal from="up">
              <div className="flex items-center gap-3.5">
                <span aria-hidden className="h-px w-10 bg-cyan" />
                <SectionLabel accent="yellow" invert>
                  Built for the show floor
                </SectionLabel>
                <span aria-hidden className="size-1.5 rounded-full bg-magenta" />
              </div>
            </Reveal>

            <Reveal from="up" delay={0.1}>
              <h2 className="display-md mt-7 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
                Stand Out
                <br />
                Before The Conversation{" "}
                <span className="text-gradient-hero">Starts.</span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.2}>
              <div className="mt-8 max-w-lg space-y-4">
                <p className="lede text-white/65">
                  At exhibitions and events, your environment has only a few
                  seconds to attract attention and communicate what your brand
                  represents.
                </p>
                <p className="lede text-white/65">
                  We produce coordinated event and exhibition graphics that
                  help create a professional presence across:
                </p>
              </div>
            </Reveal>

            <Reveal from="up" delay={0.3}>
              <ul className="mt-6 grid max-w-lg grid-cols-2 gap-x-8 gap-y-2.5">
                {showFloorItems.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="size-1.5 shrink-0 rounded-full bg-cyan-bright" />
                    <span className="text-sm text-white/75">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ── Right — exhibition visual ───────────────────────────── */}
          <Reveal
            from="right"
            delay={0.2}
            className="h-full lg:col-span-6 lg:col-start-7"
          >
            <div className="relative h-full min-h-[420px]">
              {/* Offset gradient frame */}
              <div
                aria-hidden
                className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-gradient-to-br from-cyan/25 via-transparent to-magenta/20"
              />

              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_70px_-28px_rgba(0,0,0,0.6)]">
                <Image
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&h=1250&q=85"
                  alt="Branded exhibition environment with display graphics"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-transparent" />

                {/* Bottom caption strip */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/15 bg-navy-900/75 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="label-wide text-cyan-bright">
                      Exhibition Production
                    </p>
                    <p className="label-wide mt-0.5 text-white/55">
                      Booths · Backdrops · Displays
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
