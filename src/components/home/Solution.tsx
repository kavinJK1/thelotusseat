import Image from 'next/image'
import FadeIn from '@/components/FadeIn'

const points = [
  {
    title: 'It tips you forward',
    body: 'The whole seat leans forward by 8°. That small angle rolls your hips into the right spot, so your back stacks up straight — you don’t have to hold it there.',
  },
  {
    title: 'It holds you up',
    body: 'Firm, springy latex supports your weight without letting you sink. You stay upright the whole sit, not just the first few minutes.',
  },
  {
    title: 'It takes the pressure off',
    body: 'A soft dip down the middle keeps your tailbone from pressing into the seat — the one spot that usually starts to ache first.',
  },
]

export default function Solution() {
  return (
    <section id="solution" className="scroll-mt-16 py-20 md:py-28 bg-paper">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-x-14 gap-y-12 items-center">
          <div>
            <p className="mono-label text-[0.72rem] mb-4 text-cork-deep">02 — The solution</p>
            <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4vw,3rem)] max-w-lg">
              A seat that puts you in the right posture — for you.
            </h2>
            <p className="mt-6 text-ink-soft text-lg leading-relaxed max-w-md">
              You shouldn’t have to concentrate on sitting up straight. The Lotus Seat
              does the work, so all that’s left is the practice.
            </p>

            <ul className="mt-9 border-t border-line">
              {points.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[auto_1fr] gap-x-5 py-5 border-b border-line">
                  <span className="font-mono text-sm text-cork-deep tabular-nums pt-0.5">{`0${i + 1}`}</span>
                  <div>
                    <h3 className="font-display font-semibold text-ink text-[1.05rem] tracking-[-0.01em]">{p.title}</h3>
                    <p className="text-ink-soft text-[0.95rem] leading-relaxed mt-1.5 max-w-sm">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <FadeIn>
            <figure className="reg-frame border border-line bg-surface/50 overflow-hidden">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/product/seat-wedge.jpg"
                  alt="Side view of the Lotus Seat, rising from a thin front edge up to a higher back over its cork base"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
