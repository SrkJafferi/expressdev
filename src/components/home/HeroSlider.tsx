"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { heroSlides, catalogueUrl } from "@/data/services";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

const DURATION = 6000;

const accentBar = {
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  navy: "bg-navy",
  yellow: "bg-yellow",
} as const;

/**
 * Full-width immersive hero slider — the strongest moment on the page.
 * Autoplays, pauses on hover/focus/interaction, supports keyboard controls,
 * and respects prefers-reduced-motion (no autoplay, no transform reveals).
 */
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const count = heroSlides.length;

  const go = useCallback(
    (next: number) => setIndex((next + count) % count),
    [count],
  );

  // Autoplay — halted when paused or reduced-motion is requested.
  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setTimeout(() => go(index + 1), DURATION);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, go]);

  const slide = heroSlides[index] ?? heroSlides[0];
  if (!slide) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Express Advertising capabilities"
      className="relative isolate overflow-hidden bg-navy-900 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-[86svh] min-h-[560px] w-full lg:h-[88svh]">
        {/* Slides — crossfade with a slow ken-burns scale.
            initial={false}: the first slide paints fully visible immediately
            (no dark start), transitions for later slides are unchanged. */}
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            initial={reduced || index === 0 ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              initial={
                reduced || index === 0 ? { scale: 1 } : { scale: 1.08 }
              }
              animate={{ scale: 1 }}
              transition={{ duration: reduced ? 0 : 7, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                priority={index === 0}
                data-hero-primary={index === 0 ? "true" : undefined}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            <div aria-hidden className="absolute inset-0 hero-overlay" />
            <div aria-hidden className="absolute inset-0 hero-vignette" />
          </motion.div>
        </AnimatePresence>

        {/* Structural grid + crop marks */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
          <span className="absolute left-6 top-24 h-6 w-6 border-l border-t border-white/25 lg:left-10 lg:top-28" />
          <span className="absolute right-6 top-24 h-6 w-6 border-r border-t border-white/25 lg:right-10 lg:top-28" />

          {/* Floating accent orbs — soft ambient motion, decorative only */}
          <span className="hero-float absolute right-[12%] top-[22%] h-40 w-40 rounded-full bg-cyan/25 blur-3xl" />
          <span className="hero-float-slow absolute left-[8%] bottom-[26%] h-52 w-52 rounded-full bg-magenta/20 blur-3xl" />
          <span className="hero-float-slow absolute right-[30%] bottom-[14%] h-28 w-28 rounded-full bg-yellow/15 blur-2xl" />

          {/* Drifting CMYK dots */}
          <span className="hero-float absolute right-[18%] top-[34%] size-2.5 rounded-full bg-cyan/80 shadow-[0_0_12px_rgba(0,153,218,0.8)]" />
          <span className="hero-float-slow absolute right-[24%] top-[46%] size-2 rounded-full bg-magenta/80 shadow-[0_0_12px_rgba(236,39,144,0.8)]" />
          <span className="hero-float absolute right-[14%] top-[52%] size-1.5 rounded-full bg-yellow/90 shadow-[0_0_10px_rgba(255,241,18,0.8)]" />
        </div>

        {/* Content */}
        <div className="relative z-20 flex h-full items-end pb-16 lg:items-center lg:pb-0">
          <div className="shell w-full">
            <div>
              {/* initial={false}: slide 1 content is fully visible on SSR
                  paint and stays mounted through hydration — no entrance
                  replay / disappearing flash on mount (incl. StrictMode).
                  Later slide changes still crossfade normally. */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={slide.id}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 1 } : { opacity: 0, y: -16 }}
                  transition={{ duration: reduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mt-[50px] flex items-center gap-3">
                    <span
                      aria-hidden
                      className={cn("h-1 w-10", accentBar[slide.accent])}
                    />
                    <p className="label-wide text-white/90">{slide.eyebrow}</p>
                  </div>
                  {/* Padding extends the paint box beyond the tight line-height
                      so glyph ink is never clipped by the gradient-fill +
                      transform rasterisation (e.g. "One partner." on slide 5). */}
                  <h1 className="display-hero text-gradient-hero mt-5 overflow-visible pt-[0.06em] pb-[0.14em] pl-[0.03em] font-extrabold tracking-tight">
                    {slide.title.map((line, li) => (
                      <span key={li} className="block">
                        {line.map((seg, si) =>
                          seg.accent ? (
                            <span
                              key={si}
                              className="text-cyan [-webkit-text-fill-color:currentColor]"
                            >
                              {seg.text}
                            </span>
                          ) : (
                            <span key={si}>{seg.text}</span>
                          ),
                        )}
                      </span>
                    ))}
                  </h1>
                  <p className="lede mt-5 max-w-xl text-white/90">{slide.body}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3">
                <Link href="/#services" className="btn btn-primary group px-7">
                  Explore Services
                  <ArrowRight className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
                </Link>
                <a href={catalogueUrl} className="btn btn-ghost-invert group px-7">
                  View Catalogue
                  <ArrowRight className="rotate-90 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Controls — pagination + progress + arrows */}
        <div className="absolute inset-x-0 bottom-0 z-30">
          <div className="shell flex items-end justify-between pb-6 lg:pb-8">
            <div className="flex items-center gap-3">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
                  aria-current={i === index}
                  className="group relative h-8 py-3"
                >
                  <span className="relative block h-0.5 w-10 overflow-hidden bg-white/25 lg:w-14">
                    {i === index && (
                      <motion.span
                        key={`${s.id}-${index}-${paused}`}
                        className={cn(
                          "absolute inset-y-0 left-0 hero-progress",
                          accentBar[slide.accent],
                        )}
                        initial={{ scaleX: reduced ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                          duration: reduced || paused ? 0 : DURATION / 1000,
                          ease: "linear",
                        }}
                        style={{ width: "100%" }}
                      />
                    )}
                    {i < index && (
                      <span className="absolute inset-0 bg-white/60" />
                    )}
                  </span>
                </button>
              ))}
              <span className="ml-3 label-wide tabular-nums text-white/55">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(count).padStart(2, "0")}
              </span>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="grid size-11 place-items-center border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <ArrowRight className="size-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="grid size-11 place-items-center border border-white/25 text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* CMYK hairline anchoring the hero */}
          <span aria-hidden className="flex h-[3px] w-full">
            <span className="h-full flex-1 bg-cyan" />
            <span className="h-full flex-1 bg-magenta" />
            <span className="h-full flex-1 bg-yellow" />
            <span className="h-full flex-1 bg-charcoal" />
          </span>
        </div>
      </div>
    </section>
  );
}
