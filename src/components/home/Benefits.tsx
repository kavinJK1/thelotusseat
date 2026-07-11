import FadeIn from '@/components/FadeIn'

const benefits = [
  { id: 'B-01', title: 'Naturally upright spine', description: 'The pelvic tilt places the spine in its native S-curve without muscular effort.' },
  { id: 'B-02', title: 'Healthy pelvic position', description: 'Hips seated above the knees — the ideal geometry for a long, stable sit.' },
  { id: 'B-03', title: 'Tailbone relief', description: 'The sculpted central channel lifts pressure off the coccyx, the most common pain point.' },
  { id: 'B-04', title: 'Even weight distribution', description: 'Load spreads across the full sitting surface, reducing pressure points throughout.' },
  { id: 'B-05', title: 'Longer sessions', description: 'Physical comfort frees the mind to settle deeper, extending practice naturally.' },
  { id: 'B-06', title: 'Breathable by material', description: 'Natural cork and latex stay cool and dry across long sessions — no heat trap.' },
]

export default function Benefits() {
  return (
    <section className="py-20 md:py-28 bg-paper">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.9rem,4vw,3rem)] max-w-2xl mb-12">
            What good posture returns to the practice.
          </h2>
        </FadeIn>

        {/* Spec matrix — flat hairline grid, deliberately not the Problem ledger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
          {benefits.map((b, i) => (
            <FadeIn key={b.id} delay={(i % 3) * 70}>
              <div className="bg-paper px-6 py-7 h-full">
                <span className="font-mono text-[0.75rem] text-cork-deep tabular-nums">{b.id}</span>
                <h3 className="font-display font-semibold text-ink text-[1.05rem] tracking-[-0.01em] mt-3">{b.title}</h3>
                <p className="text-ink-soft text-[0.92rem] leading-relaxed mt-2">{b.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
