/**
 * Line-icon set for the IT services page — technical 1.5px stroke language
 * across workflow, catalogue, infrastructure and proof sections.
 */

export function ItIcon({
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
    case "assess":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8M8 11h5" />
          <path d="m8 15.5 1.5 1.5 3-3" />
        </svg>
      );
    case "plan":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 9v12" />
          <path d="M13 13l2 2 3.5-3.5" />
        </svg>
      );
    case "implement":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.2 2.2M16.9 16.9l2.2 2.2M19.1 4.9l-2.2 2.2M7.1 16.9l-2.2 2.2" />
        </svg>
      );
    case "support":
      return (
        <svg {...common}>
          <path d="M4 13a8 8 0 0 1 16 0" />
          <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
          <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
          <path d="M20 19a3 3 0 0 1-3 3h-3" />
        </svg>
      );
    case "web":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z" />
        </svg>
      );
    case "app":
      return (
        <svg {...common}>
          <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
          <path d="M10.5 18.5h3" />
          <path d="M9.5 6.5h5" opacity="0.5" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common}>
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="17" cy="20" r="1.5" />
          <path d="M3 4h2l2.5 11h10L20 8H6.2" />
        </svg>
      );
    case "domain":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M7 5.5c3 2 7 2 10 0M5 15c3.5-1.5 10.5-1.5 14 0" opacity="0.7" />
          <path d="m9 15 1.5 1.5L15 12" />
        </svg>
      );
    case "server":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="7" rx="1.5" />
          <rect x="3" y="13" width="18" height="7" rx="1.5" />
          <path d="M7 7.5h.01M7 16.5h.01" />
          <path d="M11 7.5h6M11 16.5h6" opacity="0.5" />
        </svg>
      );
    case "stack":
      return (
        <svg {...common}>
          <path d="m12 2 9 5-9 5-9-5z" />
          <path d="m3 12 9 5 9-5" opacity="0.6" />
          <path d="m3 17 9 5 9-5" opacity="0.35" />
        </svg>
      );
    case "rack":
      return (
        <svg {...common}>
          <rect x="5" y="2.5" width="14" height="19" rx="1.5" />
          <path d="M8 6.5h8M8 10h8M8 13.5h8M8 17h8" opacity="0.6" />
          <circle cx="16.75" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          <circle cx="16.75" cy="10" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M6 17v-5M11 17V8M16 17v-7M21 17V5" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...common}>
          <path d="m3 11 15-6v13L3 12z" />
          <path d="M18 8a5 5 0 0 1 0 9" opacity="0.5" />
          <path d="M7 14v5h3v-4" />
        </svg>
      );
    case "message":
      return (
        <svg {...common}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      );
    case "headset":
      return (
        <svg {...common}>
          <path d="M4 13a8 8 0 0 1 16 0" />
          <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
          <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
          <path d="M20 19a3 3 0 0 1-3 3h-3" />
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
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5z" />
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
