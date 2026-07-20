import Image from 'next/image'
import FadeIn from '@/components/FadeIn'

const materials = [
  {
    name: 'Cork base',
    body: 'A solid, grippy base that stays put on any floor. Naturally antibacterial, and harvested without cutting down a single tree.',
    photo: '/images/product/cork-tray.jpg',
    alt: 'The bare cork base, its grain visible in raking light',
  },
  {
    name: 'Natural latex',
    body: 'Firm, springy and breathable. It supports you without going flat or trapping heat, sit after sit.',
    photo: '/images/product/seat-stack.jpg',
    alt: 'The latex cushion lifted clear of its cork base, showing its full depth',
  },
  {
    name: 'Woven cotton cover',
    body: 'Soft, durable and removable for washing. Finished with a small lotus stitched into the back panel.',
    photo: '/images/product/seat-back.jpg',
    alt: 'The woven cover from behind, with the lotus embroidered on the raised back',
  },
]

const specs = [
  { label: 'Size', value: '500 × 440 mm' },
  { label: 'Weight', value: 'About 2 kg' },
  { label: 'Forward tilt', value: '8°' },
  { label: 'Base', value: 'Natural cork' },
  { label: 'Cushion', value: 'Natural latex' },
  { label: 'Cover', value: 'Cotton-linen, removable & washable' },
  { label: 'Warranty', value: '2 years · 30-day returns' },
]

export default function Details() {
  return (
    <section id="details" className="py-20 md:py-28 bg-surface border-y border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <p className="mono-label text-[0.72rem] mb-4 text-cork-deep">04 — The details</p>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.9rem,4vw,3rem)] max-w-lg">
            Three honest materials, nothing you don’t need.
          </h2>
        </FadeIn>

        {/* Materials */}
        <div className="mt-12 grid md:grid-cols-3 gap-px bg-line border border-line">
          {materials.map((m, i) => (
            <FadeIn key={m.name} delay={i * 60}>
              <article className="h-full bg-paper">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={m.photo} alt={m.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="px-6 py-6">
                  <h3 className="font-display font-semibold text-ink text-lg tracking-[-0.01em]">{m.name}</h3>
                  <p className="text-ink-soft text-[0.92rem] leading-relaxed mt-2.5">{m.body}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* The plain facts */}
        <FadeIn>
          <div className="mt-8 reg-frame border border-line-strong bg-paper">
            <div className="border-b border-line-strong px-5 sm:px-7 py-4">
              <p className="font-display font-semibold text-ink text-lg tracking-[-0.01em]">The plain facts</p>
            </div>
            <dl className="sm:grid sm:grid-cols-2">
              {specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-baseline justify-between gap-4 px-5 sm:px-7 py-3.5 border-b border-line ${
                    i % 2 === 0 ? 'sm:border-r' : ''
                  }`}
                >
                  <dt className="text-ink-soft text-[0.92rem]">{s.label}</dt>
                  <dd className="font-mono text-[0.82rem] text-ink text-right">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
