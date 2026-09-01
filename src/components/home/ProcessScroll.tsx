"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { processStages } from "@/data/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CropMarks } from "@/components/ui/PrintMarks";

/**
 * SIGNATURE INTERACTION — vertical scroll drives horizontal movement.
 *
 * Desktop (≥1024px, motion allowed): the section pins and the panel track
 * translates on the X axis, driven 1:1 by scroll progress. No hijacking —
 * scroll speed and direction stay under the user's control, and the pin
 * releases as soon as the track completes.
 *
 * Mobile / reduced-motion: no pinning at all. The same panels become a
 * native horizontal snap-scroll carousel that the user swipes.
 */
export function ProcessScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mqDesktop.matches || mqReduced.matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
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

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      }, section);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="How a job moves through the studio"
      className="relative overflow-hidden bg-navy-900 text-white lg:h-screen"
    >
      {/* Section head */}
      <div className="shell relative z-10 pt-16 lg:absolute lg:inset-x-0 lg:top-0 lg:pt-24">
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

      {/* Panel track */}
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 py-10 sm:px-10 lg:h-full lg:snap-none lg:items-center lg:gap-8 lg:overflow-visible lg:py-0 lg:pl-[max(2.5rem,calc((100vw-96rem)/2+4rem))] lg:pr-[30vw] lg:pt-40"
      >
        {processStages.map((stage, i) => (
          <article
            key={stage.title}
            className="relative flex w-[82vw] shrink-0 snap-center flex-col sm:w-[62vw] lg:w-[30rem]"
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
