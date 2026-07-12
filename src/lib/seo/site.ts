/**
 * Single source of truth for every absolute URL, price and identity string the
 * site emits to crawlers and answer engines.
 *
 * Structured data is only worth shipping if it agrees with the visible page and
 * with itself. Centralising the facts here is what keeps the Product schema, the
 * sitemap, the canonicals and llms.txt from drifting apart — a mismatch between
 * them is precisely what gets rich results revoked.
 */

export const SITE = {
  /**
   * The www host, not the apex — this is deliberate. The apex 308-redirects to
   * www in production, so canonicals and sitemap entries built on the apex would
   * every one of them point at a redirect rather than at the page actually
   * serving the content. If DNS ever flips to make the apex primary, change this
   * one line and the canonicals, sitemap, schema @ids and llms.txt all follow.
   */
  url: 'https://www.thelotusseat.com',
  name: 'The Lotus Seat',
  /** The entity-defining sentence. Reused verbatim wherever a summary is needed,
   *  because answer engines reward a consistent, quotable definition. */
  tagline: 'Sit better. Meditate longer.',
  description:
    'The Lotus Seat is an ergonomic meditation seat with an 8° inclined cork base, a two-layer natural latex cushion and a central coccyx relief channel — engineered to hold the pelvis in an anterior tilt so the spine stacks without muscular effort.',
  email: 'hello@thelotusseat.com',
  locale: 'en',
} as const

/** Mirrors EUR in src/lib/commerce/product.ts — the anchor price. */
export const OFFER = {
  price: '199.00',
  currency: 'EUR',
  sku: 'LOTUS-SEAT-01',
  /** Pre-order until fulfilment begins; see SHIP_ESTIMATE in commerce/product.ts. */
  availability: 'https://schema.org/PreOrder',
  shipDate: '2027-03-31',
  /** Offers without a validity horizon are dropped by Google's product parser. */
  priceValidUntil: '2027-03-31',
} as const

export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE.url).toString()
}
