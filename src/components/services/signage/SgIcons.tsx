/**
 * Line-icon set for the signage service page — one consistent 1.5px
 * stroke language across process, materials and proof sections.
 */

export function SgIcon({
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
    case "survey":
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
    case "fabricate":
      return (
        <svg {...common}>
          <path d="M14.5 6.5a4 4 0 0 0-5.6 4.9L3 17.3V21h3.7l5.9-5.9a4 4 0 0 0 4.9-5.6l-2.9 2.9-2.1-2.1z" />
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
    case "acrylic":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M4 9h16" opacity="0.5" />
          <path d="M8 5v14" opacity="0.5" />
        </svg>
      );
    case "metal":
      return (
        <svg {...common}>
          <path d="m12 2 8 5-8 5-8-5z" />
          <path d="m4 12 8 5 8-5" />
          <path d="m4 17 8 5 8-5" opacity="0.5" />
        </svg>
      );
    case "foam":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M4 10h16M4 15h16" opacity="0.5" />
          <path d="M12 4v16" opacity="0.5" />
        </svg>
      );
    case "illuminated":
      return (
        <svg {...common}>
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.5 10.9c.8.6 1.5 1.3 1.5 2.1h4c0-.8.7-1.5 1.5-2.1A6 6 0 0 0 12 3z" />
        </svg>
      );
    case "vinyl":
      return (
        <svg {...common}>
          <path d="M5 4h11a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H5z" />
          <path d="M5 4v13h11" />
          <circle cx="16" cy="7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "storefront":
      return (
        <svg {...common}>
          <path d="M4 9 5.5 4h13L20 9" />
          <path d="M4 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
          <path d="M5 11v9h14v-9" />
          <path d="M9.5 20v-5h5v5" />
        </svg>
      );
    case "office":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M12 3v18" opacity="0.5" />
          <path d="M7.5 7h2M14.5 7h2M7.5 11h2M14.5 11h2M7.5 15h2" />
        </svg>
      );
    case "retail":
      return (
        <svg {...common}>
          <path d="M4 7 6 3h12l2 4" />
          <path d="M4 7a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
          <path d="M5 11v10h14V11" />
          <rect x="9" y="14" width="6" height="7" />
        </svg>
      );
    case "hospitality":
      return (
        <svg {...common}>
          <path d="M8 21V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17" />
          <path d="M4 21h16" />
          <path d="M6 10h-2a2 2 0 0 0 2 4h2M18 10h2a2 2 0 0 1-2 4h-2" />
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
    case "commercial":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V8l7-5 7 5v13" />
          <rect x="9.5" y="12" width="5" height="9" />
          <path d="M9 11h6" />
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
    case "letters3d":
      return (
        <svg {...common}>
          <path d="M5 20V5h6a4 4 0 0 1 2.5 7.1L17 20" />
          <path d="M5 12h8" />
          <path d="m19 20 2-2-2-2-2 2z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "sign2d":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="12" rx="1.5" />
          <path d="M7 9.5h10M7 13h6" />
          <path d="M12 17v4M8.5 21h7" />
        </svg>
      );
    case "aboard":
      return (
        <svg {...common}>
          <path d="M12 4 4 20h16z" />
          <path d="M9.5 12h5M10 15.5h4" />
        </svg>
      );
    case "flagstand":
      return (
        <svg {...common}>
          <path d="M8 21V3" />
          <path d="M8 4h9v7H8z" />
          <path d="M5 21h6" />
        </svg>
      );
    case "flexface":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="M7 12h10" opacity="0.6" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "indoor":
      return (
        <svg {...common}>
          <rect x="6" y="3" width="12" height="18" rx="1" />
          <path d="M14.5 12.5a1.5 1.5 0 1 0 0 .01" />
          <path d="M9.5 12h3" />
        </svg>
      );
    case "popup":
      return (
        <svg {...common}>
          <path d="M5 4c3 2 11 2 14 0v12c-3-2-11-2-14 0z" />
          <path d="M5 4v16M19 4v16" />
        </svg>
      );
    case "table":
      return (
        <svg {...common}>
          <path d="M3 9h18v4H3z" />
          <path d="M5 13v8M19 13v8M9 13v3h6v-3" />
          <path d="M6 9V6h12v3" opacity="0.5" />
        </svg>
      );
    case "smd":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="12" rx="1.5" />
          <rect x="6" y="7" width="5" height="3" />
          <rect x="13" y="7" width="5" height="3" opacity="0.5" />
          <rect x="6" y="11" width="3" height="2" opacity="0.5" />
          <path d="M12 16v4M8.5 20h7" />
        </svg>
      );
    default:
      return null;
  }
}
