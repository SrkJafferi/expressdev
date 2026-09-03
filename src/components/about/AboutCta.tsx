import Image from "next/image";
import { QuoteButton, WhatsAppButton } from "@/components/ui/Cta";
import { Reveal } from "@/components/motion/Reveal";

export function AboutCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      {/* Background image layer */}
      <div className="absolute inset-0">
        <Image
          src="/banner4.avif"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          aria-hidden
        />
        {/* Gradient overlays for depth + readability */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/60" />
        <div aria-hidden className="absolute inset-0 hero-vignette" />
      </div>

      {/* Decorative glow orbs */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.18)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.12)_0%,transparent_70%)]" />

      {/* Corner crop marks */}
      <span aria-hidden className="crop-mark crop-tl" />
      <span aria-hidden className="crop-mark crop-tr" />
      <span aria-hidden className="crop-mark crop-bl" />
      <span aria-hidden className="crop-mark crop-br" />

      <div className="shell relative z-10 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal from="up">
            <div className="mx-auto flex w-fit items-center gap-3">
              <span aria-hidden className="h-1 w-10 bg-cyan" />
              <p className="label text-white/70">
                Start Your Project
              </p>
              <span aria-hidden className="h-1 w-10 bg-magenta" />
            </div>
          </Reveal>

          <Reveal from="up" delay={0.1}>
            <h2 className="display-md mt-7 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
              Let&apos;s Build Something Your Brand{" "}
              <span className="text-gradient-hero">
                Will Be Seen For.
              </span>
            </h2>
          </Reveal>

          <Reveal from="up" delay={0.2}>
            <p className="lede mx-auto mt-6 max-w-2xl text-white/70">
              Talk to our team about signage, print, fabrication, retail
              branding or promotional items — one brief, one team, delivered
              anywhere in the UAE.
            </p>
          </Reveal>

          <Reveal from="up" delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <QuoteButton variant="cyan" label="Get a Quote" />
              <WhatsAppButton variant="invert" label="WhatsApp Us" />
            </div>
          </Reveal>

        </div>
      </div>

      {/* CMYK hairline anchoring the section */}
      <span aria-hidden className="absolute inset-x-0 bottom-0 z-10 flex h-[3px]">
        <span className="h-full flex-1 bg-cyan" />
        <span className="h-full flex-1 bg-magenta" />
        <span className="h-full flex-1 bg-yellow" />
        <span className="h-full flex-1 bg-charcoal" />
      </span>
    </section>
  );
}
