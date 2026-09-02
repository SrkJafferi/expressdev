import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const highlights = [
  {
    text: "Concept-to-installation capability under one roof",
    color: "text-cyan-bright",
    bg: "bg-cyan/10",
  },
  {
    text: "Production quality with precision & reliability",
    color: "text-magenta",
    bg: "bg-magenta/10",
  },
  {
    text: "UAE-wide delivery & on-site installation",
    color: "text-yellow",
    bg: "bg-yellow/10",
  },
];

export function WhoWeAre() {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-20 lg:py-28">
      {/* Decorative background elements */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Dotted grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(27,77,133,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="shell relative z-10">
        <div className="grid items-stretch gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left text column */}
          <div className="flex flex-col justify-center lg:col-span-6">
            <Reveal from="up">
              <SectionLabel accent="cyan">Who We Are</SectionLabel>
            </Reveal>

            <Reveal from="up" delay={0.1}>
              <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
                Turning Brand Ideas Into{" "}
                <span className="text-gradient-deep">
                  Bold Physical Experiences
                </span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.2}>
              <p className="lede mt-6 text-ink-2">
                We are Express Advertising, a UAE production partner for
                businesses that need printing, signage, promotional products and
                branded environments executed to a premium standard. Our team
                combines creative design, production precision and reliable
                installation to deliver work that looks sharp, lasts longer and
                performs in the real world.
              </p>
            </Reveal>

            {/* Highlight checklist */}
            <Reveal from="up" delay={0.3}>
              <ul className="mt-8 space-y-3.5">
                {highlights.map((item) => (
                  <li key={item.text} className="flex items-center gap-3.5">
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full ${item.bg} ${item.color}`}
                    >
                      <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2.5 8.5 6 12 13.5 4" />
                      </svg>
                    </span>
                    <span className="text-[0.9375rem] font-medium text-ink">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Bottom accent row */}
            <Reveal from="up" delay={0.4}>
              <div className="mt-10 flex items-center gap-5">
                <div className="flex h-[3px] w-20">
                  <span className="h-full flex-1 bg-cyan" />
                  <span className="h-full flex-1 bg-magenta" />
                  <span className="h-full flex-1 bg-yellow" />
                  <span className="h-full flex-1 bg-charcoal" />
                </div>
                <span className="label-wide text-ink-3">
                  Ajman HQ · Serving All Emirates
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right image column — layered premium treatment */}
          <Reveal from="right" delay={0.2} className="h-full lg:col-span-6">
            <div className="relative h-full">
              {/* Gradient border frame — offset behind */}
              <div
                aria-hidden
                className="absolute -right-4 -top-4 h-full w-full rounded-2xl bg-gradient-to-br from-cyan/20 via-transparent to-magenta/20"
              />

              {/* Main image */}
              <div className="group relative h-full min-h-[320px] overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(16,48,90,0.35)]">
                <Image
                  src="/aboutunfo.avif"
                  alt="Express Advertising production facility — printing, signage and fabrication floor"
                  fill
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />

                {/* Bottom label strip inside image */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-xl border border-white/15 bg-navy-900/70 px-5 py-3.5 backdrop-blur-md">
                  <div>
                    <p className="text-sm font-bold text-white">
                      Production Floor
                    </p>
                    <p className="label-wide mt-0.5 text-white/50">
                      Print · Signage · Fabrication
                    </p>
                  </div>
                  <span className="flex gap-1.5">
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
