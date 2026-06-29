import FadeIn from '@/components/FadeIn'

const features = [
  {
    number: '01',
    title: 'Ergonomic Tilted Base',
    description:
      'An 8° inclined cork composite base gently tilts the pelvis into a natural forward position. This single change propagates upward through the entire spine, reducing muscular effort and encouraging an effortlessly upright posture.',
    detail: 'Natural cork composite · 8° tilt · Anti-slip base',
    flip: false,
  },
  {
    number: '02',
    title: 'Responsive Latex Cushion',
    description:
      'High-resilience natural latex — not memory foam — returns to shape quickly and provides consistent support. Unlike memory foam which allows excessive sinking and heat retention, latex maintains your posture and stays breathable throughout long sessions.',
    detail: 'Natural latex · High-resilience · ILD 75–85',
    flip: true,
  },
  {
    number: '03',
    title: 'Central Relief Channel',
    description:
      'A shallow sculpted channel (10–15 mm) runs along the centre of the cushion, lifting the coccyx away from surface contact. Tailbone pressure is one of the most common reasons practitioners cut sessions short.',
    detail: '10–15 mm depth · Precisely sculpted · Maintains firmness',
    flip: false,
  },
  {
    number: '04',
    title: 'Ramped Comfort Layer',
    description:
      'The top layer is thicker at the rear (50 mm) and tapers to the front (32 mm). This ramp supports the sacrum and lower back while allowing the front of the pelvis to settle — working in harmony with the base tilt.',
    detail: '50 mm rear · 32 mm front · Natural latex ILD 45–55',
    flip: true,
  },
  {
    number: '05',
    title: 'Breathable Construction',
    description:
      'An upholstery-grade woven cotton-poly and linen blend cover in warm ivory cream keeps air flowing around natural materials. A tone-on-tone lotus embroidery on the back panel adds a quiet mark of craft.',
    detail: '300–350 GSM fabric · Warm ivory · Lotus embroidery',
    flip: false,
  },
  {
    number: '06',
    title: 'Stable Foundation',
    description:
      'The cork base and cushion system work together to minimise micro-movements during sitting. Stability is not just comfort — it is the physical prerequisite for accessing deeper meditative states without constant readjustment.',
    detail: 'Cork composite · 500 × 440 mm footprint',
    flip: true,
  },
]

const GradientBlock = ({ flip }: { flip: boolean }) => (
  <div
    className="w-full h-64 md:h-80 rounded-3xl"
    style={{
      background: flip
        ? 'linear-gradient(135deg, #A8865C 0%, #C4A882 50%, #E8D9C4 100%)'
        : 'linear-gradient(135deg, #E8D9C4 0%, #C4A882 50%, #A8865C 100%)',
      boxShadow: '0 30px 60px -15px rgba(196,168,130,0.3)',
    }}
  />
)

export default function Features() {
  return (
    <section className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-20">
            <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-4">Product Features</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-near-black">
              Six features. One system.
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-24">
          {features.map((feature, i) => (
            <FadeIn key={feature.number}>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                  feature.flip ? 'md:[direction:rtl]' : ''
                }`}
              >
                <div className={feature.flip ? '[direction:ltr]' : ''}>
                  <GradientBlock flip={feature.flip} />
                </div>
                <div className={feature.flip ? '[direction:ltr]' : ''}>
                  <span className="text-sand/60 font-serif text-5xl font-medium">{feature.number}</span>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-near-black mt-2 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-warm-grey leading-relaxed mb-6">{feature.description}</p>
                  <p className="text-xs text-sand font-medium tracking-wider uppercase border-t border-warm-border pt-4">
                    {feature.detail}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
