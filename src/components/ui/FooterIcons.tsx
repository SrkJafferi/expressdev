import { cn } from "@/lib/cn";

/**
 * Footer line-icon set — matches the existing hand-drawn icon language
 * (24px viewBox, 1.5 stroke, currentColor). One consistent stroke weight
 * across every icon; decorative, hidden from assistive tech.
 */
type IconProps = { className?: string };

function Svg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4", className)}
    >
      {children}
    </svg>
  );
}

/* ---- Navigate ---- */
export function HomeIcon(p: IconProps) {
  return <Svg {...p}><path d="M4 10.5 12 4l8 6.5M6 9.5V20h12V9.5" /></Svg>;
}
export function AboutIcon(p: IconProps) {
  return <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 7.6h.01" /></Svg>;
}
export function GridIcon(p: IconProps) {
  return <Svg {...p}><rect x="4" y="4" width="7" height="7" /><rect x="13" y="4" width="7" height="7" /><rect x="4" y="13" width="7" height="7" /><rect x="13" y="13" width="7" height="7" /></Svg>;
}
export function ImageIcon(p: IconProps) {
  return <Svg {...p}><rect x="3.5" y="4.5" width="17" height="15" /><circle cx="9" cy="9.5" r="1.5" /><path d="m4.5 17 4.5-4.5 4 3.5 3-2.5 4 3.5" /></Svg>;
}
export function ContactIcon(p: IconProps) {
  return <Svg {...p}><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></Svg>;
}

/* ---- Services ---- */
export function PrinterIcon(p: IconProps) {
  return <Svg {...p}><path d="M7 9V4h10v5M7 18H5.5a1.5 1.5 0 0 1-1.5-1.5V11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5.5A1.5 1.5 0 0 1 18.5 18H17" /><rect x="7" y="15" width="10" height="5" /></Svg>;
}
export function SignpostIcon(p: IconProps) {
  return <Svg {...p}><path d="M12 3v18" /><path d="M12 6h6l2.5 2.5L18 11H12" /><path d="M12 13H6l-2.5 2.5L6 18h6" /></Svg>;
}
export function ScanLineIcon(p: IconProps) {
  return <Svg {...p}><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M4 12h16" /></Svg>;
}
export function GiftIcon(p: IconProps) {
  return <Svg {...p}><path d="M4 11.5h16V20H4zM4 8h16v3.5H4zM12 8v12" /><path d="M12 8S10.5 4 8.5 4a2 2 0 0 0 0 4zM12 8s1.5-4 3.5-4a2 2 0 0 1 0 4z" /></Svg>;
}
export function LayersIcon(p: IconProps) {
  return <Svg {...p}><path d="m12 3 8 4.5-8 4.5-8-4.5zM4 12l8 4.5 8-4.5M4 16.5 12 21l8-4.5" /></Svg>;
}
export function StoreIcon(p: IconProps) {
  return <Svg {...p}><path d="M4 9.5 5 4h14l1 5.5M4.5 9.5a2.2 2.2 0 0 0 4.5 0 2.2 2.2 0 0 0 4.5 0 2.2 2.2 0 0 0 4.5 0M5.5 11v9h13v-9" /><path d="M9.5 20v-4.5h5V20" /></Svg>;
}
export function CrosshairIcon(p: IconProps) {
  return <Svg {...p}><circle cx="12" cy="12" r="7.5" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></Svg>;
}
export function PenToolIcon(p: IconProps) {
  return <Svg {...p}><path d="m12 3 6.5 3.5 1.5 7-7 7-7-7 1.5-7z" /><circle cx="12" cy="10.5" r="2.2" /><path d="m12 12.7 0 8.3" /></Svg>;
}
export function MonitorIcon(p: IconProps) {
  return <Svg {...p}><rect x="3.5" y="4.5" width="17" height="11.5" /><path d="M9 20h6M12 16v4" /></Svg>;
}

/* ---- Social ---- */
export function InstagramIcon(p: IconProps) {
  return <Svg {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></Svg>;
}
export function FacebookIcon(p: IconProps) {
  return <Svg {...p}><path d="M14.5 8.5H16V5.5h-2.2C11.7 5.5 11 6.9 11 8.6v1.9H9v3h2V21h3v-6.5h2.2l.3-3H14v-1.4c0-.9.2-1.6 1-1.6z" /></Svg>;
}
export function LinkedInIcon(p: IconProps) {
  return <Svg {...p}><rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M8 10.5V17M8 7.6v.01M12 17v-3.6c0-1.3.8-2.4 2.2-2.4S16 12 16 13.4V17" /></Svg>;
}
export function YouTubeIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <polygon points="10 9 15 12 10 15 10 9" fill="currentColor" stroke="none" />
    </Svg>
  );
}
export function PinterestIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <line x1="8.5" y1="11.5" x2="10.5" y2="21" />
      <path d="M9 13.5c1-1 3-1.5 4.5-1.5 3 0 5-1.8 5-4.5 0-3-2.5-5-6-5-4 0-7 2.8-7 6.8 0 2.2 1.2 3.8 2.5 3.8.4 0 .7-.3.8-.8.1-.3.2-.8.1-1.1" />
    </Svg>
  );
}
export function TikTokIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 4.5" />
    </Svg>
  );
}

