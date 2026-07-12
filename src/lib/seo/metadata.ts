import type { Metadata } from 'next'
import { SITE, absoluteUrl } from './site'

interface PageMetaArgs {
  readonly title: string
  readonly description: string
  readonly path: string
  readonly image?: string
}

/**
 * Every indexable page gets a self-referencing canonical and an absolute OG URL.
 * Without the canonical, the pre-order funnel's query strings (?currency=, utm_*)
 * each present as a separate URL and split the page's authority across them.
 */
export function pageMetadata({ title, description, path, image }: PageMetaArgs): Metadata {
  const url = absoluteUrl(path)
  const ogImage = image ?? '/images/product/cushion-full.jpg'

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE.name,
      title,
      description,
      locale: 'en',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
