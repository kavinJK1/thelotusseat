import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-warm-white">
      {/* Soft background blob */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #C4A882 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        <p className="inline-block text-sand text-xs font-medium tracking-[0.2em] uppercase mb-8 px-4 py-1.5 border border-sand/40 rounded-full">
          Pre-Order Now Open
        </p>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-near-black leading-[1.05] tracking-tight mb-6">
          Sit Better.<br />
          <span className="text-sand">Meditate</span> Longer.
        </h1>

        <p className="text-warm-grey text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          The Lotus Seat is a premium ergonomic meditation seat that supports your natural posture, relieves discomfort, and lets you sit for longer — session after session.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/contact"
            className="bg-near-black text-warm-white px-8 py-4 rounded-full text-sm font-medium hover:bg-near-black/80 transition-colors duration-200 w-full sm:w-auto text-center"
          >
            Pre-Order Now
          </Link>
          <Link
            href="#product"
            className="border border-near-black/30 text-near-black px-8 py-4 rounded-full text-sm font-medium hover:border-near-black transition-colors duration-200 w-full sm:w-auto text-center"
          >
            Learn More
          </Link>
        </div>

        {/* Product visual placeholder */}
        <div className="max-w-lg mx-auto">
          <div
            className="w-full h-64 md:h-80 rounded-3xl"
            style={{
              background: 'linear-gradient(160deg, #D9C5A8 0%, #C4A882 40%, #A8865C 100%)',
              boxShadow: '0 40px 80px -20px rgba(196,168,130,0.4)',
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div
                  className="w-32 h-20 mx-auto rounded-2xl mb-3 opacity-40"
                  style={{ background: 'rgba(255,255,255,0.3)' }}
                />
                <p className="text-warm-white/60 text-xs tracking-widest uppercase">Product Photo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warm-grey/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-warm-grey/30 animate-pulse" />
      </div>
    </section>
  )
}
