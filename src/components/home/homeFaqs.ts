import type { Faq } from '@/lib/seo/schema'

/**
 * The homepage FAQ, kept in plain language and lifted out of the component so the
 * visible accordion and the FAQPage structured data on `/` are the same strings.
 * These questions don't repeat the ones on /faq or the cluster pages — duplicated
 * Q&A across URLs makes Google pick one page and bury the rest.
 */
export const homeFaqs: readonly Faq[] = [
  {
    q: 'How is this different from a normal meditation cushion?',
    a: 'A normal cushion just adds padding under you. The Lotus Seat is shaped to tilt you forward by 8°, which rolls your hips into the right position so your back straightens on its own. Better posture is what makes it comfortable — not softness.',
  },
  {
    q: 'Why latex instead of memory foam?',
    a: 'Memory foam lets you sink in, so your posture collapses and it traps heat. Natural latex is springy — it pushes back evenly, holds you up without going flat, and breathes far better. For sitting still for a long time, latex is the better choice.',
  },
  {
    q: 'Which ways of sitting does it work for?',
    a: 'Any cross-legged seat — easy pose, Burmese, half lotus and full lotus all work well, and it suits mindfulness, breathwork and Vipassana-style sitting. It isn’t made for kneeling (seiza); a kneeling bench is the right tool for that.',
  },
  {
    q: 'Is it good for beginners?',
    a: 'Especially so. A lot of people give up early simply because sitting hurts. By taking care of your posture for you, the seat makes sitting easier from day one, so you can build the habit before your body has fully adapted.',
  },
  {
    q: 'How long can I sit comfortably?',
    a: 'It depends on you, but the seat is built to stretch comfortable sitting well past a normal cushion. Many people find 30 to 60 minutes comfortable from early on, and notice the difference straight away.',
  },
  {
    q: 'How do I clean it?',
    a: 'The cover unzips and goes in the machine on a gentle cool wash — lay it flat to dry. Wipe the cork base and latex clean rather than soaking them, and keep the seat out of long spells of direct sun.',
  },
  {
    q: 'When will it ship?',
    a: 'The Lotus Seat is on pre-order at €199, with the first seats scheduled to ship in March 2027. We confirm the timing with you by email when you order.',
  },
  {
    q: 'What if it doesn’t work for me?',
    a: 'Every seat comes with a 2-year warranty against faults, plus a 30-day trial — if it hasn’t improved your sitting after 30 days, get in touch for a full refund.',
  },
]
