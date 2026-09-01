"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Initial page loader — real readiness milestones only, no fake timers.
 *
 * - Reveals ONLY if the page is still not ready after REVEAL_THRESHOLD ms
 *   (fast/cached loads never see it).
 * - Progress = actual milestones: mounted 25% → fonts 50% → first hero
 *   image 80% → ready 100%. Smooth scaleX between milestones.
 * - Hero image error/timeout never traps the visitor — page always opens.
 * - Scroll is locked only while the loader is actually visible; Lenis is
 *   stopped/started via SmoothScroll's ea:loader-* events.
 * - Lives in the root layout, so client-side navigation never replays it.
 */
type Phase = "checking" | "visible" | "exiting" | "done";

const REVEAL_THRESHOLD = 200; // ms — anti-flicker window
const FONTS_TIMEOUT = 3000; // ms — never wait longer than this for fonts
const HERO_TIMEOUT = 4000; // ms — never wait longer than this for the hero
const EXIT_BEAT = 120; // ms — perceptible 100% beat before exit
const EXIT_MS = 450; // ms — overlay exit duration

export function InitialPageLoader() {
  const [phase, setPhase] = useState<Phase>("checking");
  const barRef = useRef<HTMLSpanElement>(null);
  const progress = useRef(0);
  // Whether the overlay was ever revealed. If readiness completes before the
  // reveal threshold, the loader must finish SILENTLY — mounting the overlay
  // just to play an exit animation is itself a dark flash on fast loads.
  const shownRef = useRef(false);

  useEffect(() => {
    let disposed = false;
    let fontsReady = false;
    let heroReady = false;
    let finished = false;
    const timers: number[] = [];

    const setProgress = (p: number) => {
      if (p <= progress.current) return;
      progress.current = p;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p / 100})`;
      }
    };

    const finish = () => {
      if (finished || disposed) return;
      finished = true;
      // Never revealed → finish silently. No overlay, no events, no exit.
      if (!shownRef.current) return;
      setProgress(100);
      // Release the scroll lock and wake Lenis.
      document.documentElement.classList.remove("page-loader-lock");
      window.dispatchEvent(new CustomEvent("ea:loader-end"));
      // Small perceptible beat at 100%, then refined exit.
      timers.push(window.setTimeout(() => setPhase("exiting"), EXIT_BEAT));
      timers.push(
        window.setTimeout(() => setPhase("done"), EXIT_BEAT + EXIT_MS),
      );
    };

    const maybeFinish = () => {
      if (fontsReady && heroReady) finish();
    };

    // Milestone 1 — client mounted.
    setProgress(25);

    // Reveal only after the anti-flicker threshold — and only if the main
    // visual (first hero image) is genuinely still loading. If the hero is
    // already ready, the page looks complete: never show the overlay.
    timers.push(
      window.setTimeout(() => {
        if (finished || disposed || heroReady) return;
        shownRef.current = true;
        document.documentElement.classList.add("page-loader-lock");
        window.dispatchEvent(new CustomEvent("ea:loader-start"));
        setPhase("visible");
      }, REVEAL_THRESHOLD),
    );

    // Milestone 2 — fonts that affect hero layout.
    const fontsTimer = window.setTimeout(() => {
      if (fontsReady) return;
      fontsReady = true;
      setProgress(50);
      maybeFinish();
    }, FONTS_TIMEOUT);
    document.fonts?.ready.then(() => {
      if (finished || disposed || fontsReady) return;
      fontsReady = true;
      window.clearTimeout(fontsTimer);
      setProgress(50);
      maybeFinish();
    });

    // Milestone 3 — FIRST hero image (eager, above the fold) only.
    let heroEl: HTMLImageElement | null = null;
    const onHeroDone = () => {
      if (heroReady || finished || disposed) return;
      heroReady = true;
      heroEl?.removeEventListener("load", onHeroDone);
      heroEl?.removeEventListener("error", onHeroDone);
      setProgress(80);
      maybeFinish();
    };
    const findHero = () => {
      const img = document.querySelector<HTMLImageElement>(
        "img[data-hero-primary]",
      );
      if (!img) return;
      heroEl = img;
      if (img.complete && img.naturalWidth > 0) {
        onHeroDone();
      } else {
        img.addEventListener("load", onHeroDone, { once: true });
        img.addEventListener("error", onHeroDone, { once: true });
      }
    };
    findHero();
    // Safety net: if the hero element is missing or stalls, don't trap.
    const heroTimer = window.setTimeout(onHeroDone, HERO_TIMEOUT);
    const heroPoll = window.setInterval(() => {
      if (heroReady || finished || disposed) {
        window.clearInterval(heroPoll);
        return;
      }
      if (!heroEl) findHero();
    }, 150);

    return () => {
      disposed = true;
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(fontsTimer);
      window.clearTimeout(heroTimer);
      window.clearInterval(heroPoll);
      heroEl?.removeEventListener("load", onHeroDone);
      heroEl?.removeEventListener("error", onHeroDone);
      // Only release the lock if WE applied it (loader was actually shown).
      if (shownRef.current) {
        document.documentElement.classList.remove("page-loader-lock");
      }
    };
  }, []);

  if (phase === "checking" || phase === "done") return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Express Advertising"
      className={cn(
        "loader-overlay fixed inset-0 z-[400] grid place-items-center bg-[linear-gradient(180deg,#01030f_0%,#0a1f3c_100%)]",
        phase === "exiting" && "is-exiting",
      )}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="loader-logo rounded-xl bg-white/95 px-4 py-3 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.7)]">
          <Image
            src="/brand/express-advertising-logo.webp"
            alt="Express Advertising"
            width={220}
            height={83}
            priority
          />
        </div>

        {/* Real-milestone progress bar — cyan → magenta → yellow */}
        <div className="loader-bar">
          <span ref={barRef} className="loader-bar-fill" />
        </div>

        <p className="label-wide text-white/40">Preparing the experience</p>
      </div>
    </div>
  );
}
