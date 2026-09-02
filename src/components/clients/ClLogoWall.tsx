import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { clients } from "@/data/clients";

/**
 * Client logo wall — populated from the SAME dataset the homepage
 * "Trusted Across The UAE" marquee uses (src/data/clients.ts). Logos keep
 * their original colours, natural ratios (object-contain) and transparency.
 */
export function ClLogoWall() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.06)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Oversized watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        CLIENTS
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan">Our clients</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Trusted By Brands
              <br />
              Across The{" "}
              <span className="text-gradient-deep">UAE.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-ink-2">
              We are proud to support businesses and organisations across
              different industries with design, print, signage and brand
              production.
            </p>
          </Reveal>
          <Reveal
            from="up"
            delay={0.12}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            <p className="label-wide text-ink-3">
              {clients.length} client relationships and growing
            </p>
          </Reveal>
        </div>

        {/* Logo wall — object-contain, never cropped or stretched */}
        <ul className="mt-14 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5 xl:grid-cols-6 lg:gap-4">
          {clients.map((client, i) => (
            <Reveal key={client.logo} from="up" delay={(i % 6) * 0.05} as="li">
              <div className="group flex h-[110px] items-center justify-center rounded-xl border border-rule/60 bg-white px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40 hover:shadow-[0_14px_35px_-14px_rgba(27,77,133,0.3)] sm:h-[120px] lg:h-[128px]">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={176}
                  height={88}
                  loading="lazy"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                  className="max-h-16 w-auto max-w-full object-contain transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
