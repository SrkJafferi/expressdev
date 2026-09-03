"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { reviews, reviewSummary, type Review } from "@/data/reviews";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/** Inline Google "G" mark — brand colours, drawn (not a pasted asset). */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} aria-hidden viewBox="0 0 20 20" className={i < rating ? "size-4 fill-[#FBBC05]" : "size-4 fill-rule-strong"}>
          <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.8L10 14.9l-5.25 2.7 1-5.8L1.5 7.65l5.9-.85z" />
        </svg>
      ))}
    </span>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

/** Shield-check mark for the verified review label. */
function ShieldCheck({ className }: { className?: string }) {
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
      <path d="M8 1.5l5.5 2v4.1c0 3.4-2.3 5.9-5.5 7-3.2-1.1-5.5-3.6-5.5-7V3.5z" />
      <path d="M5.7 7.9l1.7 1.7 2.9-3.1" />
    </svg>
  );
}

/** Thin brand top edge — cyan / magenta / gold, one per card, cycling. */
const cardAccents = ["bg-cyan", "bg-magenta", "bg-[#FBBC05]"] as const;

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > 260;

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-rule bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-rule-strong hover:shadow-[0_18px_40px_-24px_rgba(27,77,133,0.25)]">
      {/* Thin brand top edge */}
      <span
        aria-hidden
        className={cn("absolute inset-x-0 top-0 h-[3px]", cardAccents[index % cardAccents.length])}
      />

      {/* Oversized quote watermark — very low opacity */}
      <span
        aria-hidden
        className="font-display pointer-events-none absolute -bottom-10 right-3 select-none text-[8rem] font-extrabold leading-none text-navy-900/[0.045]"
      >
        &rdquo;
      </span>

      {/* Reviewer header */}
      <div className="flex items-center gap-3.5">
        {review.profileImage ? (
          <Image
            src={review.profileImage}
            alt={review.name}
            width={48}
            height={48}
            loading="lazy"
            className="size-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">
            {initials(review.name)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-navy-900">{review.name}</p>
          <Stars rating={review.rating} className="mt-1" />
        </div>
        <GoogleG className="size-5 shrink-0" />
      </div>

      {/* Review text */}
      <blockquote
        className={cn(
          "mt-6 flex-1 whitespace-pre-line text-[0.9375rem] leading-relaxed text-ink-2",
          long && !expanded && "line-clamp-6",
        )}
      >
        {review.text}
      </blockquote>

      {long && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 self-start text-xs font-semibold text-[#0099da] underline-offset-4 transition-colors hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      {/* Verified label */}
      <span className="mt-6 flex items-center gap-2 border-t border-rule pt-4">
        <ShieldCheck className="size-3.5 shrink-0 text-[#0099da]" />
        <span className="label-wide leading-relaxed text-ink-3">
          Verified
          <br />
          Google review
        </span>
      </span>
    </article>
  );
}

/**
 * Premium light-themed Google reviews section — real verified reviews pulled
 * from the live Express Advertising Trustindex/Google widget
 * (see src/data/reviews.ts).
 *
 * Editorial left column (eyebrow, heading, summary card, CTA) with a
 * scroll-snap carousel on the right: native drag/swipe, arrow controls,
 * pagination, slow autoplay that pauses on interaction, and full
 * reduced-motion respect.
 */
export function GoogleReviews() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const paused = useRef(false);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const p = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    setPages(p);
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const scrollToPage = useCallback((p: number) => {
    const el = trackRef.current;
    if (!el) return;
    const next = ((p % pages) + pages) % pages;
    el.scrollTo({ left: next * el.clientWidth, behavior: reduced ? "auto" : "smooth" });
  }, [pages, reduced]);

  // Slow, tasteful autoplay — halts under reduced motion or user interaction.
  useEffect(() => {
    if (reduced || pages <= 1) return;
    const id = setInterval(() => {
      if (paused.current) return;
      scrollToPage(page + 1);
    }, 5500);
    return () => clearInterval(id);
  }, [reduced, pages, page, scrollToPage]);

  return (
    <section className="bg-[#edf1f5] py-20 lg:py-28" aria-label="Google reviews">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ── LEFT — editorial column ────────────────────────────── */}
          <div className="lg:col-span-4">
            <p className="flex items-center gap-2.5">
              <span aria-hidden className="size-2 bg-cyan" />
              <span className="label-wide text-navy-900">Google Reviews</span>
            </p>

            <h2 className="display-md sm:display-lg mt-5 text-balance font-bold tracking-tight text-navy-900">
              Rated by the people
              <br />
              <span className="text-[#0099da]">we print for.</span>
            </h2>

            {/* CMYK accent line */}
            <span aria-hidden className="mt-6 flex h-[3px] w-20">
              <span className="h-full flex-1 bg-cyan" />
              <span className="h-full flex-1 bg-magenta" />
              <span className="h-full flex-1 bg-[#FBBC05]" />
              <span className="h-full flex-1 bg-navy/20" />
            </span>

            <p className="lede mt-6 text-ink-2">
              Real feedback from real clients who trust us for quality,
              reliability and results that stand out.
            </p>

            {/* Rating summary card */}
            <div className="relative mt-8 overflow-hidden rounded-xl border border-rule bg-white p-5 shadow-[0_2px_12px_-6px_rgba(27,77,133,0.12)]">
              <div className="flex items-center gap-4">
                <GoogleG className="size-10 shrink-0" />
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-3xl font-extrabold tracking-tight text-navy-900">
                      {reviewSummary.rating.toFixed(1)}
                    </span>
                    <Stars rating={5} />
                  </div>
                  <p className="mt-1 text-xs text-ink-3">
                    Based on {reviewSummary.total} Google reviews
                  </p>
                </div>
              </div>
              {/* Subtle CMYK accent on the right edge */}
              <span
                aria-hidden
                className="absolute inset-y-0 right-0 w-1 bg-[linear-gradient(to_bottom,var(--color-cyan)_0%,var(--color-cyan)_33%,var(--color-magenta)_33%,var(--color-magenta)_66%,#FBBC05_66%,#FBBC05_100%)]"
              />
            </div>

            {/* CTA */}
            <a
              href={reviewSummary.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full border border-rule-strong bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-navy-900 transition-all duration-200 hover:border-[#0099da] hover:text-[#0099da] hover:shadow-xs focus-visible:ring-2 focus-visible:ring-[#0099da]/40"
            >
              View all Google reviews
              <ArrowUpRight className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* ── RIGHT — review carousel ────────────────────────────── */}
          <div className="lg:col-span-8">
            <div
              ref={trackRef}
              onScroll={() => {
                const el = trackRef.current;
                if (el) setPage(Math.round(el.scrollLeft / el.clientWidth));
              }}
              onMouseEnter={() => (paused.current = true)}
              onMouseLeave={() => (paused.current = false)}
              onFocusCapture={() => (paused.current = true)}
              onBlurCapture={() => (paused.current = false)}
              onPointerDown={() => (paused.current = true)}
              tabIndex={0}
              aria-label="Customer reviews, scrollable"
              className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-1 outline-none focus-visible:ring-2 focus-visible:ring-navy/40"
            >
              {reviews.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={reduced ? false : { opacity: 0, y: 24 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
                  className="w-[85%] shrink-0 snap-start sm:w-[46%] xl:w-[calc((100%-3rem)/3)]"
                >
                  <ReviewCard review={r} index={i} />
                </motion.div>
              ))}
            </div>

            {/* Controls */}
            <div className="mt-7 flex items-center justify-between">
              <div className="flex gap-1.5" role="tablist" aria-label="Review pages">
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={i === page}
                    aria-label={`Go to review page ${i + 1}`}
                    onClick={() => scrollToPage(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === page
                        ? "w-7 bg-[#0099da]"
                        : "w-1.5 bg-rule-strong hover:bg-ink-3",
                    )}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollToPage(page - 1)}
                  aria-label="Previous reviews"
                  className="grid size-11 place-items-center rounded-lg border border-rule-strong bg-white text-ink transition-colors duration-200 hover:border-[#0099da] hover:text-[#0099da] focus-visible:ring-2 focus-visible:ring-[#0099da]/40"
                >
                  <ArrowUpRight className="size-4 -rotate-[135deg]" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToPage(page + 1)}
                  aria-label="Next reviews"
                  className="grid size-11 place-items-center rounded-lg border border-rule-strong bg-white text-ink transition-colors duration-200 hover:border-[#0099da] hover:text-[#0099da] focus-visible:ring-2 focus-visible:ring-[#0099da]/40"
                >
                  <ArrowUpRight className="size-4 rotate-45" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
