import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CmykTicks } from "@/components/ui/PrintMarks";
import { Reveal } from "@/components/motion/Reveal";

export function ServiceIntro() {
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
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Oversized watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[15vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[10rem]"
      >
        DETAIL
      </span>

      <div className="shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* ── Left — editorial statement ─────────────────────────── */}
          <div className="lg:col-span-6">
            <Reveal from="up">
              <SectionLabel accent="cyan">Why our print feels different</SectionLabel>
            </Reveal>

            <Reveal from="up" delay={0.1}>
              <h2 className="display-md mt-7 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
                Every Detail
                <br />
                Printed With{" "}
                <span className="text-gradient-deep">Purpose.</span>
              </h2>
            </Reveal>

            {/* Vertical rule + copy — editorial rhythm */}
            <Reveal from="up" delay={0.2}>
              <div className="mt-8 max-w-lg border-l-2 border-cyan/30 pl-6">
                <p className="lede text-ink-2">
                  Express Advertising produces business and promotional print
                  for companies across the UAE — combining colour accuracy,
                  carefully selected materials and professional finishing to
                  keep every brand touchpoint consistent.
                </p>
                <p className="lede mt-4 text-ink-2">
                  From a single business card to a complete corporate
                  stationery suite, every job is prepared, proofed and finished
                  to production standards.
                </p>
              </div>
            </Reveal>

            {/* Inline image — vibrant colour detail */}
            <Reveal from="up" delay={0.25}>
              <div className="mt-10 max-w-lg">
                <Image
                  src="/vibrantcolor.avif"
                  alt="Vibrant colour printing detail by Express Advertising"
                  width={800}
                  height={520}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </Reveal>

            {/* Bottom credential strip */}
            <Reveal from="up" delay={0.3}>
              <div className="mt-10 flex items-center gap-5">
                <CmykTicks className="h-[3px] w-16" />
                <span className="label-wide text-ink-3">
                  Prepare · Proof · Print · Finish — One Team
                </span>
              </div>
            </Reveal>
          </div>

          {/* ── Right — image with layered frame ───────────────────── */}
          <Reveal from="right" delay={0.2} className="lg:col-span-6">
            <div className="relative">
              {/* Offset gradient frame */}
              <div
                aria-hidden
                className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-gradient-to-br from-cyan/15 via-transparent to-magenta/15"
              />

              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(16,48,90,0.4)]">
                <Image
                  src="/printingservices.avif"
                  alt="Express Advertising printing services — premium print production"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 via-transparent to-transparent" />
              </div>

              {/* CMYK accent bar below image */}
              <div className="mt-4 flex h-[3px] w-full">
                <span className="h-full flex-1 bg-cyan" />
                <span className="h-full flex-1 bg-magenta" />
                <span className="h-full flex-1 bg-yellow" />
                <span className="h-full flex-1 bg-charcoal" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
