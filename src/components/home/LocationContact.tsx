import Image from "next/image";
import { contact, site } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  ArrowUpRight,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappUrl } from "@/lib/whatsapp";

/** Verified opening hours — from the live expressadvertising.ae footer. */
const hours = [
  { day: "Monday – Friday", time: "10:00 am – 10:00 pm" },
  { day: "Saturday", time: "09:00 am – 10:00 pm" },
  { day: "Sunday", time: "2:00 pm – 10:00 pm" },
];

// Google Maps embed for the verified business listing — no API key required.
// Query is the business name + city only; never append another brand's name.
const MAP_EMBED =
  "https://maps.google.com/maps?q=Express%20Advertising%20Ajman%20UAE&t=m&z=17&output=embed&iwloc=near";

/**
 * Visit the studio — a premium closing composition: a large lazy-loaded Google
 * map with a floating dark navy contact panel overlapping it on desktop, and a
 * stacked layout (panel first) on mobile. All location/contact data is the
 * verified Express Advertising information from src/data/site.ts.
 */
export function LocationContact() {
  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#10305a] py-20 text-white lg:py-28"
    >
      {/* Background image — subtle, blended into the navy overlay */}
      <Image
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&auto=format&fit=crop&q=80"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      {/* Overlay — keeps the section tone and text contrast */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#10305a]/40" />

      <div className="shell relative z-10">
        {/* Heading + description side by side on desktop */}
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan" invert>
              Visit the studio
            </SectionLabel>
            <h2 className="display-lg mt-6 text-white">
              Where ideas
              <br />
              <span className="text-gradient-hero">become physical.</span>
            </h2>
          </Reveal>
          <Reveal
            from="up"
            delay={0.12}
            className="lg:col-span-5 lg:col-start-8 lg:self-end"
          >
            <p className="lede text-white/70">
              Our production runs out of Ajman, serving brands across the UAE —
              come see the capability up close.
            </p>
          </Reveal>
        </div>

        {/* Map + floating contact panel */}
        <div className="relative mt-12 lg:mt-16">
          {/* Map */}
          <div className="overflow-hidden rounded-lg border border-white/10 lg:mr-[26rem]">
            <iframe
              src={MAP_EMBED}
              title="Express Advertising location on Google Maps, Ajman, UAE"
              aria-label="Map showing Express Advertising in Ajman, UAE"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[22rem] w-full grayscale-[0.15] sm:h-[26rem] lg:h-[34rem]"
            />
          </div>

          {/* Contact panel — overlaps the map on desktop */}
          <Reveal
            from="right"
            className="mt-6 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[24rem] lg:-translate-y-1/2"
          >
            <div className="rounded-lg border border-white/10 bg-navy-800/95 p-8 backdrop-blur-md lg:p-9 lg:shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]">
              <p className="label-wide text-cyan-bright">Express Advertising</p>

              <address className="mt-5 flex gap-3 not-italic">
                <PinIcon className="mt-0.5 size-5 shrink-0 text-cyan-bright" />
                <span className="text-sm leading-relaxed text-white/80">
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                  <br />
                  {contact.address.city}, {contact.address.country}
                </span>
              </address>

              {/* Direct channels */}
              <ul className="mt-7 space-y-px border-t border-white/10">
                <li>
                  <a
                    href={`tel:${contact.phoneE164}`}
                    className="group flex items-center gap-3 border-b border-white/10 py-3.5"
                  >
                    <PhoneIcon className="size-5 shrink-0 text-cyan-bright" />
                    <span className="flex-1 text-sm font-semibold text-white transition-colors group-hover:text-cyan-bright">
                      {contact.phoneDisplay}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.emailPrimary}`}
                    className="group flex items-center gap-3 border-b border-white/10 py-3.5"
                  >
                    <MailIcon className="size-5 shrink-0 text-cyan-bright" />
                    <span className="flex-1 truncate text-sm font-semibold text-white transition-colors group-hover:text-cyan-bright">
                      {contact.emailPrimary}
                    </span>
                  </a>
                </li>
              </ul>

              {/* Hours */}
              <dl className="mt-6 space-y-1.5">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4 text-xs">
                    <dt className="text-white/50">{h.day}</dt>
                    <dd className="font-medium text-white/80">{h.time}</dd>
                  </div>
                ))}
              </dl>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gradient group w-full"
                >
                  Get Directions
                  <ArrowUpRight className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <div className="flex gap-3">
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp flex-1 px-4"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${contact.phoneE164}`}
                    className="btn btn-ghost-invert flex-1 px-4"
                  >
                    <PhoneIcon />
                    Call
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
