import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { products, type Product } from "@/data/products";
import { whatsappUrl } from "@/lib/whatsapp";
import { DdIcon } from "./DdIcons";

/**
 * Catalogue — sourced from the SAME data array the homepage Product
 * Catalogue uses (products filtered to "digital-design"). Names and
 * imagery stay synchronised with the homepage.
 */
const designProducts: Product[] = products.filter(
  (p) => p.category === "digital-design",
);

const cardIcons: Record<string, string> = {
  "Logo Design": "logo",
  "UI/UX Design": "interface",
  "Social Media Graphics": "social",
  "Brand Identity": "palette",
};

/** Service-page descriptions — keyed by the exact existing product name. */
const descriptions: Record<string, string> = {
  "Logo Design":
    "Distinctive logo systems designed to give brands a clear, recognisable and professional visual signature.",
  "UI/UX Design":
    "Modern interface and user-experience design focused on clarity, usability, hierarchy and brand consistency across digital products.",
  "Social Media Graphics":
    "Campaign-ready social content designed to keep posts, promotions and brand communication visually consistent across platforms.",
  "Brand Identity":
    "Complete visual identity systems covering logo direction, colour, typography, layout principles and supporting brand elements.",
};

export function DdCatalogue() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f5f8ff] py-24 lg:py-32">
      {/* Dotted grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(27,77,133,0.06) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="magenta">What we design</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Digital Design
              <br />
              For Every{" "}
              <span className="text-gradient-deep">Brand Touchpoint.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-ink-2">
              Explore the design services we use to create stronger
              identities, cleaner digital experiences and more consistent
              brand communication.
            </p>
          </Reveal>
        </div>

        {/* Catalogue grid — same data source as the homepage catalogue */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {designProducts.map((product, i) => {
            const icon = cardIcons[product.name] ?? "design";
            return (
              <Reveal key={product.slug} from="up" delay={(i % 4) * 0.08}>
                <a
                  href={whatsappUrl({
                    service: "Digital Design",
                    details: product.name,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rule/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_18px_45px_-18px_rgba(27,77,133,0.35)]"
                >
                  {/* Product image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image.src}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-navy-900/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-cyan/25 bg-cyan/5 text-cyan-bright transition-colors duration-300 group-hover:bg-cyan group-hover:text-white">
                        <DdIcon name={icon} className="size-5" />
                      </span>
                      <h3 className="text-[0.9375rem] font-bold leading-tight tracking-tight text-navy-900 sm:text-base">
                        {product.name}
                      </h3>
                    </div>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-2">
                      {descriptions[product.name] ?? product.shortDescription}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-navy transition-colors duration-300 group-hover:text-cyan">
                      Request Quote
                      <svg
                        className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 8h11M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
