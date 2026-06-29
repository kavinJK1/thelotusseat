import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export default function CTASection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-6">Ready to begin</p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-near-black leading-snug mb-6">
            Ready to transform your meditation?
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed mb-10">
            Join the waitlist and be among the first to receive The Lotus Seat. Pre-orders are open now — limited to our first production run.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-near-black text-warm-white px-10 py-4 rounded-full text-sm font-medium hover:bg-near-black/80 transition-colors w-full sm:w-auto text-center"
            >
              Pre-Order Now
            </Link>
            <Link
              href="/product"
              className="border border-near-black/30 text-near-black px-10 py-4 rounded-full text-sm font-medium hover:border-near-black transition-colors w-full sm:w-auto text-center"
            >
              View Full Specifications
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
