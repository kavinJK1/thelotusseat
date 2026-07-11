'use client'

import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

const features = [
  {
    id: 'tilt',
    label: 'F-01',
    title: '8° ergonomic tilt',
    description:
      'The inclined cork composite base rotates the pelvis into its natural forward position — realigning the whole spine without muscular effort.',
    detail: 'NATURAL CORK COMPOSITE · 8° · ANTI-SLIP BASE',
    image: '/images/product/seat-wedge.jpg',
    alt: 'Side elevation of The Lotus Seat: the cushion rises front to back over a solid cork base, forming the 8° wedge',
    zoom: { scale: 1.15, origin: '50% 60%' },
  },
  {
    id: 'latex',
    label: 'F-02',
    title: 'Responsive latex base',
    description:
      '70 mm of natural latex at ILD 75–85. Supportive, not sinking — it returns to shape instantly, holding posture session after session.',
    detail: 'NATURAL LATEX · ILD 75–85 · 70 mm',
    image: '/images/product/seat-stack.jpg',
    alt: 'The cushion lifted clear of its cork tray, showing the full depth of the latex base beneath the cover',
    zoom: { scale: 1.14, origin: '50% 50%' },
  },
  {
    id: 'ramp',
    label: 'F-03',
    title: 'Ramped comfort layer',
    description:
      '32 mm at the front, 50 mm at the rear — an 18 mm graduated ramp that cradles the sacrum and lower back, working with the base tilt.',
    detail: 'NATURAL LATEX · ILD 45–55 · 32→50 mm',
    image: '/images/product/seat-profile.jpg',
    alt: 'Three-quarter side view of the seat, the comfort layer ramping from a thin front edge up to the raised rear crest',
    zoom: { scale: 1.12, origin: '50% 50%' },
  },
  {
    id: 'channel',
    label: 'F-04',
    title: 'Central relief channel',
    description:
      'A shallow oval channel, 10–15 mm deep, lifts the coccyx clear of contact. Tailbone pressure is a leading reason sessions end too soon.',
    detail: '10–15 mm DEPTH · COCCYX OFF-LOAD',
    image: '/images/product/seat-back.jpg',
    alt: 'Top view of the seat, the sculpted oval relief channel visible at the centre of the quilted cover',
    zoom: { scale: 1.3, origin: '50% 58%' },
  },
  {
    id: 'cover',
    label: 'F-05',
    title: 'Breathable cover',
    description:
      'Upholstery-grade cotton-poly linen at 300–350 GSM in warm ivory. A tone-on-tone lotus embroidery on the rear panel — the only ornament.',
    detail: 'COTTON-POLY LINEN · 300–350 GSM · IVORY',
    image: '/images/product/seat-elevation.jpg',
    alt: 'Close elevation of the woven cotton-linen cover, terracotta yoke and gold lotus embroidery on the raised rear panel',
    zoom: { scale: 1.45, origin: '50% 34%' },
  },
]

export default function Features() {
  const [active, setActive] = useState(0)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = features.map((_, i) => {
      const el = panelRefs.current[i]
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i)
        },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((obs) => obs?.disconnect())
  }, [])

  return (
    <section className="bg-surface border-b border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 md:pt-28 pb-6">
        <p className="mono-label text-[0.66rem] mb-5 flex items-center gap-2">
          <span className="text-cork-deep">FIG. 03</span>
          <span className="w-6 h-px bg-line-strong" />
          SYSTEMS
        </p>
        <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.9rem,4vw,3rem)] max-w-2xl">
          Five systems. One long sit.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-24">
        <div className="flex flex-col md:flex-row md:gap-14">
          {/* Sticky figure — desktop */}
          <div className="hidden md:block md:w-1/2 shrink-0">
            <div className="sticky top-20 h-[calc(100vh-6rem)] flex items-center">
              <figure className="reg-frame relative w-full border border-line bg-paper overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
                <div aria-hidden className="absolute inset-0 tech-grid opacity-30" />
                {features.map((f, i) => (
                  <div
                    key={f.id}
                    aria-hidden={i !== active}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: i === active ? 1 : 0,
                      transform: `scale(${i === active ? f.zoom.scale : f.zoom.scale * 0.97})`,
                      transformOrigin: f.zoom.origin,
                      transition: 'opacity 600ms ease, transform 900ms cubic-bezier(0.22,1,0.36,1)',
                      pointerEvents: 'none',
                    }}
                  >
                    <Image src={f.image} alt={f.alt} fill sizes="(min-width: 768px) 46vw, 100vw" className="object-cover" />
                  </div>
                ))}

                <figcaption className="absolute top-2.5 left-3 mono-label text-[0.62rem] z-10">
                  {features[active].label} · DETAIL
                </figcaption>

                {/* Progress ticks */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
                  {features.map((_, i) => (
                    <div
                      key={i}
                      className="transition-all duration-300"
                      style={{
                        width: 2,
                        height: i === active ? 22 : 8,
                        background: i === active ? 'var(--color-cork)' : 'var(--color-line-strong)',
                      }}
                    />
                  ))}
                </div>
              </figure>
            </div>
          </div>

          {/* Scrolling panels */}
          <div className="md:w-1/2">
            {features.map((feature, i) => (
              <div
                key={feature.id}
                ref={(el) => { panelRefs.current[i] = el }}
                className="md:min-h-screen flex flex-col justify-center py-12 md:py-20"
              >
                {/* Mobile figure */}
                <figure className="md:hidden mb-7 relative reg-frame border border-line bg-paper overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
                  <div aria-hidden className="absolute inset-0 tech-grid opacity-30" />
                  <div
                    className="absolute inset-0"
                    style={{ transform: `scale(${feature.zoom.scale})`, transformOrigin: feature.zoom.origin }}
                  >
                    <Image src={feature.image} alt={feature.alt} fill sizes="100vw" className="object-cover" />
                  </div>
                  <figcaption className="absolute top-2.5 left-3 mono-label text-[0.62rem]">{feature.label}</figcaption>
                </figure>

                <div
                  className="md:transition-[opacity,transform] md:duration-500"
                  style={{
                    opacity: active === i ? 1 : 0.32,
                    transform: `translateY(${active === i ? 0 : 8}px)`,
                  }}
                >
                  <span className="font-mono text-sm text-cork-deep tabular-nums">{feature.label}</span>
                  <h3 className="font-display font-semibold text-ink tracking-[-0.02em] text-[clamp(1.5rem,3vw,2.15rem)] mt-2 leading-[1.05]">
                    {feature.title}
                  </h3>
                  <p className="text-ink-soft leading-relaxed text-base md:text-lg mt-4 max-w-sm">
                    {feature.description}
                  </p>
                  <p className="font-mono text-[0.7rem] text-ink-soft tracking-[0.02em] border-t border-line pt-4 mt-6 max-w-sm">
                    {feature.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
