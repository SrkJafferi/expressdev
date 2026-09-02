/**
 * Line-icon set for the brand collateral page — consistent 1.5px stroke
 * language across process, proof and use-case sections.
 */

export function BcIcon({
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
    case "brief":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
        </svg>
      );
    case "prepare":
      return (
        <svg {...common}>
          <rect x="4.5" y="3" width="15" height="18" rx="1.5" />
          <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" />
          <path d="m15 15 1.5 1.5L19 14" />
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
    case "check":
      return (
        <svg {...common}>
          <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
          <path d="m8.5 12 2.5 2.5 4.5-4.5" />
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
    case "finishing":
      return (
        <svg {...common}>
          <path d="M5 4h11a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H5z" />
          <path d="M5 4v13h11" />
          <circle cx="16" cy="7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "sales":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V8l7-5 7 5v13" />
          <path d="M9.5 21v-6h5v6" />
          <path d="M9 11h2M13 11h2" />
        </svg>
      );
    case "communication":
      return (
        <svg {...common}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M8 9h8M8 13h5" />
        </svg>
      );
    case "retailTag":
      return (
        <svg {...common}>
          <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" />
          <circle cx="7.5" cy="7.5" r="1.5" />
        </svg>
      );
    case "event":
      return (
        <svg {...common}>
          <path d="M3 11 12 3l9 8" />
          <path d="M5 9v12h14V9" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    case "employee":
      return (
        <svg {...common}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        </svg>
      );
    case "executive":
      return (
        <svg {...common}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M2 12h20" />
          <path d="M12 11v2" />
        </svg>
      );
    default:
      return null;
  }
}
