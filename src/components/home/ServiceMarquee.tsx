import { cn } from "@/lib/cn";

const marqueeItems = [
  "PRINTING SERVICES",
  "SIGNAGE",
  "LARGE FORMAT PRINTING",
  "PROMOTIONAL ITEMS",
  "BRAND COLLATERAL",
  "RETAIL & STOREFRONT",
  "EVENT & EXHIBITION",
  "CNC & LASER CUTTING",
  "DIGITAL DESIGN",
  "IT SERVICES",
];

export function ServiceMarquee({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-navy-900 border-y border-navy-800/80",
        className,
      )}
      aria-label="Capabilities ticker"
    >
      {/* Subtle top CMYK hairline accent */}
      <div
        aria-hidden="true"
        className="h-[1.5px] w-full bg-[linear-gradient(to_right,var(--color-cyan)_0%,var(--color-cyan)_33%,var(--color-magenta)_33%,var(--color-magenta)_66%,var(--color-yellow)_66%,var(--color-yellow)_100%)] opacity-70"
      />

      {/* Edge fade mask container */}
      <div className="service-marquee h-11 sm:h-13 items-center [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="service-marquee-track">
          {/* First loop (accessible to screen readers) */}
          <ul className="flex shrink-0 items-center">
            {marqueeItems.map((item) => (
              <li key={item} className="flex shrink-0 items-center">
                <span className="whitespace-nowrap font-display text-[11px] font-semibold tracking-[0.16em] text-white/90 sm:text-xs">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className="mx-5 inline-block size-1.5 shrink-0 rounded-full bg-yellow opacity-85 shadow-[0_0_8px_rgba(255,241,18,0.6)] sm:mx-7"
                />
              </li>
            ))}
          </ul>

          {/* Second duplicate loop (hidden from assistive tech for seamless infinite animation) */}
          <ul aria-hidden="true" className="flex shrink-0 items-center">
            {marqueeItems.map((item, idx) => (
              <li key={`dup-${idx}`} className="flex shrink-0 items-center">
                <span className="whitespace-nowrap font-display text-[11px] font-semibold tracking-[0.16em] text-white/90 sm:text-xs">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className="mx-5 inline-block size-1.5 shrink-0 rounded-full bg-yellow opacity-85 shadow-[0_0_8px_rgba(255,241,18,0.6)] sm:mx-7"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
