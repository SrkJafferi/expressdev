"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { contact } from "@/data/site";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Contact overview — contact method cards (left) + enquiry form (right).
 *
 * SUBMISSION: the form posts to /api/quote — the same secure server-side
 * pipeline as the homepage quote form. Zod validation, honeypot and
 * Cloudflare Turnstile on the server, then a branded brief email to the
 * team plus a confirmation to the customer via Resend. No mailto, no
 * client-side mail, no secrets in the browser. WhatsApp remains available
 * as a manual fallback link.
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

function apiErrorMessage(code: string): string {
  switch (code) {
    case "captcha":
      return "Security check could not be verified. Please complete the checkbox and try again.";
    case "invalid":
      return "Please review your details — one or more fields were not accepted.";
    case "send_failed":
      return "We could not send your enquiry right now. Please try again in a moment, or reach us on WhatsApp.";
    default:
      return "Something went wrong while sending your enquiry. Please try again, or reach us on WhatsApp.";
  }
}

const SERVICES = [
  "Printing Services",
  "Signage",
  "Large Format Printing",
  "Promotional Items",
  "Brand Collateral",
  "Retail / Events / Exhibition",
  "CNC & Laser Cutting",
  "Digital Design",
  "IT Services",
  "Other",
] as const;

const CONTACT_METHODS = ["Phone", "WhatsApp", "Email"] as const;

type Status = "idle" | "sending" | "success" | "error";

type FormValues = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  projectLocation: string;
  quantity: string;
  preferredContact: string;
  details: string;
};

const EMPTY: FormValues = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  projectLocation: "",
  quantity: "",
  preferredContact: "WhatsApp",
  details: "",
};

const methods = [
  {
    label: "PHONE",
    value: contact.phoneDisplay,
    href: `tel:${contact.phoneE164}`,
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
  {
    label: "EMAIL",
    value: contact.emailPrimary,
    href: `mailto:${contact.emailPrimary}`,
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "WHATSAPP",
    value: "Chat with our team",
    href: whatsappUrl(),
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h5" />
      </svg>
    ),
  },
  {
    label: "LOCATION",
    value: "Ajman, UAE",
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
] as const;

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.phone.trim()) {
    errors.phone = "Please enter your phone or WhatsApp number.";
  } else if (!/^[+\d][\d\s()-]{6,}$/.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!values.service) errors.service = "Please select a service.";
  if (!values.details.trim())
    errors.details = "Please share a few details about your requirement.";
  return errors;
}

/**
 * Post the enquiry to /api/quote — server-side zod validation, honeypot
 * and Turnstile enforcement happen there; emails are sent by the server.
 * Returns a machine-readable error code when the request fails.
 */
async function submitEnquiry(values: FormValues, token: string, honeypot: string): Promise<{ ok: boolean; error?: string }> {
  let res: Response;
  try {
    res = await fetch("/api/quote", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        service: values.service,
        name: values.fullName,
        company: values.company,
        email: values.email,
        phone: values.phone,
        details: values.details,
        quantity: values.quantity,
        location: values.projectLocation,
        preferredContact: values.preferredContact,
        // Fields this form does not collect — the email template shows "—".
        size: "",
        material: "",
        requiredDate: "",
        notes: "",
        website: honeypot,
        token,
      }),
    });
  } catch {
    return { ok: false, error: "network" };
  }
  const data = (await res.json().catch(() => null)) as
    | { ok?: boolean; error?: string }
    | null;
  if (!res.ok || !data?.ok) {
    return { ok: false, error: data?.error ?? "internal" };
  }
  return { ok: true };
}

const inputBase =
  "mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink-3/60 focus:ring-2 focus:ring-cyan/40";

export function CtContact() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const sendingRef = useRef(false);
  const tsHostRef = useRef<HTMLDivElement | null>(null);
  const tokenRef = useRef("");

  // Quick-enquiry type cards dispatch this event to preselect a service.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const service = (e as CustomEvent<string>).detail;
      if (service && SERVICES.includes(service as (typeof SERVICES)[number])) {
        setValues((v) => ({ ...v, service }));
        setStatus("idle");
      }
    };
    window.addEventListener("ea:select-service", onPrefill);
    return () => window.removeEventListener("ea:select-service", onPrefill);
  }, []);

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

  const set =
    (key: keyof FormValues) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
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
    const errs = validate(values);
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

    const result = await submitEnquiry(values, token, honeypot);
    sendingRef.current = false;

    if (result.ok) {
      setStatus("success");
      setValues(EMPTY);
      if (turnstile) {
        try {
          turnstile.reset();
        } catch {
          // ignore — token just expires naturally
        }
        tokenRef.current = "";
      }
    } else {
      setErrorText(apiErrorMessage(result.error ?? "internal"));
      setStatus("error");
    }
  };

  const waFallback = useMemo(
    () => whatsappUrl({ service: values.service || "General enquiry" }),
    [values.service],
  );

  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
      {/* Dotted grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(27,77,133,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.07)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      <div className="shell relative z-10">
        <div className="grid items-stretch gap-14 lg:grid-cols-12 lg:gap-14">
          {/* ── Left — contact methods ──────────────────────────────── */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <Reveal from="up">
              <div className="flex items-center gap-3.5">
                <span aria-hidden className="h-px w-10 bg-cyan" />
                <SectionLabel accent="cyan">Start a conversation</SectionLabel>
                <span aria-hidden className="size-1.5 rounded-full bg-magenta" />
              </div>
            </Reveal>

            <Reveal from="up" delay={0.1}>
              <h2 className="display-md mt-7 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
                Tell Us What
                <br />
                You&apos;re{" "}
                <span className="text-gradient-deep">Working On.</span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.2}>
              <div className="mt-6 max-w-lg space-y-4">
                <p className="lede text-ink-2">
                  Share the project type, quantity, size, location or any
                  reference material you already have.
                </p>
                <p className="lede text-ink-2">
                  Even if every detail is not final, our team can help clarify
                  the requirement and recommend the right production approach.
                </p>
              </div>
            </Reveal>

            {/* Contact method cards */}
            <Reveal from="up" delay={0.3}>
              <ul className="space-y-3.5">
                {methods.map((method) =>
                  method.label === "LOCATION" ? (
                    // Location card — full verified address, not a link
                    <li
                      key={method.label}
                      className="flex items-start gap-4 rounded-xl border border-rule/70 bg-white p-4 sm:p-5"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-cyan/25 bg-cyan/5 text-cyan-bright">
                        {method.icon}
                      </span>
                      <span className="min-w-0">
                        <span className="label-wide block text-ink-3">
                          {method.label}
                        </span>
                        <span className="mt-0.5 block text-sm font-semibold text-navy-900">
                          {method.value}
                        </span>
                        <span className="mt-1.5 block text-[0.8125rem] leading-relaxed text-ink-2">
                          {contact.address.line1}
                          <br />
                          {contact.address.line2}
                          <br />
                          {contact.address.city}, {contact.address.country}
                        </span>
                      </span>
                    </li>
                  ) : (
                    <li key={method.label}>
                      <a
                        href={method.href}
                        target={method.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          method.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group flex items-center gap-4 rounded-xl border border-rule/70 bg-white p-4 transition-all duration-300 hover:border-cyan/40 hover:shadow-[0_12px_30px_-14px_rgba(27,77,133,0.3)] sm:p-5"
                      >
                        <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-cyan/25 bg-cyan/5 text-cyan-bright transition-colors duration-300 group-hover:bg-cyan group-hover:text-white">
                          {method.icon}
                        </span>
                        <span className="min-w-0">
                          <span className="label-wide block text-ink-3">
                            {method.label}
                          </span>
                          <span className="mt-0.5 block truncate text-sm font-semibold text-navy-900 transition-colors group-hover:text-cyan">
                            {method.value}
                          </span>
                        </span>
                        <svg
                          className="ml-auto size-4 shrink-0 text-ink-3 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cyan"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 8h11M9 4l4 4-4 4" />
                        </svg>
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </Reveal>
          </div>

          {/* ── Right — enquiry form ────────────────────────────────── */}
          <Reveal from="up" delay={0.15} className="lg:col-span-7">
            <div
              id="enquiry-form"
              className="scroll-mt-32 rounded-2xl border border-rule/70 bg-white p-7 shadow-[0_24px_60px_-28px_rgba(16,48,90,0.35)] sm:p-9 lg:p-10"
            >
              <h3 className="whitespace-nowrap text-xl font-bold tracking-tight text-navy-900 sm:text-2xl">
                Request A Quote Or Send An Enquiry
              </h3>

              {/* Success / error status */}
              {status === "success" && (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-cyan/30 bg-cyan/5 p-5"
                >
                  <p className="flex items-center gap-2.5 text-sm font-bold text-navy-900">
                    <span className="grid size-6 place-items-center rounded-full bg-cyan text-white">
                      <svg className="size-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2.5 8.5 6 12 13.5 4" />
                      </svg>
                    </span>
                    Enquiry sent — thank you!
                  </p>
                  <p className="mt-2 text-sm text-ink-2">
                    Your details have been emailed to our team and a
                    confirmation is on its way to{" "}
                    <span className="font-semibold text-navy-900">
                      {values.email}
                    </span>
                    . We will reply with questions or a quotation, usually
                    within one business day.
                  </p>
                </div>
              )}
              {status === "error" && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-magenta/30 bg-magenta/5 p-5"
                >
                  <p className="text-sm font-bold text-navy-900">
                    {errorText ?? "We could not send your enquiry."}
                  </p>
                  <p className="mt-1.5 text-sm text-ink-2">
                    Prefer to chat?{" "}
                    <a
                      className="font-semibold text-cyan underline-offset-2 hover:underline"
                      href={waFallback}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Send the same details on WhatsApp
                    </a>{" "}
                    or{" "}
                    <a
                      className="font-semibold text-cyan underline-offset-2 hover:underline"
                      href={`mailto:${contact.emailPrimary}`}
                    >
                      email us directly
                    </a>
                    .
                  </p>
                </div>
              )}
              {widgetError && (
                <p role="alert" className="mt-5 text-xs font-medium text-magenta">
                  {widgetError} You can still use the WhatsApp link below.
                </p>
              )}

              <form
                onSubmit={onSubmit}
                noValidate
                className={`mt-7 grid gap-5 sm:grid-cols-2 ${status === "success" ? "hidden" : ""}`}
              >
                {/* Honeypot — invisible to humans, irresistible to bots */}
                <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0">
                  <label htmlFor="ct-website">Website</label>
                  <input
                    id="ct-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                {/* Full Name */}
                <div>
                  <label htmlFor="ct-name" className="label text-ink-2">
                    Full Name <span className="text-magenta">*</span>
                  </label>
                  <input
                    id="ct-name"
                    type="text"
                    autoComplete="name"
                    value={values.fullName}
                    onChange={set("fullName")}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? "ct-name-err" : undefined}
                    className={`${inputBase} ${errors.fullName ? "border-magenta focus:border-magenta focus:ring-magenta/40" : "border-rule/80 focus:border-cyan"}`}
                    placeholder="Your full name"
                  />
                  {errors.fullName && (
                    <p id="ct-name-err" role="alert" className="mt-1.5 text-xs font-medium text-magenta">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="ct-company" className="label text-ink-2">
                    Company Name
                  </label>
                  <input
                    id="ct-company"
                    type="text"
                    autoComplete="organization"
                    value={values.company}
                    onChange={set("company")}
                    className={`${inputBase} border-rule/80 focus:border-cyan`}
                    placeholder="Your company"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="ct-email" className="label text-ink-2">
                    Email Address <span className="text-magenta">*</span>
                  </label>
                  <input
                    id="ct-email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={set("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "ct-email-err" : undefined}
                    className={`${inputBase} ${errors.email ? "border-magenta focus:border-magenta focus:ring-magenta/40" : "border-rule/80 focus:border-cyan"}`}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p id="ct-email-err" role="alert" className="mt-1.5 text-xs font-medium text-magenta">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="ct-phone" className="label text-ink-2">
                    Phone / WhatsApp <span className="text-magenta">*</span>
                  </label>
                  <input
                    id="ct-phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={set("phone")}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "ct-phone-err" : undefined}
                    className={`${inputBase} ${errors.phone ? "border-magenta focus:border-magenta focus:ring-magenta/40" : "border-rule/80 focus:border-cyan"}`}
                    placeholder="+971 …"
                  />
                  {errors.phone && (
                    <p id="ct-phone-err" role="alert" className="mt-1.5 text-xs font-medium text-magenta">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="ct-service" className="label text-ink-2">
                    Service Required <span className="text-magenta">*</span>
                  </label>
                  <select
                    id="ct-service"
                    value={values.service}
                    onChange={set("service")}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? "ct-service-err" : undefined}
                    className={`${inputBase} ${values.service ? "" : "text-ink-3/60"} ${errors.service ? "border-magenta focus:border-magenta focus:ring-magenta/40" : "border-rule/80 focus:border-cyan"}`}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p id="ct-service-err" role="alert" className="mt-1.5 text-xs font-medium text-magenta">
                      {errors.service}
                    </p>
                  )}
                </div>

                {/* Preferred contact */}
                <div>
                  <label htmlFor="ct-pref" className="label text-ink-2">
                    Preferred Contact Method
                  </label>
                  <select
                    id="ct-pref"
                    value={values.preferredContact}
                    onChange={set("preferredContact")}
                    className={`${inputBase} border-rule/80 focus:border-cyan`}
                  >
                    {CONTACT_METHODS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="ct-location" className="label text-ink-2">
                    Project Location
                  </label>
                  <input
                    id="ct-location"
                    type="text"
                    value={values.projectLocation}
                    onChange={set("projectLocation")}
                    className={`${inputBase} border-rule/80 focus:border-cyan`}
                    placeholder="Emirate / city"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="ct-qty" className="label text-ink-2">
                    Estimated Quantity
                  </label>
                  <input
                    id="ct-qty"
                    type="text"
                    value={values.quantity}
                    onChange={set("quantity")}
                    className={`${inputBase} border-rule/80 focus:border-cyan`}
                    placeholder="e.g. 500 pieces"
                  />
                </div>

                {/* Details */}
                <div className="sm:col-span-2">
                  <label htmlFor="ct-details" className="label text-ink-2">
                    Project Details <span className="text-magenta">*</span>
                  </label>
                  <textarea
                    id="ct-details"
                    rows={5}
                    value={values.details}
                    onChange={set("details")}
                    aria-invalid={Boolean(errors.details)}
                    aria-describedby={errors.details ? "ct-details-err" : undefined}
                    className={`${inputBase} resize-y ${errors.details ? "border-magenta focus:border-magenta focus:ring-magenta/40" : "border-rule/80 focus:border-cyan"}`}
                    placeholder="Describe what you need — sizes, materials, finishing, timelines or anything else relevant."
                  />
                  {errors.details && (
                    <p id="ct-details-err" role="alert" className="mt-1.5 text-xs font-medium text-magenta">
                      {errors.details}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center">
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
                      "SEND ENQUIRY"
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

                  <p className="text-sm text-ink-2">
                    Or{" "}
                    <a
                      href={waFallback}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-cyan underline-offset-2 hover:underline"
                    >
                      WhatsApp Us
                    </a>{" "}
                    directly.
                  </p>
                </div>

                {/* Cloudflare Turnstile — anti-spam verification */}
                {TURNSTILE_SITE_KEY && (
                  <div className="mt-1 flex min-h-[65px] items-start sm:col-span-2">
                    <div ref={tsHostRef} className="cf-turnstile-wrap" />
                  </div>
                )}

                {/* Privacy note */}
                <p className="text-xs leading-relaxed text-ink-3 sm:col-span-2">
                  Your details are only used to respond to this enquiry.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
