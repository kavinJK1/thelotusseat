import FadeIn from '@/components/FadeIn'

export default function ProductIntro() {
  return (
    <section id="product" className="py-20 md:py-28 bg-paper">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <p className="font-display font-medium text-ink tracking-[-0.02em] leading-[1.15] text-[clamp(1.5rem,3.6vw,2.5rem)] text-balance">
            Most meditation cushions offer nothing but padding.{' '}
            <span className="text-ink-soft">
              The Lotus Seat is an engineered system — it tilts the pelvis, supports the
              sacrum, and distributes weight so that sitting still stops being the hard part.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
