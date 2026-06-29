import FadeIn from '@/components/FadeIn'

export default function WhySection() {
  return (
    <section className="py-24 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div>
              <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">Why The Lotus Seat</p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-near-black leading-snug mb-6">
                Ergonomics meets the ancient art of seated meditation.
              </h2>
              <p className="text-warm-grey text-lg leading-relaxed mb-8">
                The Lotus Seat combines two innovations that work in harmony: an 8° inclined cork base that gently tilts the pelvis forward into its natural position, and a high-resilience natural latex cushion that supports your weight without allowing excessive sinking.
              </p>
              <p className="text-warm-grey text-lg leading-relaxed mb-8">
                Together, they create the conditions for an upright, stable, comfortable posture — the foundation every meditation tradition points toward, and the thing most cushions fail to deliver.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-sand/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-sand" />
                  </div>
                  <div>
                    <p className="font-medium text-near-black text-sm mb-1">8° Ergonomic Tilt</p>
                    <p className="text-warm-grey text-sm leading-relaxed">Angles the pelvis forward into its natural lordotic curve — no effort required.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-sand/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-sand" />
                  </div>
                  <div>
                    <p className="font-medium text-near-black text-sm mb-1">Natural Latex Support</p>
                    <p className="text-warm-grey text-sm leading-relaxed">Responsive, not compressive. Returns to shape instantly and holds your posture in place.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="relative">
              <div
                className="w-full h-[440px] rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, #E8D9C4 0%, #C4A882 50%, #9E7A52 100%)',
                  boxShadow: '0 40px 80px -20px rgba(196,168,130,0.35)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-40 h-28 mx-auto rounded-3xl mb-4 opacity-30"
                      style={{ background: 'rgba(255,255,255,0.4)' }}
                    />
                    <div
                      className="w-48 h-4 mx-auto rounded-full opacity-20"
                      style={{ background: 'rgba(255,255,255,0.4)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Stat callout */}
              <div className="absolute -bottom-5 -left-5 bg-warm-white rounded-2xl px-5 py-4 shadow-lg border border-warm-border">
                <p className="font-serif text-2xl font-medium text-near-black">8°</p>
                <p className="text-warm-grey text-xs">Ergonomic tilt angle</p>
              </div>
              <div className="absolute -top-5 -right-5 bg-near-black rounded-2xl px-5 py-4 shadow-lg">
                <p className="font-serif text-2xl font-medium text-warm-white">100%</p>
                <p className="text-warm-grey text-xs">Natural latex</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
