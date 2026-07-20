import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import { ASSURANCES } from './assurances'
import { OmMandala, LotusMark } from './Motifs'

export default function CTASection() {
  return (
    <section id="order" className="scroll-mt-16 py-20 md:py-28 grad-dusk on-dusk relative border-t border-line overflow-hidden">
      <div aria-hidden className="absolute inset-0 tech-grid opacity-80" />
      <OmMandala className="absolute -top-8 -left-10 w-56 h-56 text-glow opacity-25 hidden sm:block" />
      <LotusMark className="absolute bottom-8 right-8 w-9 h-9 text-glow opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <div className="reg-frame border border-glow/25 bg-glow/10 backdrop-blur-md px-6 sm:px-12 py-14 text-center">
            <p className="text-[0.7rem] uppercase tracking-[0.18em] font-medium mb-6 flex items-center justify-center gap-2 text-glow/85">
              <span className="w-1.5 h-1.5 rounded-full bg-glow inline-block" />
              Pre-order open
            </p>
            <h2 className="font-display font-medium text-glow tracking-[-0.01em] leading-[1.02] text-[clamp(2.4rem,5vw,3.75rem)] max-w-2xl mx-auto">
              Reserve yours.
            </h2>
            <p className="mt-6 text-glow/85 text-lg leading-relaxed max-w-lg mx-auto">
              The Lotus Seat is made in small batches. Pre-order now to claim one from the
              first run. We charge today to hold your seat, and you can cancel for a full
              refund any time before it ships.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center gap-2 bg-glow text-graphite px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-glow/90 transition-colors shadow-lg shadow-indigo-900/20"
              >
                Pre-Order Now
                <span className="opacity-55">↗</span>
              </Link>
              <Link
                href="/product"
                className="inline-flex items-center justify-center border border-glow/40 text-glow px-8 py-4 rounded-full text-sm font-medium hover:bg-glow/15 transition-colors"
              >
                View full specifications
              </Link>
            </div>

            <dl className="mt-12 pt-8 border-t border-glow/20 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 text-left">
              {ASSURANCES.map((a) => (
                <div key={a.term}>
                  <dt className="text-[0.7rem] uppercase tracking-[0.12em] font-medium text-glow">{a.term}</dt>
                  <dd className="mt-1.5 text-glow/75 text-[0.85rem] leading-relaxed">{a.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
