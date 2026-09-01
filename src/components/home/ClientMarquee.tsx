import Image from "next/image";
import { clients } from "@/data/clients";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";

/**
 * UAE client logo carousel — two seamless, infinitely sliding marquee rows
 * moving in opposite directions.
 *
 * Each track duplicates its slice once so the -50% translate loop has no
 * visible jump; both pause on hover/focus and halt entirely under
 * prefers-reduced-motion. Logos keep their original brand colours, sit in
 * consistent boxes, and are never cropped or stretched (object-contain +
 * capped max-height, size normalised through padding).
 */
export function ClientMarquee() {
  if (clients.length === 0) return null;

  // Split into two rows for a richer composition, then duplicate each row
  // once for a seamless -50% translate loop.
  const mid = Math.ceil(clients.length / 2);
  const rowA = clients.slice(0, mid);
  const rowB = clients.slice(mid);

  const rows = [
    { items: [...rowA, ...rowA], reverse: false },
    { items: [...rowB, ...rowB], reverse: true },
  ];

  return (
    <section className="bg-paper-2 py-16 lg:py-20" aria-label="Our UAE clients">
      <div className="shell">
        <Reveal from="up" className="flex flex-col items-center text-center">
          <SectionLabel accent="cyan">Trusted across the UAE</SectionLabel>
          <h2 className="display-sm mt-4 max-w-xl text-ink">
            Brands that trust our production.
          </h2>
          <p className="body-sm mt-3 max-w-lg">
            From government institutions to established regional and global
            brands.
          </p>
        </Reveal>
      </div>

      {/* Edge-faded, full-bleed marquee rows */}
      <div className="mt-12 flex flex-col gap-5 lg:mt-14">
        {rows.map((row, r) => (
          <div
            key={r}
            className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
          >
            <ul
              className="marquee-track items-center gap-5"
              style={row.reverse ? { animationDirection: "reverse" } : undefined}
            >
              {row.items.map((c, i) => (
                <li
                  key={`${c.name}-${i}`}
                  aria-hidden={i >= row.items.length / 2}
                  className="group flex h-[88px] w-44 shrink-0 items-center justify-center rounded-sm border border-rule/70 bg-transparent px-6 py-4 sm:w-48"
                >
                  <Image
                    src={c.logo}
                    alt={c.name}
                    width={176}
                    height={88}
                    loading="lazy"
                    sizes="192px"
                    className="max-h-14 w-auto object-contain transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
