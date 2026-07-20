import Image from 'next/image'
import FadeIn from '@/components/FadeIn'

/*
 * Section 7 — Gallery.
 *
 * The object, photographed from every side plus two material close-ups. Minimal
 * mono captions, no lifestyle stock — the real unit is the argument. An editorial
 * grid rather than a uniform tile wall, so it reads as considered, not catalogued.
 */

interface Shot {
  src: string
  alt: string
  cap: string
  fig: string
  className: string
  priority?: boolean
}

const shots: readonly Shot[] = [
  {
    src: '/images/product/seat-elevation.jpg',
    alt: 'The Lotus Seat in three-quarter front elevation — cream cotton-linen cushion, terracotta yoke and cork base',
    cap: 'FRONT · THREE-QUARTER',
    fig: 'G-01',
    className: 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto',
  },
  {
    src: '/images/product/seat-profile.jpg',
    alt: 'Side profile of the seat, the comfort layer ramping from a thin front edge to a raised rear crest',
    cap: 'SIDE PROFILE',
    fig: 'G-02',
    className: 'aspect-square',
  },
  {
    src: '/images/product/seat-back.jpg',
    alt: 'Rear view of the seat showing the tone-on-tone lotus embroidery on the raised back panel',
    cap: 'REAR · LOTUS DETAIL',
    fig: 'G-03',
    className: 'aspect-square',
  },
  {
    src: '/images/product/cushion-close.jpg',
    alt: 'Close-up of the woven cotton-linen cover and quilted contour seams',
    cap: 'COVER · CLOSE',
    fig: 'G-04',
    className: 'aspect-square',
  },
  {
    src: '/images/product/cork-tray.jpg',
    alt: 'The bare cork composite base, its grain and moulded rim visible in raking light',
    cap: 'CORK BASE',
    fig: 'G-05',
    className: 'aspect-square',
  },
  {
    src: '/images/product/seat-stack.jpg',
    alt: 'The latex cushion lifted clear of its cork tray, showing the full depth of the core',
    cap: 'LATEX CORE',
    fig: 'G-06',
    className: 'md:col-span-2 aspect-[2/1] md:aspect-auto',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-surface border-y border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
          <div>
            <p className="mono-label text-[0.66rem] mb-5 flex items-center gap-2">
              <span className="text-cork-deep">FIG. 06</span>
              <span className="w-6 h-px bg-line-strong" />
              GALLERY
            </p>
            <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.9rem,4vw,3rem)] max-w-lg">
              Every angle of the actual seat.
            </h2>
          </div>
          <p className="text-ink-soft text-sm max-w-xs leading-relaxed">
            The first production unit, photographed as-is. No renders standing in for the
            object, no borrowed serenity.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 md:auto-rows-[minmax(0,1fr)]">
          {shots.map((s, i) => (
            <FadeIn key={s.fig} delay={i * 50} className={s.className}>
              <figure className="reg-frame group relative h-full w-full overflow-hidden border border-line bg-paper">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  priority={s.priority}
                  sizes="(min-width: 768px) 40vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <figcaption className="absolute bottom-0 inset-x-0 flex items-center justify-between px-3 py-2 bg-paper/85 border-t border-line">
                  <span className="mono-label text-[0.6rem] text-ink">{s.cap}</span>
                  <span className="font-mono text-[0.6rem] text-cork-deep tabular-nums">{s.fig}</span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
