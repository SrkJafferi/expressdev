"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef } from "react";
import { processStages } from "@/data/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CropMarks } from "@/components/ui/PrintMarks";

/**
 * useLayoutEffect on the client, useEffect during SSR — avoids the
 * "useLayoutEffect does nothing on the server" warning while keeping the
 * guarantee we need below: on unmount, cleanup runs BEFORE React removes
 * DOM nodes.
 */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * SIGNATURE INTERACTION — vertical scroll drives horizontal movement.
 *
 * Desktop (≥1024px, motion allowed): the section pins and the panel track
 * translates on the X axis, driven 1:1 by scroll progress via
 * gsap.matchMedia(). No hijacking — scroll speed and direction stay under
 * the user's control, and the pin releases as soon as the track completes.
 *
 * Mobile / tablet (<1024px): NO pinning, NO horizontal hijacking. The
 * panels are a native snap-scroll carousel (already styled via the
 * lg: classes below) so vertical page scroll always continues naturally
 * and swipe behaviour stays reliable.
 *
 * Reduced motion: desktop pinning is disabled entirely; mobile native
 * carousel unaffected (it is real user-driven scrolling, not animation).
 */
export function ProcessScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let cancelled = false;
    // Minimal structural type — gsap stays a dynamic import.
    let mm: { revert: () => void } | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      // gsap.matchMedia() sets up the desktop pin ONLY at ≥1024px with
      // motion allowed, and reverts it automatically when the breakpoint no
      // longer matches — no orphaned pin-spacers, no mobile scroll
      // interference. On mobile nothing is created, so native swiping is
      // untouched.
      const mmedia = gsap.matchMedia();

      mmedia.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const ctxGsap = gsap.context(() => {
            const distance = () => track.scrollWidth - window.innerWidth;

            gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            // Progress rule
            gsap.to("[data-process-progress]", {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${distance()}`,
                scrub: true,
              },
            });
          }, section);
        },
      );

      mm = mmedia;
    })();

    return () => {
      cancelled = true;
      // Reverts every context inside matchMedia — scoped, safe cleanup
      // that runs BEFORE React removes DOM nodes (layout-effect timing).
      mm?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="How a job moves through the studio"
      className="relative overflow-hidden bg-navy-900 text-white lg:h-screen"
    >
      {/* Section head */}
      <div className="shell relative z-10 pt-16 pb-8 lg:absolute lg:inset-x-0 lg:top-0 lg:pt-24 lg:pb-0">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel accent="cyan" invert>
              WHY CHOOSE US?
            </SectionLabel>
            <h2 className="display-md mt-5 text-white lg:whitespace-nowrap">
              Idea to installed — handled in one place.
            </h2>
            <p className="lede mt-4 max-w-xl text-white/65">
              From the first idea to final installation, we manage every stage
              with one accountable team. Design, print, fabricate and deliver
              with consistent quality from start to finish.
            </p>
          </div>
          <p className="label-wide max-w-xs text-white/45 lg:text-right">
            <span className="hidden lg:inline">Scroll to advance</span>
            <span className="lg:hidden">Swipe to advance</span>
          </p>
        </div>
      </div>

      {/* Panel track — mobile: native swipe (snap-proximity so partial
          swipes never feel stuck, overscroll contained so swipes never
          bounce the page). Desktop: GSAP-translated, snap disabled. */}
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-proximity gap-5 overflow-x-auto overscroll-x-contain px-5 py-10 sm:px-10 lg:h-full lg:snap-none lg:items-center lg:gap-8 lg:overflow-visible lg:py-0 lg:pl-[max(2.5rem,calc((100vw-96rem)/2+4rem))] lg:pr-[30vw] lg:pt-[13rem]"
      >
        {processStages.map((stage, i) => (
          <article
            key={stage.title}
            className="relative flex w-[84vw] min-w-0 shrink-0 snap-center flex-col sm:w-[62vw] lg:w-[30rem]"
          >
            <div className="flex items-baseline gap-4 border-t border-white/20 pt-5">
              <div className="min-h-[76px]">
                <h3 className="display-md text-white">{stage.title}</h3>
                <p className="label mt-2 text-cyan-bright">{stage.caption}</p>
              </div>
            </div>

            <div className="plate relative mt-6 aspect-16/10 w-full overflow-hidden rounded-2xl">
              <Image
                src={stage.image.src}
                alt={stage.image.alt}
                fill
                sizes="(min-width: 1024px) 30rem, 82vw"
                loading={i < 2 ? "eager" : "lazy"}
                className="object-cover duotone-navy"
              />
              <CropMarks color="white" size={14} className="m-2.5" />
            </div>

            <p className="mt-5 min-h-[70px] max-w-md text-sm leading-relaxed text-white/65">
              {stage.body}
            </p>
          </article>
        ))}
      </div>

      {/* Scroll progress rule — desktop only */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 hidden h-px bg-white/15 lg:block"
      >
        <span
          data-process-progress
          className="block h-px origin-left scale-x-0 bg-cyan-bright"
        />
      </div>
    </section>
  );
}
