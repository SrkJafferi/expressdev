import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { ItIcon } from "./ItIcons";

/**
 * Infrastructure cards — only components actually covered by the existing
 * IT service catalogue (web/app/ecommerce, hosting/VPS/dedicated, domains,
 * SEO/social/SMS marketing, IT support). No invented capabilities.
 */
const layers = [
  {
    name: "WEB & DIGITAL",
    note: "Customer-facing websites, mobile apps and online stores.",
    icon: "web",
    accent: "cyan",
  },
  {
    name: "HOSTING & INFRASTRUCTURE",
    note: "Managed hosting, VPS and dedicated servers supporting business systems.",
    icon: "server",
    accent: "magenta",
  },
  {
    name: "DOMAINS",
    note: "Domain search, registration and management for your online identity.",
    icon: "domain",
    accent: "navy",
  },
  {
    name: "ONLINE MARKETING",
    note: "SEO, managed social campaigns and SMS marketing for visibility.",
    icon: "megaphone",
    accent: "yellow",
  },
  {
    name: "SUPPORT & MAINTENANCE",
    note: "Ongoing technical assistance and system upkeep.",
    icon: "headset",
    accent: "cyan",
  },
] as const;

const chipAccent: Record<string, string> = {
  cyan: "border-cyan/25 bg-cyan/8 text-cyan-bright group-hover:bg-cyan group-hover:border-cyan group-hover:text-white",
  magenta:
    "border-magenta/25 bg-magenta/8 text-magenta group-hover:bg-magenta group-hover:border-magenta group-hover:text-white",
  navy: "border-navy/25 bg-navy/8 text-navy group-hover:bg-navy group-hover:border-navy group-hover:text-white",
  yellow:
    "border-yellow/40 bg-yellow/10 text-[#c9a800] group-hover:bg-yellow group-hover:border-yellow group-hover:text-navy-900",
};

export function ItInfrastructure() {
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
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.06)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        FOUNDATION
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan">The digital foundation</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              The Systems Behind
              <br />
              Everyday{" "}
              <span className="text-gradient-deep">Business.</span>
            </h2>
          </Reveal>
          <Reveal
            from="up"
            delay={0.12}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            <p className="lede text-ink-2">
              A reliable digital setup is made of multiple connected parts.
              Websites, domains, hosting, visibility and support need to work
              together rather than operate as disconnected tools.
            </p>
          </Reveal>
        </div>

        {/* Architecture layer cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {layers.map((layer, i) => (
            <Reveal key={layer.name} from="up" delay={(i % 5) * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-rule/70 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_18px_45px_-18px_rgba(27,77,133,0.35)]">
                <span
                  className={`grid size-12 shrink-0 place-items-center rounded-xl border transition-colors duration-300 ${
                    chipAccent[layer.accent] ?? chipAccent.cyan
                  }`}
                >
                  <ItIcon name={layer.icon} className="size-6" />
                </span>

                <h3 className="mt-5 text-[0.9375rem] font-bold tracking-tight text-navy-900">
                  {layer.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {layer.note}
                </p>

                {/* Status indicator detail */}
                <span className="mt-5 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-cyan" />
                  <span className="label-wide text-ink-3">Covered</span>
                </span>

                {/* Bottom accent line — fills across on hover */}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[3px] w-0 bg-cyan transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
