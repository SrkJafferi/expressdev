import Link from "next/link";
import { site } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/ui/Icons";
import { CmykTicks } from "@/components/ui/PrintMarks";
import { Reveal } from "@/components/motion/Reveal";

/* ── Custom line icons — circular outlined treatment per reference ────── */
function BlueprintIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7.5h8M8 11h8M8 14.5h4.5" />
      <path d="M4 19.5 19.5 4" opacity="0.45" />
      <circle cx="16.5" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 4h2l2.3 11.3a1.6 1.6 0 0 0 1.6 1.2h8.3a1.6 1.6 0 0 0 1.6-1.3L20.5 8H6" />
      <circle cx="10" cy="20" r="1.1" />
      <circle cx="17" cy="20" r="1.1" />
    </svg>
  );
}

/** Cyan outlined check-circle used across both checklists. */
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="8" cy="8" r="6.5" />
      <path d="m5.4 8.2 1.8 1.8 3.4-3.9" />
    </svg>
  );
}

/* Shared checklist renderer — cyan outlined check-circles, clean spacing. */
function Checklist({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-7 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-white/75">
          <CheckCircle className="mt-0.5 size-4 shrink-0 text-cyan-bright" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Two ways to work with us — premium dark-blue two-card composition.
 * Path A (custom / complex) is the hero panel; Path B (ready-to-order) is
 * the store pathway. Existing actions are preserved verbatim: #quote link,
 * WhatsApp deep-link and the shop.expressadvertising.ae URL.
 */
export function ShopBridge() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
      {/* Subtle vertical depth wash — no blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(0,153,218,0.10),transparent_60%)]"
      />

      {/* Abstract curved linework — low-opacity wave geometry */}
      <svg
        aria-hidden
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      >
        <defs>
          <linearGradient id="sb-wave-a" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0099da" stopOpacity="0.16" />
            <stop offset="0.5" stopColor="#ec2790" stopOpacity="0.07" />
            <stop offset="1" stopColor="#0099da" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id="sb-wave-b" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2dd4bf" stopOpacity="0.10" />
            <stop offset="1" stopColor="#0099da" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          d="M-80 540C300 400 700 660 1100 500S1580 440 1560 320"
          stroke="url(#sb-wave-a)"
          strokeWidth="1.2"
        />
        <path
          d="M-60 620C340 490 760 710 1180 550S1580 510 1560 390"
          stroke="url(#sb-wave-a)"
          strokeWidth="1"
          opacity="0.65"
        />
        <path
          d="M-60 170C320 290 640 110 1040 230S1500 250 1540 150"
          stroke="url(#sb-wave-b)"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>

      <div className="shell">
        {/* Header — heading left, supporting statement right */}
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan">Two ways to work with us</SectionLabel>
            <h2 className="display-lg mt-6 text-balance text-white">
              Custom build, or
              <br />
              <span className="text-cyan-bright">straight off the shelf.</span>
            </h2>
          </Reveal>
          <Reveal
            from="up"
            delay={0.12}
            className="lg:col-span-4 lg:col-start-9 lg:self-end"
          >
            <p className="lede text-white/65">
              Different needs. Different paths. Same high standards, quality,
              and commitment to get it done right.
            </p>
            <CmykTicks className="mt-5 h-[3px] w-14" />
          </Reveal>
        </div>

        {/* Two-path cards */}
        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2">
          {/* ── PATH A — custom / complex requirement ─────────────── */}
          <Reveal from="up">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#000511_0%,#010d26_100%)] p-7 transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_rgba(0,153,218,0.45)] sm:p-9 lg:p-10">
              {/* Background image — 60% opacity so it blends into the gradient */}
              <span
                aria-hidden
                className="absolute inset-0 bg-[url(/leftcolumn.avif)] bg-right-bottom bg-no-repeat opacity-50"
              />
              {/* Accent edge — cyan with subtle magenta */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,var(--color-cyan)_0%,var(--color-magenta)_55%,transparent_100%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* Content */}
              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full border border-cyan/40 bg-cyan/10 text-cyan-bright">
                    <BlueprintIcon className="size-6" />
                  </span>
                  <span className="label-wide text-cyan-bright">Path A</span>
                </div>

                <h3 className="display-md mt-6 text-[length:36px] text-white">
                  Custom or complex requirement
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
                  Signage, fabrication, installations, large runs, unusual
                  materials, brand rollouts, anything that needs measuring,
                  specifying or site work. We scope it, price it and produce it.
                </p>

                <Checklist
                  items={[
                    "Site survey & measurement",
                    "Material and finish recommendation",
                    "Artwork and pre-press handled in-house",
                    "Installation across the UAE",
                  ]}
                />

                {/* Action — stacked full-width on mobile */}
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#quote"
                    className="btn btn-gradient group/btn w-full px-6 sm:w-auto"
                  >
                    Get a Quote
                    <ArrowRight className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── PATH B — ready-to-order product ───────────────────── */}
          <Reveal from="up" delay={0.08}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#010109_0%,#0d1c39_100%)] p-7 transition-shadow duration-500 hover:shadow-[0_30px_80px_-40px_rgba(45,212,191,0.4)] sm:p-9 lg:p-10">
              {/* Background image — 50% opacity so it blends into the gradient */}
              <span
                aria-hidden
                className="absolute inset-0 bg-[url(/right-column.avif)] bg-right-bottom bg-no-repeat opacity-50"
              />
              {/* Accent edge — teal into cyan */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] bg-[linear-gradient(90deg,#2dd4bf_0%,var(--color-cyan)_55%,transparent_100%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* Content */}
              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full border border-[#2dd4bf]/40 bg-[#2dd4bf]/10 text-[#2dd4bf]">
                    <CartIcon className="size-6" />
                  </span>
                  <span className="label-wide text-[#2dd4bf]">Path B</span>
                </div>

                <h3 className="display-md mt-6 text-[length:36px] text-white">
                  Ready-to-order product
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-white/70 sm:text-[0.9375rem]">
                  Standard sizes, standard quantities, standard turnaround.
                  Our online store handles stock promotional items and
                  everyday print without a back-and-forth quotation.
                </p>

                <Checklist
                  items={[
                    "Browse and order directly",
                    "Fixed specifications and pricing",
                    "Promotional items and standard print",
                    "Separate checkout at shop.expressadvertising.ae",
                  ]}
                />

                {/* Action — stacked full-width on mobile */}
                <div className="mt-9 flex">
                  <a
                    href={site.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn group/btn w-full bg-[linear-gradient(120deg,#0d9488_0%,#0099da_100%)] text-white shadow-[0_10px_30px_-12px_rgba(0,153,218,0.55)] transition-all duration-300 hover:brightness-110 sm:w-auto"
                  >
                    Shop Online
                    <ArrowRight className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1" />
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
