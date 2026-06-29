'use client'

import { useRef, useState, useEffect } from 'react'

const features = [
  {
    id: 'tilt',
    label: '01',
    title: '8° Ergonomic Tilt',
    description:
      'The inclined cork composite base rotates the pelvis into its natural forward position — realigning the entire spine without muscular effort.',
    detail: 'Natural cork composite · 8° tilt · Anti-slip base',
    image: '/images/product/cushion-full.jpg',
    zoom: { scale: 1.55, origin: '50% 84%' },
  },
  {
    id: 'latex',
    label: '02',
    title: 'Responsive Latex Base',
    description:
      '70 mm of natural latex at ILD 75–85. Supportive, not sinking — it returns to shape instantly, maintaining your posture session after session.',
    detail: 'Natural latex · ILD 75–85 · 70 mm thick',
    image: '/images/product/layer1-base.jpg',
    zoom: { scale: 1.18, origin: '50% 50%' },
  },
  {
    id: 'ramp',
    label: '03',
    title: 'Ramped Comfort Layer',
    description:
      '32 mm at the front, 50 mm at the rear. An 18 mm graduated ramp that cradles the sacrum and lower back, working in concert with the base tilt.',
    detail: 'Natural latex ILD 45–55 · 50 mm rear · 32 mm front',
    image: '/images/product/layer2-top.jpg',
    zoom: { scale: 1.18, origin: '50% 50%' },
  },
  {
    id: 'channel',
    label: '04',
    title: 'Central Relief Channel',
    description:
      'A shallow oval channel (10–15 mm depth) lifts the coccyx away from contact. Tailbone pressure is one of the most common reasons sessions end too soon.',
    detail: '10–15 mm depth · Precisely sculpted · Coccyx off-loading',
    image: '/images/product/cushion-close.jpg',
    zoom: { scale: 1.38, origin: '50% 46%' },
  },
  {
    id: 'cover',
    label: '05',
    title: 'Breathable Cover',
    description:
      'Upholstery-grade cotton-poly linen at 300–350 GSM in warm ivory. A tone-on-tone lotus embroidery on the rear panel — the only ornament on an otherwise minimal form.',
    detail: 'Cotton-poly linen · 300–350 GSM · Warm ivory · Lotus embroidery',
    image: '/images/product/cushion-close.jpg',
    zoom: { scale: 1.0, origin: '50% 50%' },
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
    <section id="product" className="bg-warm-white">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8 text-center">
        <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-4">
          Built for the Long Sit
        </p>
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-near-black">
          Five systems. One purpose.
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col md:flex-row md:gap-16">

          {/* Left: sticky product image — desktop only */}
          <div className="hidden md:block md:w-1/2 shrink-0">
            <div className="sticky top-24 h-[calc(100vh-7rem)] flex items-center">
              <div
                className="relative w-full overflow-hidden rounded-3xl"
                style={{
                  background: 'linear-gradient(150deg, #F5F0E8 0%, #EDE6D8 100%)',
                  aspectRatio: '4 / 3',
                  boxShadow: '0 24px 60px -12px rgba(196,168,130,0.25)',
                }}
              >
                {features.map((f, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={f.id}
                    src={f.image}
                    alt={f.title}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '2rem',
                      opacity: i === active ? 1 : 0,
                      transform: `scale(${i === active ? f.zoom.scale : f.zoom.scale * 0.96})`,
                      transformOrigin: f.zoom.origin,
                      transition:
                        'opacity 700ms ease, transform 900ms cubic-bezier(0.22, 1, 0.36, 1)',
                      pointerEvents: 'none',
                    }}
                  />
                ))}

                {/* Chapter number watermark */}
                <div
                  className="absolute bottom-4 right-5 font-serif text-[5rem] font-medium leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(196,168,130,0.14)' }}
                >
                  {features[active].label}
                </div>

                {/* Progress dots */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                  {features.map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: 4,
                        height: i === active ? 20 : 4,
                        background: i === active ? '#C4A882' : 'rgba(196,168,130,0.28)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: scrolling feature panels */}
          <div className="md:w-1/2">
            {features.map((feature, i) => (
              <div
                key={feature.id}
                ref={(el) => { panelRefs.current[i] = el }}
                className="min-h-screen flex flex-col justify-center py-20"
              >
                {/* Mobile: image above text */}
                <div
                  className="md:hidden mb-8 relative overflow-hidden rounded-2xl"
                  style={{
                    background: 'linear-gradient(150deg, #F5F0E8 0%, #EDE6D8 100%)',
                    aspectRatio: '4 / 3',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={feature.image}
                    alt={feature.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '1.5rem',
                      transform: `scale(${feature.zoom.scale})`,
                      transformOrigin: feature.zoom.origin,
                    }}
                  />
                </div>

                <div
                  style={{
                    opacity: active === i ? 1 : 0.28,
                    transform: `translateY(${active === i ? 0 : 10}px)`,
                    transition: 'opacity 500ms ease, transform 500ms ease',
                  }}
                >
                  <span
                    className="font-serif text-[4.5rem] font-medium leading-none select-none block mb-1"
                    style={{ color: 'rgba(196,168,130,0.22)' }}
                  >
                    {feature.label}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-near-black mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-warm-grey leading-relaxed text-base md:text-lg mb-6 max-w-sm">
                    {feature.description}
                  </p>
                  <p className="text-xs text-sand font-medium tracking-wider uppercase border-t border-warm-border pt-4 max-w-sm">
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
