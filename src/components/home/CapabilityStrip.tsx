import { Reveal } from "@/components/motion/Reveal";

/* ---- Dedicated Vector Icons for Capabilities ---- */
function PremiumProductionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
      <path d="M2 9h20M12 21L7.5 9 12 3l4.5 6L12 21z" />
    </svg>
  );
}

function CustomSolutionsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M6.5 14v7M3 17.5h7" />
    </svg>
  );
}

function CreativeExpertiseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.4 4.7 3.5 5.8V17a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-2.2c2.1-1.1 3.5-3.3 3.5-5.8a7 7 0 0 0-7-7z" />
      <path d="M9 9h6M12 6v6" />
    </svg>
  );
}

function UaeServiceIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function QualityFinishingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="9" r="6" />
      <path d="m9 9 2 2 4-4" />
      <path d="M8.2 14.5 6 22l6-3 6 3-2.2-7.5" />
    </svg>
  );
}

function EndToEndExecutionIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

const capabilityList = [
  { title: "Premium Production", icon: PremiumProductionIcon },
  { title: "Custom Solutions", icon: CustomSolutionsIcon },
  { title: "Creative Expertise", icon: CreativeExpertiseIcon },
  { title: "#1 UAE Printing Service", icon: UaeServiceIcon },
  { title: "Quality Finishing", icon: QualityFinishingIcon },
  { title: "End-to-End Execution", icon: EndToEndExecutionIcon },
];

/**
 * Compact credibility band — qualities with relevant iconography.
 */
export function CapabilityStrip() {
  return (
    <section className="border-b border-rule bg-paper" aria-label="Capabilities">
      <div className="shell">
        <ul className="grid grid-cols-2 divide-rule sm:grid-cols-3 lg:grid-cols-6 lg:divide-x">
          {capabilityList.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal
                as="li"
                key={item.title}
                from="up"
                delay={i * 0.05}
                className="group flex items-center gap-3.5 border-b border-rule px-2 py-5 lg:border-b-0 lg:px-4 lg:py-6"
              >
                <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-rule bg-white text-navy-900 shadow-2xs transition-all duration-300 group-hover:scale-105 group-hover:border-cyan group-hover:bg-cyan group-hover:text-white group-hover:shadow-sm">
                  <Icon className="size-4.5" />
                </div>
                <span className="text-[0.8125rem] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-navy-900">
                  {item.title}
                </span>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

