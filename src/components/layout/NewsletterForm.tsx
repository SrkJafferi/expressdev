"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "pending" | "success" | "error";

/**
 * Footer newsletter capture.
 *
 * Posts to /api/newsletter — server-side zod validation, honeypot, then a
 * branded notification to the team plus a confirmation to the subscriber
 * via Resend. No mailto, no client-side mail, no secrets in the browser.
 */
export function NewsletterForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const sendingRef = useRef(false);

  const isLight = variant === "light";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sendingRef.current) return; // duplicate-submit guard

    const address = email.trim();
    if (!EMAIL_RE.test(address)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    sendingRef.current = true;
    setStatus("pending");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: address, website: honeypot }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setMessage(
          data?.error === "send_failed"
            ? "We could not subscribe you right now — please try again."
            : "Something went wrong — please try again.",
        );
        return;
      }

      setStatus("success");
      setEmail("");
      setMessage("Subscribed — check your inbox for confirmation.");
    } catch {
      setStatus("error");
      setMessage("Something went wrong — please try again.");
    } finally {
      sendingRef.current = false;
    }
  }

  const invalid = status === "error";

  return (
    <form onSubmit={handleSubmit} noValidate className="relative mt-6">
      {/* Honeypot — invisible to humans, irresistible to bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0">
        <label htmlFor="footer-newsletter-website">Website</label>
        <input
          id="footer-newsletter-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <label htmlFor="footer-newsletter" className="sr-only">
        Your email address
      </label>
      <div
        className={cn(
          "flex items-center gap-2 border-b py-2 transition-colors",
          invalid
            ? "border-magenta"
            : isLight
              ? "border-navy-300/50 focus-within:border-cyan"
              : "border-white/20 focus-within:border-cyan-bright",
        )}
      >
        <input
          id="footer-newsletter"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") {
              setStatus("idle");
              setMessage("");
            }
          }}
          placeholder="Your email address"
          aria-invalid={invalid}
          aria-describedby="footer-newsletter-status"
          className={cn(
            "min-w-0 flex-1 bg-transparent text-sm focus:outline-none",
            isLight
              ? "text-navy-900 placeholder:text-navy/40"
              : "text-white placeholder:text-white/40",
          )}
        />
        <button
          type="submit"
          disabled={status === "pending"}
          aria-label="Subscribe to the newsletter"
          className={cn(
            "group grid size-9 shrink-0 place-items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
            isLight
              ? "border-navy-300/50 text-navy transition-colors hover:border-cyan hover:bg-cyan hover:text-white focus-visible:ring-cyan/60"
              : "border-white/20 text-white transition-colors hover:border-cyan-bright hover:bg-cyan-bright hover:text-navy-900 focus-visible:ring-cyan-bright/60",
          )}
        >
          {status === "pending" ? (
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          ) : (
            <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5" />
          )}
        </button>
      </div>

      <p
        id="footer-newsletter-status"
        role="status"
        aria-live="polite"
        className={cn(
          "mt-2.5 min-h-[1.1rem] text-xs",
          invalid ? "text-magenta" : isLight ? "text-cyan" : "text-cyan-bright",
        )}
      >
        {message}
      </p>
    </form>
  );
}