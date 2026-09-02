import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { printFinishes } from "@/data/printingPage";

/**
 * Tactile swatch treatments per accent — CSS-rendered material surfaces
 * (no fake specs, just honest visual character per finish family).
 */
const swatchStyles: Record<string, { chip: string; label: string }> = {
  cyan: {
    chip: "bg-[linear-gradient(135deg,#0b2545_0%,#1b4d85_55%,#0099da_120%)]",
    label: "text-cyan-bright",
  },
  magenta: {
    chip: "bg-[linear-gradient(135deg,#3c0a26_0%,#8e1a5c_55%,#ec2790_120%)]",
    label: "text-magenta",
  },
  navy: {
    chip: "bg-[linear-gradient(135deg,#0d1620_0%,#25415e_55%,#5b7fa3_120%)]",
    label: "text-navy",
  },
  yellow: {
    chip: "bg-[linear-gradient(135deg,#4a4208_0%,#93861a_55%,#fff112_125%)]",
    label: "text-[#c9a800]",
  },
};

export function PrintFinishes() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
      {/* Ambient tint */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.12)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.08)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none whitespace-nowrap text-[15vw] font-extrabold leading-none tracking-tight text-white/[0.03] lg:text-[9rem]"
      >
        FINISHES
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="yellow" invert>
              Materials &amp; Finishes
            </SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
              The Finish Changes{" "}
              <span className="text-gradient-hero">Everything.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-white/60">
              The same artwork reads completely differently on matte, gloss,
              foil or textured stock. Choose the surface — we handle the rest.
            </p>
          </Reveal>
        </div>

        {/* Swatch rail — horizontal scroll on mobile, wrap on desktop */}
        <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {printFinishes.map((finish, i) => {
            const s = swatchStyles[finish.accent] ?? swatchStyles.cyan!;
            return (
              <Reveal
                key={finish.name}
                from="up"
                delay={(i % 4) * 0.08}
                className="w-[240px] shrink-0 snap-center lg:w-auto"
              >
                <article className="group h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-white/25">
                  {/* Image-backed swatch — full-bleed, note overlays on hover */}
                  {finish.image ? (
                    <>
                      <div className="group/img relative">
                        <Image
                          src={finish.image}
                          alt={finish.imageAlt ?? finish.name}
                          width={600}
                          height={750}
                          sizes="(max-width: 640px) 80vw, 25vw"
                          className="h-auto w-full object-contain"
                        />
                        {/* Hover overlay — name + note appear over the image */}
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-navy-900/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <h3 className={`text-[0.9375rem] font-bold tracking-tight ${s.label}`}>
                            {finish.name}
                          </h3>
                          <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                            {finish.note}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Swatch chip */}
                      <div
                        className={`relative h-24 ${s.chip} transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]`}
                      >
                        {/* Texture overlay */}
                        <span
                          aria-hidden
                          className="absolute inset-0 opacity-40 mix-blend-overlay"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(115deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 5px)",
                          }}
                        />
                        {/* Shine sweep on hover */}
                        <span
                          aria-hidden
                          className="absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-full"
                        />
                      </div>

                      <div className="p-5">
                        <h3 className={`text-[0.9375rem] font-bold tracking-tight ${s.label}`}>
                          {finish.name}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-white/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {finish.note}
                        </p>
                      </div>
                    </>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal from="up" delay={0.2}>
          <p className="label-wide mt-6 text-white/35 lg:hidden">
            Swipe to explore finishes
          </p>
        </Reveal>
      </div>
    </section>
  );
}
