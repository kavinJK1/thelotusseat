import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export default function Lifestyle() {
  return (
    <section className="relative bg-graphite overflow-hidden">
      <div aria-hidden className="absolute inset-0 tech-grid opacity-[0.12]" />
      {/* single, purposeful glow — the one place ambience earns its keep */}
      <div
        aria-hidden
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full"
        style={{ background: 'radial-gradient(circle, oklch(0.63 0.108 52 / 0.22), transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-24 md:py-32">
        <FadeIn>
          <p className="mono-label text-[0.66rem] mb-7 flex items-center gap-2 text-ink-soft">
            <span className="text-cork-bright">THE PRACTICE</span>
            <span className="w-6 h-px bg-line-strong" />
            WHY IT MATTERS
          </p>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,5vw,3.75rem)] max-w-3xl">
            When sitting is effortless, the practice is all that’s left.
          </h2>
          <p className="mt-7 text-ink-soft text-lg leading-relaxed max-w-xl">
            The Lotus Seat is built for anyone who takes the sit seriously — first session
            or ten-thousandth. Every component exists to remove one more obstacle between
            you and the stillness you came for.
          </p>
          <Link
            href="/checkout"
            className="mt-10 inline-flex items-center gap-2 bg-paper text-graphite px-6 py-3.5 rounded-[3px] text-sm font-medium hover:bg-white transition-colors"
          >
            Pre-Order Now
            <span className="text-paper/60">↗</span>
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
