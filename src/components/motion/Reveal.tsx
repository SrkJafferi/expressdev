"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Distance/axis of entry — varied deliberately so sections don't all fade up. */
  from?: "up" | "left" | "right" | "scale" | "clip";
  as?: "div" | "section" | "li" | "span";
};

const offsets = {
  up: { y: 28, x: 0 },
  left: { y: 0, x: -32 },
  right: { y: 0, x: 32 },
  scale: { y: 12, x: 0 },
  clip: { y: 0, x: 0 },
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const off = offsets[from];

  const variants: Variants = {
    hidden: reduced
      ? { opacity: 1 }
      : {
          opacity: from === "clip" ? 1 : 0,
          x: off.x,
          y: off.y,
          scale: from === "scale" ? 0.965 : 1,
          clipPath: from === "clip" ? "inset(0 100% 0 0)" : undefined,
        },
    shown: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      clipPath: from === "clip" ? "inset(0 0% 0 0)" : undefined,
      transition: reduced
        ? { duration: 0 }
        : {
            duration: from === "clip" ? 1 : 0.78,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="shown"
      // `amount: "some"` fired the moment 1px crossed the fold, so on a fast
      // scroll the animation was already over by the time the element was
      // readable. A negative bottom margin delays the trigger until the
      // element is ~15% into the viewport, and — unlike a percentage
      // `amount` — it still works for elements taller than the viewport.
      viewport={{ once: true, amount: "some", margin: "0px 0px -15% 0px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Word-by-word display headline mask. Used only on the hero so the
 * treatment stays a signature rather than a repeated tic.
 */
export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.06em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "108%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.95,
              delay: delay + i * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
