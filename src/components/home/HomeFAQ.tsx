'use client'

import { useState } from 'react'
import FadeIn from '@/components/FadeIn'

const faqs = [
  {
    q: 'Why this seat over a regular meditation cushion?',
    a: 'A regular cushion offers padding but does nothing for your posture. The Lotus Seat actively positions your pelvis — through its 8° tilt and ramped latex layers — so your spine aligns naturally without effort. That structural difference is what allows longer, more comfortable sits.',
  },
  {
    q: 'Why natural latex instead of memory foam?',
    a: 'Memory foam is compressive — it lets you sink in, which destabilises posture and retains heat. Natural latex is responsive — it pushes back evenly, supports your weight without deforming, and breathes much better. For meditation, where you want consistent support for long periods, latex is significantly superior.',
  },
  {
    q: 'Which postures and meditation styles does it support?',
    a: 'The Lotus Seat is designed for all seated cross-legged postures: Siddhasana, Sukhasana (easy pose), Burmese position, Half Lotus, and variations. It works equally well for mindfulness meditation, breathwork, and Vipassana-style practices.',
  },
  {
    q: 'Is it suitable for beginners?',
    a: 'Yes — especially so. Beginners often abandon their practice because of physical discomfort. The ergonomic support makes sitting immediately more accessible, allowing you to build a consistent habit before your body has fully adapted to the posture.',
  },
  {
    q: 'How do I care for and clean the seat?',
    a: 'The cover is removable and machine-washable on a gentle cycle in cool water. Lay flat to dry. The cork base and latex cushion should be spot-cleaned only — avoid soaking. Keep out of direct, prolonged sunlight to preserve the natural materials.',
  },
  {
    q: 'How long can I comfortably sit on it?',
    a: 'This depends on your current practice level, but the Lotus Seat is specifically designed to extend comfortable sitting beyond what most cushions allow. Many practitioners report sitting 30–60 minutes comfortably from early use, with the ergonomic support making a noticeable difference immediately.',
  },
  {
    q: 'When will orders ship?',
    a: 'The Lotus Seat is currently available for pre-order. We will confirm shipping timelines with each pre-order customer via email. Sign up to receive updates on production and shipping schedules.',
  },
  {
    q: 'What is the warranty?',
    a: 'The Lotus Seat comes with a 2-year warranty covering defects in materials and workmanship. Natural materials age gracefully and with proper care the seat should last many years.',
  },
  {
    q: 'What is the returns policy?',
    a: 'We offer a 30-day satisfaction guarantee. If the seat does not improve your practice after 30 days of use, contact us for a full refund. See our Shipping & Returns page for full details.',
  },
]

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-warm-white">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-14">
            <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-4">FAQ</p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-near-black">
              Common questions.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="divide-y divide-warm-border border-y border-warm-border">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between text-left py-5 gap-4 group"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-medium text-near-black group-hover:text-sand transition-colors">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-warm-border transition-all duration-200 ${
                      open === i ? 'bg-sand border-sand text-warm-white rotate-45' : 'text-warm-grey'
                    }`}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === i ? 'max-h-96 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-warm-grey leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
