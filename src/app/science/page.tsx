import type { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'The Science — The Lotus Seat',
  description: 'The biomechanics and ergonomic principles behind The Lotus Seat.',
}

export default function SciencePage() {
  return (
    <div className="bg-warm-white pt-24">
      <section className="py-20 max-w-3xl mx-auto px-6">
        <FadeIn>
          <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">The Science</p>
          <h1 className="font-serif text-4xl md:text-6xl font-medium text-near-black leading-tight mb-6">
            The biomechanics of sitting.
          </h1>
          <p className="text-warm-grey text-xl leading-relaxed">
            Understanding why the body struggles in meditation — and what to do about it.
          </p>
        </FadeIn>
      </section>

      <section className="pb-20 max-w-3xl mx-auto px-6">
        {[
          {
            title: 'The pelvic tilt problem',
            body: [
              'When you sit on a flat surface with your legs crossed, your pelvis naturally tips backward into a posterior tilt. This flattens the lumbar curve, forces the thoracic spine to kyphose (round forward), and pulls the head forward. The result is an unstable chain of compensation that the muscular system must work to counteract.',
              'The moment you introduce even a modest forward tilt (8° is optimal for cross-legged sitting), the pelvis rotates anteriorly into its natural position. The lumbar curve restores. The thoracic spine can extend. The head floats back over the spine. Suddenly, upright sitting requires almost no muscular effort.',
            ],
          },
          {
            title: 'Why 8 degrees?',
            body: [
              'The lumbar lordosis — the natural inward curve of the lower back — is best supported when the pelvis is in a neutral or slightly anteriorly tilted position. Research on seated ergonomics consistently identifies a seat inclination of 5–15° as the optimal range for reducing lumbar muscular activity and disc pressure.',
              'The Lotus Seat uses 8°: enough to achieve the pelvic rotation needed for postural alignment, but not so steep that it creates forward slipping pressure or discomfort in the thighs.',
            ],
          },
          {
            title: 'Latex vs. memory foam',
            body: [
              'Memory foam responds to body heat by softening beneath pressure points, allowing the sitter to sink deeper over time. While this feels comfortable initially, it destabilises posture by allowing the pelvis to keep shifting as the foam continues to compress — undermining the structural alignment the 8° base creates.',
              'Natural latex has a different mechanical profile: it deforms immediately under load and then pushes back with consistent, even force. It does not continue to compress. This means the support geometry of the seat is maintained throughout a long sit — the surface you perceive when you first sit down is the same surface supporting you 45 minutes later.',
              'Latex also has significantly better breathability than memory foam, which matters for temperature comfort during extended practice.',
            ],
          },
          {
            title: 'The central relief channel',
            body: [
              'The coccyx (tailbone) is a poorly-padded bony prominence that, in cross-legged sitting, is positioned directly over the sitting surface. On flat cushions, this creates a concentrated pressure point. Over 20–30 minutes, this pressure becomes painful and distracting.',
              'A shallow relief channel in the cushion surface — 10–15 mm is sufficient — creates a pocket that the coccyx sits above rather than against. Pressure is redistributed to the ischial tuberosities (sitting bones), which are designed for weight-bearing.',
            ],
          },
          {
            title: 'The ramped comfort layer',
            body: [
              'The top latex layer is thicker at the back (50 mm) and tapers to the front (32 mm). This graduated thickness provides additional sacral and lower back support where it is most needed, while allowing the front of the pelvis — and therefore the legs — to sit slightly lower, which opens the hip angle and reduces tension in the inner groin.',
              'Combined with the base tilt, the ramp produces a compound ergonomic effect that would not be achievable with either feature alone.',
            ],
          },
        ].map((section, i) => (
          <FadeIn key={section.title} delay={i * 60}>
            <div className="mb-14">
              <h2 className="font-serif text-2xl font-medium text-near-black mb-5">{section.title}</h2>
              {section.body.map((para, j) => (
                <p key={j} className="text-warm-grey leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>
        ))}
      </section>

      <section className="py-16 bg-surface text-center px-6">
        <FadeIn>
          <h2 className="font-serif text-3xl font-medium text-near-black mb-4">
            Experience the difference for yourself.
          </h2>
          <p className="text-warm-grey text-lg mb-8 max-w-xl mx-auto">
            Pre-orders come with a 30-day satisfaction guarantee.
          </p>
          <Link
            href="/checkout"
            className="inline-flex items-center bg-near-black text-warm-white px-8 py-4 rounded-full text-sm font-medium hover:bg-near-black/80 transition-colors"
          >
            Pre-Order Now
          </Link>
        </FadeIn>
      </section>
    </div>
  )
}
