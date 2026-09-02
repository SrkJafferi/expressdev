import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const pakistanOffices = [
  {
    city: "Islamabad",
    designation: "PAKISTAN OFFICE",
    area: "Islamabad · Blue Area",
    address: [
      "Office 6, 2nd Floor,",
      "United Plaza,",
      "Fazal Haq Road, Blue Area,",
      "Back Side of NADRA Office,",
      "Islamabad, Pakistan",
    ],
    accent: "cyan",
    image:
      "https://plus.unsplash.com/premium_photo-1697729758639-d692c36557b2?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Islamabad city skyline",
    mapQuery:
      "https://www.google.com/maps/search/?api=1&query=United+Plaza+Fazal+Haq+Road+Blue+Area+Islamabad",
  },
  {
    city: "Karachi",
    designation: "PAKISTAN HQ",
    area: "Karachi · Saddar",
    address: [
      "Office 327,",
      "Hakim Center,",
      "Abdullah Haroon Road,",
      "Saddar,",
      "Karachi, Pakistan",
    ],
    accent: "magenta",
    image:
      "https://plus.unsplash.com/premium_photo-1697729902269-70f031f22531?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Karachi cityscape",
    mapQuery:
      "https://www.google.com/maps/search/?api=1&query=Hakim+Center+Abdullah+Haroon+Road+Saddar+Karachi",
  },
] as const;

const chipAccent: Record<string, string> = {
  cyan: "border-cyan/25 bg-cyan/5 text-cyan-bright",
  magenta: "border-magenta/25 bg-magenta/5 text-magenta",
};

export function CtPakistan() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.06)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        PAKISTAN
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="magenta">Pakistan offices</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Local Presence.
              <br />
              Connected{" "}
              <span className="text-gradient-deep">Production Support.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-ink-2">
              Our Pakistan offices provide an additional point of coordination
              for clients, project communication and regional support.
            </p>
          </Reveal>
        </div>

        {/* Two office cards — image header + address body */}
        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2">
          {pakistanOffices.map((office, i) => (
            <Reveal key={office.city} from="up" delay={i * 0.12}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rule/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_18px_45px_-18px_rgba(27,77,133,0.35)]">
                {/* City image header */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={office.image}
                    alt={office.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent"
                  />

                  {/* City label over image */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div>
                      <p className="label-wide text-white/70">
                        {office.designation}
                      </p>
                      <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                        {office.city}
                      </h3>
                    </div>
                    <span className="label-wide rounded-full border border-white/30 bg-navy-900/50 px-3 py-1.5 text-white/80 backdrop-blur-sm">
                      {office.area}
                    </span>
                  </div>
                </div>

                {/* Address body */}
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <address className="flex gap-3 not-italic">
                    <svg className="mt-1 size-4 shrink-0 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="text-[0.9375rem] leading-relaxed text-ink-2">
                      {office.address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </address>

                  {/* View on map — verified address lookup */}
                  <div className="mt-auto pt-7">
                    <a
                      href={office.mapQuery}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-navy transition-colors duration-300 hover:text-cyan"
                    >
                      View on Map
                      <svg
                        className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/link:translate-x-1"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 8h11M9 4l4 4-4 4" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Bottom accent line on hover */}
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full ${
                    office.accent === "cyan"
                      ? "from-cyan to-cyan/40"
                      : "from-magenta to-magenta/40"
                  }`}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
