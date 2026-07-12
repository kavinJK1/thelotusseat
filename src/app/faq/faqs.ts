import type { Faq } from '@/lib/seo/schema'

export interface FaqCategory {
  readonly category: string
  readonly faqs: readonly Faq[]
}

/**
 * The deep reference. Deliberately does NOT repeat the questions answered on `/`
 * (see components/home/homeFaqs.ts) or on the three cluster pages: the same Q&A
 * marked up on two URLs makes Google choose one and suppress the other, and gives
 * an answer engine two competing sources for one fact. Basics live on the
 * homepage; the specifics that only a serious buyer asks live here.
 */
export const faqCategories: readonly FaqCategory[] = [
  {
    category: 'The Product',
    faqs: [
      {
        q: 'What exactly is The Lotus Seat?',
        a: 'The Lotus Seat is a premium ergonomic meditation seat: a cork composite base with a fixed 8° forward tilt, a two-layer natural latex cushion system, and a central coccyx relief channel. It is designed to hold the pelvis in a slight anterior tilt so the spine stacks upright in cross-legged sitting without muscular effort.',
      },
      {
        q: 'What are the dimensions and weight?',
        a: 'The cushion stack is 70 mm of latex at the base with a ramped top layer running 50 mm at the rear to 32 mm at the front, over the inclined cork composite base. The relief channel is 10–15 mm deep. The finished seat weighs approximately 2 kg — substantial enough to stay put on a rug or hard floor, light enough to carry to a retreat.',
      },
      {
        q: 'Can I use it on a chair, a bed or a sofa?',
        a: 'It is engineered for the floor, where the geometry between hip height and knee height is what the 8° tilt is solving for. On a soft surface like a bed or sofa the base cannot sit level, so the tilt angle is no longer the angle you are actually getting. On a firm chair it will work, but a chair already sets your hip-to-knee relationship and you would be paying for engineering you are not using.',
      },
      {
        q: 'Do I need a zabuton or mat underneath it?',
        a: 'Not for the seat itself — the cork base is stable on a hard floor and has an anti-slip finish. You may still want a mat if your ankles or knees press against a hard floor in your posture, which is a separate problem from where your pelvis sits. A zabuton solves that one; The Lotus Seat solves the pelvis.',
      },
    ],
  },
  {
    category: 'Materials',
    faqs: [
      {
        q: 'Is the latex truly natural?',
        a: 'Yes. We use high-grade natural latex tapped from Hevea brasiliensis trees, which is distinct from synthetic or blended latex products. Natural latex is more durable, more breathable, and far more consistent in its mechanical properties over a long sit.',
      },
      {
        q: 'What if I have a latex allergy?',
        a: 'Do not buy the seat without speaking to your clinician first. Natural rubber latex allergy is a genuine medical condition, and while the cushion is fully enclosed in a woven cover so there is no direct skin contact in normal use, we will not tell you that makes it safe for you — that is not our judgement to make. Contact us and we will give you the exact material composition to take to your doctor.',
      },
      {
        q: 'What does ILD mean, and why do the two layers differ?',
        a: 'ILD (Indentation Load Deflection) measures how much force it takes to compress foam by a set amount — a higher number means firmer. The base layer is ILD 75–85 and does the structural work: it must not collapse, because a collapsing base is what re-tucks the pelvis and undoes the whole design. The ramped top layer is ILD 45–55 and does the comfort work at the skin. Softness where you touch it; no give at all where it holds your skeleton.',
      },
      {
        q: 'What is the cover made from?',
        a: 'An upholstery-grade woven cotton-poly and linen blend at 300–350 GSM, with a tone-on-tone lotus embroidery on the back panel. It is removable and machine-washable.',
      },
    ],
  },
  {
    category: 'Care & Durability',
    faqs: [
      {
        q: 'Will the cushion flatten over time like a zafu?',
        a: 'No — and this is the main reason it is latex rather than kapok or buckwheat. Kapok compacts permanently and buckwheat settles, which is why an old zafu is a shorter zafu and why your posture on it changes over the months without you noticing. Natural latex is elastic: it returns to shape after every sit and holds its support characteristics for years.',
      },
      {
        q: 'How long will it last?',
        a: 'With proper care, many years. Cork and natural latex are durable materials that age well. The 2-year warranty covers defects in materials and workmanship; normal wear is not covered.',
      },
      {
        q: 'How should I store it between sits?',
        a: 'Anywhere out of prolonged direct sunlight — UV degrades natural latex over time, which is the one thing that will meaningfully shorten the seat’s life. There is no need to store it flat or unloaded; latex does not take a set the way foam does.',
      },
    ],
  },
  {
    category: 'Ordering & Shipping',
    faqs: [
      {
        q: 'What does it cost, and in which currencies?',
        a: 'The Lotus Seat is €199 — the anchor price — and is also sold in USD ($219), GBP (£175) and INR (₹18,990). Shipping is charged separately and varies by destination. Prices are held at fixed local price points rather than tracking a live exchange rate.',
      },
      {
        q: 'When will pre-orders ship?',
        a: 'First units are scheduled to ship in March 2027. We confirm timelines with each pre-order customer directly by email, and we will tell you promptly if that date moves.',
      },
      {
        q: 'What is the returns policy?',
        a: 'A 30-day satisfaction guarantee from the date of delivery. If The Lotus Seat has not improved your practice, contact us for a full refund. Return shipping costs are covered for manufacturing defects. See the Shipping & Returns page for the full terms.',
      },
      {
        q: 'What is the warranty?',
        a: 'A 2-year warranty covering defects in materials and workmanship. Natural wear from regular use is not covered. Contact us directly if you experience an issue.',
      },
    ],
  },
]

/** Flattened for the FAQPage graph — the schema quotes exactly what renders. */
export const allFaqs: readonly Faq[] = faqCategories.flatMap((category) => category.faqs)
