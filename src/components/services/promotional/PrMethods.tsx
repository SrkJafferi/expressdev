import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { PrIcon } from "./PrIcons";

const methods = [
  {
    name: "PAD PRINTING",
    note: "Suitable for selected promotional merchandise and compact branding areas.",
    icon: "padprint",
    accent: "cyan",
    image:
      "https://images.unsplash.com/photo-1634713157685-676e35324215?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Pad printing process on promotional merchandise",
  },
  {
    name: "SCREEN PRINTING",
    note: "Useful for selected apparel, bags and larger graphic applications.",
    icon: "screenprint",
    accent: "magenta",
    image:
      "https://images.unsplash.com/photo-1643216674491-33878507b402?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Screen printing process for apparel and graphics",
  },
  {
    name: "EMBROIDERY",
    note: "Premium stitched branding for suitable apparel, caps and textile products.",
    icon: "embroidery",
    accent: "navy",
    image:
      "https://images.unsplash.com/photo-1657668282135-b620193e7801?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Embroidery stitching detail on textile products",
  },
  {
    name: "LASER ENGRAVING",
    note: "Clean permanent-style marking for selected metal, wood and premium gift items.",
    icon: "laser",
    accent: "yellow",
    image:
      "https://plus.unsplash.com/premium_photo-1661832010486-c8a301117ebb?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Laser engraving machine marking a premium item",
  },
  {
    name: "SUBLIMATION",
    note: "Full-colour decoration for compatible products and materials.",
    icon: "sublimation",
    accent: "cyan",
    image:
      "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Heat press sublimation production detail",
  },
  {
    name: "UV / DIGITAL PRINT",
    note: "Detailed colour branding for suitable rigid merchandise and promotional products.",
    icon: "uvprint",
    accent: "magenta",
    image:
      "https://images.unsplash.com/photo-1738156660303-b0c60bc56e7f?auto=format&fit=crop&w=600&q=85",
    imageAlt: "UV digital print production detail",
  },
] as const;

export function PrMethods() {
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
        METHODS
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="yellow" invert>
              How your brand goes on
            </SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
              The Product Matters.
              <br />
              So Does The{" "}
              <span className="text-gradient-hero">Branding Method.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-white/60">
              Different materials need different decoration techniques. We
              select the branding method around the product, artwork and
              finish you want to achieve.
            </p>
          </Reveal>
        </div>

        {/* Method cards — full-bleed image + hover note (signage-page style) */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {methods.map((method, i) => (
            <Reveal key={method.name} from="up" delay={(i % 3) * 0.08}>
              <article className="group h-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-white/25">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={method.image}
                    alt={method.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/25 to-transparent"
                  />

                  {/* Icon chip */}
                  <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-lg border border-white/25 bg-navy-900/60 text-white/85 backdrop-blur-sm">
                    <PrIcon name={method.icon} className="size-4.5" />
                  </span>

                  {/* Name over image */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-[0.9375rem] font-bold tracking-tight text-cyan-bright">
                      {method.name}
                    </h3>
                  </div>

                  {/* Hover note overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-navy-900/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="text-[0.9375rem] font-bold tracking-tight text-cyan-bright">
                      {method.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                      {method.note}
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
