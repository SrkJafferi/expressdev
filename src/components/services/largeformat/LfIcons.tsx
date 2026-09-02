/**
 * Line-icon set for the large-format printing page — one consistent
 * 1.5px stroke language across solutions, materials, process and proof.
 */

const base = "none";
const sw = 1.5;

export function LfIcon({
  name,
  className = "size-6",
}: {
  name: string;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: base,
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "flag":
      return (
        <svg {...common}>
          <path d="M5 21V3" />
          <path d="M5 4h13l-2.5 4L18 12H5" />
        </svg>
      );
    case "poster":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="1.5" />
          <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4" />
        </svg>
      );
    case "rollup":
      return (
        <svg {...common}>
          <path d="M7 3h10v13H7z" />
          <path d="M12 16v5M9.5 21h5" />
          <path d="M9.5 7h5M9.5 10h3" />
        </svg>
      );
    case "vinyl":
      return (
        <svg {...common}>
          <path d="M4 16c3-6 6-9 8-9s5 3 8 9" />
          <path d="M4 16c2-2 4-3 8-3s6 1 8 3" />
          <path d="M3 20h18" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4 21V5l8-2v18" />
          <path d="M12 8l8 2v11" />
          <path d="M2 21h20" />
          <path d="M7 8h2M7 12h2M7 16h2M15.5 13h1.5M15.5 17h1.5" />
        </svg>
      );
    case "window":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <path d="M12 3v18M4 12h16" />
        </svg>
      );
    case "vision":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="1.5" />
          <circle cx="8.5" cy="7.5" r="0.9" />
          <circle cx="15.5" cy="7.5" r="0.9" />
          <circle cx="8.5" cy="12" r="0.9" />
          <circle cx="15.5" cy="12" r="0.9" />
          <circle cx="8.5" cy="16.5" r="0.9" />
          <circle cx="15.5" cy="16.5" r="0.9" />
        </svg>
      );
    case "floor":
      return (
        <svg {...common}>
          <path d="M3 15l9-5 9 5-9 5z" />
          <path d="M3 15v3l9 5 9-5v-3" />
          <path d="M12 10V3M9.5 5.5 12 3l2.5 2.5" />
        </svg>
      );
    case "vehicle":
      return (
        <svg {...common}>
          <path d="M3 16V8h11v8" />
          <path d="M14 11h4l3 3v2h-2.5" />
          <circle cx="7.5" cy="17.5" r="1.75" />
          <circle cx="16.5" cy="17.5" r="1.75" />
          <path d="M9.5 17.5h5M3 16h3.75" />
        </svg>
      );
    case "board":
      return (
        <svg {...common}>
          <rect x="3.5" y="4" width="17" height="12" rx="1.5" />
          <path d="M12 16v4M8.5 20h7" />
          <path d="M7 8.5h10M7 12h6" />
        </svg>
      );
    case "roll":
      return (
        <svg {...common}>
          <path d="M5 4h11a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H5z" />
          <path d="M5 4v13h11" />
          <circle cx="16" cy="7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5z" />
          <path d="m3 13 9 5 9-5" />
        </svg>
      );
    case "ruler":
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="8" rx="1.5" />
          <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <rect x="4.5" y="3" width="15" height="18" rx="1.5" />
          <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" />
        </svg>
      );
    case "printer":
      return (
        <svg {...common}>
          <path d="M7 8V3h10v5" />
          <rect x="4" y="8" width="16" height="9" rx="2" />
          <path d="M7 14v7h10v-7" />
          <circle cx="17" cy="11" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );
    case "scissors":
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.25" />
          <circle cx="6" cy="18" r="2.25" />
          <path d="M7.75 7.5 20 19M7.75 16.5 20 5" />
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
    case "tools":
      return (
        <svg {...common}>
          <path d="M14.5 6.5a4 4 0 0 0-5.6 4.9L3 17.3V21h3.7l5.9-5.9a4 4 0 0 0 4.9-5.6l-2.9 2.9-2.1-2.1z" />
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
