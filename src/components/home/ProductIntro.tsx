import FadeIn from '@/components/FadeIn'

export default function ProductIntro() {
  return (
    <section id="product" className="py-24 bg-warm-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-6">The Lotus Seat</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-near-black leading-snug mb-8">
            A meditation seat built around how your body actually works.
          </h2>
          <p className="text-warm-grey text-lg leading-relaxed">
            Most meditation cushions offer nothing more than padding. The Lotus Seat is different — it is an ergonomically engineered system that tilts your pelvis, supports your sacrum, and distributes your weight so that sitting still feels effortless. Because when your body is aligned, your mind can go deeper.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
