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

const PATH = '/meditation-cushion-for-back-pain'

export const metadata = pageMetadata({
  title: 'Meditation Cushion for Back Pain — Fix the Posture, Not the Padding',
  description:
    'Lower back pain in meditation is postural, not a padding problem. How a posterior pelvic tilt flattens the lumbar curve, why softer cushions make it worse, and what an 8° inclined seat changes.',
  path: PATH,
  image: '/images/product/seat-profile.jpg',
})

const faqs: readonly Faq[] = [
  {
    q: 'Can a meditation cushion help with lower back pain?',
    a: 'It can, when the pain is postural in origin — which, for most meditators, it is. Sitting cross-legged on a flat surface rolls the pelvis backward and flattens the lumbar curve, forcing the back muscles to hold the torso up for the entire sit. A cushion that tilts the pelvis forward restores that curve and removes the muscular demand. A cushion cannot help with pain arising from a diagnosed spinal condition; that needs a clinician, not a seat.',
  },
  {
    q: 'Why does my lower back hurt after 10 minutes of meditation?',
    a: 'Because the posture is being held by muscle rather than by skeleton. On a flat or over-soft seat the pelvis tips into a posterior tilt, the lumbar spine flattens, and the erector spinae must contract continuously to stop you slumping. Continuous low-level contraction produces the burning ache most people feel between 10 and 20 minutes. It is a fatigue signal, not an injury signal — and it disappears when the pelvis is supported above the knees.',
  },
  {
    q: 'Is a softer cushion better for back pain?',
    a: 'No — softer is usually worse. A soft cushion compresses unevenly under body weight, so the pelvis sinks and rotates backwards, which is the exact mechanism that causes the pain. The Lotus Seat uses a firm ILD 75–85 latex base under a softer ILD 45–55 top layer, so the surface yields at the skin while the structure underneath refuses to collapse.',
  },
  {
    q: 'What is the best sitting height for back pain when meditating?',
    a: 'High enough that your hips sit clearly above your knees. That elevation is what lets the pelvis rotate forward instead of tucking under. The Lotus Seat combines that elevation with a fixed 8° forward tilt so you do not have to find and hold the position yourself — the geometry does it.',
  },
  {
    q: 'Will it help with sciatic or tailbone pain?',
    a: 'Those are two different mechanisms and the seat addresses both structurally. Tailbone (coccyx) pain comes from direct pressure on the bone, which the 10–15 mm central relief channel off-loads by removing contact entirely. Sciatic-type pressure through the buttock is often aggravated by a hard flat surface concentrating load; the ramped latex spreads that load across a wider contact area. Neither is a claim to treat a nerve condition — if you have diagnosed sciatica, talk to your clinician.',
  },
  {
    q: 'Is The Lotus Seat a medical device?',
    a: 'No. It is a piece of ergonomic equipment, engineered with the same seated-posture principles used in workplace seating. It is not certified as a medical device, it is not a treatment, and we make no clinical claims for it.',
  },
]

const causes = [
  {
    n: '01',
    title: 'The pelvis rolls backward',
    body: 'Sit cross-legged on a flat floor and your hip flexors and hamstrings pull the pelvis into a posterior tilt — it tucks under. This is not a discipline failure. It is what the geometry of the position does when the knees sit level with or above the hips.',
  },
  {
    n: '02',
    title: 'The lumbar curve flattens',
    body: 'The lumbar spine sits directly on top of the pelvis, so when the pelvis tucks, the natural inward curve of the lower back flattens with it. Load that should have been passed down through bone is now passed through soft tissue and disc.',
  },
  {
    n: '03',
    title: 'The muscles take over',
    body: 'To stop the torso collapsing forward, the erector spinae contract — and keep contracting, for the whole sit. Sustained low-level contraction is what produces the deep burning ache that arrives somewhere around minute ten and does not leave.',
  },
  {
    n: '04',
    title: 'The compensation travels up',
    body: 'A rounded lower back forces the thoracic spine to round, which pushes the head forward of the shoulders. Every centimetre the head travels forward multiplies the load on the neck. The pain you feel in your shoulders often began at your pelvis.',
  },
]

const specs = [
  ['Base tilt', '8°', 'Rotates the pelvis anteriorly; restores the lumbar curve'],
  ['Base layer', '70 mm latex · ILD 75–85', 'Firm enough not to collapse and re-tuck the pelvis'],
  ['Top layer', '50 mm rear → 32 mm front', 'Ramp supports the sacrum while the hips settle'],
  ['Relief channel', '10–15 mm deep', 'Removes direct contact with the coccyx'],
] as const

export default function BackPainPage() {
  return (
    <div className="bg-paper pt-24">
      <JsonLd
        data={graph(
          articleSchema({
            path: PATH,
            headline: 'Meditation Cushion for Back Pain: Fix the Posture, Not the Padding',
            description:
              'Why lower back pain in seated meditation is a postural problem, and what a seat has to change to solve it.',
            datePublished: '2026-07-13',
          }),
          faqSchema(faqs),
          productSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Meditation cushion for back pain', path: PATH },
          ]),
        )}
      />

      <section className="py-16 md:py-20 max-w-3xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <p className="mono-label text-[0.66rem] mb-5 flex items-center gap-2">
            <span className="text-cork-deep">POSTURE</span>
            <span className="w-6 h-px bg-line-strong" />
            BACK PAIN
          </p>
          <h1 className="font-display font-semibold text-ink tracking-[-0.035em] leading-[1.02] text-[clamp(2.1rem,5vw,3.4rem)] mb-8">
            A meditation cushion for back pain has to fix the posture, not the padding.
          </h1>
        </FadeIn>

        <FadeIn delay={100}>
          <AnswerBlock>
            Lower back pain in seated meditation is almost always postural. Sitting cross-legged on a
            flat surface rolls the pelvis into a posterior tilt, which flattens the lumbar curve and
            forces the back muscles to hold the torso upright for the entire sit — felt as a burning
            ache after ten to twenty minutes. A softer cushion makes this worse, because it lets the
            pelvis sink further. The fix is geometric: elevate the hips above the knees and tilt the
            seat forward. The Lotus Seat does this with a fixed 8° inclined cork base, a firm latex
            structure that will not collapse under load, and a 10–15 mm channel that lifts the coccyx
            clear of the surface.
          </AnswerBlock>
        </FadeIn>
      </section>

      <section className="pb-20 max-w-3xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.7rem,3.6vw,2.5rem)] mb-4">
            Why does my back hurt when I meditate?
          </h2>
          <p className="text-ink-soft leading-relaxed mb-10 max-w-2xl">
            Not because you are sitting wrong, and not because the cushion is too thin. Because a
            flat seat sets off a four-step chain of compensation that ends with your muscles doing a
            job your skeleton is built to do for free.
          </p>
        </FadeIn>

        <ol className="border-t border-line-strong">
          {causes.map((cause, i) => (
            <FadeIn key={cause.n} delay={i * 60}>
              <li className="border-b border-line py-7 grid sm:grid-cols-[3.5rem_1fr] gap-x-4 gap-y-2">
                <span className="font-mono text-[0.72rem] text-cork-deep tabular-nums pt-1">
                  {cause.n}
                </span>
                <div>
                  <h3 className="font-display font-medium text-ink text-[1.1rem] tracking-[-0.01em] mb-2">
                    {cause.title}
                  </h3>
                  <p className="text-ink-soft leading-relaxed text-[0.95rem] max-w-xl">{cause.body}</p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </section>

      <section className="py-20 bg-surface border-y border-line">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.7rem,3.6vw,2.5rem)] mb-4">
              Why a softer cushion makes back pain worse
            </h2>
            <div className="prose">
              <p className="text-ink-soft leading-relaxed mb-5">
                The wellness market&rsquo;s answer to a sore back is more foam. It is the wrong
                answer, and it is wrong for a mechanical reason: softness and support are opposites
                under sustained load. A cushion soft enough to feel pleasant in the first minute
                compresses unevenly under 60–90 kg of body weight over the next thirty. The heavier
                rear of the pelvis sinks further than the lighter front — which rotates the pelvis
                backwards. You have paid for a cushion that actively produces the posterior tilt
                causing the pain.
              </p>
              <p className="text-ink-soft leading-relaxed mb-5">
                Memory foam is the worst offender, because it is designed to keep yielding: it
                softens as it warms to body temperature, so the posture you started in is not the
                posture you are in at minute twenty. Nothing about a sit that requires stillness is
                served by a surface that is quietly moving underneath you.
              </p>
              <p className="text-ink-soft leading-relaxed">
                The Lotus Seat separates the two jobs instead of compromising between them. A firm
                ILD 75–85 latex base does the structural work and refuses to collapse. A softer ILD
                45–55 ramped layer sits on top of it and does the comfort work at the skin. You get
                give where you touch the seat, and none at all where the seat holds your skeleton.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 max-w-3xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.7rem,3.6vw,2.5rem)] mb-8">
            What the seat changes, mechanism by mechanism
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="overflow-x-auto border border-line">
            <table className="w-full text-left border-collapse min-w-[34rem]">
              <caption className="sr-only">
                The Lotus Seat: specification and the postural mechanism each element addresses
              </caption>
              <thead>
                <tr className="bg-surface border-b border-line-strong">
                  <th scope="col" className="mono-label text-[0.62rem] uppercase px-4 py-3">
                    Element
                  </th>
                  <th scope="col" className="mono-label text-[0.62rem] uppercase px-4 py-3">
                    Specification
                  </th>
                  <th scope="col" className="mono-label text-[0.62rem] uppercase px-4 py-3">
                    What it does for the back
                  </th>
                </tr>
              </thead>
              <tbody>
                {specs.map(([element, spec, effect]) => (
                  <tr key={element} className="border-b border-line last:border-0">
                    <th
                      scope="row"
                      className="px-4 py-4 font-display font-medium text-ink text-[0.95rem] align-top whitespace-nowrap"
                    >
                      {element}
                    </th>
                    <td className="px-4 py-4 font-mono text-[0.82rem] text-cork-deep tabular-nums align-top whitespace-nowrap">
                      {spec}
                    </td>
                    <td className="px-4 py-4 text-ink-soft text-[0.92rem] leading-relaxed align-top">
                      {effect}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <p className="text-ink-soft text-[0.9rem] leading-relaxed mt-6 max-w-2xl">
            The full derivation — why 8° and not 5° or 15°, and how the kinetic chain propagates from
            pelvis to skull — is set out on{' '}
            <Link href="/science" className="text-cork-deep underline underline-offset-2">
              the science page
            </Link>
            . If you are choosing between a zafu, a bench and an ergonomic seat, start with{' '}
            <Link
              href="/meditation-cushion-guide"
              className="text-cork-deep underline underline-offset-2"
            >
              the cushion guide
            </Link>
            .
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="mt-10 border border-line bg-surface/60 px-5 py-4 text-ink-soft text-[0.85rem] leading-relaxed max-w-2xl">
            <span className="mono-label text-[0.62rem] text-cork-deep block mb-2">NOTE</span>
            The Lotus Seat is ergonomic equipment, not a medical device. It addresses posture. It is
            not a treatment for a diagnosed spinal condition, and if your back pain is severe,
            worsening, or accompanied by numbness or weakness, see a clinician rather than buying a
            cushion.
          </p>
        </FadeIn>
      </section>

      <FaqAccordion
        faqs={faqs}
        heading="Back pain and sitting: common questions."
        label="BACK PAIN"
      />

      <section className="py-20 md:py-24 text-center px-5 sm:px-8">
        <FadeIn>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4vw,3rem)] max-w-2xl mx-auto mb-5">
            Stop bracing. Start sitting.
          </h2>
          <p className="text-ink-soft leading-relaxed max-w-lg mx-auto mb-8">
            The Lotus Seat is available for pre-order at &euro;199, with a 30-day satisfaction
            guarantee.
          </p>
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center gap-2 bg-ink text-paper px-7 py-3.5 rounded-[3px] text-sm font-medium hover:bg-graphite-soft transition-colors"
          >
            Pre-Order Now
            <span className="text-paper/55">↗</span>
          </Link>
        </FadeIn>
      </section>
    </div>
  )
}
