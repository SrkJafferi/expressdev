import Image from "next/image";
import Link from "next/link";
import { selectedWork } from "@/data/work";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";

const feature = selectedWork.find((w) => w.feature) ?? selectedWork[0];
const others = selectedWork.filter((w) => w !== feature);

/** Irregular grid weights so the section reads as a portfolio, not a catalogue. */
const spans = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-14",
  "lg:col-span-5",
  "lg:col-span-7 lg:-mt-6",
  "lg:col-span-6",
] as const;

export function SelectedWork() {
  return (
    <section id="work" className="scroll-mt-24 bg-charcoal py-20 text-white lg:py-28">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal from="up">
            <SectionLabel accent="yellow" invert>
              Selected work
            </SectionLabel>
            <h2 className="display-lg mt-6 max-w-2xl text-white">
              Proof, not promises.
            </h2>
          </Reveal>
          <Reveal from="up" delay={0.1}>
            <Link href="/portfolio" className="btn btn-ghost-invert px-6">
              View Portfolio
              <ArrowUpRight />
            </Link>
          </Reveal>
        </div>

        {/* Feature project */}
        {feature && (
          <Reveal from="clip" className="mt-14 lg:mt-20">
            <Link href="/portfolio" className="group block">
              <div className="plate plate-zoom relative aspect-4/3 w-full sm:aspect-16/9 lg:aspect-21/9">
                <Image
                  src={feature.image.src}
                  alt={feature.image.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/85 to-transparent p-6 pt-24 lg:p-10 lg:pt-32">
                  <span className="label-wide block text-yellow">
                    {feature.meta}
                  </span>
                  <span className="display-md mt-3 block text-white">
                    {feature.title}
                  </span>
                  <span className="mt-2 block max-w-xl text-sm text-white/70">
                    {feature.scope}
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Supporting grid */}
        <div className="mt-8 grid gap-x-6 gap-y-10 lg:mt-12 lg:grid-cols-12">
          {others.map((w, i) => (
            <Reveal
              key={w.id}
              from={i % 2 === 0 ? "left" : "right"}
              delay={(i % 2) * 0.08}
              className={spans[i % spans.length]}
            >
            <Link href="/portfolio" className="group block" data-cursor="view">
                <div className="plate plate-zoom relative aspect-4/3 w-full">
                  <Image
                    src={w.image.src}
                    alt={w.image.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4 border-t border-white/20 pt-3.5">
                  <div>
                    <p className="label-wide text-white/45">{w.meta}</p>
                    <h3 className="display-sm mt-2 text-white">{w.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
                      {w.scope}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-1 shrink-0 text-white/45 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Honest attribution — these are capability visuals, not client photos */}
        <p className="label-wide mt-14 max-w-2xl text-white/35">
          Imagery above illustrates the categories of work we produce. Project
          photography from completed Express Advertising installations is being
          documented and will replace these visuals.
        </p>
      </div>
    </section>
  );
}
