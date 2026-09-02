import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { CnIcon } from "./CnIcons";

const materials = [
  {
    name: "ACRYLIC",
    note: "Clean custom-cut components for signage, displays and branded applications.",
    icon: "acrylic",
    accent: "cyan",
    image: "/CNC.webp",
    imageAlt: "Acrylic sheet being cut with precision",
  },
  {
    name: "PVC / FOAM BOARD",
    note: "Lightweight routed material for selected display and signage applications.",
    icon: "foam",
    accent: "magenta",
    image:
      "https://images.unsplash.com/photo-1648098893250-1d03dce92467?auto=format&fit=crop&w=600&q=85",
    imageAlt: "PVC foam board material detail",
  },
  {
    name: "WOOD",
    note: "Custom routing and engraving for decorative, presentation and fabrication uses.",
    icon: "wood",
    accent: "yellow",
    image:
      "https://images.unsplash.com/photo-1576723420195-6ac9d4c71fe8?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Engraved wooden plaque detail",
  },
  {
    name: "METAL",
    note: "Selected cutting and engraving applications where appropriate to the process and project requirement.",
    icon: "metal",
    accent: "cyan",
    image:
      "https://images.unsplash.com/photo-1764114235891-66ff86abaf87?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Metal laser cutting application",
  },
  {
    name: "LAMINATED / COMPOSITE PANELS",
    note: "Suitable routed or cut components for display and fabrication applications.",
    icon: "panel",
    accent: "magenta",
    image:
      "https://images.unsplash.com/photo-1735494033576-9c882e80504c?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Composite panel profiling on production equipment",
  },
] as const;

const accentLabel: Record<string, string> = {
  cyan: "text-cyan-bright",
  magenta: "text-magenta",
  yellow: "text-yellow",
};

export function CnMaterials() {
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
        MATERIAL
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="yellow" invert>
              Materials we work with
            </SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
              The Material Defines
              <br />
              The{" "}
              <span className="text-gradient-hero">Method.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-white/60">
              Different materials respond differently to routing, laser
              cutting and engraving. We select the production method around
              the material, thickness, edge quality and final use.
            </p>
          </Reveal>
        </div>

        {/* Material cards — full-bleed image + hover note */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {materials.map((material, i) => (
            <Reveal key={material.name} from="up" delay={(i % 5) * 0.08}>
              <article className="group h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-white/25">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={material.image}
                    alt={material.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/25 to-transparent"
                  />

                  {/* Icon chip */}
                  <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-lg border border-white/25 bg-navy-900/60 text-white/85 backdrop-blur-sm">
                    <CnIcon name={material.icon} className="size-4.5" />
                  </span>

                  {/* Name over image */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3
                      className={`text-[0.8125rem] font-bold tracking-tight ${accentLabel[material.accent] ?? "text-cyan-bright"}`}
                    >
                      {material.name}
                    </h3>
                  </div>

                  {/* Hover note overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-navy-900/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3
                      className={`text-[0.8125rem] font-bold tracking-tight ${accentLabel[material.accent] ?? "text-cyan-bright"}`}
                    >
                      {material.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                      {material.note}
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
