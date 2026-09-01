"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/**
 * Global smooth-scroll provider — Lenis inertia scrolling wired into the
 * existing GSAP ticker (single RAF loop, no duplicate loops).
 *
 * - Smooth wheel only; touch keeps native momentum (syncTouch stays off).
 * - Anchor links (#services, #contact, …) are routed through lenis.scrollTo
 *   so section scroll-margins keep working.
 * - Disabled entirely under prefers-reduced-motion → native browser scroll.
 * - GSAP ScrollTrigger stays authoritative: lenis feeds it via
 *   ScrollTrigger.update and the GSAP ticker drives lenis.raf.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let lenis: Lenis | undefined;
    let raf: ((time: number) => void) | undefined;
    let onClick: ((e: MouseEvent) => void) | undefined;
    let destroyed = false;

    (async () => {
      const [{ default: LenisCtor }, { gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
      if (destroyed) return;

      lenis = new LenisCtor({
        duration: 0.95,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        lerp: 0.12,
      });

      // Keep ScrollTrigger in sync with Lenis-driven scroll position.
      lenis.on("scroll", ScrollTrigger.update);

      // Single RAF loop — the GSAP ticker drives Lenis.
      raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // Anchor navigation through Lenis (honours scroll-margin-top).
      onClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement | null)?.closest?.(
          'a[href^="#"]',
        ) as HTMLAnchorElement | null;
        if (!anchor) return;
        const hash = anchor.getAttribute("href");
        if (!hash || hash === "#") return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        lenis?.scrollTo(hash as string, { offset: -96 });
      };
      document.addEventListener("click", onClick);

      ScrollTrigger.refresh();
    })();

    return () => {
      destroyed = true;
      const ticker = raf;
      if (ticker) {
        import("gsap").then(({ gsap }) => gsap.ticker.remove(ticker));
      }
      if (onClick) document.removeEventListener("click", onClick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
