import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import AnswerBlock from '@/components/seo/AnswerBlock'
import FaqAccordion from '@/components/seo/FaqAccordion'
import JsonLd from '@/components/seo/JsonLd'
import { pageMetadata } from '@/lib/seo/metadata'
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  graph,
  productSchema,
  type Faq,
} from '@/lib/seo/schema'

const PATH = '/meditation-cushion-guide'

export const metadata = pageMetadata({
  title: 'Meditation Cushion Guide — Zafu vs Bench vs Ergonomic Seat',
  description:
    'An honest comparison of the five things people sit on to meditate: the zafu, the zabuton, the kneeling bench, the folded blanket and the ergonomic seat. What each one does to your pelvis, and who should buy which.',
  path: PATH,
  image: '/images/product/seat-stack.jpg',
})

const faqs: readonly Faq[] = [
  {
    q: 'What is the best cushion for meditation?',
    a: 'It depends on your posture, not on the price. If you kneel (seiza), a kneeling bench is the right answer and no cushion beats it. If you sit cross-legged and are comfortable already, a firm zafu is enough. If you sit cross-legged and your lower back, hips or tailbone ache within twenty minutes, no amount of padding will fix that — the problem is that your pelvis is rolling backward, and you need a seat with a built-in forward tilt and hip elevation, which is what an ergonomic meditation seat provides.',
  },
  {
    q: 'What is the difference between a zafu and a zabuton?',
    a: 'A zafu is the round cushion you sit on; a zabuton is the flat rectangular mat that goes underneath it. They do different jobs. The zafu sets your hip height; the zabuton pads your ankles and knees against a hard floor. A zabuton alone will not raise your hips and will not help your posture — it is floor protection, not a seat.',
  },
  {
    q: 'Is a meditation bench better than a cushion?',
    a: 'For kneeling, yes — a bench takes your body weight off your ankles and fixes the pelvic angle mechanically, which is exactly what you want. But a bench only works in seiza. It cannot be used cross-legged. If you want or need to sit cross-legged, a bench is not an option and the question becomes which seat holds your pelvis in a forward tilt.',
  },
  {
    q: 'How high should a meditation cushion be?',
    a: 'High enough that your hips sit clearly above your knees — that height difference is what allows the pelvis to rotate forward rather than tuck under. The exact number depends on your hip flexibility and leg length, which is why cushion height is such a common frustration: you are being asked to solve with height alone a problem that is really about angle. A seat with a built-in tilt takes the guesswork out, because the geometry supplies the angle regardless of how far you happen to be sitting.',
  },
  {
    q: 'Do I need a meditation cushion at all?',
    a: 'If you sit comfortably for as long as you want to on a folded blanket, no — buy nothing. Genuinely. A cushion is a solution to a problem, and if you do not have the problem you do not need the solution. The people who need a purpose-built seat are the ones for whom discomfort is reliably ending sits before their attention does.',
  },
  {
    q: 'What is an ergonomic meditation seat?',
    a: 'An ergonomic meditation seat is a meditation seat designed around seated biomechanics rather than around padding: it fixes the angle of the pelvis instead of only raising its height. The Lotus Seat is one — it uses an 8° inclined cork composite base to rotate the pelvis anteriorly, a two-layer natural latex cushion (a firm ILD 75–85 base under a softer ramped top layer), and a 10–15 mm central channel that lifts the coccyx clear of the surface.',
  },
]

interface Option {
  readonly name: string
  readonly what: string
  readonly pelvis: string
  readonly bestFor: string
  readonly limit: string
}

const options: readonly Option[] = [
  {
    name: 'Folded blanket',
    what: 'Whatever you already own, folded until it is roughly high enough.',
    pelvis: 'Raises the hips a little. No fixed angle, and the fold compresses as you sit.',
    bestFor: 'Trying out seated practice before spending anything. A perfectly honest starting point.',
    limit: 'Height drifts during the sit. Nothing holds the pelvic angle, so posture decays.',
  },
  {
    name: 'Zafu (round cushion)',
    what: 'The classic round kapok- or buckwheat-filled cushion. The default of the last fifty years.',
    pelvis: 'Raises the hips. Perching on the front edge creates some tilt — but you have to hold it.',
    bestFor: 'Practitioners who are already comfortable cross-legged and want a firm, portable seat.',
    limit: 'Fill compacts over months. Tilt is a technique you must maintain, not a property of the object.',
  },
  {
    name: 'Zabuton (floor mat)',
    what: 'A flat padded mat placed under the seat. Not a seat itself.',
    pelvis: 'Does nothing to the pelvis. It is not trying to.',
    bestFor: 'Padding ankles and knees against a hard floor, underneath any of the other options.',
    limit: 'Used alone, it is a flat surface — the worst case for pelvic tilt.',
  },
  {
    name: 'Kneeling bench (seiza)',
    what: 'A small angled wooden bench you straddle, kneeling, with your shins beneath it.',
    pelvis: 'Excellent. The angled seat fixes the pelvis forward, mechanically, with no effort.',
    bestFor: 'Kneeling practitioners. For seiza, this is the right tool and we will happily say so.',
    limit: 'Cannot be used cross-legged at all. Loads the knees and shins; hard on some ankles.',
  },
  {
    name: 'Ergonomic meditation seat',
    what: 'A structured seat with a built-in tilt angle and engineered cushion layers. The Lotus Seat is one.',
    pelvis: 'Fixed 8° forward tilt rotates the pelvis anteriorly and holds it there for the whole sit.',
    bestFor: 'Cross-legged practitioners who lose sits to back, hip or tailbone pain.',
    limit: 'Heavier and more expensive than a zafu. Not designed for kneeling practice.',
  },
]

export default function CushionGuidePage() {
  return (
    <div className="bg-paper pt-24">
      <JsonLd
        data={graph(
          articleSchema({
            path: PATH,
            headline: 'Meditation Cushion Guide: Zafu vs Bench vs Ergonomic Seat',
            description:
              'What each type of meditation cushion does to your pelvis, and how to choose between them.',
            datePublished: '2026-07-13',
          }),
          faqSchema(faqs),
          productSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Meditation cushion guide', path: PATH },
          ]),
        )}
      />

      <section className="py-16 md:py-20 max-w-3xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <p className="mono-label text-[0.66rem] mb-5 flex items-center gap-2">
            <span className="text-cork-deep">REFERENCE</span>
            <span className="w-6 h-px bg-line-strong" />
            BUYING GUIDE
          </p>
          <h1 className="font-display font-semibold text-ink tracking-[-0.035em] leading-[1.02] text-[clamp(2.1rem,5vw,3.4rem)] mb-8">
            The meditation cushion guide: what each one actually does to your pelvis.
          </h1>
        </FadeIn>

        <FadeIn delay={100}>
          <AnswerBlock>
            There are five things people sit on to meditate: a folded blanket, a zafu, a zabuton, a
            kneeling bench, and an ergonomic meditation seat. They are not five grades of the same
            product — they do mechanically different things. A zafu raises your hips but leaves the
            pelvic angle to you. A zabuton is a floor mat and does nothing for posture. A kneeling
            bench fixes the pelvic angle beautifully, but only in seiza. An ergonomic seat is the one
            option that fixes the pelvic angle in a cross-legged posture, which is why it is the
            answer when back, hip or tailbone pain is what ends your sits. If discomfort is not
            ending your sits, buy the cheapest thing on this list.
          </AnswerBlock>
        </FadeIn>
      </section>

      <section className="pb-20 max-w-6xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.7rem,3.6vw,2.5rem)] mb-8">
            The five options, compared honestly
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="overflow-x-auto border border-line">
            <table className="w-full text-left border-collapse min-w-[54rem]">
              <caption className="sr-only">
                Comparison of meditation seating options: what each is, its effect on the pelvis, who
                it suits, and its limitation
              </caption>
              <thead>
                <tr className="bg-surface border-b border-line-strong">
                  {['Option', 'What it is', 'Effect on the pelvis', 'Best for', 'The limit'].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="mono-label text-[0.62rem] uppercase px-4 py-3 align-bottom"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {options.map((option) => (
                  <tr key={option.name} className="border-b border-line last:border-0 align-top">
                    <th
                      scope="row"
                      className="px-4 py-5 font-display font-medium text-ink text-[0.95rem] w-[11rem]"
                    >
                      {option.name}
                    </th>
                    <td className="px-4 py-5 text-ink-soft text-[0.88rem] leading-relaxed">
                      {option.what}
                    </td>
                    <td className="px-4 py-5 text-ink-soft text-[0.88rem] leading-relaxed">
                      {option.pelvis}
                    </td>
                    <td className="px-4 py-5 text-ink-soft text-[0.88rem] leading-relaxed">
                      {option.bestFor}
                    </td>
                    <td className="px-4 py-5 text-ink-soft text-[0.88rem] leading-relaxed">
                      {option.limit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </section>

      <section className="py-20 bg-surface border-y border-line">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.7rem,3.6vw,2.5rem)] mb-6">
              How to choose, in three questions
            </h2>
            <ol className="border-t border-line-strong">
              {[
                {
                  q: 'Do you kneel, or sit cross-legged?',
                  a: 'If you kneel, stop reading and buy a kneeling bench. It is the correct tool for seiza and nothing here improves on it. Everything below assumes cross-legged sitting.',
                },
                {
                  q: 'Is discomfort ending your sits before your attention does?',
                  a: 'If not, buy a firm zafu — or fold a blanket and spend nothing. A purpose-built ergonomic seat solves a problem you do not have, and we would rather you kept the money.',
                },
                {
                  q: 'Have you already tried a higher or softer cushion, and it did not work?',
                  a: 'Then the problem is angle, not height or softness, and more padding will keep failing for the same reason it failed last time. This is the case an ergonomic seat exists for: a fixed forward tilt that holds the pelvis where a cushion only invites it to go.',
                },
              ].map((step, i) => (
                <li
                  key={step.q}
                  className="border-b border-line py-6 grid sm:grid-cols-[3.5rem_1fr] gap-x-4 gap-y-2"
                >
                  <span className="font-mono text-[0.72rem] text-cork-deep tabular-nums pt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-display font-medium text-ink text-[1.05rem] tracking-[-0.01em] mb-2">
                      {step.q}
                    </h3>
                    <p className="text-ink-soft leading-relaxed text-[0.95rem] max-w-xl">{step.a}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 max-w-3xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.7rem,3.6vw,2.5rem)] mb-6">
            Where to go from here
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              {
                href: '/meditation-cushion-for-back-pain',
                title: 'Back pain when sitting',
                body: 'The mechanism behind the ache, and why softer cushions make it worse.',
              },
              {
                href: '/vipassana-meditation-cushion',
                title: 'Vipassana & long retreats',
                body: 'What an hour-long adhitthana sitting demands of a seat.',
              },
              {
                href: '/science',
                title: 'The biomechanics',
                body: 'Why 8°, and how the kinetic chain runs from pelvis to skull.',
              },
              {
                href: '/product',
                title: 'The specification',
                body: 'Every material, dimension and ILD figure in The Lotus Seat.',
              },
            ].map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="reg-frame block border border-line hover:border-line-strong transition-colors p-5 h-full"
                >
                  <h3 className="font-display font-medium text-ink text-[1rem] tracking-[-0.01em] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-ink-soft text-[0.88rem] leading-relaxed">{card.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </FadeIn>
      </section>

      <FaqAccordion faqs={faqs} heading="Choosing a cushion: common questions." label="GUIDE" />
    </div>
  )
}
