import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { lfMaterials } from "@/data/largeFormatPage";
import { LfIcon } from "./LfIcons";

const chipStyles: Record<string, { chip: string; label: string }> = {
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
    label: "text-white",
  },
  yellow: {
    chip: "bg-[linear-gradient(135deg,#4a4208_0%,#93861a_55%,#fff112_125%)]",
    label: "text-yellow",
  },
};

export function LfMaterials() {
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
        MEDIA
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="yellow" invert>
              Built for the application
            </SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
              The Right Media Makes
              <br />
              The{" "}
              <span className="text-gradient-hero">Difference.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-white/60">
              A graphic that works perfectly indoors may need a completely
              different material, adhesive or finish outdoors. We select the
              media around where it will be installed, how long it needs to
              perform and how it will be viewed.
            </p>
          </Reveal>
        </div>

        {/* Material cards — 3-col grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {lfMaterials.map((material, i) => {
            const s = chipStyles[material.accent] ?? chipStyles.cyan!;
            return (
              <Reveal key={material.name} from="up" delay={(i % 3) * 0.08}>
                <article className="group h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-white/25">
                  {/* Full-bleed image with scrim — note overlays on hover */}
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={material.image}
                      alt={material.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/30 to-transparent"
                    />

                    {/* Icon chip */}
                    <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-lg border border-white/25 bg-navy-900/60 text-white/85 backdrop-blur-sm">
                      <LfIcon name={material.icon} className="size-4.5" />
                    </span>

                    {/* Name over image */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <h3 className={`text-[0.9375rem] font-bold tracking-tight ${s.label}`}>
                        {material.name}
                      </h3>
                    </div>

                    {/* Hover note overlay */}
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-navy-900/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <h3 className={`text-[0.9375rem] font-bold tracking-tight ${s.label}`}>
                        {material.name}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                        {material.note}
                      </p>
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
