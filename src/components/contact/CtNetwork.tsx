import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const locations = [
  {
    country: "UAE",
    city: "Ajman",
    role: "Production Base",
    image:
      "https://plus.unsplash.com/premium_photo-1670552850982-28cd863230ca?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Ajman, UAE",
    accent: "cyan",
  },
  {
    country: "Pakistan",
    city: "Islamabad",
    role: "Coordination Office",
    image:
      "https://plus.unsplash.com/premium_photo-1697729758639-d692c36557b2?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Islamabad, Pakistan",
    accent: "magenta",
  },
  {
    country: "Pakistan",
    city: "Karachi",
    role: "Headquarters",
    image:
      "https://plus.unsplash.com/premium_photo-1697729902269-70f031f22531?w=600&auto=format&fit=crop&q=85",
    imageAlt: "Karachi, Pakistan",
    accent: "yellow",
  },
] as const;

const nodeAccent: Record<string, string> = {
  cyan: "border-cyan text-cyan-bright",
  magenta: "border-magenta/60 text-magenta",
  yellow: "border-yellow/70 text-[#c9a800]",
};

export function CtNetwork() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f8ff] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan">Office network</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              One Team.
              <br />
              Multiple{" "}
              <span className="text-gradient-deep">Touchpoints.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-ink-2">
              With our production base in the UAE and coordination points in
              Pakistan, we stay connected across projects, communication and
              delivery requirements.
            </p>
          </Reveal>
        </div>

        {/* Connected location cards with city imagery */}
        <ol className="relative mt-14 grid gap-8 sm:grid-cols-3 lg:mt-16">
          {/* Connecting line — desktop only, behind card tops */}
          <span
            aria-hidden
            className="absolute left-[16%] right-[16%] top-24 hidden border-t-2 border-dashed border-cyan/35 lg:block"
          />

          {locations.map((location) => (
            <li
              key={location.city}
              className="group relative rounded-2xl border border-rule/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_18px_45px_-18px_rgba(27,77,133,0.35)]"
            >
              {/* City image with node circle overlap */}
              <div className="relative h-44">
                <Image
                  src={location.image}
                  alt={location.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover rounded-t-2xl transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-t-2xl bg-gradient-to-t from-navy-900/60 via-transparent to-transparent"
                />
                {/* Country tag */}
                <span className="label-wide absolute left-4 top-4 rounded-full border border-white/30 bg-navy-900/60 px-3 py-1.5 text-white/85 backdrop-blur-sm">
                  {location.country}
                </span>
                {/* Node circle bridging image and body */}
                <span
                  className={`absolute -bottom-5 left-6 z-10 grid size-10 place-items-center rounded-full border-[2.5px] bg-white shadow-[0_6px_18px_-8px_rgba(16,48,90,0.35)] ${
                    nodeAccent[location.accent] ?? nodeAccent.cyan
                  }`}
                >
                  <span
                    className={`size-2.5 rounded-full ${
                      location.accent === "cyan"
                        ? "bg-cyan"
                        : location.accent === "magenta"
                          ? "bg-magenta"
                          : "bg-yellow"
                    }`}
                  />
                </span>
              </div>

              {/* Body */}
              <div className="px-6 pb-6 pt-8">
                <h3 className="text-lg font-bold tracking-tight text-navy-900">
                  {location.city}
                </h3>
                <p className="mt-1 text-sm text-ink-2">{location.role}</p>
              </div>

              {/* Bottom accent line on hover */}
              <span
                aria-hidden
                className={`absolute bottom-0 left-0 h-[3px] w-0 rounded-b-2xl bg-gradient-to-r transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full ${
                  location.accent === "cyan"
                    ? "from-cyan to-cyan/40"
                    : location.accent === "magenta"
                      ? "from-magenta to-magenta/40"
                      : "from-yellow to-yellow/40"
                }`}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
