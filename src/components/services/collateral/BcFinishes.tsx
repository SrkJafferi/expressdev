import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const finishes = [
  {
    name: "MATTE LAMINATION",
    note: "Clean, understated finish with reduced surface glare.",
    accent: "cyan",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Matte finish paper surface detail",
  },
  {
    name: "GLOSS LAMINATION",
    note: "Polished, high-impact surface treatment for selected collateral.",
    accent: "magenta",
    image:
      "https://images.unsplash.com/photo-1616628188859-7a11abb6fcc9?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Gloss finish printed surface detail",
  },
  {
    name: "SOFT TOUCH",
    note: "Premium tactile finish for suitable covers and presentation pieces.",
    accent: "navy",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Soft touch cover material detail",
  },
  {
    name: "FOIL STAMPING",
    note: "Metallic detailing for premium identity applications.",
    accent: "yellow",
    image:
      "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Metallic foil detailing on printed collateral",
  },
  {
    name: "SPOT UV",
    note: "Selective gloss accents to highlight logos, patterns or key design elements.",
    accent: "cyan",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Spot UV gloss highlight over matte print",
  },
  {
    name: "EMBOSSING / DEBOSSING",
    note: "Raised or recessed detail for tactile brand presentation.",
    accent: "magenta",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Embossed tactile print detail",
  },
  {
    name: "DIE CUTTING",
    note: "Custom shapes, windows and cut-outs beyond the standard rectangle.",
    accent: "navy",
    image:
      "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Die cut shape detail on printed collateral",
  },
  {
    name: "PREMIUM TEXTURED STOCKS",
    note: "Selected papers and boards for a more tactile, distinctive presentation.",
    accent: "yellow",
    image:
      "https://images.unsplash.com/photo-1581079289196-67865ea83118?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Premium textured paper swatches",
  },
] as const;

const accentLabel: Record<string, string> = {
  cyan: "text-cyan-bright",
  magenta: "text-magenta",
  navy: "text-white",
  yellow: "text-yellow",
};

export function BcFinishes() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-24 text-white lg:py-32">
      {/* Ambient tint */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.12)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.08)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none whitespace-nowrap text-[13vw] font-extrabold leading-none tracking-tight text-white/[0.03] lg:text-[9rem]"
      >
        FINISH
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="yellow" invert>
              Materials &amp; finishes
            </SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
              The Finish Changes
              <br />
              How The Brand{" "}
              <span className="text-gradient-hero">Feels.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-white/60">
              Paper, texture and finishing affect how customers perceive a
              printed brand touchpoint. We select the right combination around
              the application, handling and visual character you want to
              achieve.
            </p>
          </Reveal>
        </div>

        {/* Finish cards — full-bleed image + hover note */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {finishes.map((finish, i) => (
            <Reveal key={finish.name} from="up" delay={(i % 4) * 0.06}>
              <article className="group h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-white/25">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={finish.image}
                    alt={finish.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/25 to-transparent"
                  />

                  {/* Name over image */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3
                      className={`text-[0.8125rem] font-bold tracking-tight ${accentLabel[finish.accent] ?? "text-cyan-bright"}`}
                    >
                      {finish.name}
                    </h3>
                  </div>

                  {/* Hover note overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-navy-900/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3
                      className={`text-[0.8125rem] font-bold tracking-tight ${accentLabel[finish.accent] ?? "text-cyan-bright"}`}
                    >
                      {finish.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                      {finish.note}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
