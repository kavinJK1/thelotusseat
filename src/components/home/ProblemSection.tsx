import FadeIn from '@/components/FadeIn'

const problems = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C12 2 8 6 8 10a4 4 0 0 0 8 0c0-4-4-8-4-8z" />
        <path d="M12 14v8" />
        <path d="M9 22h6" />
      </svg>
    ),
    title: 'Slouching & Back Pain',
    description: 'Standard cushions let your pelvis tip backward, forcing your spine to curve and your shoulders to round.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="18" rx="8" ry="3" />
        <path d="M12 15V5" />
        <path d="M9 8l3-3 3 3" />
      </svg>
    ),
    title: 'Tailbone Pressure',
    description: 'Flat cushions concentrate pressure directly on the coccyx, creating a persistent ache that derails your focus.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 4L6 20" />
        <path d="M6 4l4 8" />
        <path d="M14 12l4 8" />
      </svg>
    ),
    title: 'Leg Numbness',
    description: 'Poor weight distribution compresses nerves and blood vessels in your legs within minutes of sitting.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Short Sessions',
    description: 'When sitting is uncomfortable, your mind focuses on the pain — not the practice. Sessions end before they should.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
    title: 'Constant Adjusting',
    description: 'Fidgeting to find a comfortable position pulls you out of deep states — and keeps you there.',
  },
]

export default function ProblemSection() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-4">The Problem</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-near-black mb-4">
              Most meditation cushions only offer softness.
            </h2>
            <p className="text-warm-grey text-lg max-w-2xl mx-auto">
              They do nothing to address the structural reasons why sitting is uncomfortable in the first place.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((problem, i) => (
            <FadeIn key={problem.title} delay={i * 80}>
              <div className="bg-warm-white rounded-2xl p-7 border border-warm-border hover:border-sand/40 transition-colors duration-300">
                <div className="text-sand mb-4">{problem.icon}</div>
                <h3 className="font-medium text-near-black mb-2">{problem.title}</h3>
                <p className="text-warm-grey text-sm leading-relaxed">{problem.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
