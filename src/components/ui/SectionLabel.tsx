import { cn } from "@/lib/cn";

const accentMap = {
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  navy: "bg-navy",
  yellow: "bg-yellow",
  ink: "bg-ink",
  white: "bg-white",
} as const;

export type Accent = keyof typeof accentMap;

/**
 * Section eyebrow: registration-mark square + wide-tracked uppercase label.
 */
export function SectionLabel({
  children,
  accent = "cyan",
  invert = false,
  className,
}: {
  children: React.ReactNode;
  accent?: Accent;
  invert?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "label flex items-center gap-2.5",
        invert ? "text-white/60" : "text-ink-3",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("inline-block size-1.5 shrink-0", accentMap[accent])}
      />
      {children}
    </p>
  );
}

/** Numbered index tag used across editorial sections. */
export function IndexTag({
  value,
  invert = false,
  className,
}: {
  value: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "label-wide tabular-nums",
        invert ? "text-white/45" : "text-ink-3",
        className,
      )}
    >
      {value}
    </span>
  );
}
