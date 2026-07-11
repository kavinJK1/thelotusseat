import FadeIn from '@/components/FadeIn'

const specs = [
  { label: 'Width', value: '500 mm' },
  { label: 'Depth', value: '440 mm' },
  { label: 'Base tilt angle', value: '8°' },
  { label: 'Base material', value: 'Natural cork composite' },
  { label: 'Base cushion', value: 'Natural latex · ILD 75–85 · 70 mm' },
  { label: 'Top cushion', value: 'Natural latex · ILD 45–55 · 32–50 mm ramped' },
  { label: 'Relief channel depth', value: '10–15 mm' },
  { label: 'Cover fabric', value: 'Cotton-poly / linen · 300–350 GSM' },
  { label: 'Cover colour', value: 'Warm ivory / natural cream' },
  { label: 'Detail', value: 'Tone-on-tone lotus embroidery' },
  { label: 'Postures', value: 'Siddhasana · Sukhasana · Burmese · Half Lotus' },
]

export default function Specs() {
  return (
    <section className="py-20 md:py-28 bg-surface border-y border-line">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <div className="reg-frame border border-line-strong bg-paper">
            {/* Title block */}
            <div className="flex items-center justify-between border-b border-line-strong px-5 sm:px-7 py-4">
              <div>
                <p className="mono-label text-[0.62rem]">SPECIFICATION</p>
                <p className="font-display font-semibold text-ink text-lg tracking-[-0.01em] mt-0.5">Model LS-01</p>
              </div>
              <span className="mono-label text-[0.62rem] text-right leading-relaxed">
                REV. A<br />PRE-PRODUCTION
              </span>
            </div>

            {/* Datasheet rows */}
            <dl>
              {specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`grid grid-cols-[1fr_auto] sm:grid-cols-[16rem_1fr] gap-4 px-5 sm:px-7 py-3.5 items-baseline ${
                    i < specs.length - 1 ? 'border-b border-line' : ''
                  }`}
                >
                  <dt className="text-ink-soft text-[0.9rem]">{spec.label}</dt>
                  <dd className="font-mono text-[0.82rem] text-ink tabular-nums text-right sm:text-left">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
