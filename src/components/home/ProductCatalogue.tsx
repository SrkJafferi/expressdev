"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  products,
  productCategories,
  type ProductCategoryId,
  type Product,
} from "@/data/products";
import { site } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "@/components/ui/Icons";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const INITIAL_VISIBLE = 8;

/** Prefilled WhatsApp quote for a single catalogue product. */
function quoteHref(p: Product, categoryLabel: string) {
  return whatsappUrl({
    service: p.name,
    details: `Category: ${categoryLabel}`,
    notes: p.shortDescription,
  });
}

/* ── Category Icons ──────────────────────────────────────────────────── */
function CategoryIcon({ id, className }: { id: ProductCategoryId; className?: string }) {
  const cls = cn("size-4 shrink-0", className);
  switch (id) {
    case "printing":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="8" width="12" height="8" rx="1" /><path d="M6 8V3h8v5" /><path d="M6 13h8v4H6z" /><circle cx="14" cy="10.5" r="0.5" fill="currentColor" />
        </svg>
      );
    case "signage":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="14" height="8" rx="1" /><path d="M10 12v5M7 17h6" />
        </svg>
      );
    case "large-format":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="16" height="12" rx="1" /><path d="M6 15v2M14 15v2M4 17h12" />
        </svg>
      );
    case "promotional":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3l8 3v8l-8 3V3z" /><path d="M14 6l2-1v10l-2-1" /><path d="M6 10H3" />
        </svg>
      );
    case "collateral":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 2h8l4 4v12H4V2z" /><path d="M12 2v4h4" /><path d="M7 10h6M7 13h4" />
        </svg>
      );
    case "retail-events":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7l7-4 7 4v9H3V7z" /><rect x="7" y="11" width="6" height="5" />
        </svg>
      );
    case "cnc-laser":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="3" /><path d="M10 3v4M10 13v4M3 10h4M13 10h4" /><path d="M5.7 5.7l2.8 2.8M11.5 11.5l2.8 2.8M5.7 14.3l2.8-2.8M11.5 8.5l2.8-2.8" />
        </svg>
      );
    case "digital-design":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="10" r="7" /><circle cx="10" cy="10" r="2" /><path d="M10 3v2M10 15v2M3 10h2M15 10h2" />
        </svg>
      );
    case "it-services":
      return (
        <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="14" height="10" rx="1.5" /><path d="M7 16h6M10 13v3" /><path d="M7 7l2 2-2 2M11 11h3" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── SVG Wave Mesh for top-right ─────────────────────────────────────── */
function WaveMesh() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -right-20 -top-10 -z-10 h-[400px] w-[500px] opacity-[0.06]"
      viewBox="0 0 500 400"
      fill="none"
    >
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300].map((y) => (
        <path
          key={y}
          d={`M0 ${y} Q125 ${y - 20} 250 ${y + 10} T500 ${y}`}
          stroke="var(--color-cyan)"
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}
      {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500].map((x) => (
        <path
          key={`v${x}`}
          d={`M${x} 0 Q${x + 10} 150 ${x - 10} 300`}
          stroke="var(--color-magenta)"
          strokeWidth="0.4"
          opacity="0.3"
        />
      ))}
    </svg>
  );
}

export function ProductCatalogue() {
  const [active, setActive] = useState<ProductCategoryId>("printing");
  const [expanded, setExpanded] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const reduced = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);

  const activeCat =
    productCategories.find((c) => c.id === active) ?? productCategories[0]!;

  const inCategory = useMemo(
    () => products.filter((p) => p.category === active),
    [active],
  );
  const visible = expanded ? inCategory : inCategory.slice(0, INITIAL_VISIBLE);
  const hasMore = inCategory.length > INITIAL_VISIBLE;

  const checkScroll = () => {
    if (railRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = railRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scrollRail = (direction: "left" | "right") => {
    if (railRef.current) {
      const scrollAmount = 360;
      railRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const selectCategory = (id: ProductCategoryId, el?: HTMLElement | null) => {
    setActive(id);
    setExpanded(false);
    if (el && railRef.current) {
      const rail = railRef.current;
      const elLeft = el.offsetLeft;
      const elWidth = el.offsetWidth;
      const railWidth = rail.clientWidth;
      const targetScroll = elLeft - (railWidth / 2) + (elWidth / 2);

      rail.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="catalogue"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#edf1f5] bg-[url(/prod-back.avif)] bg-cover bg-center bg-no-repeat py-20 lg:py-28"
      aria-label="Product catalogue"
    >
      <WaveMesh />

      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel accent="magenta">Our product catalogue</SectionLabel>
            <h2 className="display-lg mt-6 text-balance text-navy-900">
              Everything{" "}
              <span className="text-cyan">your brand</span>
              <br />
              needs, made under one roof.
            </h2>

            <span aria-hidden className="mt-5 flex h-[3px] w-24">
              <span className="h-full flex-[2] bg-navy" />
              <span className="h-full flex-1 bg-cyan" />
              <span className="h-full flex-1 bg-magenta" />
              <span className="h-full flex-1 bg-yellow" />
            </span>
          </div>

          <div className="flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9">
            <p className="lede">
              Explore what we produce across printing, signage, large format,
              promotional merchandise, fabrication, design and digital — every
              item made to order and quoted directly with our team.
            </p>

            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-slate-200/80 bg-white shadow-sm">
                <svg className="size-5 text-navy" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2l2 4 4.5.7-3.2 3.2.8 4.5L10 12.3 5.9 14.4l.8-4.5L3.5 6.7 8 6z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-bold text-navy-900">100+ products across</p>
                <p className="text-sm text-ink-3">from our services</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <LayoutGroup id="catalogue-tabs">
            <div className="relative flex items-center rounded-2xl border border-slate-200/80 bg-white p-2 shadow-sm">
              {canScrollLeft && (
                <button
                  type="button"
                  aria-label="Slide categories left"
                  onClick={() => scrollRail("left")}
                  className="absolute -left-3.5 z-20 grid size-9 place-items-center rounded-full border border-slate-200 bg-white text-navy-900 shadow-md transition-all hover:scale-110 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-navy/50"
                >
                  <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M10 4l-4 4 4 4" />
                  </svg>
                </button>
              )}

              <div
                ref={railRef}
                role="tablist"
                aria-label="Product categories"
                className="no-scrollbar flex w-full items-center gap-2 overflow-x-auto scroll-smooth py-0.5 sm:gap-2.5"
              >
                {productCategories.map((c) => {
                  const isActive = c.id === active;
                  return (
                    <button
                      key={c.id}
                      role="tab"
                      type="button"
                      aria-selected={isActive}
                      aria-controls="catalogue-grid"
                      onClick={(e) => selectCategory(c.id, e.currentTarget)}
                      className={cn(
                        "relative flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-center text-xs font-semibold tracking-tight outline-none transition-all duration-300 sm:px-5 sm:py-3 sm:text-sm focus-visible:ring-2 focus-visible:ring-navy/50",
                        isActive
                          ? "bg-navy-900 text-white shadow-md"
                          : "bg-slate-100/70 text-ink-2 hover:bg-slate-200/80 hover:text-navy-900",
                      )}
                    >
                      <CategoryIcon id={c.id} className={isActive ? "text-cyan" : "text-ink-3"} />
                      <span>{c.label}</span>
                      <span className={cn(
                        "rounded-full px-1.5 py-0.5 text-[0.625rem] font-medium tabular-nums sm:text-xs",
                        isActive ? "bg-white/20 text-white" : "bg-slate-200/80 text-ink-3",
                      )}>
                        {c.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {canScrollRight && (
                <button
                  type="button"
                  aria-label="Slide categories right"
                  onClick={() => scrollRail("right")}
                  className="absolute -right-3.5 z-20 grid size-9 place-items-center rounded-full border border-slate-200 bg-white text-navy-900 shadow-md transition-all hover:scale-110 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-navy/50"
                >
                  <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </button>
              )}
            </div>
          </LayoutGroup>
        </div>

        {/* ── Product grid ────────────────────────────────────────── */}
        <div
          id="catalogue-grid"
          role="tabpanel"
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <motion.article
                key={`${active}-${p.slug}`}
                layout={!reduced}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{
                  duration: reduced ? 0 : 0.4,
                  delay: reduced ? 0 : Math.min(i, INITIAL_VISIBLE) * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {/* Image plate */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-[#f0f2f5]">
                  <Image
                    src={p.image.src}
                    alt={p.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(min-width:1280px) 22vw, (min-width:1024px) 30vw, (min-width:640px) 46vw, 92vw"
                    className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-navy-900/0 transition-colors duration-500 group-hover:bg-navy-900/20" />
                  <a
                    href={quoteHref(p, activeCat.label)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Request a quote for ${p.name}`}
                    className="absolute bottom-3 left-3 inline-flex translate-y-3 items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-[0.6875rem] font-bold uppercase tracking-wider text-white opacity-0 shadow-lg transition-all duration-400 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100"
                  >
                    Request Quote
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="label-wide text-[0.6875rem] font-bold text-cyan">{activeCat.short}</p>
                      <h3 className="mt-1.5 text-base font-bold tracking-tight text-navy-900 transition-colors group-hover:text-cyan">
                        {p.name}
                      </h3>
                      <p className="body-sm mt-1.5 text-ink-3 line-clamp-2">{p.shortDescription}</p>
                    </div>
                    <a
                      href={quoteHref(p, activeCat.label)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Request a quote for ${p.name}`}
                      className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 bg-white transition-all duration-200 group-hover:border-navy group-hover:bg-navy group-hover:text-white"
                    >
                      <svg className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M3 7h8M7 3l4 4-4 4" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* ── View All CTA ────────────────────────────────────────── */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="group inline-flex items-center gap-3 rounded-full bg-navy-900 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-navy-800 hover:shadow-lg"
            >
              {expanded
                ? "Show less"
                : `View all ${inCategory.length} ${activeCat.short} products`}
              <svg className="size-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        )}

        {/* Shop bridge — quiet, non-ecommerce */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-slate-300/80 pt-8 lg:mt-20">
          <p className="lede text-ink-2">Looking for ready-to-order products?</p>
          <a
            href={site.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet label text-navy"
          >
            Shop Online
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}