"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { services } from "@/data/services";
import { contact, site } from "@/data/site";
import { reviewSummary } from "@/data/reviews";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

/* ── Cloudflare Turnstile ─────────────────────────────────────────────── */
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileWidget = {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string;
      theme?: string;
      size?: string;
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
  getResponse: (widgetId?: string) => string;
};

function getTurnstile(): TurnstileWidget | undefined {
  return (window as Window & { turnstile?: TurnstileWidget }).turnstile;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Field model ──────────────────────────────────────────────────────── */
type FieldKey =
  | "details"
  | "quantity"
  | "size"
  | "material"
  | "requiredDate"
  | "notes"
  | "name"
  | "company"
  | "email"
  | "phone"
  | "location"
  | "preferredContact";

type Field = {
  key: FieldKey;
  label: string;
  placeholder: string;
  full?: boolean;
  type?: "text" | "email";
};

const fields: Field[] = [
  { key: "details", label: "Project details", placeholder: "e.g. Illuminated shopfront sign", full: true },
  { key: "quantity", label: "Quantity", placeholder: "e.g. 2 units" },
  { key: "size", label: "Size / dimensions", placeholder: "e.g. 3000 × 800 mm" },
  { key: "material", label: "Material / finish", placeholder: "e.g. Acrylic, matte laminate" },
  { key: "requiredDate", label: "Required date", placeholder: "e.g. 18 Sep" },
  { key: "notes", label: "Notes", placeholder: "Anything else we should know", full: true },
  { key: "name", label: "Your name", placeholder: "Full name" },
  { key: "company", label: "Company", placeholder: "Company name" },
  { key: "email", label: "Email address *", placeholder: "you@company.com", type: "email" },
  { key: "phone", label: "WhatsApp number", placeholder: "+971 …" },
  { key: "location", label: "Project location", placeholder: "e.g. Dubai / Ajman" },
];

const CONTACT_METHODS = ["Phone", "WhatsApp", "Email"] as const;

type SubmitStatus = "idle" | "sending" | "success" | "error";

/* ── Tiny field icons (inline SVGs for crisp rendering) ──────────────── */
function FieldIcon({ name }: { name: string }) {
  const cls = "size-3.5 shrink-0 text-white/30";
  switch (name) {
    case "details":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2h7l3 3v9H3V2z" /><path d="M10 2v3h3M5 8h6M5 10.5h4" />
        </svg>
      );
    case "quantity":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="8" r="6" /><path d="M8 5v6M5 8h6" />
        </svg>
      );
    case "size":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="12" height="8" rx="1" /><path d="M5 4v8M8 4v8M11 4v8M2 8h12" />
        </svg>
      );
    case "material":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 14l4-4M10 2l4 4-8 8-4-4 8-8z" />
        </svg>
      );
    case "requiredDate":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="12" height="11" rx="1" /><path d="M2 7h12M5 1v4M11 1v4" />
        </svg>
      );
    case "notes":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1L3 10l-1 4 4-1 9-9-3-3zM9 4l3 3" />
        </svg>
      );
    case "name":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="5" r="3" /><path d="M2 14c0-3.3 2.7-5 6-5s6 1.7 6 5" />
        </svg>
      );
    case "company":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="2" width="10" height="12" rx="1" /><path d="M6 5h1M9 5h1M6 8h1M9 8h1M6 11h4" />
        </svg>
      );
    case "email":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3.5" width="12" height="9" rx="1.5" /><path d="m3 5.5 5 3.5 5-3.5" />
        </svg>
      );
    case "phone":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 1.5h3l1.5 3.5-2 1.5a8 8 0 0 0 3.5 3.5l1.5-2 3.5 1.5v3c0 .6-.4 1-1 1C5.6 13.5 2.5 10.4 2.5 2.5c0-.6.4-1 1-1z" />
        </svg>
      );
    case "location":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 1.8c-2.7 0-4.8 2.1-4.8 4.8 0 3.6 4.8 7.4 4.8 7.4s4.8-3.8 4.8-7.4c0-2.7-2.1-4.8-4.8-4.8z" />
          <circle cx="8" cy="6.6" r="1.7" />
        </svg>
      );
    case "preferredContact":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 13 5v3.5a1.5 1.5 0 0 1-1.5 1.5H7L4.6 12.4V10H4.5A1.5 1.5 0 0 1 3 8.5V5z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Architectural arrow SVG motif ───────────────────────────────────── */
function DirectionalArrow() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -right-6 top-1/2 -z-10 hidden h-[340px] w-[200px] -translate-y-1/2 opacity-[0.08] lg:block"
      viewBox="0 0 200 340"
      fill="none"
    >
      {/* Main directional flow — thin cyan architectural stroke */}
      <path
        d="M40 20 L40 160 Q40 200 80 200 L160 200 L160 320"
        stroke="var(--color-cyan)"
        strokeWidth="1.5"
        className="quote-arrow-path"
        pathLength="1"
      />
      {/* Arrow head */}
      <path
        d="M148 308 L160 326 L172 308"
        stroke="var(--color-cyan)"
        strokeWidth="1.5"
        fill="none"
        className="quote-arrow-path"
        pathLength="1"
        style={{ animationDelay: "1.6s" }}
      />
      {/* Registration accents */}
      <circle cx="40" cy="20" r="3" fill="var(--color-magenta)" opacity="0.6" />
      <circle cx="80" cy="200" r="2.5" fill="var(--color-yellow)" opacity="0.5" />
      <circle cx="160" cy="320" r="3" fill="var(--color-cyan)" opacity="0.6" />
      {/* Tick marks */}
      <line x1="34" y1="80" x2="46" y2="80" stroke="var(--color-magenta)" strokeWidth="0.5" opacity="0.4" />
      <line x1="34" y1="130" x2="46" y2="130" stroke="var(--color-yellow)" strokeWidth="0.5" opacity="0.4" />
      <line x1="120" y1="194" x2="120" y2="206" stroke="var(--color-cyan)" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

/* ── Circular proof-point counters — production gauge aesthetic ──────── */
type StatAccent = "cyan" | "magenta" | "yellow";
type Stat = {
  value: string;
  label: [string, string];
  accent: StatAccent;
  /**
   * Share of the ring circumference that carries the accent arc. Each
   * proof point reads as its own gauge reading, so the fills are tuned to
   * be clearly distinct — a perfect 5.0 rating shows the fullest ring.
   */
  arc: number;
};

/**
 * Proof points.
 *
 * These were hardcoded as "20+ Years of Excellence", "100+ Brands Served" and
 * "3 Office Locations". None trace back to anything verifiable, and the third
 * actively contradicted the rest of the site: src/data/site.ts holds exactly
 * one address, in Ajman. Publishing a number the same page disproves is worse
 * than publishing none.
 *
 * Every value below is derived from data the project actually has, so it
 * cannot silently drift. Swap in real figures when they exist — the shape is
 * unchanged.
 */
const stats: Stat[] = [
  {
    value: reviewSummary.rating.toFixed(1),
    label: ["Google", "rating"],
    accent: "cyan",
    arc: 0.75,
  },
  {
    value: `${reviewSummary.total}`,
    label: ["Google", "reviews"],
    accent: "magenta",
    arc: 0.55,
  },
  {
    value: `${services.length}`,
    label: ["Capabilities", "in-house"],
    accent: "yellow",
    arc: 0.35,
  },
];

const accentTextClass = {
  cyan: "text-cyan-bright",
  magenta: "text-magenta",
  yellow: "text-yellow",
} as const;

const accentVar = {
  cyan: "var(--color-cyan)",
  magenta: "var(--color-magenta)",
  yellow: "var(--color-yellow)",
} as const;

function StatRing({ stat, index }: { stat: Stat; index: number }) {
  const reduced = useReducedMotion();
  const R = 48;
  const C = 2 * Math.PI * R;
  const arcFraction = stat.arc;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className="flex flex-col items-center"
    >
      <div className="relative size-24 lg:size-[6.5rem]">
        <svg viewBox="0 0 100 100" fill="none" aria-hidden className="size-full">
          {/* Base ring — muted navy-grey technical stroke */}
          <circle cx="50" cy="50" r={R} stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" />
          {/* Accent arc — draws once on first viewport entry */}
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            stroke={accentVar[stat.accent]}
            strokeWidth="2"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            strokeDasharray={`${C * arcFraction} ${C}`}
            initial={reduced ? false : { strokeDashoffset: C * arcFraction }}
            whileInView={reduced ? undefined : { strokeDashoffset: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + index * 0.12 }}
            opacity="0.9"
          />
          {/* Registration tick at the arc origin */}
          <circle cx="50" cy="2" r="1.4" fill={accentVar[stat.accent]} opacity="0.8" />
        </svg>
        <span
          className={cn(
            "font-display absolute inset-0 grid place-content-center text-center font-extrabold leading-none tracking-tight",
            "text-2xl lg:text-3xl",
            accentTextClass[stat.accent],
          )}
        >
          {stat.value}
        </span>
      </div>
      <p className="mt-2.5 text-center text-[13px] font-medium leading-snug text-white/80">
        {stat.label[0]}
        <br />
        {stat.label[1]}
      </p>
    </motion.div>
  );
}

const inputClass =
  "mt-2.5 block w-full min-w-0 max-w-full rounded-md border border-white/10 bg-navy-900/60 px-4 py-3 text-base text-white outline-none transition-all placeholder:text-white/25 focus:border-cyan-bright focus:ring-1 focus:ring-cyan-bright/30 sm:text-sm";
const inputErrorClass =
  "mt-2.5 block w-full min-w-0 max-w-full rounded-md border border-magenta/80 bg-navy-900/60 px-4 py-3 text-base text-white outline-none transition-all placeholder:text-white/25 focus:border-magenta focus:ring-1 focus:ring-magenta/40 sm:text-sm";

function apiErrorMessage(code: string): string {
  switch (code) {
    case "captcha":
      return "Security check could not be verified. Please complete the checkbox and try again.";
    case "invalid":
      return "Please review your details — one or more fields were not accepted.";
    case "send_failed":
      return "We could not send your request right now. Please try again in a moment, or reach us on WhatsApp.";
    default:
      return "Something went wrong while sending your request. Please try again, or reach us on WhatsApp.";
  }
}

/* ── Required-date mini calendar ─────────────────────────────────────── */
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const WEEKDAY_HEADS = ["S", "M", "T", "W", "T", "F", "S"];

function startOfLocalDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function sameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Picker output format — keeps the brief text human-readable ("18 Sep 2026"). */
function formatDay(d: Date): string {
  return `${d.getDate()} ${MONTHS[d.getMonth()] ?? ""} ${d.getFullYear()}`;
}

/** Reverse of formatDay; null when the user typed free text instead. */
function parseDay(value: string): Date | null {
  const m = /^(\d{1,2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})$/.exec(
    value.trim(),
  );
  if (!m) return null;
  const d = new Date(Number(m[3]), MONTHS.indexOf(m[2] ?? ""), Number(m[1]));
  return Number.isNaN(d.getTime()) ? null : d;
}

type CalendarGridProps = {
  month: Date;
  selected: Date | null;
  today: Date;
  onPrev: () => void;
  onNext: () => void;
  onPick: (day: number) => void;
  onToday: () => void;
  onClear: () => void;
};

/** Branded month grid — past days disabled, picker never selects in the past. */
function CalendarGrid({
  month,
  selected,
  today,
  onPrev,
  onNext,
  onPick,
  onToday,
  onClear,
}: CalendarGridProps) {
  const y = month.getFullYear();
  const m = month.getMonth();
  const firstWeekday = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  return (
    <div className="absolute top-full left-0 z-30 mt-2 w-[268px] max-w-[calc(100vw-2rem)] rounded-xl border border-white/10 bg-navy-900 p-3 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.65)]">
      {/* Month header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous month"
          className="grid size-7 place-items-center rounded-md text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3 5 8l5 5" /></svg>
        </button>
        <span className="text-sm font-semibold tracking-wide text-white">
          {MONTHS[m] ?? ""} {y}
        </span>
        <button
          type="button"
          onClick={onNext}
          aria-label="Next month"
          className="grid size-7 place-items-center rounded-md text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3l5 5-5 5" /></svg>
        </button>
      </div>

      {/* Weekday heads */}
      <div className="mt-2 grid grid-cols-7">
        {WEEKDAY_HEADS.map((w) => (
          <span key={w} className="py-1 text-center text-[10px] font-semibold text-white/35">
            {w}
          </span>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {Array.from({ length: firstWeekday }).map((_, i) => (
          <span key={`pad-${i}`} aria-hidden />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const d = new Date(y, m, day);
          const past = d < today;
          const isSelected = selected !== null && sameDate(selected, d);
          const isToday = sameDate(today, d);
          return (
            <button
              key={day}
              type="button"
              disabled={past}
              onClick={() => onPick(day)}
              aria-label={formatDay(d)}
              aria-pressed={isSelected}
              className={cn(
                "flex aspect-square w-full items-center justify-center rounded-full text-[13px] font-medium transition-colors",
                past
                  ? "cursor-default text-white/15"
                  : isSelected
                    ? "bg-cyan text-navy-900"
                    : "text-white/85 hover:bg-white/10",
                isToday && !isSelected && "ring-1 ring-white/35 ring-inset",
              )}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2">
        <button
          type="button"
          onClick={onToday}
          className="text-xs font-semibold text-cyan-bright transition-colors hover:text-cyan"
        >
          Today
        </button>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-semibold text-white/45 transition-colors hover:text-white/80"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

/**
 * Quotation composer — premium production-brief aesthetic.
 *
 * Two submission channels, both surfaced in the action row:
 *  - WhatsApp: opens a pre-filled chat (verified fallback, unchanged).
 *  - Email: posts to /api/quote, which validates server-side (zod),
 *    verifies Cloudflare Turnstile and emails the brief to the team plus
 *    a confirmation to the customer — no mailto, no client-side mail.
 */
export function QuoteSection() {
  const [service, setService] = useState<string>(services[0]?.title ?? "");
  const [values, setValues] = useState<Record<FieldKey, string>>({
    details: "",
    quantity: "",
    size: "",
    material: "",
    requiredDate: "",
    notes: "",
    name: "",
    company: "",
    email: "",
    phone: "",
    location: "",
    preferredContact: "WhatsApp",
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  // Required-date calendar popup
  const [dateOpen, setDateOpen] = useState(false);
  const [calMonth, setCalMonth] = useState(() => {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), 1);
  });
  const dateWrapRef = useRef<HTMLDivElement | null>(null);

  const sendingRef = useRef(false);
  const tsHostRef = useRef<HTMLDivElement | null>(null);
  const tokenRef = useRef("");
  const emailRef = useRef<HTMLInputElement | null>(null);

  const ctx = useMemo(() => ({ service, ...values }), [service, values]);

  const markDirty = (key?: FieldKey) => {
    if (status !== "idle") setStatus("idle");
    setErrorText(null);
    if (key === "email") setEmailError(null);
  };

  // Mount Cloudflare Turnstile once the client has rendered.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let disposed = false;
    let widgetId: string | undefined;

    const loadScript = () =>
      new Promise<void>((resolve, reject) => {
        if (getTurnstile()) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Turnstile script failed to load"));
        document.head.appendChild(script);
      });

    (async () => {
      try {
        await loadScript();
        if (disposed || !tsHostRef.current) return;
        const turnstile = getTurnstile();
        if (!turnstile) return;
        widgetId = turnstile.render(tsHostRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: "dark",
          callback: (token) => {
            tokenRef.current = token;
          },
          "expired-callback": () => {
            tokenRef.current = "";
          },
          "error-callback": () => {
            tokenRef.current = "";
          },
        });
      } catch {
        if (!disposed) setWidgetError("Security check could not be loaded on this device.");
      }
    })();

    return () => {
      disposed = true;
      if (widgetId) {
        const turnstile = getTurnstile();
        if (turnstile) {
          try {
            turnstile.remove(widgetId);
          } catch {
            // widget may already be gone
          }
        }
      }
    };
  }, []);

  // Calendar popup — close on outside click or Escape.
  useEffect(() => {
    if (!dateOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (dateWrapRef.current && !dateWrapRef.current.contains(e.target as Node)) {
        setDateOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDateOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [dateOpen]);

  const openCalendar = () => {
    // Jump the calendar to the month of the value already in the field.
    const base = parseDay(values.requiredDate) ?? new Date();
    setCalMonth(new Date(base.getFullYear(), base.getMonth(), 1));
    setDateOpen(true);
  };

  const pickDate = (day: number) => {
    const d = new Date(calMonth.getFullYear(), calMonth.getMonth(), day);
    setValues((v) => ({ ...v, requiredDate: formatDay(d) }));
    markDirty("requiredDate");
    setDateOpen(false);
  };

  const pickToday = () => {
    const d = new Date();
    setValues((v) => ({ ...v, requiredDate: formatDay(d) }));
    markDirty("requiredDate");
    setDateOpen(false);
  };

  const clearDate = () => {
    setValues((v) => ({ ...v, requiredDate: "" }));
    markDirty("requiredDate");
    setDateOpen(false);
  };

  // Re-derived each render for the picker grid.
  const todayStart = startOfLocalDay(new Date());
  const pickedDate = parseDay(values.requiredDate);

  const submitByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendingRef.current) return; // duplicate-submit guard
    setErrorText(null);

    const email = values.email.trim();
    if (!email || !EMAIL_RE.test(email)) {
      setEmailError("Please enter a valid email address so we can reply.");
      setStatus("error");
      emailRef.current?.focus();
      return;
    }

    sendingRef.current = true;
    setStatus("sending");

    const turnstile = getTurnstile();
    let token = tokenRef.current;
    if (TURNSTILE_SITE_KEY && turnstile && !token) {
      try {
        token = turnstile.getResponse() ?? "";
      } catch {
        token = "";
      }
    }

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          service,
          details: values.details,
          quantity: values.quantity,
          size: values.size,
          material: values.material,
          requiredDate: values.requiredDate,
          notes: values.notes,
          name: values.name,
          company: values.company,
          email,
          phone: values.phone,
          location: values.location,
          preferredContact: values.preferredContact,
          website: honeypot,
          token,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setErrorText(apiErrorMessage(data?.error ?? "internal"));
        setStatus("error");
        return;
      }

      setStatus("success");
      if (turnstile) {
        try {
          turnstile.reset();
        } catch {
          // ignore — token just expires naturally
        }
        tokenRef.current = "";
      }
    } catch {
      setErrorText(apiErrorMessage("network"));
      setStatus("error");
    } finally {
      sendingRef.current = false;
    }
  };

  const waFallbackUrl = whatsappUrl(ctx);

  return (
    <section
      id="quote"
      className="relative isolate scroll-mt-24 overflow-hidden bg-navy-900 py-20 text-white lg:py-28"
    >
      {/* Corner crop marks */}
      <span aria-hidden className="crop-mark crop-tl" />
      <span aria-hidden className="crop-mark crop-tr" />
      <span aria-hidden className="crop-mark crop-bl" />
      <span aria-hidden className="crop-mark crop-br" />

      {/* Subtle registration dots — bottom left */}
      <span aria-hidden className="absolute bottom-6 left-6 z-10 hidden lg:flex">
        <span className="reg-dots">
          <svg className="mr-2 size-3 text-white/10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="8" cy="8" r="6" /><line x1="8" y1="2" x2="8" y2="14" /><line x1="2" y1="8" x2="14" y2="8" />
          </svg>
          <span className="size-1.5 rounded-full bg-cyan/40" />
          <span className="size-1.5 rounded-full bg-magenta/40" />
          <span className="size-1.5 rounded-full bg-yellow/40" />
          <span className="size-1.5 rounded-full bg-white/20" />
          <span className="size-1.5 rounded-full bg-white/20" />
        </span>
      </span>

      <div className="shell">
        <div className="grid items-stretch gap-14 lg:grid-cols-12 lg:gap-10">

          {/* ── LEFT EDITORIAL COLUMN ──────────────────────────────── */}
          <div className="relative flex h-full flex-col justify-between lg:col-span-4">
            <DirectionalArrow />

            <div>
              <SectionLabel accent="cyan">Request a quotation</SectionLabel>

              <h2 className="display-lg mt-6 text-balance text-white">
                Tell us
                <br />
                <span className="text-gradient-hero">what you&apos;re making.</span>
              </h2>

              {/* CMYK accent bar */}
              <span aria-hidden className="mt-5 flex h-[3px] w-20">
                <span className="h-full flex-1 bg-cyan" />
                <span className="h-full flex-1 bg-magenta" />
                <span className="h-full flex-1 bg-yellow" />
                <span className="h-full flex-1 bg-white/30" />
              </span>

              <p className="lede mt-6 text-white/65">
                Pick a capability, add whatever detail you have, and send it to
                our team by email or WhatsApp. Partial information is fine — we
                will come back with the questions that matter.
              </p>

              {/* Contact cards */}
              <div className="mt-8 space-y-3">
                <a
                  href={`tel:${contact.phoneE164}`}
                  className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3.5 transition-all duration-200 hover:border-cyan/40 hover:bg-white/[0.06]"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-cyan/30 bg-cyan/10 text-cyan-bright">
                    <PhoneIcon className="size-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-white transition-colors group-hover:text-cyan-bright">
                      {contact.phoneDisplay}
                    </span>
                    <span className="label-wide mt-0.5 block text-white/35">Call us</span>
                  </span>
                  <svg className="size-4 text-white/25 transition-colors group-hover:text-cyan-bright" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 4l4 4-4 4" /></svg>
                </a>

                <a
                  href={`mailto:${contact.emailPrimary}`}
                  className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3.5 transition-all duration-200 hover:border-cyan/40 hover:bg-white/[0.06]"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-magenta/30 bg-magenta/10 text-magenta">
                    <MailIcon className="size-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-white transition-colors group-hover:text-cyan-bright">
                      {contact.emailPrimary}
                    </span>
                    <span className="label-wide mt-0.5 block text-white/35">Email us</span>
                  </span>
                  <svg className="size-4 text-white/25 transition-colors group-hover:text-cyan-bright" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 4l4 4-4 4" /></svg>
                </a>

                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-3.5 transition-all duration-200 hover:border-[#25d366]/40 hover:bg-white/[0.06]"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#25d366]/30 bg-[#25d366]/10 text-[#25d366]">
                    <WhatsAppIcon className="size-4" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold text-white transition-colors group-hover:text-[#25d366]">
                      Chat on WhatsApp
                    </span>
                    <span className="label-wide mt-0.5 block text-white/35">Quick reply</span>
                  </span>
                  <svg className="size-4 text-white/25 transition-colors group-hover:text-[#25d366]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 4l4 4-4 4" /></svg>
                </a>
              </div>

              {/* Circular proof-point counters */}
              <div className="mt-8 flex flex-wrap items-start gap-4">
                {stats.map((s, i) => (
                  <StatRing key={s.value} stat={s} index={i} />
                ))}
              </div>
            </div>

            {/* Ready-to-order strip */}
            <div className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
              <div className="flex gap-4 px-5 py-4">
                <span className="mt-0.5 w-[3px] shrink-0 rounded-full bg-magenta" />
                <div className="flex-1">
                  <p className="label-wide text-magenta">Ready-to-order products?</p>
                  <p className="body-sm mt-1.5 text-white/55">
                    Standard sizes and quantities ship from our online store — no
                    quotation needed.
                  </p>
                  <a
                    href={site.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label mt-2.5 inline-flex items-center gap-1.5 font-bold text-white transition-colors hover:text-cyan-bright"
                  >
                    Shop Online
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </div>
                <span className="hidden items-start sm:flex">
                  <svg className="size-7 text-white/10" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="6" width="24" height="22" rx="2" />
                    <path d="M10 6V3h12v3M10 15h12M10 20h8" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT PRODUCTION BRIEF PANEL ───────────────────────── */}
          <div className="flex min-w-0 flex-col lg:col-span-8">
            <form
              onSubmit={submitByEmail}
              noValidate
              className="quote-grid-bg relative flex h-full min-w-0 flex-col justify-between rounded-xl border border-white/[0.08] bg-navy-800/50 p-6 sm:p-8 lg:p-10"
            >

              {/* Honeypot — invisible to humans, irresistible to bots */}
              <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0">
                <label htmlFor="quote-website" className="label-wide text-[#ededed]">Website</label>
                <input
                  id="quote-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div>
                {/* 01 — Capability — mobile: single-column grid so long
                    labels wrap instead of forcing the viewport wider */}
                <fieldset className="min-w-0">
                  <legend className="label-wide text-[#ededed]">Capability</legend>
                  <div className="mt-4 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:flex lg:flex-wrap">
                    {services.map((s) => (
                      <button
                        key={s.slug}
                        type="button"
                        aria-pressed={service === s.title}
                        onClick={() => {
                          setService(s.title);
                          markDirty();
                        }}
                        className={cn(
                          "label inline-flex min-w-0 items-center gap-1.5 border px-3.5 py-2 text-left whitespace-normal [overflow-wrap:anywhere] transition-all duration-200 ease-[var(--ease-out-expo)]",
                          service === s.title
                            ? "border-cyan bg-cyan/10 text-cyan-bright"
                            : "border-white/12 text-white/50 hover:border-white/30 hover:text-white/80",
                        )}
                      >
                        {service === s.title && (
                          <svg className="size-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="2 6 5 9 10 3" /></svg>
                        )}
                        {s.title}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Separator */}
                <hr className="my-8 border-white/[0.07]" />

                {/* 02 — Project details + contact fields */}
                <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                  {fields.map((f) => (
                    <label
                      key={f.key}
                      className={cn("block", f.full && "sm:col-span-2")}
                    >
                      <span className="label-wide flex items-center gap-2 text-[#ededed]">
                        <FieldIcon name={f.key} />
                        {f.label}
                      </span>
                      {f.key === "requiredDate" ? (
                        <div ref={dateWrapRef} className="relative mt-2.5">
                          <input
                            type="text"
                            value={values.requiredDate}
                            placeholder={f.placeholder}
                            onChange={(e) => {
                              setValues((v) => ({ ...v, requiredDate: e.target.value }));
                              markDirty("requiredDate");
                            }}
                            onFocus={openCalendar}
                            onClick={openCalendar}
                            className={cn(inputClass, "cursor-pointer pr-11")}
                          />
                          <button
                            type="button"
                            aria-label={dateOpen ? "Close calendar" : "Open calendar"}
                            aria-expanded={dateOpen}
                            onClick={() => {
                              if (dateOpen) setDateOpen(false);
                              else openCalendar();
                            }}
                            className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-white/35 transition-colors hover:bg-white/10 hover:text-cyan-bright"
                          >
                            <svg className="size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="3" width="12" height="11" rx="1" />
                              <path d="M2 7h12M5 1v4M11 1v4" />
                            </svg>
                          </button>
                          {dateOpen && (
                            <CalendarGrid
                              month={calMonth}
                              selected={pickedDate}
                              today={todayStart}
                              onPrev={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
                              onNext={() => setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
                              onPick={pickDate}
                              onToday={pickToday}
                              onClear={clearDate}
                            />
                          )}
                        </div>
                      ) : (
                        <input
                          ref={f.key === "email" ? emailRef : undefined}
                          type={f.type ?? "text"}
                          inputMode={f.type === "email" ? "email" : f.key === "quantity" || f.key === "size" ? "text" : undefined}
                          autoComplete={f.key === "email" ? "email" : undefined}
                          value={values[f.key]}
                          placeholder={f.placeholder}
                          aria-invalid={f.key === "email" && emailError ? true : undefined}
                          aria-describedby={f.key === "email" && emailError ? "quote-email-error" : undefined}
                          onChange={(e) => {
                            setValues((v) => ({ ...v, [f.key]: e.target.value }));
                            markDirty(f.key);
                          }}
                          className={f.key === "email" && emailError ? inputErrorClass : inputClass}
                        />
                      )}
                      {f.key === "email" && emailError && (
                        <p id="quote-email-error" role="alert" className="mt-1.5 text-xs font-medium text-magenta">
                          {emailError}
                        </p>
                      )}
                    </label>
                  ))}

                  {/* Preferred contact method */}
                  <label className="block">
                    <span className="label-wide flex items-center gap-2 text-[#ededed]">
                      <FieldIcon name="preferredContact" />
                      Preferred contact method
                    </span>
                    <select
                      value={values.preferredContact}
                      onChange={(e) => {
                        setValues((v) => ({ ...v, preferredContact: e.target.value }));
                        markDirty("preferredContact");
                      }}
                      className="mt-2.5 block w-full min-w-0 max-w-full rounded-md border border-white/10 bg-navy-900/60 px-4 py-3 text-base text-white outline-none transition-all focus:border-cyan-bright focus:ring-1 focus:ring-cyan-bright/30 sm:text-sm"
                    >
                      {CONTACT_METHODS.map((m) => (
                        <option key={m} value={m} className="bg-navy-900 text-white">
                          {m}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              {/* Bottom Actions — stack on mobile, row on desktop */}
              <div className="mt-10 border-t border-white/[0.07] pt-8">
                {/* Success / error feedback */}
                {status === "success" && (
                  <div
                    role="status"
                    className="mb-6 rounded-xl border border-cyan/30 bg-cyan/10 p-5"
                  >
                    <p className="flex items-center gap-2.5 text-sm font-bold text-white">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-cyan text-white">
                        <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="2.5 8.5 6 12 13.5 4" />
                        </svg>
                      </span>
                      Request sent — thank you!
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Your brief has been emailed to our team and a confirmation
                      is on its way to <span className="font-semibold text-cyan-bright">{values.email}</span>.
                      We will reply with questions or a quotation, usually within
                      one business day.
                    </p>
                  </div>
                )}
                {status === "error" && !emailError && (
                  <div
                    role="alert"
                    className="mb-6 rounded-xl border border-magenta/40 bg-magenta/10 p-5"
                  >
                    <p className="flex items-center gap-2.5 text-sm font-bold text-white">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-magenta text-white">
                        <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M8 3v6M8 12.2v.8" />
                        </svg>
                      </span>
                      {errorText ?? "We could not send your request."}
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      Prefer to chat?{" "}
                      <a
                        href={waFallbackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-cyan-bright underline-offset-2 hover:underline"
                      >
                        Send the same brief on WhatsApp
                      </a>
                      .
                    </p>
                  </div>
                )}
                {widgetError && (
                  <p role="alert" className="mb-4 text-xs font-medium text-yellow">
                    {widgetError} You can still use WhatsApp below.
                  </p>
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href={waFallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-[#25d366] bg-[#25d366] px-8 py-3.5 text-sm font-bold tracking-wide uppercase text-white shadow-[0_4px_20px_-4px_rgba(37,211,102,0.4)] transition-all duration-200 hover:bg-[#20c05c] hover:shadow-[0_6px_24px_-4px_rgba(37,211,102,0.6)] sm:w-auto"
                  >
                    <WhatsAppIcon className="size-4.5" />
                    Send via WhatsApp
                    <svg className="cta-arrow-icon size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </a>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/20 px-8 py-3.5 text-sm font-bold tracking-wide uppercase text-white/70 transition-all duration-200 hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        <MailIcon className="size-4" />
                        Send by Email
                        <svg className="cta-arrow-icon size-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                {/* Cloudflare Turnstile — anti-spam verification */}
                {TURNSTILE_SITE_KEY && (
                  <div className="mt-5 flex min-h-[65px] items-start">
                    <div ref={tsHostRef} className="cf-turnstile-wrap" />
                  </div>
                )}

                {/* Privacy note */}
                <p className="mt-5 flex items-center gap-2 text-xs text-white/30">
                  <svg className="size-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                    <rect x="3" y="7" width="10" height="7" rx="1.5" />
                    <path d="M5 7V5a3 3 0 0 1 6 0v2" />
                  </svg>
                  Your information is secure and will only be used to respond to your inquiry.
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
