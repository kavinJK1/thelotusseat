'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqCategories = [
  {
    category: 'The Product',
    faqs: [
      {
        q: 'What exactly is The Lotus Seat?',
        a: 'The Lotus Seat is a premium ergonomic meditation seat consisting of a cork composite base with an 8° tilt angle and a two-layer natural latex cushion system. It is designed to support natural upright posture in cross-legged sitting without muscular effort.',
      },
      {
        q: 'Why this seat over a regular meditation cushion?',
        a: 'Regular cushions offer padding. The Lotus Seat addresses posture structurally — tilting the pelvis into its natural position, supporting the sacrum, and relieving tailbone pressure. These changes allow the spine to align effortlessly, which is what makes sitting comfortable for extended periods.',
      },
      {
        q: 'Which postures and styles does it support?',
        a: 'The Lotus Seat works with all cross-legged sitting postures: Siddhasana, Sukhasana (easy pose), Burmese position, Half Lotus, and variations. It suits mindfulness meditation, breathwork, Vipassana, yoga nidra, and any seated contemplative practice.',
      },
      {
        q: 'Is it suitable for beginners?',
        a: 'Yes — and particularly valuable for beginners. Physical discomfort is one of the main reasons new meditators abandon their practice. The ergonomic support reduces the learning curve considerably, allowing a consistent habit to form before the body has fully adapted.',
      },
      {
        q: 'How long can I comfortably sit on it?',
        a: 'This varies by individual, but the Lotus Seat is designed to extend comfortable sitting significantly beyond what most cushions allow. Many practitioners notice an immediate difference, with 30–60 minute sits becoming accessible from early use.',
      },
    ],
  },
  {
    category: 'Materials',
    faqs: [
      {
        q: 'Why natural latex and not memory foam?',
        a: 'Memory foam deforms under heat and continues to compress over time, which destabilises posture and generates excess heat. Natural latex returns to shape instantly and maintains consistent support properties throughout a sit. For meditation, this consistency is critical. Latex is also significantly more breathable.',
      },
      {
        q: 'Is the latex truly natural?',
        a: 'Yes. We use high-grade natural latex tapped from Hevea brasiliensis trees. This is distinct from synthetic or blended latex products. Natural latex is more durable, more breathable, and more consistent in its mechanical properties.',
      },
      {
        q: 'What is the cover made from?',
        a: 'The cover is an upholstery-grade woven cotton-poly and linen blend at 300–350 GSM in warm ivory. The back panel features a tone-on-tone lotus embroidery. The cover is removable and machine-washable.',
      },
    ],
  },
  {
    category: 'Care',
    faqs: [
      {
        q: 'How do I clean The Lotus Seat?',
        a: 'The cover is removable and can be machine washed on a gentle cycle in cool water. Lay flat to dry — do not tumble dry. The cork base and latex cushion should be spot-cleaned only. Avoid soaking or saturating the materials. Keep away from prolonged direct sunlight.',
      },
      {
        q: 'How long will it last?',
        a: 'With proper care, The Lotus Seat is designed to last many years. Natural cork and latex are durable materials that age well. The 2-year warranty covers defects in materials and workmanship.',
      },
    ],
  },
  {
    category: 'Ordering & Shipping',
    faqs: [
      {
        q: 'When will orders ship?',
        a: 'The Lotus Seat is currently in pre-order phase. We will confirm shipping timelines with each pre-order customer directly via email. Sign up via our contact page to receive production and shipping updates.',
      },
      {
        q: 'What is the returns policy?',
        a: 'We offer a 30-day satisfaction guarantee from the date of delivery. If The Lotus Seat does not improve your meditation practice, contact us for a full refund. Return shipping costs are covered for manufacturing defects. See our Shipping & Returns page for full details.',
      },
      {
        q: 'What is the warranty?',
        a: 'The Lotus Seat includes a 2-year warranty covering defects in materials and workmanship. Natural wear from regular use is not covered. Contact us directly if you experience any issues.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-warm-border last:border-b-0">
      <button
        className="w-full flex items-center justify-between text-left py-5 gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-near-black group-hover:text-sand transition-colors">
          {q}
        </span>
        <span
          className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-warm-border transition-all duration-200 ${
            open ? 'bg-sand border-sand text-warm-white rotate-45' : 'text-warm-grey'
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-warm-grey leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="bg-warm-white pt-24">
      <section className="py-20 max-w-3xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-sand text-xs font-medium tracking-[0.2em] uppercase mb-5">FAQ</p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-near-black">
            Frequently asked questions.
          </h1>
        </div>

        <div className="space-y-12">
          {faqCategories.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-sand mb-1">{cat.category}</h2>
              <div className="border-t border-warm-border">
                {cat.faqs.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-surface rounded-2xl border border-warm-border text-center">
          <p className="font-medium text-near-black mb-2">Still have a question?</p>
          <p className="text-warm-grey text-sm mb-5">We are happy to help. Reach out directly.</p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-near-black text-warm-white px-6 py-3 rounded-full text-sm font-medium hover:bg-near-black/80 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
