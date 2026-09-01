"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Service } from "@/data/services";
import { ArrowUpRight } from "@/components/ui/Icons";
import {
  PrinterIcon,
  SignpostIcon,
  ScanLineIcon,
  GiftIcon,
  LayersIcon,
  StoreIcon,
  CrosshairIcon,
  PenToolIcon,
  MonitorIcon,
} from "@/components/ui/FooterIcons";
import { CropMarks, CmykTicks } from "@/components/ui/PrintMarks";
import { cn } from "@/lib/cn";

const accentText = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  navy: "text-navy",
  yellow: "text-yellow",
} as const;

const accentBar = {
  cyan: "bg-cyan",
  magenta: "bg-magenta",
  navy: "bg-navy",
  yellow: "bg-yellow",
} as const;

const serviceIcons = {
  "printing-services": PrinterIcon,
  signage: SignpostIcon,
  "large-format-printing": ScanLineIcon,
  "promotional-items": GiftIcon,
  "brand-collateral": LayersIcon,
  "retail-events-exhibition": StoreIcon,
  "cnc-laser-cutting": CrosshairIcon,
  "digital-design": PenToolIcon,
  "it-services": MonitorIcon,
} as const;

const serviceBg = {
  "printing-services": "bg-[#f5f8ff]",
  signage: "bg-[#fff6fb]",
  "large-format-printing": "bg-[#f0feef]",
  "promotional-items": "bg-[#fefaef]",
  "brand-collateral": "bg-[#f5f8ff]",
  "retail-events-exhibition": "bg-[#fff6fb]",
  "cnc-laser-cutting": "bg-[#f0feef]",
  "digital-design": "bg-[#fefaef]",
  "it-services": "bg-[#f5f8ff]",
} as const;

/**
 * Editorial capability index with a large sticky preview panel on desktop.
 * Every capability is rendered identically — the same luxury scroll treatment
 * for Printing, Signage, Large Format and the rest. On small screens it
 * degrades to a stacked list with inline imagery.
 */
export function ServiceIndex({ services }: { services: Service[] }) {
  // Hover / keyboard focus temporarily overrides scroll-driven activation.
  const [hovered, setHovered] = useState<number | null>(null);
  // Scroll-driven active row — the row currently crossing the viewport centre.
  const [scrollActive, setScrollActive] = useState(0);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

  const active = hovered ?? scrollActive;
  const reduced = useReducedMotion();
  const current = services[active] ?? services[0];

  // Scroll activation — a row becomes active when it crosses a deliberate
  // centre band of the viewport (rootMargin shrinks the root to the middle
  // 10%), so "first pixel enters viewport" never triggers it. Lightweight:
  // one IntersectionObserver, no libraries.
  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!rows.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setScrollActive(idx);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [services]);

  return (
    <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-10">
      {/* Sticky preview — desktop only */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="plate lift relative aspect-4/5 w-full overflow-hidden rounded-2xl">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current?.slug}
                initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {current && (
                  <Image
                    src={current.image.src}
                    alt={current.image.alt}
                    fill
                    sizes="42vw"
                    className="object-cover object-[0px_-30px]"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Bottom caption overlay for a richer, luxury frame */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-navy-900/85 via-navy-900/25 to-transparent p-6 pt-24 lg:p-8 lg:pt-32">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current?.slug}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="label-wide text-white/70">
                    {current?.index} · {current?.lede}
                  </span>
                  <p className="display-sm mt-2 text-white">{current?.title}</p>
                </motion.div>
              </AnimatePresence>
              <CmykTicks className="mt-4 h-[3px] w-14" />
            </div>

            <CropMarks color="white" size={16} className="m-3" />
          </div>

          {current && (
            <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-1.5">
              {current.items.slice(0, 6).map((item) => (
                <li
                  key={item}
                  className="label-wide rounded-full border border-rule px-3 py-1.5 text-ink-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Index rows */}
      <ul className="lg:col-span-7 lg:col-start-6">
        {services.map((s, i) => {
          const isActive = active === i;
          return (
            <li
              key={s.slug}
              id={`service-${s.slug}`}
              data-index={i}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className="scroll-mt-28"
            >
              <Link
                href={`/#service-${s.slug}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "group relative block border-t border-rule py-7 last:border-b lg:py-8",
                  serviceBg[s.slug as keyof typeof serviceBg],
                )}
              >
                {/* Animated accent rail on the active / hovered row */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100",
                    isActive && "scale-y-100",
                    accentBar[s.accent],
                  )}
                />

                <div className="flex items-baseline gap-4 pl-4 lg:gap-6 lg:pl-6">
                  {(() => {
                    const Icon = serviceIcons[s.slug as keyof typeof serviceIcons];
                    return (
                      <span
                        className={cn(
                          "flex shrink-0 translate-y-0.5 items-center transition-all duration-400 ease-[var(--ease-out-expo)]",
                          isActive ? cn("scale-110", accentText[s.accent]) : "text-ink-3",
                        )}
                      >
                        <Icon className="size-6" />
                      </span>
                    );
                  })()}
                  <div className="flex-1">
                    <h3
                      className={cn(
                        "display-md text-ink transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-hover:text-navy",
                        isActive && "translate-x-1 text-navy",
                      )}
                    >
                      {s.title}
                    </h3>
                    <p className="body-sm mt-3 max-w-xl">{s.description}</p>

                    {/* Inline image for small screens */}
                    <div className="plate relative mt-5 aspect-16/9 w-full overflow-hidden rounded-2xl lg:hidden">
                      <Image
                        src={s.image.src}
                        alt={s.image.alt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    </div>

                    <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5 lg:hidden">
                      {s.items.slice(0, 4).map((item) => (
                        <li
                          key={item}
                          className="label-wide rounded-full border border-rule px-3 py-1.5 text-ink-3"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ArrowUpRight
                    className={cn(
                      "mt-2 mr-[15px] size-4 shrink-0 text-ink-3 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy",
                      isActive && "text-navy",
                    )}
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
