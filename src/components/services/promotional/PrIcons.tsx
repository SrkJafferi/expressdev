/**
 * Line-icon set for the promotional items page — consistent 1.5px
 * stroke language across proof points, process, methods and proof.
 */

export function PrIcon({
  name,
  className = "size-6",
}: {
  name: string;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "range":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="m14 17.5 2.5 2.5 4.5-4.5" />
        </svg>
      );
    case "branding":
      return (
        <svg {...common}>
          <path d="m15.5 2.5 6 6L9 21H3v-6z" />
          <path d="m14 4 6 6" />
        </svg>
      );
    case "presentation":
      return (
        <svg {...common}>
          <path d="M12 3 2 8l10 5 10-5z" />
          <path d="M6 10.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-6.5" />
        </svg>
      );
    case "campaign":
      return (
        <svg {...common}>
          <path d="M3 11v3" />
          <path d="m3 11 15-6v13L3 14z" />
          <path d="M18 8a5 5 0 0 1 0 9" opacity="0.5" />
          <path d="M7 14v5h3v-4" />
        </svg>
      );
    case "select":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="m7.5 12 3 3 6-6" />
        </svg>
      );
    case "produce":
      return (
        <svg {...common}>
          <path d="M7 8V3h10v5" />
          <rect x="4" y="8" width="16" height="9" rx="2" />
          <path d="M7 14v7h10v-7" />
          <circle cx="17" cy="11" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "pack":
      return (
        <svg {...common}>
          <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
          <path d="m3 8 9 5 9-5" />
          <path d="M12 13v8" />
        </svg>
      );
    case "padprint":
      return (
        <svg {...common}>
          <path d="M6 15c0-4 2.5-7 6-7s6 3 6 7" />
          <rect x="3" y="15" width="18" height="5" rx="1" />
          <circle cx="12" cy="6" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "screenprint":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="10" rx="1" />
          <path d="m4 17 16-2" />
          <path d="M12 3v10" opacity="0.5" />
          <path d="M4 13h16" opacity="0.5" />
        </svg>
      );
    case "embroidery":
      return (
        <svg {...common}>
          <path d="M6 3c3 4-3 8 0 12 2 3 6 2 6 6" />
          <path d="M12 3c3 4-3 8 0 12 2 3 6 2 6 6" />
          <circle cx="18" cy="3" r="1.2" />
        </svg>
      );
    case "laser":
      return (
        <svg {...common}>
          <path d="M4 4h4M4 4v4" />
          <path d="m20 20-9-9" />
          <path d="m11 11 2 2" />
          <circle cx="9.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
          <path d="M20 20h-4M20 20v-4" />
        </svg>
      );
    case "sublimation":
      return (
        <svg {...common}>
          <path d="M12 3c3 4-2 6 1 9 2 2 5 1 5 4a6 6 0 0 1-12 0c0-3 2-4 3-6" />
          <path d="M14 6c1.5 1.5 4 1 4-2" opacity="0.5" />
        </svg>
      );
    case "uvprint":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <circle cx="9" cy="12" r="2.5" />
          <path d="M15 9.5h3M15 12h3M15 14.5h3" opacity="0.6" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5z" />
        </svg>
      );
    case "swatch":
      return (
        <svg {...common}>
          <path d="M11 3 3.5 15.5 8 21l8.5-14z" />
          <circle cx="7" cy="17.5" r="1" fill="currentColor" stroke="none" />
          <path d="m13 5 7 12" opacity="0.5" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M3 17 14 6l3 3L6 20z" />
          <path d="M14 6h4v4" opacity="0.6" />
          <path d="M17 3v4M21 7h-4" />
        </svg>
      );
    default:
      return null;
  }
}
