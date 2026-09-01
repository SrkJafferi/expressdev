import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Renders the supplied Express Advertising logo asset as-is.
 * The artwork is never recoloured, redrawn or reworded.
 *
 * Presentational only — navigation is the caller's responsibility
 * (wrap with <Link href="/"> at the usage site). This keeps a single
 * anchor around the logo and avoids nested-<a> hydration errors.
 */
export function Logo({
  className,
  priority = false,
  width = 208,
  invert = false,
}: {
  className?: string;
  priority?: boolean;
  width?: number;
  /** On dark/transparent surfaces, seat the artwork on a light chip so the
   *  (unaltered) logo stays legible. The artwork itself is never recoloured. */
  invert?: boolean;
}) {
  const height = Math.round((width * 189) / 500);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center transition-all duration-300",
        invert &&
          "rounded-xl bg-white/95 px-3.5 py-2.5 ring-1 ring-white/50 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md",
        className,
      )}
    >
      <Image
        src="/brand/express-advertising-logo.webp"
        alt="Express Advertising — Advertising Solution"
        width={width}
        height={height}
        priority={priority}
        sizes={`${width}px`}
        className="h-auto w-full"
      />
    </span>
  );
}
