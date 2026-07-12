'use client'

import { useState } from 'react'
import FadeIn from '@/components/FadeIn'

const faqs = [
  {
    q: 'Why this seat over a regular meditation cushion?',
    a: 'A regular cushion offers padding but does nothing for posture. The Lotus Seat actively positions the pelvis — through its 8° tilt and ramped latex layers — so the spine aligns naturally without effort. That structural difference is what allows longer, more comfortable sits.',
  },
  {
    q: 'Why natural latex instead of memory foam?',
    a: 'Memory foam is compressive — you sink in, which destabilises posture and traps heat. Natural latex is responsive — it pushes back evenly, supports weight without deforming, and breathes far better. For long, still sitting, latex is decisively superior.',
  },
  {
    q: 'Which postures and styles does it support?',
    a: 'All seated cross-legged postures: Siddhasana, Sukhasana (easy pose), Burmese, Half Lotus, and variations. It works equally for mindfulness, breathwork, and Vipassana-style practice.',
  },
  {
    q: 'Is it suitable for beginners?',
    a: 'Especially so. Beginners often abandon practice because of discomfort. The ergonomic support makes sitting immediately more accessible, letting you build a consistent habit before the body has fully adapted to the posture.',
  },
  {
    q: 'How do I care for and clean it?',
    a: 'The cover is removable and machine-washable on a gentle cool cycle; lay flat to dry. Spot-clean the cork base and latex cushion only — avoid soaking. Keep out of prolonged direct sunlight to preserve the natural materials.',
  },
  {
    q: 'How long can I comfortably sit on it?',
    a: 'It depends on your practice level, but the seat is designed to extend comfortable sitting well beyond most cushions. Many practitioners report 30–60 minutes comfortably from early use, with the ergonomic support making an immediate difference.',
  },
  {
    q: 'When will orders ship?',
    a: 'The Lotus Seat is currently available for pre-order. We confirm shipping timelines with each pre-order customer by email. Sign up to receive production and shipping updates.',
  },
  {
    q: 'What about warranty and returns?',
    a: 'A 2-year warranty covers defects in materials and workmanship, alongside a 30-day satisfaction guarantee — if the seat hasn’t improved your practice after 30 days of use, contact us for a full refund.',
  },
]

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <p className="mono-label text-[0.66rem] mb-5 flex items-center gap-2">
            <span className="text-cork-deep">REFERENCE</span>
            <span className="w-6 h-px bg-line-strong" />
            FAQ
          </p>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.9rem,4vw,3rem)] mb-11">
            Common questions.
          </h2>
        </FadeIn>

        <div className="border-t border-line-strong">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="border-b border-line">
                <h3>
                  <button
                    className="w-full flex items-start justify-between text-left py-5 gap-5 group"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.72rem] text-cork-deep tabular-nums pt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display font-medium text-ink text-[1.02rem] tracking-[-0.01em] group-hover:text-cork-deep transition-colors">
                        {faq.q}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 mt-1 w-5 h-5 flex items-center justify-center border transition-colors ${
                        isOpen ? 'bg-ink border-ink text-paper' : 'border-line-strong text-ink-soft'
                      }`}
                      aria-hidden
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        {isOpen ? (
                          <path d="M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        ) : (
                          <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        )}
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  hidden={!isOpen}
                  className="grid grid-cols-[3.15rem_1fr] pb-6"
                >
                  <span aria-hidden />
                  <p className="text-ink-soft leading-relaxed text-[0.95rem] max-w-xl">{faq.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
