import Image from 'next/image'
import Link from 'next/link'
import { SHIP_ESTIMATE, formatMinorUnits, priceFor } from '@/lib/commerce/product'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-paper overflow-hidden">
      <div aria-hidden className="absolute inset-0 tech-grid tech-grid-fade opacity-70" />

      <div className="relative z-10 border-b border-line/70">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 pt-20 md:pt-24 pb-3 flex items-center justify-between">
          <span className="mono-label text-[0.66rem]">The Lotus Seat</span>
          <span className="mono-label text-[0.66rem] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cork inline-block" />
            Pre-order open
          </span>
        </div>
      </div>

      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-x-12 gap-y-12 items-center py-12 md:py-16">
        {/* Left — the promise, in one breath */}
        <div className="max-w-xl">
          <h1 className="font-display font-semibold text-ink leading-[0.98] tracking-[-0.035em] text-[clamp(2.6rem,7vw,5rem)]">
            Sit better.<br />Meditate longer.
          </h1>

          <p className="mt-7 text-ink-soft text-lg leading-relaxed max-w-md">
            Most cushions just add padding. The Lotus Seat gently tips you forward, so
            your back straightens on its own — and stays comfortable long after a normal
            cushion would have you shifting around.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 bg-ink text-paper px-6 py-3.5 rounded-[3px] text-sm font-medium hover:bg-graphite-soft transition-colors"
            >
              Pre-order now
              <span className="text-paper/55">↗</span>
            </Link>
            <Link
              href="#problem"
              className="inline-flex items-center justify-center gap-2 border border-line-strong text-ink px-6 py-3.5 rounded-[3px] text-sm font-medium hover:border-ink transition-colors"
            >
              See how it works
            </Link>
          </div>

          <p className="mt-5 mono-label text-[0.66rem] flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            <span className="text-ink">
              {formatMinorUnits(priceFor('EUR').itemMinorUnits, 'EUR')}
            </span>
            <span aria-hidden className="text-line-strong">·</span>
            <span>{SHIP_ESTIMATE.label}</span>
            <span aria-hidden className="text-line-strong">·</span>
            <span>Cancel any time before it ships</span>
          </p>

          {/* Three facts, in plain language */}
          <dl className="mt-11 grid grid-cols-3 gap-px bg-line border border-line max-w-md">
            {[
              ['8°', 'Forward tilt'],
              ['Latex', 'Firm, springy support'],
              ['30–60m', 'Comfortable sitting'],
            ].map(([v, k]) => (
              <div key={k} className="bg-paper px-4 py-3.5">
                <dt className="font-mono text-xl text-ink tabular-nums leading-none">{v}</dt>
                <dd className="mono-label text-[0.62rem] mt-1.5">{k}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — the product */}
        <figure className="relative reg-frame border border-line bg-surface/60">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src="/images/product/seat-elevation.jpg"
              alt="The Lotus Seat: a cream cotton-linen meditation seat with a terracotta back panel and gold lotus, on a solid cork base"
              fill
              priority
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />

            {/* Two plain pointers */}
            <div className="absolute left-[6%] top-[30%] hidden sm:flex items-center gap-2 z-20">
              <span className="font-mono text-[0.68rem] text-cork-deep tabular-nums bg-paper/85 px-1.5 py-0.5 rounded-[2px]">
                8° tilt
              </span>
              <span className="h-px w-9 bg-cork/70" />
            </div>
            <div className="absolute right-[5%] bottom-[26%] hidden sm:flex items-center gap-2 z-20">
              <span className="h-px w-9 bg-cork/70" />
              <span className="font-mono text-[0.68rem] text-cork-deep bg-paper/85 px-1.5 py-0.5 rounded-[2px]">
                Tailbone relief
              </span>
            </div>
          </div>
        </figure>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pb-8">
        <div className="flex items-center gap-3 text-ink-soft">
          <span className="mono-label text-[0.62rem]">Scroll</span>
          <span className="h-px w-12 bg-line-strong" />
        </div>
      </div>
    </section>
  )
}
