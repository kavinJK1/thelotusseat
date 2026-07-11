import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-paper overflow-hidden">
      {/* Measured-grid backdrop */}
      <div aria-hidden className="absolute inset-0 tech-grid tech-grid-fade opacity-70" />

      {/* Title block — datasheet header, not an eyebrow */}
      <div className="relative z-10 border-b border-line/70">
        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 pt-20 md:pt-24 pb-3 flex items-center justify-between">
          <span className="mono-label text-[0.66rem]">MEDITATION SEAT · MODEL LS&#8209;01</span>
          <span className="mono-label text-[0.66rem] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cork inline-block" />
            PRE&#8209;ORDER OPEN
          </span>
        </div>
      </div>

      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-x-12 gap-y-12 items-center py-12 md:py-16">
        {/* Left — statement */}
        <div className="max-w-xl">
          <h1 className="font-display font-semibold text-ink leading-[0.98] tracking-[-0.035em] text-[clamp(2.6rem,7vw,5rem)]">
            Sit better.<br />Meditate longer.
          </h1>

          <p className="mt-7 text-ink-soft text-lg leading-relaxed max-w-md">
            An ergonomic meditation seat engineered around the biomechanics of
            posture — an 8° base tilt, a ramped natural-latex system, and a central
            relief channel. Comfort by design, not by softness.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-ink text-paper px-6 py-3.5 rounded-[3px] text-sm font-medium hover:bg-graphite-soft transition-colors"
            >
              Pre-Order Now
              <span className="text-paper/55">↗</span>
            </Link>
            <Link
              href="#engineering"
              className="inline-flex items-center justify-center gap-2 border border-line-strong text-ink px-6 py-3.5 rounded-[3px] text-sm font-medium hover:border-ink transition-colors"
            >
              See the engineering
            </Link>
          </div>

          {/* Spec ticker — real data, mono */}
          <dl className="mt-11 grid grid-cols-3 gap-px bg-line border border-line max-w-md">
            {[
              ['08°', 'Base tilt'],
              ['100%', 'Natural latex'],
              ['30–60m', 'Comfortable sit'],
            ].map(([v, k]) => (
              <div key={k} className="bg-paper px-4 py-3.5">
                <dt className="font-mono text-xl text-ink tabular-nums leading-none">{v}</dt>
                <dd className="mono-label text-[0.62rem] mt-1.5">{k}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right — annotated product figure */}
        <figure className="relative reg-frame border border-line bg-surface/60">
          {/* Chipped: the photograph is the brightest thing on the stage, so the
              caption needs its own ground to stay legible over it. */}
          <figcaption className="absolute top-2.5 left-3 z-20 mono-label text-[0.62rem] bg-paper/85 text-ink px-1.5 py-0.5 rounded-[2px]">
            FIG.&nbsp;A — ELEVATION
          </figcaption>

          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/images/product/seat-elevation.jpg"
              alt="The Lotus Seat in three-quarter elevation: a cream cotton-linen cushion with a terracotta yoke and gold lotus embroidery, seated on a solid cork base"
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />

            {/* Annotation — tilt angle */}
            <div className="absolute left-[6%] top-[30%] hidden sm:flex items-center gap-2 z-20">
              <span className="font-mono text-[0.68rem] text-cork-deep tabular-nums bg-paper/85 px-1.5 py-0.5 rounded-[2px]">
                8° TILT
              </span>
              <span className="h-px w-9 bg-cork/70" />
            </div>

            {/* Annotation — relief channel */}
            <div className="absolute right-[5%] bottom-[26%] hidden sm:flex items-center gap-2 z-20">
              <span className="h-px w-9 bg-cork/70" />
              <span className="font-mono text-[0.68rem] text-cork-deep bg-paper/85 px-1.5 py-0.5 rounded-[2px]">
                RELIEF CH.
              </span>
            </div>
          </div>

          {/* Dimension rule footer */}
          <div className="flex items-center justify-between border-t border-line px-3 py-2">
            <span className="mono-label text-[0.62rem]">W 500&nbsp;mm</span>
            <span className="mono-label text-[0.62rem]">D 440&nbsp;mm</span>
            <span className="mono-label text-[0.62rem]">CORK · LATEX · COTTON</span>
          </div>
        </figure>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 pb-8">
        <div className="flex items-center gap-3 text-ink-soft">
          <span className="mono-label text-[0.62rem]">SCROLL</span>
          <span className="h-px w-12 bg-line-strong" />
        </div>
      </div>
    </section>
  )
}
