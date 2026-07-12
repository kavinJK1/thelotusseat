import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import { ASSURANCES } from './assurances'

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-paper border-t border-line">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <div className="reg-frame border border-line-strong bg-surface px-6 sm:px-12 py-14 text-center">
            <p className="mono-label text-[0.66rem] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cork inline-block" />
              <span className="text-cork-deep">PRE-ORDER OPEN</span>
              <span>· FIRST PRODUCTION RUN</span>
            </p>
            <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4.6vw,3.25rem)] max-w-2xl mx-auto">
              Reserve the seat your practice deserves.
            </h2>
            <p className="mt-6 text-ink-soft text-lg leading-relaxed max-w-lg mx-auto">
              Join the first run of The Lotus Seat. Your card is charged today to reserve a
              unit — and you can cancel for a full refund any time before it ships.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center gap-2 bg-ink text-paper px-8 py-4 rounded-[3px] text-sm font-medium hover:bg-graphite-soft transition-colors"
              >
                Pre-Order Now
                <span className="text-paper/55">↗</span>
              </Link>
              <Link
                href="/product"
                className="inline-flex items-center justify-center border border-line-strong text-ink px-8 py-4 rounded-[3px] text-sm font-medium hover:border-ink transition-colors"
              >
                View full specifications
              </Link>
            </div>

            {/* The terms, at the point of decision. A pre-order asks for money and a
                wait; this is what the buyer gets back for accepting both. */}
            <dl className="mt-12 pt-8 border-t border-line grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 text-left">
              {ASSURANCES.map((a) => (
                <div key={a.term}>
                  <dt className="mono-label text-[0.66rem] text-ink">{a.term}</dt>
                  <dd className="mt-1.5 text-ink-soft text-[0.85rem] leading-relaxed">{a.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
