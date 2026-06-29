'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'

const chapters = [
  {
    id: 'intro',
    label: '',
    headline: 'The Lotus Seat',
    sub: 'A meditation seat engineered from the ground up. Every layer, every curve, every angle — intentional.',
    image: '/images/product/cushion-full.jpg',
    // Scale applied to the image for this chapter (zoom level)
    scale: 1.08,
    // transformOrigin controls which part of the image is the zoom anchor
    origin: '50% 55%',
    annotations: [],
  },
  {
    id: 'cork',
    label: '01',
    headline: '8° Ergonomic Tilt',
    sub: 'The cork composite base is inclined at exactly 8°. That single angle tips the pelvis forward — realigning the entire spine without effort.',
    image: '/images/product/cushion-full.jpg',
    scale: 1.9,
    origin: '50% 80%',
    annotations: [
      { label: '8° tilt', x: 62, y: 72, align: 'right' as const },
      { label: 'Cork composite', x: 38, y: 80, align: 'left' as const },
    ],
  },
  {
    id: 'layer1',
    label: '02',
    headline: 'Base Support Layer',
    sub: '70 mm of natural latex at ILD 75–85. The structural foundation — firm, flat, and consistent across hours of sitting.',
    image: '/images/product/layer1-base.jpg',
    scale: 1.12,
    origin: '50% 50%',
    annotations: [
      { label: '70 mm thick', x: 66, y: 48, align: 'right' as const },
      { label: 'Natural latex · ILD 75–85', x: 34, y: 56, align: 'left' as const },
    ],
  },
  {
    id: 'layer2',
    label: '03',
    headline: 'Ramped Comfort Layer',
    sub: '32 mm at the front, 50 mm at the rear. An 18 mm ramp that cradles the sacrum and amplifies the base tilt.',
    image: '/images/product/layer2-top.jpg',
    scale: 1.12,
    origin: '50% 50%',
    annotations: [
      { label: '50 mm rear', x: 28, y: 42, align: 'left' as const },
      { label: '32 mm front', x: 70, y: 54, align: 'right' as const },
    ],
  },
  {
    id: 'cover',
    label: '04',
    headline: 'Breathable Cover',
    sub: 'Cotton-poly linen at 300–350 GSM. Warm ivory. Tone-on-tone lotus embroidery — the only ornament on an otherwise minimal form.',
    image: '/images/product/cushion-close.jpg',
    scale: 1.22,
    origin: '50% 42%',
    annotations: [
      { label: '300–350 GSM linen', x: 63, y: 36, align: 'right' as const },
      { label: 'Lotus embroidery', x: 37, y: 28, align: 'left' as const },
    ],
  },
  {
    id: 'assembled',
    label: '',
    headline: 'One seat. Designed to last.',
    sub: 'Pre-orders are open now — limited to the first production run.',
    image: '/images/product/cushion-full.jpg',
    scale: 1.08,
    origin: '50% 50%',
    annotations: [],
    cta: true,
  },
]

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [chapter, setChapter] = useState(0)
  const [prevChapter, setPrevChapter] = useState(0)
  const [entered, setEntered] = useState(false)
  const chapterCount = chapters.length

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const totalHeight = container.scrollHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalHeight))
      const idx = Math.min(chapterCount - 1, Math.floor(progress * chapterCount))
      setChapter((prev) => {
        if (prev !== idx) setPrevChapter(prev)
        return idx
      })
      setEntered(scrolled > -80)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [chapterCount])

  const current = chapters[chapter]

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${chapterCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0D0B08]">

        {/* ── Image layers ────────────────────────────────────────────── */}
        {chapters.map((ch, i) => {
          const isActive = i === chapter
          return (
            <div
              key={ch.id}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: isActive ? 1 : 0,
                transition: 'opacity 800ms ease-in-out',
                zIndex: isActive ? 1 : 0,
              }}
            >
              {/* Image with zoom transition */}
              <img
                src={ch.image}
                alt={ch.headline}
                className="pointer-events-none select-none"
                style={{
                  width: '90%',
                  maxWidth: 900,
                  maxHeight: '72vh',
                  objectFit: 'contain',
                  objectPosition: '50% 50%',
                  transform: `scale(${isActive ? ch.scale : ch.scale * 0.96})`,
                  transformOrigin: ch.origin,
                  transition: 'transform 1600ms cubic-bezier(0.22, 1, 0.36, 1)',
                  willChange: 'transform',
                }}
              />
            </div>
          )
        })}

        {/* ── Radial vignette — blends image edges into dark background ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: `
              radial-gradient(ellipse 68% 72% at 50% 46%,
                transparent 35%,
                rgba(13,11,8,0.55) 58%,
                rgba(13,11,8,0.88) 74%,
                #0D0B08 90%
              )
            `,
          }}
        />

        {/* ── Annotation callouts ────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
          {current.annotations.map((ann, i) => (
            <div
              key={`${current.id}-${i}`}
              className="absolute flex items-center gap-1.5"
              style={{
                left: `${ann.x}%`,
                top: `${ann.y}%`,
                transform: `translate(${ann.align === 'right' ? '-100%' : '0'}, -50%)`,
                opacity: entered ? 1 : 0,
                transition: `opacity 600ms ease ${i * 120}ms`,
              }}
            >
              {ann.align === 'right' && (
                <span className="text-[10px] font-medium tracking-[0.16em] text-[#C4A882] uppercase leading-tight text-right">
                  {ann.label}
                </span>
              )}
              <span className="block w-7 h-px bg-[#C4A882]/50 shrink-0" />
              <span className="block w-1.5 h-1.5 rounded-full bg-[#C4A882] shrink-0" />
              {ann.align === 'left' && (
                <>
                  <span className="block w-7 h-px bg-[#C4A882]/50 shrink-0" />
                  <span className="text-[10px] font-medium tracking-[0.16em] text-[#C4A882] uppercase leading-tight">
                    {ann.label}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        {/* ── Chapter number (large watermark) ──────────────────────── */}
        {current.label && (
          <div
            className="absolute top-8 right-10 font-serif text-[7rem] font-medium leading-none select-none"
            style={{ zIndex: 3, color: 'rgba(255,255,255,0.04)' }}
          >
            {current.label}
          </div>
        )}

        {/* ── Progress dots ─────────────────────────────────────────── */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5"
          style={{ zIndex: 4 }}
        >
          {chapters.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                const container = containerRef.current
                if (!container) return
                const target = (i / chapterCount) * (container.scrollHeight - window.innerHeight)
                window.scrollTo({ top: container.offsetTop + target, behavior: 'smooth' })
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width: 6,
                height: i === chapter ? 24 : 6,
                background: i === chapter ? '#C4A882' : 'rgba(255,255,255,0.18)',
              }}
            />
          ))}
        </div>

        {/* ── Text panel ────────────────────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-14 pt-28"
          style={{
            zIndex: 4,
            background: 'linear-gradient(to top, #0D0B08 55%, rgba(13,11,8,0.7) 80%, transparent)',
          }}
        >
          <div
            key={current.id}
            style={{
              opacity: entered ? 1 : 0,
              transform: entered ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 500ms ease, transform 500ms ease',
              maxWidth: 480,
            }}
          >
            <h2 className="font-serif text-3xl md:text-[2.6rem] font-medium leading-tight mb-3"
              style={{ color: '#F5F0E8' }}>
              {current.headline}
            </h2>
            <p className="text-sm md:text-base leading-relaxed max-w-sm"
              style={{ color: 'rgba(255,255,255,0.42)' }}>
              {current.sub}
            </p>
            {(current as typeof chapters[number] & { cta?: boolean }).cta && (
              <Link
                href="/contact"
                className="inline-flex items-center mt-7 px-7 py-3.5 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
                style={{ background: '#C4A882', color: '#1A1A1A' }}
              >
                Pre-Order Now
              </Link>
            )}
          </div>
        </div>

        {/* ── Scroll hint (first chapter only) ──────────────────────── */}
        {chapter === 0 && (
          <div
            className="absolute bottom-6 right-12 flex items-center gap-2 text-xs tracking-[0.18em] uppercase"
            style={{ zIndex: 4, color: 'rgba(255,255,255,0.2)' }}
          >
            <span>Scroll</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M2.5 7l3.5 4 3.5-4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
    </section>
  )
}
