import Image from 'next/image'
import Link from 'next/link'
import { SHIP_ESTIMATE, formatMinorUnits, priceFor } from '@/lib/commerce/product'
import { OmMandala, LotusMark } from './Motifs'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col grad-dawn overflow-hidden">
      {/* Drifting light + devotional marks */}
      <div aria-hidden className="absolute inset-0 tech-grid opacity-70" />
      <OmMandala className="absolute top-24 -left-10 w-52 h-52 text-glow opacity-70 hidden sm:block" />
      <LotusMark className="absolute bottom-10 left-6 w-8 h-8 text-glow opacity-70" />

      <div className="relative z-10 pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 flex items-center justify-between">
          <span className="mono-label text-[0.66rem]">The Lotus Seat</span>
          <span className="mono-label text-[0.66rem] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cork-deep inline-block" />
            Pre-order open
          </span>
        </div>
      </div>

      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-x-12 gap-y-12 items-center py-12 md:py-16">
        {/* Left — the promise */}
        <div className="max-w-xl">
          <h1 className="font-display text-ink leading-[0.95] tracking-[-0.01em] text-[clamp(3rem,8vw,5.75rem)]">
            <span className="font-semibold">Sit better.</span>
            <br />
            <span className="font-medium">Meditate </span>
            <span className="font-script text-cork-deep text-[1.15em] align-baseline">longer</span>
            <span className="font-medium">.</span>
          </h1>

          <p className="mt-7 text-ink-soft text-lg leading-relaxed max-w-md">
            Most cushions just add padding. The Lotus Seat gently tips you forward, so
            your back straightens on its own — and stays comfortable long after a normal
            cushion would have you shifting around.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 bg-graphite text-glow px-7 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-graphite-soft transition-colors shadow-lg shadow-periwinkle/20"
            >
              Pre-order now
              <span className="opacity-60">↗</span>
            </Link>
            <Link
              href="#problem"
              className="inline-flex items-center justify-center gap-2 border border-line-strong text-ink px-7 py-3.5 rounded-full text-sm font-medium hover:bg-glow/40 transition-colors"
            >
              See how it works
            </Link>
          </div>

          <p className="mt-6 mono-label text-[0.64rem] flex flex-wrap items-center gap-x-2.5 gap-y-1.5 tracking-[0.1em]">
            <span className="text-ink">
              {formatMinorUnits(priceFor('EUR').itemMinorUnits, 'EUR')}
            </span>
            <span aria-hidden className="text-line-strong">·</span>
            <span>{SHIP_ESTIMATE.label}</span>
            <span aria-hidden className="text-line-strong">·</span>
            <span>Cancel any time before it ships</span>
          </p>

          {/* Three facts, on soft light cards */}
          <dl className="mt-10 grid grid-cols-3 gap-3 max-w-md">
            {[
              ['8°', 'Forward tilt'],
              ['Latex', 'Firm, springy'],
              ['30–60m', 'Comfortable sitting'],
            ].map(([v, k]) => (
              <div key={k} className="rounded-2xl bg-glow/45 border border-glow/60 px-4 py-3.5 backdrop-blur-sm">
                <dt className="font-display font-semibold text-2xl text-ink leading-none">{v}</dt>
                <dd className="mono-label text-[0.58rem] mt-1.5 tracking-[0.12em]">{k}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — the product, haloed */}
        <figure className="relative halo">
          <div className="relative reg-frame aspect-square w-full overflow-hidden border border-glow/50 shadow-2xl shadow-periwinkle/25">
            <Image
              src="/images/product/seat-elevation.jpg"
              alt="The Lotus Seat: a cream cotton-linen meditation seat with a terracotta back panel and gold lotus, on a solid cork base"
              fill
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />
            <div className="absolute left-[6%] top-[30%] hidden sm:flex items-center gap-2 z-20">
              <span className="text-[0.7rem] font-medium text-ink tabular-nums bg-glow/85 px-2 py-0.5 rounded-full">8° tilt</span>
              <span className="h-px w-9 bg-glow/80" />
            </div>
            <div className="absolute right-[5%] bottom-[26%] hidden sm:flex items-center gap-2 z-20">
              <span className="h-px w-9 bg-glow/80" />
              <span className="text-[0.7rem] font-medium text-ink bg-glow/85 px-2 py-0.5 rounded-full">Tailbone relief</span>
            </div>
          </div>
        </figure>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pb-8">
        <div className="flex items-center gap-3 text-ink-soft">
          <span className="mono-label text-[0.6rem]">Scroll</span>
          <span className="h-px w-12 bg-line-strong" />
        </div>
      </div>
    </section>
  )
}
