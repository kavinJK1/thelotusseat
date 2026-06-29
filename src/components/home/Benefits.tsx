import FadeIn from '@/components/FadeIn'

const benefits = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12C12 12 8 10 8 6a4 4 0 0 1 8 0c0 4-4 6-4 6z" />
        <path d="M12 12L8 14M12 12l4 2" />
      </svg>
    ),
    title: 'Naturally Upright Spine',
    description: 'The pelvic tilt places your spine in its natural S-curve without muscular effort.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: 'Healthy Pelvic Positioning',
    description: 'Hips slightly higher than knees creates ideal conditions for long sitting.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c-4 0-8-4-8-10S8 2 12 2s8 4 8 10-4 10-8 10z" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    title: 'Tailbone Relief',
    description: 'The sculpted central channel lifts pressure off the coccyx — the most common pain point.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </svg>
    ),
    title: 'Even Weight Distribution',
    description: 'Load is spread across the full sitting surface, reducing pressure points throughout.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 6v4l3 3" />
      </svg>
    ),
    title: 'Longer Sessions',
    description: 'Physical comfort frees your mind to settle deeper, naturally extending your practice.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 3z" />
        <path d="M17 4a2 2 0 0 0 2 2 2 2 0 0 0-2 2 2 2 0 0 0-2-2 2 2 0 0 0 2-2" />
      </svg>
    ),
    title: 'Breathable Construction',
    description: 'Natural materials stay cool and comfortable throughout your practice.',
  },
]

export default function Benefits() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-4">Key Benefits</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-near-black">
              Every detail designed for your practice.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <FadeIn key={benefit.title} delay={i * 70}>
              <div className="group bg-warm-white rounded-2xl p-7 border border-warm-border hover:border-sand/50 hover:shadow-md transition-all duration-300">
                <div className="text-sand mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {benefit.icon}
                </div>
                <h3 className="font-medium text-near-black mb-2">{benefit.title}</h3>
                <p className="text-warm-grey text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
