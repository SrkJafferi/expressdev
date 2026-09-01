import Link from "next/link";
import { site } from "@/data/site";
import { whatsappUrl, type QuoteContext } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight, WhatsAppIcon } from "./Icons";

/** Primary conversion CTA — routes to the quote path. */
export function QuoteButton({
  className,
  label = "Get a Quote",
  variant = "primary",
}: {
  className?: string;
  label?: string;
  variant?: "primary" | "outline" | "invert" | "cyan";
}) {
  return (
    <Link
      href="/#quote"
      className={cn(
        "btn group",
        variant === "primary" && "btn-primary",
        variant === "outline" && "btn-outline",
        variant === "invert" && "btn-ghost-invert",
        variant === "cyan" &&
          "border-[#01afef] bg-[#01afef] text-white shadow-[0_4px_20px_-4px_rgba(1,175,239,0.5)] hover:border-[#0099da] hover:bg-[#0099da] hover:shadow-[0_6px_24px_-4px_rgba(1,175,239,0.7)]",
        className,
      )}
    >
      {label}
      <ArrowRight className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
    </Link>
  );
}

/** WhatsApp CTA with an optional service-aware pre-filled message. */
export function WhatsAppButton({
  className,
  label = "WhatsApp Quote",
  context,
  variant = "whatsapp",
}: {
  className?: string;
  label?: string;
  context?: QuoteContext;
  variant?: "whatsapp" | "outline" | "invert";
}) {
  return (
    <a
      href={whatsappUrl(context)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "btn",
        variant === "whatsapp" && "btn-whatsapp",
        variant === "outline" && "btn-outline",
        variant === "invert" && "btn-ghost-invert",
        className,
      )}
    >
      <WhatsAppIcon />
      {label}
    </a>
  );
}

/** Secondary commerce pathway. Deliberately quiet in the hierarchy. */
export function ShopLink({
  className,
  label = "Shop Online",
  emphasis = "quiet",
}: {
  className?: string;
  label?: string;
  emphasis?: "quiet" | "button";
}) {
  if (emphasis === "button") {
    return (
      <a
        href={site.shopUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("btn btn-outline", className)}
      >
        {label}
        <ArrowUpRight />
      </a>
    );
  }

  return (
    <a
      href={site.shopUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("link-quiet label", className)}
    >
      {label}
      <ArrowUpRight />
    </a>
  );
}
