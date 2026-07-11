import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'The Product — The Lotus Seat',
  description: 'Explore the full specifications, materials, and engineering behind The Lotus Seat.',
}

const features = [
  {
    number: '01',
    title: 'Ergonomic Tilted Base',
    description:
      'An 8° inclined cork composite base gently tilts the pelvis into its natural forward position. This pelvic tilt is the foundation of effortless upright posture — it propagates through the entire spine without any muscular effort required.',
    specs: ['Natural cork composite', '8° ergonomic tilt', 'Anti-slip base finish'],
  },
  {
    number: '02',
    title: 'Responsive Latex Cushion (Base)',
    description:
      'A 70 mm flat natural latex base layer provides the structural foundation. At ILD 75–85 (soft firmness), it offers meaningful support without excessive give — the seat holds its position rather than collapsing under weight.',
    specs: ['Natural latex', 'ILD 75–85 (soft firmness)', '70 mm thick', 'Flat profile, no cut-outs'],
  },
  {
    number: '03',
    title: 'Ramped Comfort Layer',
    description:
      'The top latex layer is thicker at the rear (50 mm) and tapers toward the front (32 mm). This graduated thickness works in concert with the base tilt to support the sacrum and lower back while the hips settle naturally.',
    specs: ['Natural latex', 'ILD 45–55 (soft)', '50 mm rear / 32 mm front', 'Graduated ramp profile'],
  },
  {
    number: '04',
    title: 'Central Relief Channel',
    description:
      'A shallow central channel (10–15 mm depth) is sculpted into the cushion surface to lift the coccyx away from contact with the seat. Tailbone pressure is one of the leading causes of short meditation sessions.',
    specs: ['10–15 mm depth', 'Precisely sculpted channel', 'Maintains cushion firmness', 'Coccyx off-loading design'],
  },
  {
    number: '05',
    title: 'Breathable Cover',
    description:
      'An upholstery-grade woven cotton-poly and linen blend in warm ivory cream. The 300–350 GSM weight provides durability without rigidity. A tone-on-tone lotus motif is embroidered on the rear panel — the only decorative element on an otherwise minimal form.',
    specs: ['Cotton-poly / linen blend', '300–350 GSM', 'Warm ivory / natural cream', 'Tone-on-tone lotus embroidery'],
  },
  {
    number: '06',
    title: 'Stable Cork Base',
    description:
      'The 500 × 440 mm cork base provides a generous, stable foundation that minimises micro-adjustments during sitting. Cork is naturally antimicrobial, lightweight, and provides excellent grip on most floor surfaces.',
    specs: ['500 mm width', '440 mm depth', 'Natural cork composite', 'Antimicrobial surface'],
  },
]

export default function ProductPage() {
  return (
    <div className="bg-warm-white pt-24">
      {/* Hero */}
      <section className="py-20 text-center max-w-3xl mx-auto px-6">
        <FadeIn>
          <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">The Product</p>
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-near-black leading-tight mb-6">
            The Lotus Seat
          </h1>
          <p className="text-warm-grey text-lg leading-relaxed mb-10">
            A premium ergonomic meditation seat. Inclined cork base. Natural latex cushion system. Designed for serious practitioners and total beginners alike.
          </p>
          <Link
            href="/checkout"
            className="inline-flex items-center bg-near-black text-warm-white px-8 py-4 rounded-full text-sm font-medium hover:bg-near-black/80 transition-colors"
          >
            Pre-Order Now
          </Link>
        </FadeIn>
      </section>

      {/* Visual */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <FadeIn>
          <div
            className="w-full h-80 md:h-[480px] rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #E8D9C4 0%, #C4A882 45%, #A8865C 100%)',
              boxShadow: '0 40px 80px -20px rgba(196,168,130,0.4)',
            }}
          />
        </FadeIn>
      </section>

      {/* Features */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-4">Engineering</p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-near-black">
                Six components. One system.
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <FadeIn key={feature.number} delay={i * 60}>
                <div className="bg-warm-white rounded-2xl p-8 border border-warm-border h-full">
                  <span className="text-sand/50 font-serif text-3xl font-medium">{feature.number}</span>
                  <h3 className="font-serif text-xl font-medium text-near-black mt-2 mb-3">{feature.title}</h3>
                  <p className="text-warm-grey text-sm leading-relaxed mb-5">{feature.description}</p>
                  <ul className="space-y-1">
                    {feature.specs.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-xs text-warm-grey">
                        <span className="w-1 h-1 rounded-full bg-sand inline-block" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Materials table */}
      <section className="py-20 max-w-3xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-4">Materials</p>
            <h2 className="font-serif text-3xl font-medium text-near-black">Natural by design.</h2>
          </div>
          <div className="bg-surface rounded-3xl border border-warm-border overflow-hidden">
            {[
              { part: 'Base', material: 'Natural cork composite, 8° ergonomic tilt' },
              { part: 'Base Cushion', material: 'Natural latex foam, ILD 75–85, 70 mm' },
              { part: 'Top Cushion', material: 'Natural latex foam, ILD 45–55, 32–50 mm ramped' },
              { part: 'Cover', material: 'Cotton-poly / linen blend, 300–350 GSM, warm ivory' },
              { part: 'Embroidery', material: 'Tone-on-tone lotus motif, rear panel' },
            ].map((row, i, arr) => (
              <div
                key={row.part}
                className={`flex flex-col sm:flex-row sm:items-center justify-between px-7 py-4 gap-1 ${i < arr.length - 1 ? 'border-b border-warm-border' : ''}`}
              >
                <span className="text-warm-grey text-sm">{row.part}</span>
                <span className="text-near-black text-sm font-medium sm:text-right">{row.material}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* CTA */}
      <section className="py-20 bg-near-black text-center px-6">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-warm-white mb-4">
            Ready to experience the difference?
          </h2>
          <p className="text-warm-grey text-lg mb-8 max-w-xl mx-auto">
            Pre-orders are open. Limited to our first production run.
          </p>
          <Link
            href="/checkout"
            className="inline-flex items-center bg-sand text-near-black px-8 py-4 rounded-full text-sm font-medium hover:bg-sand-light transition-colors"
          >
            Pre-Order Now
          </Link>
        </FadeIn>
      </section>
    </div>
  )
}
