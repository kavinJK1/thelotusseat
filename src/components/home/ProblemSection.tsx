import FadeIn from '@/components/FadeIn'

const problems = [
  {
    id: 'P-01',
    title: 'Slouching & back pain',
    description: 'Flat cushions let the pelvis tip backward, forcing the spine to curve and the shoulders to round.',
  },
  {
    id: 'P-02',
    title: 'Tailbone pressure',
    description: 'Pressure concentrates directly on the coccyx, creating a persistent ache that derails focus.',
  },
  {
    id: 'P-03',
    title: 'Leg numbness',
    description: 'Poor weight distribution compresses nerves and blood vessels in the legs within minutes.',
  },
  {
    id: 'P-04',
    title: 'Sessions cut short',
    description: 'When sitting hurts, attention goes to the pain, not the practice. The sit ends early.',
  },
  {
    id: 'P-05',
    title: 'Constant adjusting',
    description: 'Fidgeting to find a bearable position repeatedly pulls the mind out of deeper states.',
  },
]

export default function ProblemSection() {
  return (
    <section className="py-20 md:py-28 bg-surface border-y border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="mono-label text-[0.66rem] mb-4 flex items-center gap-2">
                <span className="text-cork-deep">DIAGNOSIS</span>
                <span className="w-6 h-px bg-line-strong" />
                FAILURE MODES
              </p>
              <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.9rem,4vw,3rem)] max-w-xl">
                Softness treats the symptom, not the structure.
              </h2>
            </div>
            <p className="text-ink-soft max-w-xs leading-relaxed text-[0.95rem]">
              Five recurring ways an ordinary cushion sabotages the sit — each of them
              postural, none of them solved by more padding.
            </p>
          </div>
        </FadeIn>

        {/* Failure-mode ledger — not a card grid */}
        <div className="border-t border-line-strong">
          {problems.map((p, i) => (
            <FadeIn key={p.id} delay={i * 60}>
              <div className="group grid grid-cols-[3.2rem_1fr] sm:grid-cols-[5rem_14rem_1fr] items-baseline gap-x-4 sm:gap-x-8 py-6 border-b border-line hover:bg-paper/60 transition-colors">
                <span className="font-mono text-[0.8rem] text-cork-deep tabular-nums">{p.id}</span>
                <h3 className="font-display font-semibold text-ink text-[1.05rem] tracking-[-0.01em] col-start-2 sm:col-start-2">
                  {p.title}
                </h3>
                <p className="text-ink-soft text-[0.95rem] leading-relaxed col-start-2 sm:col-start-3 mt-1.5 sm:mt-0 max-w-md">
                  {p.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
