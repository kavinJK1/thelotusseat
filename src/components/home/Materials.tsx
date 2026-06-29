'use client'

import { useRef } from 'react'
import FadeIn from '@/components/FadeIn'

const materials = [
  {
    id: 'cork',
    name: 'Natural Cork Composite',
    part: 'Base',
    claim:
      'Sustainably harvested. Cork bark regenerates after every harvest — no trees are cut. Naturally antimicrobial, lightweight, and built to last decades.',
    detail: 'Antimicrobial · Lightweight · Excellent grip · Sustainably harvested',
    // Warm earthy cork tones
    gradient: 'linear-gradient(145deg, #7A5C38 0%, #9A7248 40%, #C49A6C 80%, #DEB88A 100%)',
    texture: [
      { size: 120, x: 15, y: 20, opacity: 0.08 },
      { size: 80, x: 60, y: 55, opacity: 0.06 },
      { size: 50, x: 75, y: 15, opacity: 0.05 },
    ],
    accent: '#9A7248',
  },
  {
    id: 'latex',
    name: 'Natural Latex',
    part: 'Cushion Layers',
    claim:
      'Tapped from rubber trees, not synthesised. Responds instantly unlike memory foam, which allows the body to sink and lose posture. Biodegradable and breathable.',
    detail: 'ILD 45–85 · Instant response · Breathable · Hypoallergenic · Biodegradable',
    // Soft cream latex tones
    gradient: 'linear-gradient(145deg, #C8B488 0%, #D9C8A0 40%, #EDE0C4 80%, #F5EDD8 100%)',
    texture: [
      { size: 160, x: 10, y: 10, opacity: 0.06 },
      { size: 90, x: 65, y: 60, opacity: 0.05 },
    ],
    accent: '#A89060',
  },
  {
    id: 'cotton',
    name: 'Cotton-Poly Upholstery',
    part: 'Cover',
    claim:
      '300–350 GSM woven fabric in warm ivory. Low-stretch, pre-shrunk, and breathable across long sessions. Finished with a tone-on-tone lotus embroidery.',
    detail: '300–350 GSM · Warm ivory · Lotus embroidery · Pre-shrunk · Low-stretch',
    // Warm ivory fabric tones
    gradient: 'linear-gradient(145deg, #E8DCC8 0%, #F0E8D8 40%, #F8F2E8 80%, #FFFCF8 100%)',
    texture: [
      { size: 200, x: 5, y: 5, opacity: 0.04 },
      { size: 60, x: 70, y: 65, opacity: 0.04 },
    ],
    accent: '#C4A882',
  },
]

export default function Materials() {
  const stripRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-24 bg-near-black overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <FadeIn>
          <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-4">
            Natural by Design
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-serif text-3xl md:text-4xl font-medium leading-snug max-w-md"
              style={{ color: '#F5F0E8' }}>
              Every material chosen<br />with intention.
            </h2>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
              No synthetics, no shortcuts. Cork, latex, and woven cotton — each selected for durability,
              breathability, and environmental responsibility.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Horizontal scroll strip */}
      <div
        ref={stripRef}
        className="flex gap-5 px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2))] overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {materials.map((mat, i) => (
          <div
            key={mat.id}
            className="shrink-0 snap-start w-[85vw] md:w-[420px] rounded-3xl overflow-hidden border border-white/[0.07]"
          >
            {/* Texture area */}
            <div
              className="relative w-full overflow-hidden"
              style={{ height: 220, background: mat.gradient }}
            >
              {/* Organic texture blobs */}
              {mat.texture.map((blob, j) => (
                <div
                  key={j}
                  className="absolute rounded-full"
                  style={{
                    width: blob.size,
                    height: blob.size,
                    left: `${blob.x}%`,
                    top: `${blob.y}%`,
                    background: 'rgba(255,255,255,1)',
                    opacity: blob.opacity,
                    filter: 'blur(32px)',
                  }}
                />
              ))}
              {/* Part label */}
              <div className="absolute top-5 left-6">
                <span
                  className="text-[10px] font-medium tracking-[0.18em] uppercase px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    color: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {mat.part}
                </span>
              </div>
              {/* Index */}
              <div
                className="absolute bottom-5 right-6 font-serif font-medium leading-none select-none"
                style={{ fontSize: 72, color: 'rgba(255,255,255,0.07)' }}
              >
                0{i + 1}
              </div>
            </div>

            {/* Content */}
            <div className="px-7 py-6" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <h3 className="font-serif text-xl font-medium mb-3" style={{ color: '#F5F0E8' }}>
                {mat.name}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.48)' }}>
                {mat.claim}
              </p>
              <p
                className="text-[10px] font-medium tracking-wider uppercase border-t pt-4"
                style={{ color: mat.accent, borderColor: 'rgba(255,255,255,0.1)' }}
              >
                {mat.detail}
              </p>
            </div>
          </div>
        ))}

        {/* End spacer so last card snaps fully into view */}
        <div className="shrink-0 w-6 md:w-12" />
      </div>

      {/* Scroll hint */}
      <div className="flex items-center gap-3 px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2))] mt-6">
        <div className="flex gap-1">
          {materials.map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{ width: 6, height: 6, background: 'rgba(196,168,130,0.35)' }}
            />
          ))}
        </div>
        <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Scroll to explore
        </span>
      </div>
    </section>
  )
}
