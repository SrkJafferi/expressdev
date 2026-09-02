/**
 * Line-icon set for the digital design page — creative-technical 1.5px
 * stroke language across process, system, campaign and proof sections.
 */

export function DdIcon({
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
    case "discover":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.5-4.5" />
          <circle cx="11" cy="11" r="3" opacity="0.5" />
        </svg>
      );
    case "define":
      return (
        <svg {...common}>
          <path d="M4 20 15 9" />
          <circle cx="17" cy="7" r="3" />
          <circle cx="4" cy="20" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "design":
      return (
        <svg {...common}>
          <path d="m15.5 2.5 6 6L9 21H3v-6z" />
          <path d="m14 4 6 6" />
        </svg>
      );
    case "refine":
      return (
        <svg {...common}>
          <path d="M12 3a9 9 0 1 0 9 9" />
          <path d="M17 3h4v4" />
          <path d="M21 3a9 9 0 0 1-2.6 6.4" opacity="0.5" />
        </svg>
      );
    case "logo":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" />
        </svg>
      );
    case "palette":
      return (
        <svg {...common}>
          <path d="M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-2a2 2 0 0 0-1.5 3.3c.3.4.5.7.5 1.2a1.5 1.5 0 0 1-1.5 1.5z" />
          <circle cx="7.5" cy="10.5" r="1" />
          <circle cx="12" cy="7.5" r="1" />
          <circle cx="16.5" cy="10.5" r="1" />
        </svg>
      );
    case "typography":
      return (
        <svg {...common}>
          <path d="M4 6V4h16v2" />
          <path d="M12 4v16" />
          <path d="M9 20h6" />
        </svg>
      );
    case "language":
      return (
        <svg {...common}>
          <path d="M3 17c2-5 4-9 5-9s3 4 5 9" />
          <path d="M4.5 13.5h7" />
          <path d="M17 3v18M14 3h6" opacity="0.5" />
        </svg>
      );
    case "layout":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 9v12" />
        </svg>
      );
    case "imagery":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8.5" cy="10" r="1.5" />
          <path d="m5 17 4.5-4.5 3 3L16 12l3 3" />
        </svg>
      );
    case "interface":
      return (
        <svg {...common}>
          <rect x="2.5" y="4" width="19" height="13" rx="2" />
          <path d="M2.5 8h19" />
          <path d="M6 6h.01" />
          <path d="M9 6h.01" />
          <path d="M8 21h8" />
        </svg>
      );
    case "hierarchy":
      return (
        <svg {...common}>
          <rect x="9" y="3" width="6" height="5" rx="1" />
          <rect x="3" y="16" width="6" height="5" rx="1" opacity="0.6" />
          <rect x="15" y="16" width="6" height="5" rx="1" opacity="0.6" />
          <path d="M12 8v4M12 12H6v4M12 12h6v4" />
        </svg>
      );
    case "social":
      return (
        <svg {...common}>
          <rect x="4" y="2.5" width="16" height="19" rx="3" />
          <circle cx="12" cy="10" r="3" />
          <path d="M7 19c1-2.5 2.8-4 5-4s4 1.5 5 4" />
        </svg>
      );
    case "story":
      return (
        <svg {...common}>
          <rect x="6" y="2.5" width="12" height="19" rx="3" />
          <path d="M12 17.5v.01" />
          <path d="M9 6h6" opacity="0.5" />
        </svg>
      );
    case "keyvisual":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="m7 14 3-3 2.5 2.5L15 11l2 2" />
          <circle cx="8" cy="9.5" r="1.2" />
        </svg>
      );
    case "banner":
      return (
        <svg {...common}>
          <rect x="2.5" y="7" width="19" height="10" rx="1.5" />
          <path d="M7 10.5h7M7 13.5h5" />
          <path d="m15.5 10.5 2 1.5-2 1.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "presentation":
      return (
        <svg {...common}>
          <path d="M3 4h18" />
          <rect x="4" y="4" width="16" height="12" rx="1.5" />
          <path d="M12 16v4M8.5 20h7" />
          <path d="M8 9h8M8 12h5" opacity="0.6" />
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
