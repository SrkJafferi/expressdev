"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { contact } from "@/data/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

/**
 * Persistent, restrained conversion dock + scroll to top.
 * Appears after scrolling so it never competes with the first impression.
 */
export function WhatsAppDock() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6"
        >
          {/* Scroll to Top Floating Button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Scroll to top"
            className="group relative flex size-11 items-center justify-center rounded-full border border-navy-200/80 bg-white/95 text-navy-900 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan hover:bg-navy-900 hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
          >
            <ArrowUpIcon className="size-4.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5" />
          </button>

          <a
            href={`tel:${contact.phoneE164}`}
            aria-label={`Call ${contact.phoneDisplay}`}
            className="grid size-11 place-items-center rounded-full border border-navy-200/80 bg-white/95 text-ink shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-navy hover:bg-navy-100/60"
          >
            <PhoneIcon />
          </a>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-12 items-center gap-2.5 rounded-full bg-[#128c7e] px-4.5 text-white shadow-[0_14px_36px_-14px_rgba(18,140,126,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0e6f64] hover:shadow-[0_18px_40px_-12px_rgba(18,140,126,0.9)]"
          >
            <WhatsAppIcon className="size-5" />
            <span className="label hidden sm:inline text-[11px] tracking-wider text-white">WhatsApp Quote</span>
            <span className="label sm:hidden text-[11px] tracking-wider text-white">Quote</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

