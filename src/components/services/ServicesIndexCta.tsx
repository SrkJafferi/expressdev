import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { QuoteButton, WhatsAppButton } from "@/components/ui/Cta";

/**
 * Closing band for the services index. Deliberately free of invented
 * statistics — the proof here is the capability list above it.
 */
export function ServicesIndexCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-24">
      {/* Background image layer — signage workshop with material samples */}
      <div className="absolute inset-0">
        <Image
          src="/banner5.avif"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-45"
          aria-hidden
        />
        {/* Gradient overlays for depth + readability */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/55" />
        <div aria-hidden className="absolute inset-0 hero-vignette" />
      </div>

      {/* Ambient glow accents over the image */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.2)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.15)_0%,transparent_70%)]"
      />

      {/* Registration dots */}
      <span aria-hidden className="absolute bottom-8 left-8 hidden lg:flex">
        <span className="reg-dots">
          <span className="size-1.5 rounded-full bg-cyan/40" />
          <span className="size-1.5 rounded-full bg-magenta/40" />
          <span className="size-1.5 rounded-full bg-yellow/40" />
        </span>
      </span>

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan" invert>
              Not sure which you need?
            </SectionLabel>
            <h2 className="display-md mt-5 text-balance text-white">
              Send the outcome, not the
              <br />
              <span className="text-gradient-hero">specification.</span>
            </h2>
            <p className="lede mt-5 max-w-xl text-white/70">
              Tell us where it needs to go, who will see it and how long it has
              to last. We will come back with the right material, method and
              timeline — partial information is fine.
            </p>
          </Reveal>

          <Reveal
            from="up"
            delay={0.12}
            className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end"
          >
            <QuoteButton variant="invert" label="Get a Quote" />
            <WhatsAppButton label="WhatsApp Us" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
