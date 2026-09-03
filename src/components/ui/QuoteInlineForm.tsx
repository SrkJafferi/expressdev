"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WhatsAppButton } from "@/components/ui/Cta";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Compact inline quote form used inside the service-page CTA sections.
 *
 * Posts to /api/quote — the same secure server-side pipeline as the
 * homepage quote form: zod validation, honeypot and Cloudflare Turnstile
 * on the server, then a branded brief email to the team plus a
 * confirmation to the customer via Resend. The service is pre-selected
 * (each CTA renders with its own service). WhatsApp stays as a manual
 * fallback button in the action row.
 */

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

type Status = "idle" | "sending" | "success" | "error";

type FieldKey = "name" | "email" | "phone" | "details";

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

export function QuoteInlineForm({ service }: { service: string }) {
  const uid = useRef(`qif-${Math.random().toString(36).slice(2, 8)}`).current;

  const [values, setValues] = useState<Record<FieldKey, string>>({
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const sendingRef = useRef(false);
  const tsHostRef = useRef<HTMLDivElement | null>(null);
  const tokenRef = useRef("");

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

  const set =
    (key: FieldKey) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >,
    ) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
      // Editing again after a failed send — reset to a clean state.
      if (status !== "idle") {
        setStatus("idle");
        setErrorText(null);
      }
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sendingRef.current) return; // duplicate-submit guard

    const errs: Partial<Record<FieldKey, string>> = {};
    if (!values.name.trim()) errs.name = "Please enter your name.";
    const email = values.email.trim();
    if (!email) {
      errs.email = "Please enter your email address.";
    } else if (!EMAIL_RE.test(email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!values.details.trim())
      errs.details = "Please share a few details about your requirement.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    sendingRef.current = true;
    setStatus("sending");
    setErrorText(null);

    const turnstile = getTurnstile();
    let token = tokenRef.current;
    if (TURNSTILE_SITE_KEY && turnstile && !token) {
      try {
        token = turnstile.getResponse() ?? "";
      } catch {
        token = "";
      }
    }

    let res: Response;
    try {
      res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          service,
          name: values.name,
          email,
          phone: values.phone,
          details: values.details,
          // Fields this compact form does not collect — the email template shows "—".
          company: "",
          quantity: "",
          size: "",
          material: "",
          requiredDate: "",
          notes: "",
          location: "",
          preferredContact: "",
          website: honeypot,
          token,
        }),
      });
    } catch {
      sendingRef.current = false;
      setErrorText(apiErrorMessage("network"));
      setStatus("error");
      return;
    }
    sendingRef.current = false;

    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!res.ok || !data?.ok) {
      setErrorText(apiErrorMessage(data?.error ?? "internal"));
      setStatus("error");
      return;
    }

    setStatus("success");
    setValues({ name: "", email: "", phone: "", details: "" });
    if (turnstile) {
      try {
        turnstile.reset();
      } catch {
        // ignore — token just expires naturally
      }
      tokenRef.current = "";
    }
  };

  const waUrl = useMemo(() => whatsappUrl({ service }), [service]);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="quote-grid-bg relative mx-auto mt-9 max-w-2xl rounded-xl border border-white/[0.08] bg-navy-800/50 p-6 text-left sm:p-8"
    >
      {/* Honeypot — invisible to humans, irresistible to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Service chip — pre-selected, shown so the user knows what they are quoting */}
      <p className="flex items-center justify-center gap-2">
        <span className="label inline-flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/10 px-3.5 py-1.5 text-cyan-bright">
          <svg className="size-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <polyline points="2 6 5 9 10 3" />
          </svg>
          {service}
        </span>
      </p>

      <div className="mt-6 grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <label className="block">
          <span className="label-wide text-[#ededed]">Full name *</span>
          <input
            type="text"
            autoComplete="name"
            value={values.name}
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            onChange={set("name")}
            className={errors.name ? inputErrorClass : inputClass}
          />
          {errors.name && (
            <p id={`${uid}-name-err`} role="alert" className="mt-1.5 text-xs font-medium text-magenta">
              {errors.name}
            </p>
          )}
        </label>

        <label className="block">
          <span className="label-wide text-[#ededed]">Email address *</span>
          <input
            type="email"
            autoComplete="email"
            value={values.email}
            placeholder="you@company.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
            onChange={set("email")}
            className={errors.email ? inputErrorClass : inputClass}
          />
          {errors.email && (
            <p id={`${uid}-email-err`} role="alert" className="mt-1.5 text-xs font-medium text-magenta">
              {errors.email}
            </p>
          )}
        </label>

        <label className="block sm:col-span-2">
          <span className="label-wide text-[#ededed]">WhatsApp number</span>
          <input
            type="tel"
            autoComplete="tel"
            value={values.phone}
            placeholder="+971 …"
            onChange={set("phone")}
            className={inputClass}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="label-wide text-[#ededed]">Project details *</span>
          <textarea
            rows={4}
            value={values.details}
            placeholder="Sizes, materials, quantities, timelines — anything relevant."
            aria-invalid={errors.details ? true : undefined}
            aria-describedby={errors.details ? `${uid}-details-err` : undefined}
            onChange={set("details")}
            className={`${errors.details ? inputErrorClass : inputClass} resize-y`}
          />
          {errors.details && (
            <p id={`${uid}-details-err`} role="alert" className="mt-1.5 text-xs font-medium text-magenta">
              {errors.details}
            </p>
          )}
        </label>
      </div>

      {/* Success / error feedback */}
      {status === "success" && (
        <div
          role="status"
          className="mt-6 rounded-xl border border-cyan/30 bg-cyan/10 p-5"
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
            Your brief has been emailed to our team and a confirmation is on
            its way to <span className="font-semibold text-cyan-bright">{values.email}</span>.
            We will reply with questions or a quotation, usually within one
            business day.
          </p>
        </div>
      )}
      {status === "error" && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-magenta/40 bg-magenta/10 p-5"
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
              href={waUrl}
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
        <p role="alert" className="mt-4 text-xs font-medium text-yellow">
          {widgetError} You can still use the WhatsApp button below.
        </p>
      )}

      <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn group btn-primary whitespace-nowrap px-8 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              SENDING…
            </>
          ) : (
            "SEND REQUEST"
          )}
          {status !== "sending" && (
            <svg
              className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M2 8h11M9 4l4 4-4 4" />
            </svg>
          )}
        </button>
        <WhatsAppButton variant="invert" label="WhatsApp Us" context={{ service }} />
      </div>

      {/* Cloudflare Turnstile — anti-spam verification */}
      {TURNSTILE_SITE_KEY && (
        <div className="mt-5 flex min-h-[65px] items-start justify-center">
          <div ref={tsHostRef} className="cf-turnstile-wrap" />
        </div>
      )}

      <p className="mt-4 text-center text-xs leading-relaxed text-white/30">
        Your details are only used to respond to this enquiry.
      </p>
    </form>
  );
}