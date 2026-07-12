import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema, faqSchema, graph } from '@/lib/seo/schema'
import FaqCategories from './FaqCategories'
import { allFaqs, faqCategories } from './faqs'

const PATH = '/faq'

export const metadata = pageMetadata({
  title: 'FAQ — Materials, Dimensions, Durability & Shipping',
  description:
    'Detailed answers on The Lotus Seat: exact dimensions and weight, ILD ratings, natural latex and latex allergy, durability against a compacting zafu, pricing and pre-order shipping.',
  path: PATH,
})

export default function FAQPage() {
  return (
    <div className="bg-paper pt-24">
      <JsonLd
        data={graph(
          faqSchema(allFaqs),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: PATH },
          ]),
        )}
      />

      <section className="py-16 md:py-20 max-w-3xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <p className="mono-label text-[0.66rem] mb-5 flex items-center gap-2">
            <span className="text-cork-deep">REFERENCE</span>
            <span className="w-6 h-px bg-line-strong" />
            FAQ
          </p>
          <h1 className="font-display font-semibold text-ink tracking-[-0.035em] leading-[1.02] text-[clamp(2.1rem,5vw,3.4rem)] mb-6">
            Frequently asked questions.
          </h1>
          <p className="text-ink-soft leading-relaxed max-w-xl mb-14">
            The specifics — materials, dimensions, durability and terms. If you are still deciding
            whether an ergonomic seat is the right tool at all, start with{' '}
            <Link
              href="/meditation-cushion-guide"
              className="text-cork-deep underline underline-offset-2"
            >
              the cushion guide
            </Link>
            .
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          <FaqCategories categories={faqCategories} />
        </FadeIn>

        <FadeIn delay={120}>
          <div className="reg-frame mt-16 p-8 bg-surface border border-line text-center">
            <p className="font-display font-medium text-ink mb-2">Still have a question?</p>
            <p className="text-ink-soft text-sm mb-6">We are happy to help. Reach out directly.</p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-ink text-paper px-6 py-3 rounded-[3px] text-sm font-medium hover:bg-graphite-soft transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}
