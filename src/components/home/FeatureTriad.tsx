import { Reveal } from "@/components/motion/Reveal";
import { CmykTicks } from "@/components/ui/PrintMarks";
import { cn } from "@/lib/cn";

type IconProps = { className?: string };

/** Box with sizing ticks — custom design, sizes & styles. */
function DesignIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M32 6 56 18v28L32 58 8 46V18z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 18l24 12 24-12M32 30v28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M20 12l24 12" stroke="currentColor" strokeWidth="1" opacity=".5" />
      <circle cx="32" cy="30" r="2.5" className="fill-magenta" />
    </svg>
  );
}

/** Stacked sheets off a press — high-quality offset printing. */
function PressIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <rect
        x="12"
        y="24"
        width="40"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M20 24v-8h24v8M20 42v8h24v-8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M24 46h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="46" cy="33" r="2" className="fill-cyan" />
      <path d="M24 33h8" stroke="currentColor" strokeWidth="1" opacity=".5" />
    </svg>
  );
}

/** Delivery van — fast UAE delivery. */
function DeliveryIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path
        d="M6 20h28v24H6zM34 28h12l8 8v8H34z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="46" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="44" cy="46" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 28h10M0 34h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-cyan" />
      <rect x="46" y="31" width="5" height="4" className="fill-yellow" />
    </svg>
  );
}

const features = [
  {
    Icon: DesignIcon,
    accent: "text-navy",
    lines: ["Custom Design,", "Sizes & Styles"],
  },
  {
    Icon: PressIcon,
    accent: "text-navy",
    lines: ["Premium Print Quality", "For Bulk Orders"],
  },
  {
    Icon: DeliveryIcon,
    accent: "text-navy",
    lines: ["Fast UAE Delivery", "2–5 Business Days"],
  },
] as const;

/**
 * Three-up capability triad — animated line icons over a two-line claim.
 * Rebuilt in the Express Advertising editorial style (no external GIFs).
 */
export function FeatureTriad() {
  return (
    <section className="bg-surface py-16 lg:py-24" aria-label="How we work">
      <div className="shell">
        <div className="grid gap-y-14 sm:grid-cols-3 sm:gap-8 lg:divide-x lg:divide-rule">
          {features.map((f, i) => (
            <Reveal
              key={f.lines[1]}
              from="up"
              delay={i * 0.1}
              className="group flex flex-col items-center px-4 text-center lg:px-8"
            >
              <span
                className={cn(
                  "hero-float grid h-24 w-24 place-items-center",
                  f.accent,
                )}
                style={{ animationDelay: `${i * 1.2}s` }}
              >
                <f.Icon className="h-16 w-16 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110" />
              </span>
              <CmykTicks className="mt-6 h-[3px] w-10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="display-sm mt-5 text-ink">
                {f.lines[0]}
                <br />
                {f.lines[1]}
              </h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
