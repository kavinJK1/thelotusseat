import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo/site'

/**
 * The AI crawlers are explicitly allowed, and that is a deliberate commercial bet
 * rather than an oversight: a pre-order product with no reviews and no backlink
 * profile will be recommended by an answer engine long before it outranks Amazon
 * in the ten blue links. Blocking GPTBot/ClaudeBot/PerplexityBot to protect
 * "content" would be forfeiting the only channel where we currently compete.
 *
 * Only the transactional funnel is closed off — nothing there is useful in a
 * search result, and indexing a checkout page is how sessions with stale carts
 * and orphaned order IDs end up in the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/checkout/success'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
