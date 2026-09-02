import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import {
  lfSolutions,
  lfSolutionQuoteUrl,
} from "@/data/largeFormatPage";
import { LfIcon } from "./LfIcons";

const cardAccent: Record<string, { badge: string; fill: string; glow: string }> = {
  cyan: {
    badge: "border-cyan/25 bg-cyan/8 text-cyan-bright",
    fill: "group-hover:bg-cyan group-hover:border-cyan group-hover:text-white",
    glow: "group-hover:border-cyan/50 group-hover:shadow-[0_18px_45px_-16px_rgba(0,153,218,0.35)]",
  },
  magenta: {
    badge: "border-magenta/25 bg-magenta/8 text-magenta",
    fill: "group-hover:bg-magenta group-hover:border-magenta group-hover:text-white",
    glow: "group-hover:border-magenta/50 group-hover:shadow-[0_18px_45px_-16px_rgba(236,39,144,0.35)]",
  },
  navy: {
    badge: "border-navy/25 bg-navy/8 text-navy",
    fill: "group-hover:bg-navy group-hover:border-navy group-hover:text-white",
    glow: "group-hover:border-navy/50 group-hover:shadow-[0_18px_45px_-16px_rgba(27,77,133,0.35)]",
  },
  yellow: {
    badge: "border-yellow/40 bg-yellow/10 text-[#c9a800]",
    fill: "group-hover:bg-yellow group-hover:border-yellow group-hover:text-navy-900",
    glow: "group-hover:border-yellow/60 group-hover:shadow-[0_18px_45px_-16px_rgba(229,160,0,0.35)]",
  },
};

const accents = ["cyan", "magenta", "navy", "yellow"] as const;

export function LfSolutions() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
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

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[13vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9rem]"
      >
        SOLUTIONS
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="magenta">Print big. Print smart.</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Large Format{" "}
              <span className="text-gradient-deep">Printing Solutions</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-ink-2">
              From temporary promotions to long-term exterior graphics, we
              produce visual communication for virtually every scale and
              environment.
            </p>
          </Reveal>
        </div>

        {/* Solutions grid — first + last span wide for editorial rhythm */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {lfSolutions.map((solution, i) => {
            const accent = accents[i % accents.length] ?? "cyan";
            const a = cardAccent[accent] ?? cardAccent.cyan!;
            const wide = i === 0 || i === lfSolutions.length - 1;
            return (
              <Reveal
                key={solution.index}
                from="up"
                delay={(i % 3) * 0.08}
                className={wide ? "sm:col-span-2 lg:col-span-2" : undefined}
              >
                <a
                  href={lfSolutionQuoteUrl(solution.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rule/70 transition-all duration-300 hover:-translate-y-1 ${a.glow}`}
                >
                  {/* Background image — dark scrim keeps content readable */}
                  <Image
                    src={solution.image}
                    alt={solution.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/80 to-navy-900/55 transition-opacity duration-300"
                  />

                  <div className="relative z-10 flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-xl border backdrop-blur-sm transition-colors duration-300 ${a.badge} ${a.fill}`}
                    >
                      <LfIcon name={solution.icon} className="size-6" />
                    </span>

                    <span className="select-none text-2xl font-extrabold leading-none tracking-tight text-white/25 transition-colors duration-300 group-hover:text-cyan-bright/60">
                      {solution.index}
                    </span>
                  </div>

                  <h3 className="mt-5 text-base font-bold tracking-tight text-white sm:text-lg">
                    {solution.name}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-white/65">
                    {solution.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-cyan-bright transition-colors duration-300 group-hover:text-white">
                    Request Quote
                    <svg
                      className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 8h11M9 4l4 4-4 4" />
                    </svg>
                  </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
