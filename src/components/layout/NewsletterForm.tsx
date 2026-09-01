"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "error" | "pending";

/**
 * Footer newsletter capture.
 *
 * No newsletter provider is configured in the project yet, so this component
 * intentionally does NOT fake a subscription. It validates the address, then
 * shows a neutral "integration coming soon" notice. When a real endpoint is
 * added, replace the body of `handleSubmit` with the network call.
 */
export function NewsletterForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const isLight = variant === "light";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    // No backend/provider connected yet — do not fake success.
    setStatus("pending");
    setMessage("Newsletter integration coming soon — thanks for your interest.");
  }

  const invalid = status === "error";

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6">
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
          aria-label="Subscribe to the newsletter"
          className={cn(
            "group grid size-9 shrink-0 place-items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2",
            isLight
              ? "border-navy-300/50 text-navy transition-colors hover:border-cyan hover:bg-cyan hover:text-white focus-visible:ring-cyan/60"
              : "border-white/20 text-white transition-colors hover:border-cyan-bright hover:bg-cyan-bright hover:text-navy-900 focus-visible:ring-cyan-bright/60",
          )}
        >
          <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5" />
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
