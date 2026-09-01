"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, contact, site } from "@/data/site";
import { services } from "@/data/services";
import { Logo } from "@/components/ui/Logo";
import { QuoteButton } from "@/components/ui/Cta";
import { ArrowUpRight, WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Fixed overlay stack: utility bar + header. Sits over the hero at the
          top of the page (transparent), then becomes a solid light bar on scroll. */}
      <div className="fixed inset-x-0 top-0 z-50">
        {/* Utility bar — collapses away once the user scrolls past the hero */}
        <div
          className={cn(
            "hidden overflow-hidden border-b bg-charcoal text-white/70 transition-all duration-500 ease-[var(--ease-out-expo)] lg:block",
            scrolled ? "max-h-0 border-transparent opacity-0" : "max-h-12 border-white/10 opacity-100",
          )}
        >
          <div className="shell flex h-9 items-center justify-between">
            <p className="label-wide text-white/50">
              Printing · Signage · Large Format · Brand Production — Ajman, UAE
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
            : "border-transparent bg-transparent text-white",
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
                  <Link
                    href={item.href}
                    className="relative block rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:bg-white/15 hover:text-cyan-bright"
                  >
                    {item.label}
                  </Link>

                  {item.label === "Services" && (
                    <div className="invisible absolute left-1/2 top-full z-50 w-[min(70vw,680px)] -translate-x-1/2 pt-5 opacity-0 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="rounded-2xl border border-white/15 bg-navy-900/95 p-7 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
                        <p className="label mb-4 text-cyan-bright">Our Capabilities</p>
                        <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
                          {services.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/#service-${s.slug}`}
                                className="group/i flex items-baseline gap-3 border-b border-white/10 py-2.5 text-sm font-medium text-white/85 transition-colors hover:text-cyan-bright"
                              >
                                <span className="label-wide w-5 shrink-0 text-white/40 group-hover/i:text-cyan-bright">
                                  {s.index}
                                </span>
                                <span className="flex-1">{s.title}</span>
                              </Link>
                            </li>
                          ))}
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

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Express Advertising"
              className={cn(
                "grid size-11 place-items-center border",
                scrolled
                  ? "border-rule text-[#128c7e]"
                  : "border-white/30 text-white",
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
                "grid size-11 place-items-center border",
                open || scrolled ? "border-rule" : "border-white/30",
              )}
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-px w-full transition-all duration-300 ease-[var(--ease-out-expo)]",
                    open || scrolled ? "bg-ink" : "bg-white",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-full transition-all duration-300 ease-[var(--ease-out-expo)]",
                    open || scrolled ? "bg-ink" : "bg-white",
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

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[calc(5rem+2px)] z-40 overflow-y-auto bg-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="shell py-8">
          <ul className="border-t border-rule">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display-sm block py-5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="label mt-10 mb-4 text-ink-3">Capabilities</p>
          <ul className="grid grid-cols-1 gap-y-0 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug} className="border-b border-rule/70">
                <Link
                  href={`/#service-${s.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3 py-3 text-sm font-medium"
                >
                  <span className="label-wide w-5 text-ink-3">{s.index}</span>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3">
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

          <p className="body-sm mt-8">
            {contact.addressOneLine}
            <br />
            <a href={`tel:${contact.phoneE164}`} className="text-navy">
              {contact.phoneDisplay}
            </a>
          </p>
        </nav>
      </div>
    </>
  );
}
