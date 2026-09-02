import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

/**
 * Coordinate-precise Google Maps embed — the marker centres exactly on the
 * verified Express Advertising listing coordinates. Light theme, no API
 * key required.
 */
const MAP_EMBED =
  "https://maps.google.com/maps?q=25.4093189,55.4428065&z=17&output=embed&iwloc=near";

export function CtUaeOffice() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-24 text-white lg:py-32">
      {/* Ambient tint */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.12)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.08)_0%,transparent_70%)]" />

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan" invert>UAE office</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
              Visit Us In{" "}
              <span className="text-gradient-hero">Ajman.</span>
            </h2>
          </Reveal>
        </div>

        {/* Full-width map — brand-themed with centred marker overlay */}
        <Reveal from="up" delay={0.15}>
          <div className="relative mt-12 overflow-hidden rounded-[28px] border border-white/10 lg:mt-14">
            <iframe
              src={MAP_EMBED}
              title="Express Advertising location on Google Maps, Ajman, UAE"
              aria-label="Map showing Express Advertising in Ajman, UAE"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[22rem] w-full sm:h-[26rem] lg:h-[34rem]"
            />

            {/* Brand marker — centred on the business, pure CSS (no map
                interaction blocked; static rings respect reduced motion) */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative flex flex-col items-center">
                {/* Label card above the pin */}
                <div className="absolute bottom-full mb-3 whitespace-nowrap rounded-lg border border-cyan/40 bg-navy-900/90 px-4 py-2.5 text-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] backdrop-blur-sm">
                  <p className="label-wide text-cyan-bright">
                    Express Advertising
                  </p>
                  <p className="label-wide mt-0.5 text-white/55">
                    Ajman · UAE
                  </p>
                  {/* Arrow to pin */}
                  <span className="absolute left-1/2 top-full -mt-px size-3 -translate-x-1/2 rotate-45 border-b border-r border-cyan/40 bg-navy-900/90" />
                </div>

                {/* Layered pulse rings */}
                <span className="absolute size-10 rounded-full border border-cyan/50" />
                <span className="absolute size-16 rounded-full border border-cyan/25" />
                <span className="absolute size-[5.5rem] rounded-full border border-cyan/10" />

                {/* Centre pin */}
                <span className="relative grid size-9 place-items-center rounded-full border-2 border-cyan bg-navy-900 shadow-[0_0_0_6px_rgba(0,153,218,0.2),0_0_24px_rgba(0,153,218,0.45)]">
                  <span className="size-3 rounded-full bg-cyan-bright" />
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Directions CTA — below the map */}
        <Reveal from="up" delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-white/55">
              Located on Sheikh Rashid Bin Humeed Street, Ajman.
            </p>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-cyan/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-cyan-bright transition-all duration-200 hover:bg-cyan hover:text-white"
            >
              Get Directions
              <svg className="transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2 8h11M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
