import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

const applications = [
  {
    label: "STOREFRONTS",
    body: "Exterior identity, dimensional lettering and branded shopfront visibility.",
    image:
      "https://images.unsplash.com/photo-1659993447069-e00b561168d4?auto=format&fit=crop&w=800&q=85",
    alt: "Dimensional storefront lettering",
  },
  {
    label: "OFFICES",
    body: "Reception branding, room identification and directional signage.",
    image:
      "https://images.unsplash.com/photo-1695624825454-7ace45436e27?w=600&auto=format&fit=crop&q=85",
    alt: "Indoor office signage and wayfinding",
  },
  {
    label: "RETAIL",
    body: "Product zones, promotional signs and interior brand communication.",
    image:
      "https://images.unsplash.com/photo-1622465911368-72162f8da3e2?w=600&auto=format&fit=crop&q=85",
    alt: "Acrylic signage in a retail interior",
  },
  {
    label: "HOSPITALITY",
    body: "Elegant identification, directional and branded environmental signage.",
    image:
      "https://images.unsplash.com/photo-1704275542846-62b8604b0d1e?w=600&auto=format&fit=crop&q=85",
    alt: "Elegant hospitality signage",
  },
  {
    label: "EVENTS",
    body: "Portable and temporary sign and display applications for activations.",
    image:
      "https://images.unsplash.com/photo-1626253274763-bdabe2f097c5?w=600&auto=format&fit=crop&q=85",
    alt: "Portable pop-up signage at an event",
  },
  {
    label: "COMMERCIAL SPACES",
    body: "Exterior and interior signage for business premises.",
    image:
      "https://images.unsplash.com/photo-1595234675740-abacff11cc4c?w=600&auto=format&fit=crop&q=85",
    alt: "Commercial premises signage",
  },
];

export function SgApplications() {
  return (
    <section className="relative isolate overflow-hidden bg-[#edf1f5] py-24 lg:py-32">
      {/* Ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,153,218,0.06)_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,39,144,0.05)_0%,transparent_70%)]" />

      <div className="shell relative z-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-7">
            <SectionLabel accent="navy">Where signage lives</SectionLabel>
            <h2 className="display-md mt-6 overflow-visible pt-[0.06em] pb-[0.14em] pl-[0.03em] text-navy-900">
              Designed For The Places
              <br />
              Your Customers{" "}
              <span className="whitespace-nowrap text-gradient-deep">
                Actually See.
              </span>
            </h2>
          </Reveal>
        </div>
      </div>

      {/* Editorial visual cards — swipeable on mobile, grid on desktop */}
      <div className="relative z-10 mt-14 lg:mt-16">
        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-6 lg:snap-none lg:overflow-visible lg:px-0 xl:grid-cols-6">
          {applications.map((app, i) => (
            <Reveal
              key={app.label}
              from="up"
              delay={i * 0.07}
              className="w-[240px] shrink-0 snap-center lg:w-auto"
            >
              <article className="group relative h-[300px] overflow-hidden rounded-2xl border border-white/60 shadow-[0_18px_45px_-18px_rgba(16,48,90,0.4)]">
                <Image
                  src={app.image}
                  alt={app.alt}
                  fill
                  sizes="(max-width: 640px) 80vw, 16vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="label-wide text-cyan-bright">{app.label}</p>
                  <p className="mt-2 text-[0.75rem] leading-snug text-white/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {app.body}
                  </p>
                </div>

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
              Swipe to explore applications
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
