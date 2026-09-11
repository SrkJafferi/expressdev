"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/* ── Cloudflare Turnstile (same pattern as QuoteSection) ──────────────── */
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

const AREAS = [
  "Design & Creative",
  "Print & Production",
  "Signage & Fabrication",
  "Installation",
  "Sales & Client Service",
  "Digital & IT",
  "Operations",
  "Other",
] as const;

const CONTACT_METHODS = ["Phone", "WhatsApp", "Email"] as const;

/** Accepted resume types — mirrors the server rules exactly. The server
 * re-verifies MIME + magic bytes; the accept attribute is the UX hint. */
const RESUME_ACCEPT = ".pdf,.doc,.docx";
/** Portfolio additionally accepts a PDF or images. */
const PORTFOLIO_ACCEPT = ".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const COVER_NOTE_MAX = 500; // client-side counter; server still allows 3000

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

type FieldErrors = Partial<
  Record<
    | "name"
    | "email"
    | "phone"
    | "location"
    | "area"
    | "coverNote"
    | "resume",
    string
  >
>;

/* ── Shared tiny inline icons for input fields ────────────────────────── */
function InputIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "size-4 shrink-0",
    "aria-hidden": true as const,
  };
  switch (name) {
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 19c.8-3 3.4-4.6 6.5-4.6s5.7 1.6 6.5 4.6" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
          <path d="m4.5 7 7.5 5.5L19.5 7" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M7 3.5h2.5L11 7.5 9 9a10.5 10.5 0 0 0 6 6l1.5-2 4 1.5V17a3 3 0 0 1-3 3A14.5 14.5 0 0 1 4 6.5a3 3 0 0 1 3-3z" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <rect x="4" y="8" width="16" height="11" rx="1.5" />
          <path d="M9.5 8V6.5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2V8M4 13h16" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-5 4V6z" />
          <path d="M8 8.5h8M8 11.5h5" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5z" />
          <path d="M14 3.5V8h4.5M9 12h6M9 15.5h4" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5.5" width="16" height="15" rx="1.5" />
          <path d="M4 10h16M8 3.5v4M16 3.5v4" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8.5 10.5V16M8.5 8v.01M12 16v-3.2c0-1.1.7-2 1.9-2s1.9.9 1.9 2V16" />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path d="M10 14a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 0 0-5.7-5.7L11.5 6.8" />
          <path d="M14 10a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 0 0 5.7 5.7l1.3-1.3" />
        </svg>
      );
    case "pen":
      return (
        <svg {...common}>
          <path d="m14.5 5.5 4 4L8 20l-4.5 1L4.5 16.5 14.5 5.5z" />
          <path d="m12.5 7.5 4 4" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M7 18a4.5 4.5 0 0 1-.4-9A5.5 5.5 0 0 1 17.3 8.6 4 4 0 0 1 17 16.5" />
          <path d="M12 20v-7m0 0-2.5 2.5M12 13l2.5 2.5" />
        </svg>
      );
    case "folder":
      return (
        <svg {...common}>
          <path d="M3.5 7A1.5 1.5 0 0 1 5 5.5h4l2 2.5h8A1.5 1.5 0 0 1 20.5 9.5V17A1.5 1.5 0 0 1 19 18.5H5A1.5 1.5 0 0 1 3.5 17V7z" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5.5" y="10.5" width="13" height="9" rx="1.5" />
          <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
        </svg>
      );
    case "shieldCheck":
      return (
        <svg {...common}>
          <path d="M12 3 5.5 5.5V11c0 4.2 2.7 7.6 6.5 9 3.8-1.4 6.5-4.8 6.5-9V5.5L12 3z" />
          <polyline points="9.5 11.5 11.4 13.4 14.8 9.8" />
        </svg>
      );
    case "fileTypes":
      return (
        <svg {...common}>
          <path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5z" />
          <path d="M14 3.5V8h4.5" />
          <path d="M9 13h6M9 16.5h4" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="2.5" />
          <path d="M4.5 17c.6-2.4 2.4-3.6 4.5-3.6s3.9 1.2 4.5 3.6" />
          <circle cx="16.5" cy="8" r="2" />
          <path d="M15.5 12.2c2 .1 3.5 1.2 4 3.3" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Upload card — dashed dropzone look from the mockup ────────────────── */
function UploadCard({
  id,
  title,
  hint,
  accept,
  file,
  error,
  onPick,
  onClear,
}: {
  id: string;
  title: string;
  hint: string;
  accept: string;
  file: File | null;
  error?: string;
  onPick: (f: File) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div>
      <div
        className={cn(
          "rounded-xl border border-dashed px-5 py-5 transition-colors",
          error
            ? "border-magenta/70 bg-magenta/[0.03]"
            : "border-navy-200 bg-[#f7faff] hover:border-cyan/60",
        )}
      >
        {file ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cyan/10 text-cyan">
              <InputIcon name="doc" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-navy-900">
                {file.name}
              </p>
              <p className="text-xs text-ink-3">{formatBytes(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClear();
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="rounded-full border border-rule px-3 py-1.5 text-xs font-semibold text-ink-3 transition-colors hover:border-magenta/60 hover:text-magenta"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2.5 text-center">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cyan/10 text-cyan">
              <InputIcon name={id === "career-resume" ? "cloud" : "folder"} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-navy-900">{title}</p>
              <p className="mt-0.5 text-xs text-ink-3">{hint}</p>
            </div>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-full border border-navy-300 bg-white px-4 py-2 text-xs font-bold tracking-wide text-navy-900 uppercase transition-colors hover:border-cyan hover:text-cyan"
            >
              Choose File
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          className="sr-only"
          tabIndex={-1}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onPick(f);
          }}
        />
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-magenta">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Label with optional required marker ───────────────────────────────── */
function FieldLabel({
  icon,
  children,
  required,
}: {
  icon?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <span className="label-wide flex items-center gap-2 text-navy-900">
      {icon && (
        <span className="text-navy/45">
          <InputIcon name={icon} />
        </span>
      )}
      <span>
        {children}
        {required && (
          <span className="ml-1 text-magenta" aria-hidden>
            *
          </span>
        )}
      </span>
    </span>
  );
}

const inputClass =
  "mt-2 block w-full min-w-0 max-w-full rounded-lg border border-[#d7e1ee] bg-white px-4 py-3 text-base text-navy-900 outline-none transition-all placeholder:text-ink-3/55 hover:border-navy-300 focus:border-cyan focus:ring-1 focus:ring-cyan/25 sm:text-sm";
const inputErrorClass =
  "mt-2 block w-full min-w-0 max-w-full rounded-lg border border-magenta/80 bg-white px-4 py-3 text-base text-navy-900 outline-none transition-all placeholder:text-ink-3/55 focus:border-magenta focus:ring-1 focus:ring-magenta/40 sm:text-sm";
/** Borderless input used inside a grouped shell (e.g. the +971 phone field). */
const inputInnerClass =
  "block w-full min-w-0 border-0 bg-transparent px-3 py-3 text-base text-navy-900 outline-none placeholder:text-ink-3/55 sm:text-sm";
/** Select / textarea shell — same visual language as inputClass. */
const selectClass =
  "mt-2 block w-full min-w-0 max-w-full rounded-lg border bg-white px-4 py-3 text-base text-navy-900 outline-none transition-all hover:border-navy-300 focus:ring-1 sm:text-sm";

function apiErrorMessage(code: string, detail?: string): string {
  if (code === "file") {
    if (detail?.includes("resume_required"))
      return "Please attach your resume — PDF, DOC or DOCX up to 5 MB.";
    if (detail?.includes("size"))
      return "That file is larger than 5 MB. Please compress it or export a smaller PDF and try again.";
    if (detail?.includes("type") || detail?.includes("empty"))
      return "That file type isn't accepted. Resumes must be PDF, DOC or DOCX.";
    return "We couldn't accept the uploaded file. Please check the format and size, then try again.";
  }
  switch (code) {
    case "captcha":
      return "Security check could not be verified. Please complete the checkbox and try again.";
    case "invalid":
      return "Please review your details — one or more fields were not accepted.";
    default:
      return "We couldn't submit your application right now. Please try again or contact us directly.";
  }
}

/* ── Left-column benefit bullets (from the approved mockup) ───────────── */
const benefits = [
  {
    title: "Be Part of Real Projects",
    copy: "Work on creative and production projects that make an impact.",
    accent: "cyan",
    icon: "user",
  },
  {
    title: "Grow Your Skills",
    copy: "Learn, collaborate and develop with an experienced team.",
    accent: "magenta",
    icon: "growth",
  },
  {
    title: "Work Across Disciplines",
    copy: "Design, print, signage, digital and more — all under one roof.",
    accent: "yellow",
    icon: "people",
  },
] as const;

function BenefitIcon({ name }: { name: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "size-5",
    "aria-hidden": true as const,
  };
  switch (name) {
    case "growth":
      return (
        <svg {...common}>
          <path d="M5 20v-6M12 20V9M19 20V4" />
        </svg>
      );
    default:
      return <InputIcon name={name} />;
  }
}

const benefitCircle: Record<string, string> = {
  cyan: "bg-cyan/10 text-cyan",
  magenta: "bg-magenta/10 text-magenta",
  yellow: "bg-yellow/25 text-[#b8a400]",
};

const OFFICE_PHOTO =
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=900";

/**
 * Careers application composer — redesigned to the approved mockup:
 * editorial left column (eyebrow, display heading, supporting copy,
 * benefit bullets, office photo with "Join Our Team" sticker) beside a
 * white application-form panel with inline field icons, dashed upload
 * cards, character counter and a trust strip. Posts multipart/form-data
 * to /api/careers (server-side zod + Turnstile + Resend). No alert(),
 * no mailto, no client-side email.
 */
export function CareersForm() {
  const searchParams = useSearchParams();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    area: "",
    role: "",
    experience: "",
    linkedin: "",
    portfolioUrl: "",
    coverNote: "",
    preferredContact: "Email",
  });

  const [resume, setResume] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | undefined>(undefined);

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorText, setErrorText] = useState<string | null>(null);
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const sendingRef = useRef(false);
  const tsHostRef = useRef<HTMLDivElement | null>(null);
  const tokenRef = useRef("");

  const set = (key: keyof typeof values, v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (status !== "idle") setStatus("idle");
    setErrorText(null);
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // Mount Cloudflare Turnstile (identical lifecycle to QuoteSection).
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
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
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
          theme: "light",
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

  /**
   * Prefill "Area of Interest" when a visitor arrives from a
   * "Where you could fit" card — e.g. /careers?area=Print%20%26%20Production#apply.
   * The value is matched against the real option list, so a hand-edited URL
   * can never inject an unknown area.
   */
  useEffect(() => {
    const requested = searchParams.get("area");
    if (!requested) return;
    if (!(AREAS as readonly string[]).includes(requested)) return;
    setValues((prev) =>
      prev.area === requested ? prev : { ...prev, area: requested },
    );
  }, [searchParams]);

  /** Client-side gate; the server re-validates everything independently. */
  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = "Please tell us your full name.";
    if (!values.email.trim() || !EMAIL_RE.test(values.email.trim()))
      next.email = "Please enter a valid email address so we can reply.";
    if (!values.phone.trim())
      next.phone = "Please add a phone or WhatsApp number.";
    if (!values.location.trim())
      next.location = "Please add your current city / country.";
    if (!values.area) next.area = "Please choose the closest area of interest.";
    if (!values.coverNote.trim())
      next.coverNote = "A short introduction helps us understand your fit.";
    if (!resume) next.resume = "Please attach your resume (PDF, DOC or DOCX).";
    else if (resume.size > MAX_FILE_BYTES)
      next.resume = "Your resume is larger than 5 MB — please compress it.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendingRef.current) return; // duplicate-submit guard
    setErrorText(null);

    if (!validate()) {
      setStatus("error");
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
      const body = new FormData();
      body.set("name", values.name);
      body.set("email", values.email.trim());
      body.set("phone", values.phone);
      body.set("location", values.location);
      body.set("area", values.area);
      body.set("role", values.role);
      body.set("experience", values.experience);
      body.set("linkedin", values.linkedin);
      body.set("portfolio", values.portfolioUrl || (portfolioFile ? portfolioFile.name : ""));
      body.set("coverNote", values.coverNote);
      body.set("preferredContact", values.preferredContact);
      body.set("website", honeypot);
      body.set("token", token);
      if (resume) body.set("resume", resume);
      if (portfolioFile) body.set("portfolioFile", portfolioFile);

      const res = await fetch("/api/careers", { method: "POST", body });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; detail?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setErrorText(apiErrorMessage(data?.error ?? "internal", data?.detail));
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

  return (
    <section
      id="apply"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#f2f6fb] py-24 lg:py-32"
    >
      {/* Subtle blueprint grid + dot texture backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(16,48,90,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,48,90,0.045)_1px,transparent_1px)] [background-size:64px_64px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-24 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.09)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.06)_0%,transparent_70%)]"
      />

      <div className="shell relative z-10">
        <div className="grid items-stretch gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ══ LEFT — editorial column (mockup style) ════════════════════ */}
          <div className="flex h-full flex-col lg:col-span-5">
            <Reveal from="up">
              <p className="label-wide flex items-center gap-2.5 text-navy/70">
                <span aria-hidden className="inline-block size-1.5 bg-magenta" />
                CAREERS AT EXPRESS ADVERTISING
              </p>
            </Reveal>

            <Reveal from="up" delay={0.08}>
              <h2 className="display-lg mt-5 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] font-extrabold text-navy-900">
                Submit Your{" "}
                <span className="text-gradient-deep">Resume</span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.14}>
              <span aria-hidden className="mt-5 flex h-[3px] w-24">
                <span className="h-full w-1/3 bg-cyan" />
                <span className="h-full w-1/3 bg-magenta" />
                <span className="h-full w-1/3 bg-yellow" />
              </span>
            </Reveal>

            <Reveal from="up" delay={0.2}>
              <p className="lede mt-6 max-w-md text-ink-2">
                Tell us a little about yourself and upload your CV. If your
                experience matches a current or future requirement, our team
                can contact you.
              </p>
            </Reveal>

            {/* Benefit bullets */}
            <ul className="mt-9 space-y-6">
              {benefits.map((b, i) => (
                <Reveal as="li" key={b.title} delay={0.08 + i * 0.06} from="up">
                  <div className="flex items-start gap-4">
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-full ${benefitCircle[b.accent]}`}
                    >
                      <BenefitIcon name={b.icon} />
                    </span>
                    <div>
                      <h3 className="text-[0.9375rem] font-bold tracking-tight text-navy-900">
                        {b.title}
                      </h3>
                      <p className="body-sm mt-1 text-ink-2">{b.copy}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            {/* Office photo + Join Our Team sticker — grows to fill the
                column so both sides end on the same baseline as the form */}
            <Reveal from="up" delay={0.2} className="mt-10 flex flex-1 flex-col">
              <div className="flex flex-1 flex-col">
                {/* Image anchor — sticker pins to the photo, not the column.
                    Grows with the column but capped, so it never becomes an
                    absurdly tall crop on very long form heights. */}
                <div className="relative mt-auto flex max-h-[520px] min-h-[240px] flex-1 flex-col lg:min-h-[300px]">
                  <div className="flex-1 overflow-hidden rounded-2xl border border-white shadow-[0_24px_60px_-24px_rgba(16,48,90,0.4)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={OFFICE_PHOTO}
                      alt="Bright Express Advertising office — creative studio workspace"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Rotated sticker — brand cyan card, outside the clip */}
                  <div className="absolute -bottom-8 -left-3 -rotate-6 rounded-2xl bg-gradient-to-br from-[#01afef] to-[#0084c9] px-6 py-5 text-white shadow-[0_18px_40px_-14px_rgba(1,175,239,0.65)] sm:-left-6">
                    <p className="font-display text-lg font-extrabold leading-tight tracking-tight">
                      Join
                      <br />
                      Our Team
                    </p>
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      className="mt-2 size-4 text-white/85"
                    >
                      <path d="M4 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                </div>

                {/* Handwriting-style caption — cleared below the sticker */}
                <p className="mt-14 pl-2 text-sm italic text-navy/45">
                  People Who Make Brands Happen
                </p>
                <p className="label-wide mt-2.5 pl-2 text-navy/55">
                  AJMAN HQ · SERVING ALL EMIRATES
                </p>
              </div>
            </Reveal>
          </div>

          {/* ══ RIGHT — application form panel (mockup style) ═════════════ */}
          <Reveal from="up" delay={0.1} className="min-w-0 lg:col-span-7">
            <div className="relative flex h-full flex-col rounded-2xl border border-[#e4ebf5] bg-white p-6 shadow-[0_30px_80px_-30px_rgba(16,48,90,0.28)] sm:p-8 lg:p-10">
              {/* Panel header — kicker left, tagline right */}
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-[#e9eff7] pb-6">
                <div>
                  <p className="label-wide text-navy/60">Application Form</p>
                  <h3 className="display-sm mt-2 font-extrabold text-navy-900">
                    Let&apos;s Work Together
                  </h3>
                </div>
                <div className="text-right">
                  <p className="label-wide text-navy/55">
                    Same ideas.
                    <br />
                    Bigger possibilities.
                  </p>
                  <span aria-hidden className="mt-2 inline-flex h-[3px] w-16">
                    <span className="h-full w-1/3 bg-cyan" />
                    <span className="h-full w-1/3 bg-magenta" />
                    <span className="h-full w-1/3 bg-yellow" />
                  </span>
                </div>
              </div>

              <form onSubmit={onSubmit} noValidate className="mt-7 flex-1">
                {/* Honeypot — invisible to humans, irresistible to bots */}
                <div
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0"
                >
                  <label htmlFor="career-website" className="label-wide">
                    Website
                  </label>
                  <input
                    id="career-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                  {/* Full name */}
                  <label className="block">
                    <FieldLabel icon="user" required>
                      Full Name
                    </FieldLabel>
                    <input
                      id="career-name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => set("name", e.target.value)}
                      aria-invalid={errors.name ? true : undefined}
                      className={errors.name ? inputErrorClass : inputClass}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-magenta">
                        {errors.name}
                      </p>
                    )}
                  </label>

                  {/* Email */}
                  <label className="block">
                    <FieldLabel icon="mail" required>
                      Email Address
                    </FieldLabel>
                    <input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => set("email", e.target.value)}
                      aria-invalid={errors.email ? true : undefined}
                      className={errors.email ? inputErrorClass : inputClass}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-magenta">
                        {errors.email}
                      </p>
                    )}
                  </label>

                  {/* Phone / WhatsApp — grouped shell with +971 prefix */}
                  <label className="block">
                    <FieldLabel icon="phone" required>
                      Phone / WhatsApp
                    </FieldLabel>
                    <div
                      className={cn(
                        "mt-2 flex items-stretch overflow-hidden rounded-lg border bg-white transition-all focus-within:ring-1",
                        errors.phone
                          ? "border-magenta/80 focus-within:border-magenta focus-within:ring-magenta/40"
                          : "border-[#d7e1ee] hover:border-navy-300 focus-within:border-cyan focus-within:ring-cyan/25",
                      )}
                    >
                      <span className="flex shrink-0 items-center gap-2 border-r border-[#e4ebf5] bg-[#f7fafd] px-3 text-sm font-semibold text-navy-900">
                        <span className="text-navy/40">
                          <InputIcon name="phone" />
                        </span>
                        +971
                      </span>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        aria-invalid={errors.phone ? true : undefined}
                        className={inputInnerClass}
                        placeholder="50 123 4567"
                      />
                    </div>
                    {errors.phone && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-magenta">
                        {errors.phone}
                      </p>
                    )}
                  </label>

                  {/* Location */}
                  <label className="block">
                    <FieldLabel icon="pin" required>
                      Current Location
                    </FieldLabel>
                    <input
                      type="text"
                      value={values.location}
                      onChange={(e) => set("location", e.target.value)}
                      aria-invalid={errors.location ? true : undefined}
                      className={errors.location ? inputErrorClass : inputClass}
                      placeholder="e.g. Dubai, UAE"
                    />
                    {errors.location && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-magenta">
                        {errors.location}
                      </p>
                    )}
                  </label>

                  {/* Area of interest */}
                  <label className="block">
                    <FieldLabel icon="briefcase" required>
                      Area of Interest
                    </FieldLabel>
                    <select
                      value={values.area}
                      onChange={(e) => set("area", e.target.value)}
                      aria-invalid={errors.area ? true : undefined}
                      className={cn(
                        selectClass,
                        errors.area
                          ? "border-magenta/80 focus:border-magenta focus:ring-magenta/40"
                          : "border-[#d7e1ee] focus:border-cyan focus:ring-cyan/25",
                      )}
                    >
                      <option value="" disabled>
                        Select an area…
                      </option>
                      {AREAS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                    {errors.area && (
                      <p role="alert" className="mt-1.5 text-xs font-medium text-magenta">
                        {errors.area}
                      </p>
                    )}
                  </label>

                  {/* Preferred contact */}
                  <label className="block">
                    <FieldLabel icon="chat">
                      Preferred Contact Method
                    </FieldLabel>
                    <select
                      value={values.preferredContact}
                      onChange={(e) => set("preferredContact", e.target.value)}
                      className={cn(
                        selectClass,
                        "border-[#d7e1ee] focus:border-cyan focus:ring-cyan/25",
                      )}
                    >
                      {CONTACT_METHODS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Current role */}
                  <label className="block">
                    <FieldLabel icon="doc">Current / Most Recent Role</FieldLabel>
                    <input
                      type="text"
                      value={values.role}
                      onChange={(e) => set("role", e.target.value)}
                      className={inputClass}
                      placeholder="e.g. Senior Graphic Designer"
                    />
                  </label>

                  {/* Experience */}
                  <label className="block">
                    <FieldLabel icon="calendar">Years of Experience</FieldLabel>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={values.experience}
                      onChange={(e) => set("experience", e.target.value)}
                      className={inputClass}
                      placeholder="e.g. 4"
                    />
                  </label>

                  {/* LinkedIn */}
                  <label className="block">
                    <FieldLabel icon="linkedin">LinkedIn Profile</FieldLabel>
                    <input
                      type="url"
                      inputMode="url"
                      value={values.linkedin}
                      onChange={(e) => set("linkedin", e.target.value)}
                      className={inputClass}
                      placeholder="linkedin.com/in/…"
                    />
                  </label>

                  {/* Portfolio URL */}
                  <label className="block">
                    <FieldLabel icon="link">Portfolio / Website</FieldLabel>
                    <input
                      type="url"
                      inputMode="url"
                      value={values.portfolioUrl}
                      onChange={(e) => set("portfolioUrl", e.target.value)}
                      className={inputClass}
                      placeholder="your-portfolio.com"
                    />
                  </label>

                  {/* Cover note */}
                  <div className="sm:col-span-2">
                    <FieldLabel icon="pen" required>
                      Short Introduction / Cover Note
                    </FieldLabel>
                    <textarea
                      rows={4}
                      maxLength={COVER_NOTE_MAX}
                      value={values.coverNote}
                      onChange={(e) => set("coverNote", e.target.value)}
                      aria-invalid={errors.coverNote ? true : undefined}
                      className={cn(
                        "mt-2 block w-full min-w-0 max-w-full resize-y rounded-lg border bg-white px-4 py-3 text-base text-navy-900 outline-none transition-all placeholder:text-ink-3/55 hover:border-navy-300 focus:ring-1 sm:text-sm",
                        errors.coverNote
                          ? "border-magenta/80 focus:border-magenta focus:ring-magenta/40"
                          : "border-[#d7e1ee] focus:border-cyan focus:ring-cyan/25",
                      )}
                      placeholder="A few lines about the work you do and what you're looking for…"
                    />
                    <div className="mt-1 flex items-start justify-between gap-4">
                      {errors.coverNote ? (
                        <p role="alert" className="text-xs font-medium text-magenta">
                          {errors.coverNote}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="shrink-0 text-xs tabular-nums text-ink-3">
                        {values.coverNote.length} / {COVER_NOTE_MAX}
                      </span>
                    </div>
                  </div>

                  {/* Uploads */}
                  <div>
                    <FieldLabel required>Resume / CV Upload</FieldLabel>
                    <div className="mt-2">
                      <UploadCard
                        id="career-resume"
                        title="Choose your resume"
                        hint="PDF, DOC or DOCX — up to 5MB"
                        accept={RESUME_ACCEPT}
                        file={resume}
                        error={resumeError ?? errors.resume}
                        onPick={(f) => {
                          const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
                          if (![".pdf", ".doc", ".docx"].includes(ext)) {
                            setResumeError("Resumes must be PDF, DOC or DOCX.");
                            setResume(null);
                            return;
                          }
                          if (f.size > MAX_FILE_BYTES) {
                            setResumeError("Your resume is larger than 5 MB — please compress it.");
                            setResume(null);
                            return;
                          }
                          setResumeError(undefined);
                          setResume(f);
                          setErrors((e2) => ({ ...e2, resume: undefined }));
                        }}
                        onClear={() => {
                          setResume(null);
                          setResumeError(undefined);
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Portfolio Upload (Optional)</FieldLabel>
                    <div className="mt-2">
                      <UploadCard
                        id="career-portfolio"
                        title="Portfolio file or images"
                        hint="PDF or images — up to 5MB"
                        accept={PORTFOLIO_ACCEPT}
                        file={portfolioFile}
                        onPick={(f) => {
                          const ext = f.name.slice(f.name.lastIndexOf(".")).toLowerCase();
                          if (
                            ![".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg", ".webp"].includes(ext)
                          )
                            return;
                          if (f.size > MAX_FILE_BYTES) return;
                          setPortfolioFile(f);
                        }}
                        onClear={() => setPortfolioFile(null)}
                      />
                      <p className="mt-2 text-xs text-ink-3">
                        Or paste a portfolio URL above.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feedback + actions */}
                <div className="mt-8">
                  {status === "success" && (
                    <div role="status" className="mb-6 rounded-xl border border-cyan/30 bg-cyan/10 p-5">
                      <p className="flex items-center gap-2.5 text-sm font-bold text-navy-900">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-cyan text-white">
                          <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <polyline points="2.5 8.5 6 12 13.5 4" />
                          </svg>
                        </span>
                        Application Submitted
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-2">
                        Thank you for your interest in Express Advertising. Your
                        application and resume have been received successfully — a
                        confirmation is on its way to{" "}
                        <span className="font-semibold text-cyan">{values.email}</span>.
                      </p>
                    </div>
                  )}

                  {status === "error" && errorText && (
                    <div role="alert" className="mb-6 rounded-xl border border-magenta/40 bg-magenta/10 p-5">
                      <p className="flex items-center gap-2.5 text-sm font-bold text-navy-900">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-magenta text-white">
                          <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                            <path d="M8 3v6M8 12.2v.8" />
                          </svg>
                        </span>
                        {errorText}
                      </p>
                    </div>
                  )}

                  {widgetError && (
                    <p role="alert" className="mb-4 text-xs font-medium text-navy">
                      {widgetError}
                    </p>
                  )}

                  <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-navy-900 px-9 py-4 text-sm font-bold tracking-wide text-white uppercase shadow-[0_10px_30px_-10px_rgba(16,48,90,0.6)] transition-all duration-200 hover:bg-[#0099da] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {status === "sending" ? (
                        <>
                          <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit Application
                          <svg className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                            <path d="M3 8h10M9 4l4 4-4 4" />
                          </svg>
                        </>
                      )}
                    </button>

                    {/* Turnstile */}
                    {TURNSTILE_SITE_KEY && (
                      <div className="flex min-h-[65px] items-start">
                        <div ref={tsHostRef} className="cf-turnstile-wrap" />
                      </div>
                    )}
                  </div>

                  {/* Privacy note with lock icon */}
                  <p className="mt-5 flex items-start gap-2.5 text-xs leading-relaxed text-ink-3">
                    <span className="mt-0.5 shrink-0 text-navy/50">
                      <InputIcon name="lock" />
                    </span>
                    Your application and resume are sent securely to our team and
                    used only for recruitment purposes.
                  </p>
                </div>
              </form>

              {/* Trust strip — three mini assurances */}
              <div className="mt-8 grid gap-4 border-t border-[#e9eff7] pt-7 sm:grid-cols-3">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cyan/10 text-cyan">
                    <InputIcon name="shieldCheck" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-900">Secure Submission</p>
                    <p className="mt-0.5 text-xs text-ink-3">Your data is protected</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cyan/10 text-cyan">
                    <InputIcon name="fileTypes" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-900">File types accepted</p>
                    <p className="mt-0.5 text-xs text-ink-3">PDF, DOC, DOCX (max 5MB)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cyan/10 text-cyan">
                    <InputIcon name="people" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy-900">Equal Opportunities</p>
                    <p className="mt-0.5 text-xs text-ink-3">We value diverse talent</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
