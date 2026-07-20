import PostureProof from '@/components/showcase/PostureProof'
import FadeIn from '@/components/FadeIn'

/**
 * The whole argument in one picture: the same body, slumped on a flat cushion and
 * upright on the seat. Two still figures rather than a scroll animation — you should
 * be able to see the difference at a glance, without scrubbing for it.
 */
const states = [
  {
    t: 0,
    cap: 'On a flat cushion',
    body: 'Hips roll back. The spine curves into a C, and the head drifts out in front of the body.',
  },
  {
    t: 1,
    cap: 'On the Lotus Seat',
    body: 'Hips tip forward. The spine stacks up straight, and the head sits balanced right over the body.',
  },
]

export default function Posture() {
  return (
    <section id="posture" className="scroll-mt-16 py-20 md:py-28 grad-sky border-y border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <p className="mono-label text-[0.72rem] mb-4">The difference you can see</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.9rem,4vw,3rem)] max-w-lg">
              Same person. Two cushions.
            </h2>
            <p className="text-ink-soft text-sm max-w-xs leading-relaxed">
              Nothing about the person changes between these two — only what they’re
              sitting on.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid sm:grid-cols-2 gap-5">
          {states.map((s) => (
            <FadeIn key={s.cap}>
              <figure className="reg-frame border border-glow/60 bg-glow/60 backdrop-blur-sm h-full">
                <figcaption className="border-b border-line px-4 py-3">
                  <h3 className="font-display font-semibold text-ink text-[1.05rem] tracking-[-0.01em]">{s.cap}</h3>
                </figcaption>
                <div className="p-3 aspect-[435/375]">
                  <PostureProof staticT={s.t} />
                </div>
                <p className="text-ink-soft text-[0.95rem] leading-relaxed px-4 pb-5 pt-1 max-w-sm">
                  {s.body}
                </p>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
