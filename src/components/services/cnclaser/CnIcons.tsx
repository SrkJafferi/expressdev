/**
 * Line-icon set for the CNC & laser cutting page — technical 1.5px stroke
 * language across process, materials, applications and proof sections.
 */

export function CnIcon({
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
    case "prepare":
      return (
        <svg {...common}>
          <path d="M4 4h4M4 4v4" />
          <path d="m20 20-9-9" />
          <path d="M13 4.5a6.5 6.5 0 0 1 6.5 6.5" opacity="0.6" />
          <circle cx="9.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
          <path d="M20 20h-4M20 20v-4" />
        </svg>
      );
    case "material":
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5z" />
          <path d="m3 13 9 5 9-5" opacity="0.6" />
        </svg>
      );
    case "cnc":
      return (
        <svg {...common}>
          <path d="M4 20V6l4-4v18" />
          <path d="M8 8h12M8 12h9M8 16h7" />
          <circle cx="17" cy="16" r="2" />
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
    case "finish":
      return (
        <svg {...common}>
          <path d="M21 8 12 3 3 8v8l9 5 9-5z" />
          <path d="m8.5 12 2.5 2.5 4.5-4.5" />
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
    case "foam":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M4 10h16M4 15h16" opacity="0.5" />
          <path d="M12 4v16" opacity="0.5" />
        </svg>
      );
    case "wood":
      return (
        <svg {...common}>
          <path d="M3 16c2-3 4-4 6-4 3 0 4 2 6 2 3 0 4-2 6-4" />
          <path d="M3 20c2-3 4-4 6-4 3 0 4 2 6 2 3 0 4-2 6-4" opacity="0.5" />
          <circle cx="8" cy="7" r="2" />
          <circle cx="16" cy="7" r="2" opacity="0.5" />
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
    case "panel":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="1.5" />
          <path d="M9 4v16M15 4v16" opacity="0.5" />
          <path d="M3 10h18" opacity="0.5" />
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
    case "display":
      return (
        <svg {...common}>
          <path d="M4 4h16v12H4z" />
          <path d="M12 16v4M8.5 20h7" />
          <path d="M7 8h6M7 11h4" opacity="0.6" />
        </svg>
      );
    case "exhibition":
      return (
        <svg {...common}>
          <path d="M3 11 12 3l9 8" />
          <path d="M5 9v12h14V9" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    case "office":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M12 3v18" opacity="0.5" />
          <path d="M7.5 7h2M14.5 7h2M7.5 11h2M14.5 11h2" />
        </svg>
      );
    case "prototype":
      return (
        <svg {...common}>
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      );
    case "repeat":
      return (
        <svg {...common}>
          <path d="m17 2 4 4-4 4" />
          <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
          <path d="m7 22-4-4 4-4" />
          <path d="M21 13v1a4 4 0 0 1-4 4H3" />
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
