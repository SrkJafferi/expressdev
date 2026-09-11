"use client";

import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";
import { CropMarks } from "@/components/ui/PrintMarks";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Final CTA — heading + description left, action buttons right, aligned on
 * one row (stacked on mobile). "Submit your resume" scrolls to and focuses
 * the application form. Client component because it drives focus/scroll.
 *
 * Background: bright collaborative-team Pexels photo behind the navy
 * gradient — direct CDN URL, nothing stored locally. The copy now sits on a
 * glass panel so the photo reads as depth instead of noise.
 *
 * Every claim in the trust row is taken from the real form rules
 * (PDF/DOC/DOCX, 5 MB cap, portfolio optional) — nothing invented.
 */
const CTA_BG =
  "https://images.pexels.com/photos/6322359/pexels-photo-6322359.jpeg?auto=compress&cs=tinysrgb&w=1600";

const assurances = [
  "Resume: PDF · DOC · DOCX (max 5 MB)",
  "Portfolio optional",
  "Secure & confidential",
];

function CheckMark() {
  return (
    <span
      aria-hidden
      className="grid size-4 shrink-0 place-items-center rounded-full border border-cyan/40 bg-cyan/10"
    >
      <svg
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-2.5 text-cyan-bright"
      >
        <path d="M2.5 6.2 4.8 8.5 9.5 3.8" />
      </svg>
    </span>
  );
}

export function CareersCta() {
  const goToForm = () => {
    const form = document.getElementById("apply");
    if (!form) return;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    // Focus the first field after the smooth scroll settles.
    window.setTimeout(() => {
      const first = document.getElementById("career-name");
      first?.focus({ preventScroll: true });
    }, 700);
  };

  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
      {/* Background image layer — bright team collaboration behind the gradient */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CTA_BG}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/55" />
        <div aria-hidden className="absolute inset-0 hero-vignette" />
      </div>

      {/* Fine grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Decorative glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.18)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.12)_0%,transparent_70%)]"
      />

      <div className="shell relative z-10">
        {/* Glass panel */}
        <Reveal from="up">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-8 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-10 lg:p-14">
            {/* Top hairline accent */}
            <span
              aria-hidden
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent"
            />
            {/* Crop-mark corners */}
            <span aria-hidden className="pointer-events-none absolute inset-4 opacity-20">
              <CropMarks color="white" size={12} />
            </span>

            <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              {/* Left — eyebrow, heading, description, assurances */}
              <div className="lg:col-span-7">
                <Reveal from="up">
                  <p className="label-wide inline-flex items-center gap-2.5 rounded-full border border-cyan/30 bg-cyan/10 px-3.5 py-2 text-cyan-bright">
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full bg-cyan-bright shadow-[0_0_0_3px_rgba(1,175,239,0.18)]"
                    />
                    Join the team
                  </p>
                </Reveal>

                <Reveal from="up" delay={0.1}>
                  <h2 className="display-lg mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-white">
                    Think You&apos;d Be
                    <br />
                    A <span className="text-gradient-hero">Good Fit?</span>
                  </h2>
                </Reveal>

                <Reveal from="up" delay={0.2}>
                  <p className="lede mt-6 max-w-xl text-white/70">
                    Submit your resume and tell us where your experience can add
                    value. We&apos;re always interested in meeting capable people
                    who care about doing good work.
                  </p>
                </Reveal>

                <Reveal from="up" delay={0.28}>
                  <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
                    {assurances.map((item) => (
                      <li
                        key={item}
                        className="label-wide flex items-center gap-2.5 text-white/60"
                      >
                        <CheckMark />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              {/* Right — action buttons, vertically centered against the copy */}
              <Reveal from="up" delay={0.34} className="lg:col-span-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                  <button
                    type="button"
                    onClick={goToForm}
                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#01afef] bg-[#01afef] px-9 py-4 text-sm font-bold tracking-wide text-white uppercase shadow-[0_10px_30px_-10px_rgba(1,175,239,0.7)] transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-[#0099da] hover:bg-[#0099da] hover:shadow-[0_16px_40px_-12px_rgba(1,175,239,0.85)]"
                  >
                    Submit Your Resume
                    <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
                  </button>
                  <Link
                    href="/contact"
                    className="btn btn-ghost-invert"
                  >
                    Contact Us
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>

      {/* CMYK hairline */}
      <span aria-hidden className="absolute inset-x-0 bottom-0 flex h-[3px]">
        <span className="h-full flex-1 bg-cyan" />
        <span className="h-full flex-1 bg-magenta" />
        <span className="h-full flex-1 bg-yellow" />
        <span className="h-full flex-1 bg-charcoal" />
      </span>
    </section>
  );
}
