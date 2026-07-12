/**
 * JSON-LD builders.
 *
 * Two audiences read this and they want different things. Google reads it to
 * decide whether a result earns FAQ/product enhancement. LLM answer engines read
 * it to decide *what the thing is* — so every graph node carries an `@id` and
 * cross-references the others, which is what lets a crawler resolve "The Lotus
 * Seat" to one entity rather than four unrelated mentions of a string.
 */

import { OFFER, SITE, absoluteUrl } from './site'

export type JsonLd = Record<string, unknown>

const ORG_ID = `${SITE.url}/#organization`
const SITE_ID = `${SITE.url}/#website`
const PRODUCT_ID = `${SITE.url}/#product`

export function organizationSchema(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    slogan: SITE.tagline,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/images/product/cushion-full.jpg'),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE.email,
      contactType: 'customer support',
      availableLanguage: ['English'],
    },
  }
}

export function websiteSchema(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  }
}

/**
 * Deliberately carries no aggregateRating or review: the product has not shipped,
 * so there is nothing to rate. Inventing either is a manual-action risk and would
 * poison the very authority signal this whole effort is trying to build.
 */
export function productSchema(): JsonLd {
  return {
    '@type': 'Product',
    '@id': PRODUCT_ID,
    name: SITE.name,
    sku: OFFER.sku,
    description: SITE.description,
    brand: { '@id': ORG_ID },
    category: 'Meditation Cushions & Seats',
    material: ['Cork composite', 'Natural latex'],
    image: [
      absoluteUrl('/images/product/cushion-full.jpg'),
      absoluteUrl('/images/product/seat-profile.jpg'),
      absoluteUrl('/images/product/seat-stack.jpg'),
    ],
    audience: {
      '@type': 'PeopleAudience',
      audienceType:
        'Meditators, Vipassana retreat practitioners, yoga practitioners, and people with lower back pain when sitting cross-legged',
    },
    // The same figures the hero's dimension rule prints. If one changes, change both.
    width: quantity(500, 'MMT'),
    depth: quantity(440, 'MMT'),
    weight: quantity(2, 'KGM'),
    additionalProperty: [
      prop('Base tilt angle', '8°'),
      prop('Base material', 'Natural cork composite'),
      prop('Cushion base layer', '70 mm natural latex, ILD 75–85'),
      prop('Cushion top layer', 'Ramped natural latex, 50 mm rear to 32 mm front, ILD 45–55'),
      prop('Coccyx relief channel depth', '10–15 mm'),
    ],
    offers: {
      '@type': 'Offer',
      url: absoluteUrl('/checkout'),
      price: OFFER.price,
      priceCurrency: OFFER.currency,
      availability: OFFER.availability,
      priceValidUntil: OFFER.priceValidUntil,
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': ORG_ID },
    },
  }
}

function prop(name: string, value: string): JsonLd {
  return { '@type': 'PropertyValue', name, value }
}

/** UN/CEFACT unit codes — MMT = millimetre, KGM = kilogram. */
function quantity(value: number, unitCode: 'MMT' | 'KGM'): JsonLd {
  return { '@type': 'QuantitativeValue', value, unitCode }
}

export interface Faq {
  readonly q: string
  readonly a: string
}

export function faqSchema(faqs: readonly Faq[]): JsonLd {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

export interface Crumb {
  readonly name: string
  readonly path: string
}

export function breadcrumbSchema(crumbs: readonly Crumb[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

/**
 * For the editorial/explainer pages. `speakable` marks the passages an assistant
 * should read aloud — in practice we point it at the direct-answer block, which
 * is the same passage we want an LLM to lift as its answer.
 */
export function articleSchema(args: {
  readonly path: string
  readonly headline: string
  readonly description: string
  readonly datePublished: string
  readonly dateModified?: string
}): JsonLd {
  return {
    '@type': 'Article',
    '@id': `${absoluteUrl(args.path)}#article`,
    headline: args.headline,
    description: args.description,
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    about: { '@id': PRODUCT_ID },
    mainEntityOfPage: absoluteUrl(args.path),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-answer]'],
    },
  }
}

/** Wraps nodes in a single @graph so one <script> carries the whole page. */
export function graph(...nodes: readonly JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': nodes }
}
