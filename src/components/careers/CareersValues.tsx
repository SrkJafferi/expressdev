import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "What we value" — deliberately practical. No invented culture claims
 * (best workplace, unlimited growth, guaranteed training); just the four
 * working behaviours the brief asks for.
 *
 * Each block carries a relevant Pexels photo behind a navy wash (direct
 * CDN URLs, nothing stored locally) plus a line icon that carries the
 * block's meaning. Numbers removed — icons + imagery do that job now.
 */

type Value = {
  title: string;
  copy: string;
  accent: "cyan" | "magenta" | "yellow" | "navy";
  icon: "shield" | "target" | "chat" | "clock";
  image: string;
  imageAlt: string;
};

const px = (id: number, w = 700) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const values: Value[] = [
  {
    title: "Ownership",
    copy: "Take responsibility for the quality of your work and follow it through.",
    accent: "cyan",
    icon: "shield",
    image: px(6620992),
    imageAlt: "Production operator focused on running a press job with care",
  },
  {
    title: "Attention to Detail",
    copy: "Small production and design details have a big impact on the final result.",
    accent: "magenta",
    icon: "target",
    image: px(6322387),
    imageAlt: "Designers reviewing fine details of artwork together",
  },
  {
    title: "Collaboration",
    copy: "Creative, production and client teams work best when information moves clearly.",
    accent: "yellow",
    icon: "chat",
    image: px(36765627),
    imageAlt: "Team members planning a project around a shared table",
  },
  {
    title: "Reliability",
    copy: "Deadlines, communication and consistency matter.",
    accent: "navy",
    icon: "clock",
    image: px(39014426),
    imageAlt: "Technician completing an installation safely and on schedule",
  },
];

const accentBar: Record<Value["accent"], string> = {
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  yellow: "bg-yellow",
  navy: "bg-navy",
};

function ValueIcon({ name }: { name: Value["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "size-5",
    "aria-hidden": true as const,
  };
  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.6 3 8.4 7 10 4-1.6 7-5.4 7-10V6l-7-3z" />
          <polyline points="9 11.5 11.2 13.7 15 9.5" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="0.5" fill="currentColor" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-5 4V6z" />
          <path d="M8 8.5h8M8 11.5h5" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
  }
}

export function CareersValues() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
      {/* Faint production grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,rgba(16,48,90,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,48,90,0.05)_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.08)_0%,transparent_70%)]"
      />

      <div className="shell relative z-10">
        <Reveal from="up">
          <SectionLabel accent="navy">How we work</SectionLabel>
        </Reveal>
        <Reveal from="up" delay={0.08}>
          <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
            Good Work Starts
            <br />
            With The Right{" "}
            <span className="text-gradient-deep">Mindset.</span>
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-5 min-[560px]:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={0.06 * i} from="up">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rule/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-navy-300 hover:shadow-[0_18px_45px_-18px_rgba(27,77,133,0.3)]">
                {/* Photo header — relevant imagery behind a soft navy wash.
                    Clipping lives on the inner wrapper only, so the icon chip
                    bridging image and body is never cut off. */}
                <div className="relative h-32">
                  <div
                    aria-hidden="false"
                    className="absolute inset-0 overflow-hidden rounded-t-2xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={v.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/20 to-transparent"
                    />
                    {/* Top accent line on hover */}
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 h-[3px] w-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full ${accentBar[v.accent]}`}
                    />
                  </div>
                  {/* Icon chip bridging image and body — outside the clip */}
                  <span
                    className={`absolute -bottom-5 left-5 z-10 grid size-10 place-items-center rounded-full border-2 border-white bg-white shadow-[0_6px_18px_-8px_rgba(16,48,90,0.4)] ${
                      v.accent === "cyan"
                        ? "text-cyan"
                        : v.accent === "magenta"
                          ? "text-magenta"
                          : v.accent === "yellow"
                            ? "text-[#b8a400]"
                            : "text-navy"
                    }`}
                  >
                    <ValueIcon name={v.icon} />
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col px-6 pb-6 pt-9">
                  <h3 className="text-base font-bold tracking-tight text-navy-900">
                    {v.title}
                  </h3>
                  <p className="body-sm mt-2 text-ink-2">{v.copy}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
