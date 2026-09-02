/**
 * Line-icon set for the retail / events / exhibition page — consistent
 * 1.5px stroke language across process, catalogue and proof sections.
 */

export function ReIcon({
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
    case "plan":
      return (
        <svg {...common}>
          <path d="M3 21 21 3" />
          <path d="M15 3h6v6" />
          <rect x="3" y="15" width="6" height="6" rx="1" />
        </svg>
      );
    case "design":
      return (
        <svg {...common}>
          <path d="m15.5 2.5 6 6L9 21H3v-6z" />
          <path d="m14 4 6 6" />
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
    case "install":
      return (
        <svg {...common}>
          <path d="M12 15v6" />
          <path d="M8 21h8" />
          <path d="M5 15V9a7 7 0 0 1 14 0v6" />
          <path d="M3 15h18" />
        </svg>
      );
    case "mediawall":
      return (
        <svg {...common}>
          <path d="M4 4h16v12H4z" />
          <circle cx="8" cy="8" r="1.2" />
          <circle cx="12" cy="8" r="1.2" />
          <circle cx="16" cy="8" r="1.2" />
          <circle cx="8" cy="12" r="1.2" />
          <circle cx="12" cy="12" r="1.2" />
          <circle cx="16" cy="12" r="1.2" />
          <path d="M12 16v4M8.5 20h7" />
        </svg>
      );
    case "flag":
      return (
        <svg {...common}>
          <path d="M6 21V3" />
          <path d="M6 4h11v8H6" />
          <path d="M6 12h8" opacity="0.5" />
          <path d="M3.5 21h5" />
        </svg>
      );
    case "acrylic":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M4 9h16" opacity="0.5" />
          <path d="M8 5v14" opacity="0.5" />
        </svg>
      );
    case "neon":
      return (
        <svg {...common}>
          <path d="M5 20c0-6 2-11 7-11s7 5 7 11" />
          <path d="M5 20h14" />
          <path d="M9 12c1.5-2 4.5-2 6 0" opacity="0.6" />
        </svg>
      );
    case "colour":
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="6" />
          <path d="M13.5 5.5a6 6 0 1 1-8 8" />
          <circle cx="15" cy="15" r="5" />
        </svg>
      );
    case "workflow":
      return (
        <svg {...common}>
          <circle cx="5" cy="6" r="2.5" />
          <rect x="16" y="3.5" width="5" height="5" rx="1" />
          <rect x="16" y="15.5" width="5" height="5" rx="1" />
          <circle cx="5" cy="18" r="2.5" />
          <path d="M7.5 6h8.5M7.5 18h8.5M5 8.5v7" />
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
    case "pin":
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    default:
      return null;
  }
}
