import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'About — The Lotus Seat',
  description: 'The story behind The Lotus Seat and why we built it.',
}

export default function AboutPage() {
  return (
    <div className="bg-warm-white pt-24">
      <section className="py-20 max-w-3xl mx-auto px-6">
        <FadeIn>
          <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">About</p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-near-black leading-tight mb-8">
            Built for the practitioner.
          </h1>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="prose prose-lg max-w-none">
            <p className="text-warm-grey text-lg leading-relaxed mb-6">
              The Lotus Seat was born from a simple frustration: the physical discomfort of sitting that gets in the way of actually meditating. Despite trying every cushion, bench, and modification available, the experience remained the same — a gradual accumulation of aches that pulled attention away from the practice itself.
            </p>
            <p className="text-warm-grey text-lg leading-relaxed mb-6">
              The solution was not to find a softer cushion. It was to rethink the problem. Discomfort in meditation is overwhelmingly postural — not a matter of surface softness, but of where the pelvis sits and how that position affects the entire kinetic chain up the spine.
            </p>
            <p className="text-warm-grey text-lg leading-relaxed mb-6">
              The Lotus Seat applies ergonomic principles that are well-established in workplace seating but have been almost entirely absent from meditation products. The 8° base tilt, the ramped latex cushioning system, the central relief channel — each decision is backed by the biomechanics of seated posture, not aesthetic convention.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Visual break */}
      <div
        className="w-full h-72"
        style={{ background: 'linear-gradient(135deg, #2C1F14, #C4A882)' }}
      />

      <section className="py-20 max-w-3xl mx-auto px-6">
        <FadeIn>
          <h2 className="font-serif text-3xl font-medium text-near-black mb-8">Our values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Integrity of materials', body: 'Natural cork and latex because they perform better — not as a marketing position.' },
              { title: 'Function before form', body: 'Every design decision is justified by biomechanics first and aesthetics second.' },
              { title: 'Honest pricing', body: 'Premium materials and craftsmanship at a price that reflects value, not brand mythology.' },
            ].map((v) => (
              <div key={v.title} className="border-t-2 border-sand pt-4">
                <h3 className="font-medium text-near-black mb-2">{v.title}</h3>
                <p className="text-warm-grey text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center bg-near-black text-warm-white px-8 py-4 rounded-full text-sm font-medium hover:bg-near-black/80 transition-colors"
          >
            Pre-Order Now
          </Link>
        </FadeIn>
      </section>
    </div>
  )
}
