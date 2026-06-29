import FadeIn from '@/components/FadeIn'

const specs = [
  { label: 'Width', value: '500 mm' },
  { label: 'Depth', value: '440 mm' },
  { label: 'Base Tilt Angle', value: '8°' },
  { label: 'Base Material', value: 'Natural cork composite' },
  { label: 'Base Layer Cushion', value: 'Natural latex, soft (ILD 75–85), 70 mm' },
  { label: 'Top Layer Cushion', value: 'Natural latex, soft (ILD 45–55), 32–50 mm ramped' },
  { label: 'Relief Channel Depth', value: '10–15 mm' },
  { label: 'Cover Fabric', value: 'Cotton-poly / linen blend, 300–350 GSM' },
  { label: 'Cover Colour', value: 'Warm ivory / natural cream' },
  { label: 'Detail', value: 'Tone-on-tone lotus embroidery' },
  { label: 'Suitable Postures', value: 'Siddhasana, Sukhasana, Burmese, Half Lotus, Cross-legged' },
]

export default function Specs() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-4">Specifications</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-near-black">
              Built with intention.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="bg-warm-white rounded-3xl border border-warm-border overflow-hidden">
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex flex-col sm:flex-row sm:items-center justify-between px-7 py-4 gap-2 ${
                  i < specs.length - 1 ? 'border-b border-warm-border' : ''
                } ${i % 2 === 0 ? '' : 'bg-surface/50'}`}
              >
                <span className="text-warm-grey text-sm">{spec.label}</span>
                <span className="text-near-black text-sm font-medium sm:text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
