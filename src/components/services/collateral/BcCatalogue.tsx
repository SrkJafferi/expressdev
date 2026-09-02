import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { products, type Product } from "@/data/products";
import { whatsappUrl } from "@/lib/whatsapp";
import { BcIcon } from "./BcIcons";

/**
 * Brand collateral catalogue — sourced from the SAME data array the
 * homepage Product Catalogue uses (products filtered to "collateral").
 * Names and imagery stay synchronised with the homepage.
 */
const collateralProducts: Product[] = products.filter(
  (p) => p.category === "collateral",
);

const cardIcons: Record<string, string> = {
  Letterheads: "prepare",
  Tags: "retailTag",
  "Customized Stationery": "prepare",
  "File Folders": "executive",
  Envelopes: "communication",
  "Invoice Books": "produce",
};

/** Service-page descriptions — keyed by the exact existing product name. */
const descriptions: Record<string, string> = {
  Letterheads:
    "Professional letterheads produced to keep everyday business communication aligned with your visual identity.",
  Tags:
    "Branded tags for products, packaging and presentation with suitable materials and finishing options.",
  "Customized Stationery":
    "Coordinated notebooks, pads and printed stationery tailored to your brand system.",
  "File Folders":
    "Presentation and document folders with custom pockets, finishing and branded presentation.",
  Envelopes:
    "Custom business and premium envelopes produced to match the wider stationery system.",
  "Invoice Books":
    "Duplicate and triplicate invoice books produced with your business details and numbering.",
};

export function BcCatalogue() {
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
            <SectionLabel accent="magenta">What we produce</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Every Printed Touchpoint.
              <br />
              One{" "}
              <span className="text-gradient-deep">Visual Language.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-ink-2">
              Explore the coordinated collateral pieces we produce to help
              your brand stay consistent across sales, operations,
              presentations and customer communication.
            </p>
          </Reveal>
        </div>

        {/* Catalogue grid — same data source as the homepage catalogue */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {collateralProducts.map((product, i) => {
            const icon = cardIcons[product.name] ?? "prepare";
            return (
              <Reveal key={product.slug} from="up" delay={(i % 3) * 0.08}>
                <a
                  href={whatsappUrl({
                    service: "Brand Collateral",
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                        <BcIcon name={icon} className="size-5" />
                      </span>
                      <h3 className="text-base font-bold tracking-tight text-navy-900 sm:text-lg">
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
