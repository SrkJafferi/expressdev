import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { DdIcon } from "./DdIcons";

const campaignCards = [
  {
    label: "SOCIAL POSTS",
    body: "Branded static and campaign graphics.",
    icon: "social",
    accent: "cyan",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Social media content on a smartphone screen",
  },
  {
    label: "STORIES / VERTICAL CREATIVE",
    body: "Mobile-first promotional and announcement formats.",
    icon: "story",
    accent: "magenta",
    image:
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Vertical stories format on a mobile device",
  },
  {
    label: "CAMPAIGN KEY VISUALS",
    body: "Core visual direction adapted across multiple placements.",
    icon: "keyvisual",
    accent: "navy",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Campaign key visual development on screen",
  },
  {
    label: "DIGITAL BANNERS",
    body: "Branded creative for websites, campaigns and digital platforms.",
    icon: "banner",
    accent: "yellow",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Digital banner creative on a display",
  },
  {
    label: "PRESENTATIONS",
    body: "Professional visual layouts for business and brand communication.",
    icon: "presentation",
    accent: "cyan",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=85",
    imageAlt: "Branded presentation layout on a screen",
  },
] as const;

const labelAccent: Record<string, string> = {
  cyan: "text-cyan-bright",
  magenta: "text-magenta",
  navy: "text-white",
  yellow: "text-yellow",
};

export function DdCampaign() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.06)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="cyan">Campaign creative</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible text-balance pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Stay Recognisable
              <br />
              Every Time You{" "}
              <span className="text-gradient-deep">Show Up.</span>
            </h2>
            <p className="lede mt-4 max-w-xl text-ink-2">
              Social media and digital campaigns move quickly, but the brand
              should still feel consistent from one post to the next.
            </p>
            <p className="lede mt-4 max-w-xl text-ink-2">
              We create campaign graphics designed around your existing
              identity so offers, launches, announcements and promotional
              content feel connected rather than random.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Campaign cards — swipeable on mobile, grid on desktop */}
      <div className="relative z-10 mt-14 lg:mt-16">
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:snap-none lg:overflow-visible lg:px-0">
          {campaignCards.map((card, i) => (
            <Reveal
              key={card.label}
              from="up"
              delay={i * 0.07}
              className="w-[250px] shrink-0 snap-center lg:w-auto"
            >
              <article className="group relative h-[320px] overflow-hidden rounded-2xl border border-white/60 shadow-[0_18px_45px_-18px_rgba(16,48,90,0.4)]">
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 640px) 80vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p
                    className={`label-wide ${labelAccent[card.accent] ?? "text-cyan-bright"}`}
                  >
                    {card.label}
                  </p>
                  <p className="mt-2 text-[0.75rem] leading-snug text-white/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {card.body}
                  </p>
                </div>

                {/* Icon chip */}
                <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-lg border border-white/25 bg-navy-900/60 text-white/85 backdrop-blur-sm">
                  <DdIcon name={card.icon} className="size-4.5" />
                </span>

                {/* Accent top bar on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-cyan transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
              </article>
            </Reveal>
          ))}
        </div>

        <div className="shell">
          <Reveal from="up" delay={0.2}>
            <p className="label-wide mt-6 text-ink-3 lg:hidden">
              Swipe to explore campaign formats
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
