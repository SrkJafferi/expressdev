import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Application interest areas — deliberately labelled as interest areas,
 * not vacancies. No fake job listings are shown anywhere on this page.
 *
 * Layout: a 4 × 2 bento of image tiles on desktop (2 rows, never 3), so the
 * eight items read as one deliberate block instead of a ragged grid. Every
 * tile carries a relevant Pexels photo (free stock, direct CDN URLs — same
 * placeholder convention as src/data/images.ts).
 *
 * Accessibility: all copy is visible at rest — nothing is hidden behind
 * hover. The hover state only adds motion (lift, image zoom, accent bar).
 *
 * Each tile links to ?area=<interest>#apply, and CareersForm reads that
 * param to preselect the matching "Area of Interest" option.
 */

type Accent = "cyan" | "magenta" | "yellow";

type Area = {
  title: string;
  copy: string;
  accent: Accent;
  image: string;
  imageAlt: string;
};

const px = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const areas: Area[] = [
  {
    title: "Design & Creative",
    copy: "Graphic design, branding, artwork preparation and digital creative.",
    accent: "cyan",
    image: px(6322359),
    imageAlt: "Designers collaborating on artwork in a bright creative studio",
  },
  {
    title: "Print & Production",
    copy: "Printing, finishing, machine operations and quality control.",
    accent: "magenta",
    image: px(5490175),
    imageAlt: "Printing machine running a job in a modern production workshop",
  },
  {
    title: "Signage & Fabrication",
    copy: "Sign production, CNC / laser work, fabrication and assembly.",
    accent: "yellow",
    image: px(7254460),
    imageAlt: "CNC laser cutting equipment set up for precision fabrication work",
  },
  {
    title: "Installation",
    copy: "On-site signage, display and branding installation.",
    accent: "cyan",
    image: px(35903833),
    imageAlt: "Installation technician fitting a large banner on a building exterior",
  },
  {
    title: "Sales & Client Service",
    copy: "Business development, quoting and customer coordination.",
    accent: "magenta",
    image: px(3184465),
    imageAlt: "Team members coordinating with a client around a meeting table",
  },
  {
    title: "Digital & IT",
    copy: "Web, digital systems and technical support.",
    accent: "yellow",
    image: px(16129703),
    imageAlt: "Developer working across monitors on web and digital systems",
  },
  {
    title: "Operations",
    copy: "Administration, coordination, procurement and production support.",
    accent: "cyan",
    image: px(4484073),
    imageAlt: "Operations team checking inventory in a production warehouse",
  },
];

const accentDot: Record<Accent, string> = {
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  yellow: "bg-yellow",
};

const accentText: Record<Accent, string> = {
  cyan: "text-cyan-bright",
  magenta: "text-magenta",
  yellow: "text-yellow",
};

export function CareersAreas() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24 lg:py-32">
      {/* Faint dot grid — keeps the white section from going flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(27,77,133,0.10) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="magenta">Where you could fit</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Tell Us What
              <br />
              You&apos;re{" "}
              <span className="text-gradient-deep">Good At.</span>
            </h2>
          </Reveal>
          <Reveal from="up" delay={0.12} className="lg:col-span-5 lg:self-end">
            <p className="body text-ink-2 lg:pb-2">
              Pick the area closest to your experience when you apply below —
              it helps route your resume to the right people faster.
            </p>
          </Reveal>
        </div>

        {/* 4 × 2 bento — seven interest tiles + one brand CTA tile */}
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {areas.map((area, i) => (
            <Reveal as="li" key={area.title} delay={0.05 * (i % 4)} from="up">
              <a
                href={`?area=${encodeURIComponent(area.title)}#apply`}
                className="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl bg-navy-900 p-6 shadow-[0_18px_45px_-22px_rgba(16,48,90,0.55)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-24px_rgba(16,48,90,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan lg:min-h-[320px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={area.image}
                  alt={area.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
                />

                {/* Legibility gradient — text stays readable at rest */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-navy-900/25 transition-opacity duration-500 group-hover:from-navy-900 group-hover:via-navy-900/70"
                />

                {/* Top row — index + accent dot */}
                <span className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <span className="label-wide tabular-nums text-white/55">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className={`size-1.5 rounded-full ${accentDot[area.accent]}`}
                  />
                </span>

                {/* Body — always visible, never hover-gated */}
                <div className="relative">
                  <h3 className="text-[1.0625rem] font-bold tracking-tight text-white">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/70">
                    {area.copy}
                  </p>
                  <span
                    className={`label mt-5 inline-flex items-center gap-1.5 ${accentText[area.accent]}`}
                  >
                    Apply with this interest
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      className="size-3 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </div>

                {/* Accent bar — sweeps across the bottom edge on hover */}
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full ${accentDot[area.accent]}`}
                />
              </a>
            </Reveal>
          ))}

          {/* Eighth tile — brand CTA, keeps the grid a clean 4 × 2 */}
          <Reveal as="li" delay={0.15} from="up">
            <div className="relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy lg:min-h-[320px]">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.35)_0%,transparent_70%)]"
              />
              <div className="relative p-6">
                <p className="label-wide text-white/55">Not sure where you fit?</p>
                <p className="mt-3 text-[0.9375rem] font-bold leading-snug text-white">
                  Current openings may vary — you can still submit your resume
                  for future opportunities.
                </p>
              </div>
              <div className="relative p-6 pt-0">
                <span aria-hidden className="mb-5 flex h-[3px] w-20">
                  <span className="h-full w-1/3 bg-cyan" />
                  <span className="h-full w-1/3 bg-magenta" />
                  <span className="h-full w-1/3 bg-yellow" />
                </span>
                <a
                  href="#apply"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold tracking-wide text-navy-900 uppercase transition-colors duration-300 hover:bg-cyan hover:text-white"
                >
                  Submit your resume
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
