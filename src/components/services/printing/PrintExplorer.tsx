import Image from "next/image";
import { SectionLabel, IndexTag } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import {
  printProducts,
  printProductQuoteUrl,
} from "@/data/printingPage";

export function PrintExplorer() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-20 lg:py-28">
      {/* Oversized watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none whitespace-nowrap text-[15vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[10rem]"
      >
        WHAT WE PRINT
      </span>

      <div className="shell relative z-10">
        {/* Section head */}
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="magenta">Printing Product Explorer</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              What We{" "}
              <span className="text-gradient-deep">Print.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-ink-2">
              Ten essential print products. Produced to match your brand,
              application and finish.
            </p>
          </Reveal>
        </div>

        {/* Editorial grid — 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {printProducts.map((product, i) => (
            <Reveal
              key={product.name}
              from="up"
              delay={(i % 3) * 0.08}
              className={i === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}
            >
              <a
                href={printProductQuoteUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-rule/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_18px_45px_-18px_rgba(27,77,133,0.35)]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <IndexTag
                    value={String(i + 1).padStart(2, "0")}
                    className="absolute right-3 top-3 rounded-full border border-white/30 bg-navy-900/60 px-2.5 py-1 text-white/80 backdrop-blur-sm"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold tracking-tight text-navy-900">
                    {product.name}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-2">
                    {product.description}
                  </p>

                  {/* Request quote interaction */}
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
          ))}
        </div>
      </div>
    </section>
  );
}
