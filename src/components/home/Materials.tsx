'use client'

import Image from 'next/image'

const materials = [
  {
    id: 'M-01',
    name: 'Natural cork composite',
    part: 'BASE',
    claim:
      'Sustainably harvested — cork bark regenerates after every harvest, so no trees are cut. Naturally antimicrobial, lightweight, and built to last decades.',
    spec: 'ANTIMICROBIAL · LIGHTWEIGHT · GRIP · RENEWABLE',
    swatch: 'linear-gradient(145deg, #7A5C38 0%, #9A7248 45%, #C49A6C 100%)',
    ink: '#F3E7D6',
    photo: '/images/product/cork-tray.jpg',
    alt: 'The bare cork tray, its grain and moulded rim visible in raking light',
  },
  {
    id: 'M-02',
    name: 'Natural latex',
    part: 'CUSHION',
    claim:
      'Tapped from rubber trees, not synthesised. Responds instantly — unlike memory foam, which lets the body sink and lose posture. Biodegradable and breathable.',
    spec: 'ILD 45–85 · INSTANT RESPONSE · BREATHABLE',
    swatch: 'linear-gradient(145deg, #B8A478 0%, #D2C097 45%, #E9DCBE 100%)',
    ink: '#33301f',
    photo: '/images/product/seat-stack.jpg',
    alt: 'The latex cushion resting on its cork tray, seen from the side — the full depth of the core',
  },
  {
    id: 'M-03',
    name: 'Cotton-poly upholstery',
    part: 'COVER',
    claim:
      '300–350 GSM woven fabric in warm ivory. Low-stretch, pre-shrunk, breathable across long sessions — finished with a tone-on-tone lotus embroidery.',
    spec: '300–350 GSM · IVORY · PRE-SHRUNK · LOTUS DETAIL',
    swatch: 'linear-gradient(145deg, #DED0BB 0%, #ECE1CE 45%, #F7EFE1 100%)',
    ink: '#37332a',
    photo: '/images/product/seat-back.jpg',
    alt: 'The woven cover from above: quilted contour seams, terracotta yoke and the gold lotus embroidery',
  },
]

export default function Materials() {
  return (
    <section className="py-20 md:py-28 bg-graphite overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-12">
        <p className="mono-label text-[0.66rem] mb-5 flex items-center gap-2 text-ink-soft">
          <span className="text-cork-bright">FIG. 04</span>
          <span className="w-6 h-px bg-line-strong" />
          MATERIALS
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.9rem,4vw,3rem)] max-w-md">
            Three materials, each chosen on the merits.
          </h2>
          <p className="text-ink-soft text-sm max-w-xs leading-relaxed">
            No synthetics, no shortcuts. Cork, latex, and woven cotton — selected for
            durability, breathability, and environmental honesty.
          </p>
        </div>
      </div>

      {/* Horizontal material strip */}
      <div className="flex gap-4 px-5 sm:px-8 md:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
        {materials.map((mat) => (
          <article
            key={mat.id}
            className="shrink-0 snap-start w-[82vw] sm:w-[380px] border border-line bg-surface/50"
          >
            {/* The material itself, photographed — not a gradient standing in for one */}
            <div className="relative aspect-square overflow-hidden" style={{ background: mat.swatch }}>
              <Image src={mat.photo} alt={mat.alt} fill sizes="(min-width: 640px) 380px, 82vw" className="object-cover" />
              <span className="absolute top-4 left-4 mono-label text-[0.62rem] px-2 py-1 bg-graphite/85 text-ink">
                {mat.part}
              </span>
              <span className="absolute bottom-3 right-4 font-mono text-[0.72rem] tabular-nums px-1.5 py-0.5 bg-graphite/85 text-ink">
                {mat.id}
              </span>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <h3 className="font-display font-semibold text-ink text-lg tracking-[-0.01em] mb-3">{mat.name}</h3>
              <p className="text-ink-soft text-sm leading-relaxed mb-6">{mat.claim}</p>
              <p className="font-mono text-[0.66rem] text-cork-bright tracking-[0.02em] border-t border-line pt-4">
                {mat.spec}
              </p>
            </div>
          </article>
        ))}
        <div className="shrink-0 w-2 sm:w-8" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-6 flex items-center gap-3">
        <span className="h-px w-10 bg-line-strong" />
        <span className="mono-label text-[0.62rem] text-ink-soft">SCROLL TO COMPARE →</span>
      </div>
    </section>
  )
}
