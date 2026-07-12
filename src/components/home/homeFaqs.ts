import type { Faq } from '@/lib/seo/schema'

/**
 * The homepage FAQ, lifted out of the component so the visible accordion and the
 * FAQPage JSON-LD on `/` are literally the same strings. Structured data whose
 * text diverges from the rendered page is what gets FAQ rich results pulled.
 *
 * These questions deliberately do not overlap with the ones on /faq, or with the
 * cluster pages' FAQs — duplicated Q&A across URLs makes Google pick one page and
 * suppress the rest, which is how you cannibalise your own rankings.
 */
export const homeFaqs: readonly Faq[] = [
  {
    q: 'What is an ergonomic meditation seat?',
    a: 'An ergonomic meditation seat is a meditation seat designed around seated biomechanics rather than padding — it fixes the angle of the pelvis, not just its height. The Lotus Seat uses an 8° inclined cork composite base to rotate the pelvis anteriorly, a two-layer natural latex cushion, and a 10–15 mm central channel that lifts the coccyx clear of the surface.',
  },
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
    a: 'All seated cross-legged postures: Siddhasana, Sukhasana (easy pose), Burmese, Half Lotus, and variations. It works equally for mindfulness, breathwork, and Vipassana-style practice. It is not designed for kneeling or seiza practice, where a kneeling bench is the correct tool.',
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
    a: 'The Lotus Seat is currently available for pre-order at €199. First units are scheduled to ship in March 2027, and we confirm timelines with each pre-order customer by email.',
  },
  {
    q: 'What about warranty and returns?',
    a: 'A 2-year warranty covers defects in materials and workmanship, alongside a 30-day satisfaction guarantee — if the seat hasn’t improved your practice after 30 days of use, contact us for a full refund.',
  },
]
