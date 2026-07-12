import type { JsonLd as JsonLdData } from '@/lib/seo/schema'

/**
 * Emits a JSON-LD graph. Server-rendered on purpose: answer-engine crawlers and
 * the lighter search bots frequently do not execute JavaScript, so anything
 * injected client-side is invisible to exactly the readers this exists for.
 */
export default function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      // Content is authored by us, never user input, so there is nothing to escape
      // beyond the `<` that could otherwise close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
