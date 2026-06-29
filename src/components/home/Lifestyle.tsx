import Link from 'next/link'
import FadeIn from '@/components/FadeIn'

export default function Lifestyle() {
  return (
    <section className="py-0 overflow-hidden">
      <FadeIn>
        <div
          className="relative w-full min-h-[520px] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #2C1F14 0%, #4A3220 30%, #C4A882 70%, #E8D9C4 100%)',
          }}
        >
          {/* Ambient light effect */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 60% 50%, rgba(196,168,130,0.25) 0%, transparent 70%)',
            }}
          />

          {/* Decorative circles */}
          <div
            aria-hidden
            className="absolute right-0 top-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #C4A882, transparent)' }}
          />

          <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
            <p className="text-sand-light text-xs font-medium tracking-[0.25em] uppercase mb-6 opacity-80">
              The Practice
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-warm-white leading-snug mb-6">
              When sitting is effortless, meditation becomes possible.
            </h2>
            <p className="text-warm-white/60 text-lg leading-relaxed mb-10">
              The Lotus Seat is designed for anyone who takes their practice seriously — from first-time meditators to experienced practitioners. Every component exists to remove one more obstacle between you and the stillness you're seeking.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-warm-white text-near-black px-8 py-4 rounded-full text-sm font-medium hover:bg-warm-white/90 transition-colors"
            >
              Pre-Order Now
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
