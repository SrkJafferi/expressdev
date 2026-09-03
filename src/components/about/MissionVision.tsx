import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const cards = [
  {
    title: "Our Mission",
    body: "To empower brands with world-class print, signage and production solutions that elevate visibility, build credibility and deliver measurable impact with speed, quality and consistency.",
    accent: "cyan" as const,
    icon: (
      <svg className="size-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="16" r="14" />
        <circle cx="16" cy="16" r="9" />
        <circle cx="16" cy="16" r="4" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="16" y1="26" x2="16" y2="30" />
        <line x1="2" y1="16" x2="6" y2="16" />
        <line x1="26" y1="16" x2="30" y2="16" />
      </svg>
    ),
  },
  {
    title: "Our Vision",
    body: "To become the most trusted creative production partner across the UAE and the wider Gulf — known for innovation, reliability and turning ideas into tangible brand experiences.",
    accent: "magenta" as const,
    icon: (
      <svg className="size-7" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 16s5-10 14-10 14 10 14 10-5 10-14 10S2 16 2 16z" />
        <circle cx="16" cy="16" r="5" />
        <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const accentStyles = {
  cyan: {
    iconWrap: "bg-gradient-to-br from-cyan/25 to-cyan/5",
    iconRing: "border-cyan/40",
    iconText: "text-cyan-bright",
    glow: "group-hover:shadow-[0_20px_60px_-15px_rgba(0,153,218,0.35)]",
    topBar: "from-cyan via-cyan/60 to-transparent",
    ringColor: "text-cyan",
    radial: "bg-[radial-gradient(circle_at_top_right,rgba(0,153,218,0.14)_0%,transparent_60%)]",
    dot: "bg-cyan",
  },
  magenta: {
    iconWrap: "bg-gradient-to-br from-magenta/25 to-magenta/5",
    iconRing: "border-magenta/40",
    iconText: "text-magenta",
    glow: "group-hover:shadow-[0_20px_60px_-15px_rgba(236,39,144,0.35)]",
    topBar: "from-magenta via-magenta/60 to-transparent",
    ringColor: "text-magenta",
    radial: "bg-[radial-gradient(circle_at_top_right,rgba(236,39,144,0.12)_0%,transparent_60%)]",
    dot: "bg-magenta",
  },
} as const;

export function MissionVision() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
      {/* Subtle background texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Ambient gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.12)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.1)_0%,transparent_70%)]" />

      {/* Oversized watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 select-none whitespace-nowrap text-[16vw] font-extrabold leading-none tracking-tight text-white/[0.025] lg:text-[11rem]"
      >
        PURPOSE
      </span>

      <div className="shell relative z-10">
        {/* Section heading */}
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="magenta" invert>
              Purpose &amp; Direction
            </SectionLabel>
            <h2 className="display-md mt-6 text-balance text-white">
              Driven by a clear{" "}
              <span className="text-gradient-hero">mission and vision.</span>
            </h2>
          </Reveal>
          <Reveal from="up" delay={0.12} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="lede text-white/55">
              Two commitments that shape how we design, produce and deliver for
              every brand we work with.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
          {cards.map((card, i) => {
            const a = accentStyles[card.accent];
            return (
              <Reveal key={card.title} from="up" delay={i * 0.12}>
                <article
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05] ${a.glow}`}
                >
                  {/* Gradient top bar */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${a.topBar}`}
                  />

                  {/* Accent radial glow — always on, deepens on hover */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 ${a.radial} opacity-60 transition-opacity duration-700 group-hover:opacity-100`}
                  />

                  {/* Concentric registration-ring motif — sits where the old index number was */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -right-10 -top-14 select-none opacity-[0.09] ${a.ringColor} transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-[0.14]`}
                  >
                    <svg viewBox="0 0 140 140" fill="none" stroke="currentColor" className="size-[10.5rem]">
                      <circle cx="70" cy="70" r="66" strokeWidth="1" />
                      <circle cx="70" cy="70" r="52" strokeWidth="1.6" />
                      <circle cx="70" cy="70" r="38" strokeWidth="1" />
                      <circle cx="70" cy="70" r="24" strokeWidth="0.75" strokeDasharray="3 5" />
                      <path d="M70 2v12M70 126v12M2 70h12M126 70h12" strokeWidth="1.4" />
                      <circle cx="70" cy="70" r="3" fill="currentColor" stroke="none" />
                    </svg>
                  </span>

                  {/* Corner crop marks */}
                  <span aria-hidden className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-white/15" />
                  <span aria-hidden className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/15" />

                  <div className="relative z-10 p-8 sm:p-10">
                    {/* Icon badge */}
                    <span
                      className={`grid size-16 place-items-center rounded-2xl border ${a.iconWrap} ${a.iconRing} ${a.iconText} shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:-rotate-3`}
                    >
                      {card.icon}
                    </span>

                    <h3 className="mt-7 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      {card.title}
                    </h3>

                    {/* Accent underline */}
                    <span
                      aria-hidden
                      className={`mt-4 block h-[2px] w-12 bg-gradient-to-r ${a.topBar} transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-20`}
                    />

                    <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/60 sm:text-base">
                      {card.body}
                    </p>

                    {/* Bottom meta — accent dot markers */}
                    <div className="mt-7 flex items-center gap-2.5">
                      <span className={`size-1.5 rounded-full ${a.dot}`} />
                      <span className={`size-1.5 rounded-full ${a.dot} opacity-50`} />
                      <span className={`size-1.5 rounded-full ${a.dot} opacity-25`} />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
