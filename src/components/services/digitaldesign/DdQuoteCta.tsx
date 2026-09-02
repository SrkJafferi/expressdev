import Image from "next/image";
import Link from "next/link";
import { QuoteButton, WhatsAppButton } from "@/components/ui/Cta";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";

export function DdQuoteCta() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
      {/* Background image layer — same treatment as other CTAs */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1920&q=85"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          aria-hidden
        />
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

      <div className="shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal from="up">
            <p className="label-wide text-cyan-bright">GET A QUOTE</p>
          </Reveal>

          <Reveal from="up" delay={0.1}>
            <h2 className="display-md mt-5 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
              Ready To Give
              <br />
              Your Brand A{" "}
              <span className="text-gradient-hero">Clearer Voice?</span>
            </h2>
          </Reveal>

          <Reveal from="up" delay={0.2}>
            <p className="lede mx-auto mt-5 max-w-xl text-white/65">
              Send us your existing logo, references, business goals or even a
              rough idea. We can help shape the visual direction and turn it
              into a design system that works across digital and physical
              applications.
            </p>
          </Reveal>

          <Reveal from="up" delay={0.3}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <QuoteButton variant="cyan" label="Get a Quote" />
              <WhatsAppButton variant="invert" label="WhatsApp Us" />
            </div>
          </Reveal>

          <Reveal from="up" delay={0.4}>
            <Link
              href="/#services"
              className="label group mt-10 inline-flex items-center gap-1.5 text-white/45 transition-colors hover:text-cyan-bright"
            >
              Need production after design? Explore Services
              <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>

      {/* CMYK hairline */}
      <span aria-hidden className="absolute inset-x-0 bottom-0 flex h-[3px]">
        <span className="h-full flex-1 bg-cyan" />
        <span className="h-full flex-1 bg-magenta" />
        <span className="h-full flex-1 bg-yellow" />
        <span className="h-full flex-1 bg-charcoal" />
      </span>
    </section>
  );
}
