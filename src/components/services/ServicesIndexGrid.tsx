import Image from "next/image";
import Link from "next/link";
import {
  hasServicePage,
  serviceHref,
  services,
  type ServiceAccent,
} from "@/data/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const accentBar: Record<ServiceAccent, string> = {
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  navy: "bg-navy",
  yellow: "bg-yellow",
};

const accentText: Record<ServiceAccent, string> = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  navy: "text-navy",
  yellow: "text-yellow",
};

const accentRing: Record<ServiceAccent, string> = {
  cyan: "group-hover:border-cyan/40",
  magenta: "group-hover:border-magenta/40",
  navy: "group-hover:border-navy/40",
  yellow: "group-hover:border-yellow/50",
};

/**
 * Full capability index — every service gets a self-contained card so the
 * page never dead-ends:
 *  - services with a dedicated landing page → "View details"
 *  - everything else → pre-filled WhatsApp quotation
 */
export function ServicesIndexGrid() {
  return (
    <section className="relative bg-paper py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="magenta">What we produce</SectionLabel>
            <h2 className="display-md mt-6 text-balance text-navy-900">
              Everything below is made
              <br />
              <span className="text-gradient-deep">in-house.</span>
            </h2>
          </Reveal>
          <Reveal
            from="up"
            delay={0.12}
            className="flex flex-col justify-end lg:col-span-4 lg:col-start-9"
          >
            <p className="lede">
              No brokered work. Each capability below runs through our own
              production floor, which is why one team can hold the standard
              across all of them.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((s, i) => {
            const hasPage = hasServicePage(s.slug);

            return (
              <Reveal
                key={s.slug}
                from="up"
                delay={Math.min(i, 6) * 0.06}
                className="h-full"
              >
                <article
                  className={cn(
                    "group flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(27,77,133,0.45)]",
                    accentRing[s.accent],
                  )}
                >
                  {/* Image plate */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-paper-2">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="display-sm text-navy-900">{s.title}</h3>
                    <p
                      className={cn(
                        "label mt-2 font-bold",
                        accentText[s.accent],
                      )}
                    >
                      {s.lede}
                    </p>
                    <p className="body-sm mt-3">{s.description}</p>

                    {/* Capability list */}
                    <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-1.5">
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[0.8125rem] leading-snug text-ink-2"
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "mt-1.5 inline-block size-1 shrink-0",
                              accentBar[s.accent],
                            )}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action — pinned to the bottom so cards stay aligned */}
                    <div className="mt-auto pt-6">
                      {hasPage ? (
                        <Link
                          href={serviceHref(s.slug)}
                          className="group/cta inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors hover:text-cyan"
                        >
                          View details
                          <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-1" />
                        </Link>
                      ) : (
                        <a
                          href={whatsappUrl({
                            service: s.title,
                            details: s.lede,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/cta inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors hover:text-[#128c7e]"
                        >
                          <WhatsAppIcon className="size-4" />
                          Request a quote
                          <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-1" />
                        </a>
                      )}
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
