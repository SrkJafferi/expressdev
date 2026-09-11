import Image from "next/image";
import { media } from "@/data/images";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Editorial 2-column intro — who we are as a team, with a bright
 * collaborative-workflow image (design + production, not industrial dark).
 */
export function CareersIntro() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f8ff] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]"
      />

      <div className="shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — editorial copy */}
          <div className="lg:col-span-6">
            <Reveal from="up">
              <SectionLabel accent="cyan">Work with us</SectionLabel>
            </Reveal>

            <Reveal from="up" delay={0.08}>
              <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
                Different Skills.
                <br />
                One Production{" "}
                <span className="text-gradient-deep">Mindset.</span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.16}>
              <span aria-hidden className="mt-6 flex h-[3px] w-20">
                <span className="h-full flex-1 bg-cyan" />
                <span className="h-full flex-1 bg-magenta" />
                <span className="h-full flex-1 bg-yellow" />
                <span className="h-full flex-1 bg-navy-200" />
              </span>
            </Reveal>

            <div className="mt-7 space-y-5">
              <Reveal from="up" delay={0.22}>
                <p className="lede text-ink-2">
                  Express Advertising brings design, printing, signage,
                  fabrication, digital work and production together under one
                  team.
                </p>
              </Reveal>
              <Reveal from="up" delay={0.28}>
                <p className="body text-ink-2">
                  That means every role contributes to the final result —
                  whether you work in creative, production, sales, operations,
                  installation or technology.
                </p>
              </Reveal>
              <Reveal from="up" delay={0.34}>
                <p className="body text-ink-2">
                  We value people who communicate clearly, take ownership of
                  their work and care about delivering a professional result
                  for the client.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right — bright collaborative image with brand framing */}
          <Reveal from="right" delay={0.15} className="lg:col-span-6">
            <figure className="relative">
              <div className="overflow-hidden rounded-2xl border border-rule/70 bg-white shadow-[0_24px_60px_-24px_rgba(16,48,90,0.35)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={media.careersTeam.src}
                    alt={media.careersTeam.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* CMYK registration strip under the frame */}
              <span aria-hidden className="mt-4 flex h-[3px] w-24 rounded-full">
                <span className="h-full flex-1 rounded-l-full bg-cyan" />
                <span className="h-full flex-1 bg-magenta" />
                <span className="h-full flex-1 bg-yellow" />
                <span className="h-full flex-1 rounded-r-full bg-navy-900" />
              </span>

              <figcaption className="body-sm mt-3 text-ink-3">
                Focused work, finished properly — one team across every
                discipline.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
