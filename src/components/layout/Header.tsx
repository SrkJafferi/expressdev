"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactElement } from "react";
import { nav, contact, site } from "@/data/site";
import { services, serviceHref } from "@/data/services";
import { Logo } from "@/components/ui/Logo";
import { QuoteButton } from "@/components/ui/Cta";
import {
  ArrowRight,
  ArrowUpRight,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import {
  AboutIcon,
  ContactIcon,
  CrosshairIcon,
  GiftIcon,
  GridIcon,
  HomeIcon,
  ImageIcon,
  LayersIcon,
  MonitorIcon,
  PenToolIcon,
  PrinterIcon,
  ScanLineIcon,
  SignpostIcon,
  StoreIcon,
} from "@/components/ui/FooterIcons";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

type IconType = (props: { className?: string }) => ReactElement;

/** Nav href → line icon (same language as the footer). */
const navIcons: Record<string, IconType> = {
  "/": HomeIcon,
  "/about": AboutIcon,
  "/services": GridIcon,
  "/clients": ImageIcon,
  "/contact": ContactIcon,
};

/** Service slug → line icon (same language as the footer). */
const serviceIcons: Record<string, IconType> = {
  "printing-services": PrinterIcon,
  signage: SignpostIcon,
  "large-format-printing": ScanLineIcon,
  "promotional-items": GiftIcon,
  "brand-collateral": LayersIcon,
  "retail-events-exhibition": StoreIcon,
  "cnc-laser-cutting": CrosshairIcon,
  "digital-design": PenToolIcon,
  "it-services": MonitorIcon,
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Let the floating dock (and anything else) know when the mobile menu is
  // open so fixed elements can yield to it.
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("ea:mobile-menu", { detail: open }),
    );
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Re-collapse the Services accordion whenever the drawer closes so the
  // next open starts from the top-level menu again.
  useEffect(() => {
    if (!open) setServicesOpen(false);
  }, [open]);

  return (
    <>
      {/* Fixed overlay stack: utility bar + header. Explicit left/right/width
          (not just inset-x) locks it to the real viewport even if some other
          element momentarily widens the document on mobile. No transformed
          ancestor above this — it renders directly under <body>. */}
      <div className="fixed left-0 right-0 top-0 z-50 w-full max-w-full">
        {/* Utility bar — collapses away once the user scrolls past the hero */}
        <div
          className={cn(
            "hidden overflow-hidden border-b bg-charcoal text-white/70 transition-all duration-500 ease-[var(--ease-out-expo)] lg:block",
            scrolled ? "max-h-0 border-transparent opacity-0" : "max-h-12 border-white/10 opacity-100",
          )}
        >
          <div className="shell flex h-9 items-center justify-between">
            <p className="label-wide text-white/50">
              Printing · Signage · Large Format · Brand Production
            </p>
            <div className="flex items-center gap-6">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="label-wide flex items-center gap-2 text-white/70 transition-colors hover:text-white"
              >
                <WhatsAppIcon className="size-3.5" />
                {contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${contact.emailPrimary}`}
                className="label-wide text-white/70 transition-colors hover:text-white"
              >
                {contact.emailPrimary}
              </a>
            </div>
          </div>
        </div>

      <header
        className={cn(
          "relative border-b transition-all duration-500 ease-[var(--ease-out-expo)]",
          scrolled
            ? "border-rule/80 bg-paper/95 text-ink shadow-sm backdrop-blur-md"
            : // True overlay at the top of every page (approved behaviour):
              // fully transparent so the hero/banner shows through. Contrast
              // for the white controls comes from each page's own banner/
              // hero top scrim (e.g. HeroSlider's mobile top gradient).
              "border-transparent bg-transparent text-white",
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between transition-all duration-500 ease-[var(--ease-out-expo)]",
            scrolled ? "py-3.5 lg:py-4" : "py-5 lg:py-6",
          )}
        >
          {/* Brand Logo: Small logo on sticky scroll, full logo at top */}
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="inline-flex shrink-0 items-center transition-all duration-300 hover:opacity-90"
          >
            {scrolled ? (
              <Image
                src="/logosmall.png"
                alt={site.name}
                width={140}
                height={42}
                className="h-8 sm:h-9 w-auto object-contain transition-all duration-300"
                priority
              />
            ) : (
              <Logo
                priority
                width={184}
                className="w-[140px] sm:w-[165px] lg:w-[184px]"
                invert
              />
            )}
          </Link>

          {/* Right-aligned Navigation + CTA */}
          <div className="hidden items-center gap-5 lg:flex">
            {/* Desktop navigation — Frosted Glass Pill Menu */}
            <nav
              aria-label="Main"
              className={cn(
                "flex items-center rounded-full border px-2 py-1.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300",
                scrolled
                  ? "border-navy-200/80 bg-navy-900/90 text-white shadow-md hover:bg-navy-900"
                  : "border-white/20 bg-black/20 text-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] hover:border-white/30 hover:bg-black/25",
              )}
            >
              {nav.map((item) => (
                <div key={item.href} className="group relative">
                  {item.label === "Services" ? (
                    // Services — dropdown-only trigger (no page navigation)
                    <button
                      type="button"
                      className="block cursor-default rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="relative block rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:bg-white/15 hover:text-cyan-bright"
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.label === "Services" && (
                    <div className="invisible absolute left-1/2 top-full z-50 w-[min(70vw,680px)] -translate-x-1/2 pt-5 opacity-0 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="rounded-2xl border border-white/15 bg-navy-900/95 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <p className="label text-cyan-bright">Our Capabilities</p>
                          <Link
                            href="/services"
                            className="group/overview inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-white/70 uppercase transition-colors hover:text-cyan-bright"
                          >
                            All Services
                            <ArrowRight className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/overview:translate-x-0.5" />
                          </Link>
                        </div>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
                          {services.map((s) => {
                            const SIcon = serviceIcons[s.slug];
                            return (
                              <li key={s.slug}>
                                <Link
                                  href={serviceHref(s.slug)}
                                  className="group/i flex items-center gap-2.5 border-b border-white/10 py-2.5 text-sm font-medium text-white/85 transition-colors hover:text-cyan-bright"
                                >
                                  {SIcon && (
                                    <SIcon className="size-4 shrink-0 text-cyan-bright/70 transition-colors duration-200 group-hover/i:text-cyan-bright" />
                                  )}
                                  <span className="flex-1">{s.title}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Shop Online link inside the Pill Menu */}
              <a
                href={site.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:bg-white/15 hover:text-cyan-bright"
              >
                <span>Shop Online</span>
                <ArrowUpRight className="size-3 text-cyan-bright" />
              </a>
            </nav>

            <QuoteButton
              className="px-5 py-2.5"
              variant="cyan"
            />
          </div>

          {/* Mobile controls — glass chips so they read over ANY slide
              (bright or dark) without an opaque header bar */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Express Advertising"
              className={cn(
                "grid size-11 place-items-center rounded-full border backdrop-blur-md",
                scrolled
                  ? "border-rule text-[#128c7e]"
                  : "border-white/40 bg-navy-900/35 text-white",
              )}
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "grid size-11 place-items-center rounded-full border backdrop-blur-md",
                open || scrolled ? "border-rule" : "border-white/40 bg-navy-900/35 text-white",
              )}
            >
              <span aria-hidden className="relative block h-3 w-5">
                {/* Icon stays white over the dark hero while the drawer is
                    open at the top of the page; once the header is sticky
                    (paper background) it switches to ink. */}
                <span
                  className={cn(
                    "absolute left-0 h-px w-full transition-all duration-300 ease-[var(--ease-out-expo)]",
                    scrolled ? "bg-ink" : "bg-white",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-full transition-all duration-300 ease-[var(--ease-out-expo)]",
                    scrolled ? "bg-ink" : "bg-white",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* CMYK hairline — the only place all four appear together */}
        <span
          aria-hidden
          className={cn(
            "flex h-[2px] w-full transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="h-full flex-1 bg-cyan" />
          <span className="h-full flex-1 bg-magenta" />
          <span className="h-full flex-1 bg-yellow" />
          <span className="h-full flex-1 bg-charcoal" />
        </span>
      </header>
      </div>

      {/* Mobile panel — full-height drawer below the header; overscroll
          contained so swipes never bounce the page behind it */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[calc(var(--header-mobile-height)+2px)] z-40 overflow-y-auto overscroll-contain bg-paper pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <nav aria-label="Mobile" className="shell py-8">
          <ul className="border-t border-rule">
            {nav.map((item) => {
              const Icon = navIcons[item.href];
              return (
                <li key={item.href} className="border-b border-rule">
                  {item.label === "Services" ? (
                    // Services — dropdown-only on desktop; on mobile it is an
                    // accordion: tap to expand the capabilities underneath.
                    <>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((v) => !v)}
                        aria-expanded={servicesOpen}
                        aria-controls="mobile-services"
                        className="display-sm group flex w-full items-center justify-between gap-4 py-5 text-left"
                      >
                        <span className="flex items-center gap-3.5">
                          {Icon && (
                            <Icon className="size-5 shrink-0 text-navy-300 transition-colors duration-200 group-hover:text-cyan" />
                          )}
                          {item.label}
                        </span>
                        <ArrowRight
                          aria-hidden
                          className={cn(
                            "size-5 shrink-0 text-ink-3 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:text-cyan",
                            servicesOpen ? "-rotate-90" : "rotate-90",
                          )}
                        />
                      </button>

                      {/* Capabilities — nested under the Services accordion.
                          Kept mounted so the collapse can animate, but inert
                          (and visually hidden via grid-rows-[0fr]) while
                          closed so its links are never tabbable. */}
                      <div
                        id="mobile-services"
                        inert={!servicesOpen}
                        className={cn(
                          "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out-expo)]",
                          servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        )}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="py-1">
                            <Link
                              href="/services"
                              onClick={() => setOpen(false)}
                              className="group flex items-center justify-between gap-3 rounded-lg border border-cyan/25 bg-cyan/5 py-2.5 pr-3 pl-4 text-sm font-bold text-cyan transition-colors hover:bg-cyan/10"
                            >
                              All Services
                              <ArrowRight className="size-4 text-cyan transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5" />
                            </Link>
                          </div>
                          <ul className="grid grid-cols-1 gap-y-0 pb-4 sm:grid-cols-2">
                            {services.map((s) => {
                              const SIcon = serviceIcons[s.slug];
                              return (
                                <li key={s.slug} className="border-b border-rule/70">
                                  <Link
                                    href={serviceHref(s.slug)}
                                    onClick={() => setOpen(false)}
                                    className="group flex items-center gap-2.5 py-3 text-sm font-medium"
                                  >
                                    {SIcon && (
                                      <SIcon className="size-4 shrink-0 text-navy-300 transition-colors duration-200 group-hover:text-cyan" />
                                    )}
                                    {s.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display-sm group flex items-center gap-3.5 py-5"
                    >
                      {Icon && (
                        <Icon className="size-5 shrink-0 text-navy-300 transition-colors duration-200 group-hover:text-cyan" />
                      )}
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <QuoteButton className="w-full" variant="cyan" />
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full"
            >
              <WhatsAppIcon />
              WhatsApp Us
            </a>
            <a
              href="https://shop.expressadvertising.ae/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline w-full"
            >
              Shop Online
              <ArrowUpRight />
            </a>
          </div>

          {/* Location + phone — icon rows and a tappable call card */}
          <div className="mt-8 space-y-3 border-t border-rule pt-6">
            <p className="body-sm flex items-start gap-3 text-ink-2">
              <PinIcon aria-hidden className="mt-1 size-4 shrink-0 text-navy" />
              <span>{contact.addressOneLine}</span>
            </p>
            <a
              href={`tel:${contact.phoneE164}`}
              className="group flex w-full items-center gap-3.5 rounded-xl border border-navy-100 bg-surface px-4 py-3 shadow-xs transition-colors duration-200 hover:border-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
            >
              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-full bg-navy-100 text-navy transition-colors duration-200 group-hover:bg-cyan group-hover:text-white"
              >
                <PhoneIcon className="size-4" />
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="label-wide text-[10px] text-ink-3">
                  Call us directly
                </span>
                <span className="text-sm font-bold tracking-wide text-navy-900 transition-colors duration-200 group-hover:text-cyan">
                  {contact.phoneDisplay}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden
                className="ml-auto size-4 shrink-0 text-navy-300 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan"
              />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
