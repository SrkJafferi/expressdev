import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const types = [
  {
    label: "PRINTING",
    body: "Business print and collateral.",
    href: "/service-printing-services",
    image:
      "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Printing press in production",
  },
  {
    label: "SIGNAGE",
    body: "Indoor, outdoor and dimensional signage.",
    href: "/service-signage",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Illuminated storefront sign",
  },
  {
    label: "LARGE FORMAT",
    body: "Banners, vinyl graphics and displays.",
    href: "/service-large-format-printing",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Large format campaign display",
  },
  {
    label: "PROMOTIONAL ITEMS",
    body: "Corporate gifts and branded merchandise.",
    href: "/service-promotional-items",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Branded product photography",
  },
  {
    label: "RETAIL & EVENTS",
    body: "Storefront, exhibition and event graphics.",
    href: "/service-retail-events-exhibition",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Retail clothing display",
  },
  {
    label: "BRAND COLLATERAL",
    body: "Letterheads, folders and corporate identity.",
    href: "/service-brand-collateral",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Corporate stationery and presentation materials",
  },
  {
    label: "CNC & LASER",
    body: "Precision cutting, routing and engraving.",
    href: "/service-cnc-laser-cutting",
    image:
      "https://images.unsplash.com/photo-1615286922420-c6b348ffbd62?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Laser cutting production detail",
  },
  {
    label: "DESIGN",
    body: "Brand identity and digital creative.",
    href: "/service-digital-design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Design tools flat lay",
  },
  {
    label: "TECHNICAL / IT",
    body: "Business technology and digital support.",
    href: "/service-it-services",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=85",
    imageAlt: "Team working with business technology",
  },
] as const;

/**
 * Quick service links — each card routes to its dedicated service page.
 */
export function CtTypes() {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        START HERE
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan">What can we help with?</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Start With
              <br />
              What You{" "}
              <span className="text-gradient-deep">Need.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-ink-2">
              Explore our services and see how we can support your next
              project.
            </p>
          </Reveal>
        </div>

        {/* Service cards — link to dedicated service pages */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:grid-cols-3">
          {types.map((type, i) => (
            <Reveal key={type.label} from="up" delay={(i % 3) * 0.06}>
              <Link
                href={type.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-rule/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_18px_45px_-18px_rgba(27,77,133,0.35)]"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/30 via-transparent to-transparent"
                  />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[0.9375rem] font-bold tracking-tight text-navy-900">
                    {type.label}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-snug text-ink-2">
                    {type.body}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-navy transition-colors duration-300 group-hover:text-cyan">
                    Explore
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

                {/* Bottom accent line — fills across on hover */}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[3px] w-0 bg-cyan transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
