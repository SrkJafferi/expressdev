"use client";

import { useEffect, useRef } from "react";

/**
 * Premium two-part custom cursor — dark navy dot + ring, zero-lag tracking.
 *
 * - Dot and ring share ONE pointer target and receive the IDENTICAL
 *   transform (translate3d + centre) — the dot stays dead-centre in the
 *   ring at all times, even during fast movement.
 * - Interactive elements (links/buttons) expand the ring via event delegation.
 * - Optional per-element modes: data-cursor="view" | "drag" | "link".
 * - Native cursor is hidden only after successful init, and restored for
 *   text fields (input/textarea/select/contenteditable).
 * - Touch devices (pointer: coarse) never see it.
 * - One pointermove listener, one RAF loop, zero React state per frame.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dotWrap = dotRef.current;
    const ringWrap = ringRef.current;
    if (!dotWrap || !ringWrap) return;
    const dot = dotWrap.firstElementChild as HTMLDivElement;
    const ring = ringWrap.firstElementChild as HTMLDivElement;
    const label = ring.querySelector("span") as HTMLSpanElement;

    // Single shared pointer target — dot and ring get the IDENTICAL
    // transform every frame, so the dot is always dead-centre in the ring.
    let mx = -100;
    let my = -100;
    let raf = 0;
    let visible = false;

    const setState = (cls: "" | "is-link" | "is-mode", text = "") => {
      dot.classList.toggle("is-link", cls === "is-link");
      dot.classList.toggle("is-mode", cls === "is-mode");
      ring.classList.toggle("is-link", cls === "is-link");
      ring.classList.toggle("is-mode", cls === "is-mode");
      if (label.textContent !== text) label.textContent = text;
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dotWrap.style.opacity = "1";
        ringWrap.style.opacity = "1";
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      if (!el) return;

      // Text fields → hide the custom cursor, native caret/I-beam returns.
      const field = el.closest(
        'input, textarea, select, [contenteditable="true"]',
      );
      if (field) {
        dotWrap.style.opacity = "0";
        ringWrap.style.opacity = "0";
        setState("");
        return;
      }
      dotWrap.style.opacity = "1";
      ringWrap.style.opacity = "1";

      // Opt-in modes: data-cursor="view" | "drag"
      const modeEl = el.closest('[data-cursor="view"], [data-cursor="drag"]');
      if (modeEl) {
        const mode = modeEl.getAttribute("data-cursor");
        setState("is-mode", mode === "drag" ? "Drag" : "View");
        return;
      }

      // Links / buttons → ring expands, dot shrinks
      const interactive = el.closest(
        'a, button, [role="button"], summary, label',
      );
      setState(interactive ? "is-link" : "");
    };

    const onDown = () => ring.classList.add("is-pressed");
    const onUp = () => ring.classList.remove("is-pressed");
    const onLeave = () => {
      visible = false;
      dotWrap.style.opacity = "0";
      ringWrap.style.opacity = "0";
    };
    const onEnter = () => {
      if (mx > 0) {
        dotWrap.style.opacity = "1";
        ringWrap.style.opacity = "1";
      }
    };

    const tick = () => {
      const t = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      dot.style.transform = t;
      ring.style.transform = t;
      raf = requestAnimationFrame(tick);
    };

    // Hide the native cursor only once the custom one is live.
    document.body.classList.add("custom-cursor-active");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[300] opacity-0"
      >
        <div className="cursor-dot-inner" />
      </div>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[299] opacity-0"
      >
        <div className="cursor-ring-inner">
          <span className="cursor-label" />
        </div>
      </div>
    </>
  );
}
