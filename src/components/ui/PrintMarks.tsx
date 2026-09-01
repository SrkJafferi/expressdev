import { cn } from "@/lib/cn";

/**
 * Print crop marks — subtle corner registration detail.
 * Decorative only; hidden from assistive technology.
 */
export function CropMarks({
  className,
  color = "rule-strong",
  size = 14,
}: {
  className?: string;
  color?: "rule-strong" | "white" | "cyan";
  size?: number;
}) {
  const stroke =
    color === "white"
      ? "rgb(255 255 255 / 0.35)"
      : color === "cyan"
        ? "var(--color-cyan)"
        : "var(--color-rule-strong)";

  const mark = (style: React.CSSProperties) => (
    <span
      aria-hidden
      style={{ ...style, width: size, height: size, borderColor: stroke }}
      className="absolute"
    />
  );

  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {mark({ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1 })}
      {mark({ top: 0, right: 0, borderTopWidth: 1, borderRightWidth: 1 })}
      {mark({ bottom: 0, left: 0, borderBottomWidth: 1, borderLeftWidth: 1 })}
      {mark({ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1 })}
    </span>
  );
}

/** CMYK micro-accent: four hairline swatches. Used very sparingly. */
export function CmykTicks({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("inline-flex h-1 w-16", className)}>
      <span className="h-full flex-1 bg-cyan" />
      <span className="h-full flex-1 bg-magenta" />
      <span className="h-full flex-1 bg-yellow" />
      <span className="h-full flex-1 bg-charcoal" />
    </span>
  );
}

/** Registration target mark. */
export function RegistrationMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn("size-5 text-rule-strong", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="12" cy="12" r="7" />
      <path d="M12 0v24M0 12h24" />
    </svg>
  );
}
