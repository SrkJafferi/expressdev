import { media, type Media } from "./images";

/**
 * SELECTED WORK — structural placeholders.
 *
 * These entries describe capability categories, NOT named client projects.
 * Imagery is royalty-free reference standing in for real Express Advertising
 * installations. Replace `image`, `title` and `meta` with documented project
 * photography and, where the client has approved it, the client name.
 */
export type WorkItem = {
  id: string;
  title: string;
  meta: string;
  scope: string;
  image: Media;
  feature?: boolean;
};

export const selectedWork: WorkItem[] = [
  {
    id: "storefront",
    title: "Retail Storefront Identity",
    meta: "Signage · Ajman",
    scope: "Built-up illuminated letters, window graphics, interior wayfinding",
    image: media.signage,
    feature: true,
  },
  {
    id: "fleet",
    title: "Fleet Vehicle Branding",
    meta: "Large Format · UAE",
    scope: "Cast vinyl wrap, contour-cut decals, multi-unit rollout",
    image: media.vehicle,
  },
  {
    id: "exhibition",
    title: "Exhibition Stand Build",
    meta: "Event Production · Dubai",
    scope: "Printed panels, backdrop, display furniture, install & de-rig",
    image: media.retail,
  },
  {
    id: "collateral",
    title: "Corporate Stationery Suite",
    meta: "Brand Collateral",
    scope: "Cards, letterheads, folders, envelopes — single colour standard",
    image: media.collateral,
  },
  {
    id: "facade",
    title: "Facade Banner Programme",
    meta: "Large Format · Installation",
    scope: "Tensioned flex banners, site survey, rigging",
    image: media.banner,
  },
  {
    id: "merch",
    title: "Corporate Gifting Programme",
    meta: "Promotional Items",
    scope: "Drinkware, notebooks, apparel — decorated and kitted",
    image: media.promotional,
  },
];

/**
 * TESTIMONIALS / GOOGLE REVIEWS.
 *
 * Deliberately empty. No verified review text, reviewer names or ratings were
 * available from the Express Advertising website during this build, and nothing
 * has been invented. Populate from the Google Business Profile
 * (see `site.mapsUrl`) — the section renders the reviews UI as soon as this
 * array has entries, and renders a review invitation panel while it is empty.
 */
export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /** ISO date of the review. */
  date: string;
  source: "google";
};

export const reviews: Review[] = [];
