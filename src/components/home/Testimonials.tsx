import { reviews } from "@/data/work";
import { site } from "@/data/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { RegistrationMark } from "@/components/ui/PrintMarks";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          aria-hidden
          viewBox="0 0 20 20"
          className={i < rating ? "size-3.5 fill-yellow" : "size-3.5 fill-rule-strong"}
        >
          <path d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.8L10 14.9l-5.25 2.7 1-5.8L1.5 7.65l5.9-.85z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Google reviews.
 *
 * `reviews` in src/data/work.ts is intentionally empty — no verified review
 * content was available, and none has been fabricated. The moment real
 * reviews are added to that array, the card layout below renders instead of
 * the invitation panel.
 */
export function Testimonials() {
  const hasReviews = reviews.length > 0;

  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal from="up" className="lg:col-span-5">
            <SectionLabel accent="yellow">Client feedback</SectionLabel>
            <h2 className="display-lg mt-6 text-navy-900">
              Reviewed
              <br />
              <span className="text-ink">where it counts.</span>
            </h2>
          </Reveal>

          <Reveal from="up" delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:self-end">
            {hasReviews ? (
              <ul className="grid gap-px bg-rule sm:grid-cols-2">
                {reviews.map((r) => (
                  <li key={`${r.author}-${r.date}`} className="bg-surface p-7">
                    <Stars rating={r.rating} />
                    <blockquote className="lede mt-5 text-ink">
                      &ldquo;{r.quote}&rdquo;
                    </blockquote>
                    <footer className="label-wide mt-5 text-ink-3">
                      {r.author} · Google
                    </footer>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="relative border border-rule bg-surface p-8 lg:p-10">
                <RegistrationMark className="absolute right-6 top-6 text-rule-strong" />
                <p className="lede max-w-lg">
                  Our reviews live on our Google Business Profile, where they are
                  verified and cannot be edited by us. We would rather point you
                  there than reprint selected quotes here.
                </p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline mt-8 px-6"
                >
                  Read Google Reviews
                  <ArrowUpRight />
                </a>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
