/**
 * Verified Google reviews for Express Advertising.
 *
 * SOURCE: extracted from the live Trustindex → Google widget currently
 * displayed on https://expressadvertising.ae/ (which mirrors the Google
 * Business Profile: https://maps.app.goo.gl/VxwNQiXKLSkMq9Qw8).
 *
 * Nothing here is fabricated: names, star ratings, review text and profile
 * photos are taken verbatim from that widget. Profile photos were copied from
 * the Google-hosted avatars into /public/images/reviews/ for reliability.
 * Dates are intentionally omitted — the widget rendered them client-side and
 * no verifiable per-review date was present in the source markup.
 */

export type Review = {
  name: string;
  rating: number;
  text: string;
  /** Local avatar path, or undefined to fall back to an initials monogram. */
  profileImage?: string;
  source: "Google";
};

/** Aggregate figures shown by the live widget header ("EXCELLENT", 5 stars). */
export const reviewSummary = {
  rating: 5.0,
  total: 74,
  source: "Google" as const,
  profileUrl: "https://maps.app.goo.gl/VxwNQiXKLSkMq9Qw8",
};

export const reviews: Review[] = [
  {
    name: "Jhankar Agarwal",
    rating: 5,
    text: "As an event company, printing is never “just printing” for us — it’s everything. And Express Advertising has been our absolute backbone for all end-to-end printing requirements.\n\nWhat I truly appreciate is their ownership. I give them a brief, and they execute it like it’s their own event. They go out of the way to ensure everything runs smoothly, even during last-minute chaos.\n\nReliable, proactive, and genuinely invested — couldn’t ask for a better printing partner.",
    profileImage: "/images/reviews/jhankar-agarwal.jpg",
    source: "Google",
  },
  {
    name: "Jawahar Mehta",
    rating: 5,
    text: "I would highly recommend them to anyone.. they are highly professional and Budget friendly too..\n\nFyi. I ordered a large format 6000 x 230cm banner and much more advertising material. The job was completed on time and the result was beyond my expectations.",
    profileImage: "/images/reviews/jawahar-mehta.jpg",
    source: "Google",
  },
  {
    name: "Syed Ovais",
    rating: 5,
    text: "It has been 15 years that I have been working with Safi Printing Services. They are highly professional, consistently delivering seamless, high quality work on time. I confidently recommend their services.",
    profileImage: "/images/reviews/syed-ovais.jpg",
    source: "Google",
  },
  {
    name: "Ahmed Sharief Ali",
    rating: 5,
    text: "the whole process of design smooth, printed and delivered high-quality, exactly as requested.\nLooking forward to design and print with you again!",
    profileImage: "/images/reviews/ahmed-sharief-ali.jpg",
    source: "Google",
  },
  {
    name: "H2Olaundrydrycleaning",
    rating: 5,
    text: "Have been dealing with them for the past 3 years, will recommend their service to any one. They fulfill their committed time, completely satisfied with they're service.",
    profileImage: "/images/reviews/h2o-laundry.jpg",
    source: "Google",
  },
  {
    name: "Prakash Muthusamy",
    rating: 5,
    text: "Excellent service. Nice peoples to interact",
    profileImage: "/images/reviews/prakash-muthusamy.jpg",
    source: "Google",
  },
  {
    name: "Mo Ha",
    rating: 5,
    text: "Fast and professional service. Highly recommend",
    profileImage: "/images/reviews/mo-ha.jpg",
    source: "Google",
  },
  {
    name: "Mohammed Tarek",
    rating: 5,
    text: "Great quality and quick service",
    profileImage: "/images/reviews/mohammed-tarek.jpg",
    source: "Google",
  },
];
