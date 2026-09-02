import { QuoteButton, WhatsAppButton } from "@/components/ui/Cta";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Closing CTA for the clients page — the secondary marquee rows were
 * removed as redundant (the main logo wall already showcases clients).
 */
export function ClMarquee() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      {/* Watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none whitespace-nowrap text-[14vw] font-extrabold leading-none tracking-tight text-navy/[0.03] lg:text-[9.5rem]"
      >
        START
      </span>

      <div className="shell relative z-10">
        <Reveal from="up">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex w-fit items-center gap-3.5">
              <span aria-hidden className="h-px w-10 bg-cyan" />
              <p className="label-wide text-ink-3">
                WORK WITH EXPRESS ADVERTISING
              </p>
              <span aria-hidden className="size-1.5 rounded-full bg-magenta" />
            </div>

            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Let&apos;s Build Your
              <br />
              Next Brand{" "}
              <span className="text-gradient-deep">Touchpoint.</span>
            </h2>

            <p className="lede mx-auto mt-5 max-w-xl text-ink-2">
              Tell us what you need — print, signage, promotional products,
              event graphics or a complete branded production requirement —
              and our team will help you plan the right way forward.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <QuoteButton variant="cyan" label="Get a Quote" />
              <WhatsAppButton label="WhatsApp Us" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
