import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo/site'

/**
 * Priority here is not a ranking lever — Google ignores it. It is a crawl-budget
 * hint, and the ordering below reflects what we actually want recrawled: the
 * money page, then the three keyword landing pages, then the supporting library.
 * Checkout and its success page are deliberately absent; see robots.ts.
 */
const ROUTES: ReadonlyArray<{
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/product', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/meditation-cushion-for-back-pain', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/vipassana-meditation-cushion', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/meditation-cushion-guide', priority: 0.85, changeFrequency: 'monthly' },
  { path: '/science', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/shipping', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }))
}
