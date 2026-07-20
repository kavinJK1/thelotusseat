import FadeIn from '@/components/FadeIn'

const problems = [
  {
    n: '01',
    title: 'Your back slumps',
    body: 'A flat cushion lets your hips roll backward. Your spine curves, your shoulders round, and holding yourself up becomes work.',
  },
  {
    n: '02',
    title: 'Your tailbone aches',
    body: 'All your weight presses onto one small spot. After a while, it’s the only thing you can feel.',
  },
  {
    n: '03',
    title: 'Your legs go numb',
    body: 'Poor support squeezes the blood flow in your legs, and your feet start to fall asleep within minutes.',
  },
  {
    n: '04',
    title: 'You keep shifting',
    body: 'So you fidget and re-adjust to find a bearable position — and every time, your focus goes with it.',
  },
]

export default function ProblemSection() {
  return (
    <section id="problem" className="scroll-mt-16 py-20 md:py-28 grad-mist border-y border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <p className="mono-label text-[0.72rem] mb-4">01 — The problem</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.9rem,4vw,3rem)] max-w-xl">
              It’s almost never your mind that ends a sit early.
            </h2>
            <p className="text-ink-soft max-w-xs leading-relaxed text-[0.95rem]">
              It’s your body. And a softer cushion doesn’t fix any of it — because the
              real problem isn’t padding, it’s posture.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-4">
          {problems.map((p, i) => (
            <FadeIn key={p.n} delay={i * 60}>
              <div className="h-full rounded-3xl bg-glow/50 border border-glow/60 backdrop-blur-sm px-6 py-7">
                <span className="font-display text-cork-deep text-lg tabular-nums">{p.n}</span>
                <h3 className="font-display font-semibold text-ink text-[1.35rem] tracking-[-0.01em] mt-1">
                  {p.title}
                </h3>
                <p className="text-ink-soft text-[0.95rem] leading-relaxed mt-2 max-w-sm">
                  {p.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
