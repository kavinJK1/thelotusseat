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

const PATH = '/vipassana-meditation-cushion'

export const metadata = pageMetadata({
  title: 'Vipassana Meditation Cushion — Built for Hour-Long Sits and 10-Day Retreats',
  description:
    'A 10-day Vipassana course asks for around ten hours of seated meditation a day, including hour-long adhitthana sittings without moving. What a cushion has to do to survive that — and what most of them get wrong.',
  path: PATH,
  image: '/images/product/seat-elevation.jpg',
})

const faqs: readonly Faq[] = [
  {
    q: 'What cushion should I bring to a Vipassana retreat?',
    a: 'Bring a seat that fixes your pelvic angle rather than one that only adds padding. Vipassana centres in the Goenka tradition supply standard cushions and usually let you bring your own supports, but the supplied cushions are flat, generic and shared — they are not fitted to your hips, and by day four, when hour-long adhitthana sittings begin, that mismatch is what people feel. A seat with a fixed forward tilt holds the pelvis for you, so the posture does not slowly degrade over an hour of stillness.',
  },
  {
    q: 'How long do you sit in one posture at a Vipassana course?',
    a: 'A standard 10-day course in the Goenka tradition runs roughly ten to eleven hours of meditation a day, broken into sittings of about an hour. From around day four, three of those daily sittings are adhitthana — "sittings of strong determination" — in which students are asked not to open their eyes, change posture, or move their hands and legs for the full hour. It is that hour of enforced stillness that exposes every weakness in a seat.',
  },
  {
    q: 'Why does my leg go numb during long sits?',
    a: 'Usually because a flat seat has left your knees at or above hip height, which closes the hip angle and loads the sitting bones and the underside of the thigh with your full body weight. Raising the hips well above the knees opens that angle and shifts load onto the pelvis. The Lotus Seat produces the elevation and the 8° forward tilt together, so the hip angle opens without you having to hold the position.',
  },
  {
    q: 'Can I use The Lotus Seat for a 10-day Vipassana course?',
    a: 'Yes — it is designed for exactly that load case: a full hour, unmoving, repeated many times a day for ten days. Natural latex does not creep or soften with body heat the way memory foam does, so the surface you sit down on at minute one is still the surface supporting you at minute sixty. Check your centre\'s current policy on bringing personal cushions before you travel; almost all permit it, but the rule is theirs, not ours.',
  },
  {
    q: 'Does it work for Zen, Theravada and other retreat traditions?',
    a: 'It works for any cross-legged seated practice — Vipassana, Zen (zazen in Burmese or half-lotus rather than seiza), Theravada, Dzogchen, Insight, breathwork and yoga nidra. It supports Sukhasana, Burmese, Siddhasana and Half Lotus. It is not designed for kneeling/seiza practice, where a kneeling bench is the right tool and we would rather say so.',
  },
  {
    q: 'Is The Lotus Seat affiliated with Vipassana Research Institute or Dhamma.org?',
    a: 'No. We are an independent product with no affiliation to, endorsement from, or connection with the Vipassana Research Institute, Dhamma.org, or any meditation centre or teacher. We reference Vipassana courses because they are the most demanding common test of a meditation seat we know of, not because anyone there has endorsed us.',
  },
]

const demands = [
  {
    metric: '~10h',
    label: 'Seated per day',
    body: 'A 10-day course asks for roughly ten to eleven hours of meditation daily. Any flaw in a seat that is merely annoying in a 20-minute home sit becomes structural by the afternoon of day two.',
  },
  {
    metric: '60m',
    label: 'Adhitthana, unmoving',
    body: 'From about day four, three sittings a day are held without changing posture at all. You cannot shift your weight off a numb leg or re-stack a collapsing spine. Whatever the seat does to you, it does for a full hour.',
  },
  {
    metric: '10d',
    label: 'Consecutive days',
    body: 'There is no recovery day. Postural debt compounds. A cushion that compresses a few millimetres each day arrives at day eight as a materially different — and worse — seat than the one you started on.',
  },
]

export default function VipassanaPage() {
  return (
    <div className="bg-paper pt-24">
      <JsonLd
        data={graph(
          articleSchema({
            path: PATH,
            headline: 'The Vipassana Meditation Cushion: Built for Hour-Long Sits',
            description:
              'What a 10-day Vipassana retreat demands of a meditation cushion, and why most cushions fail the adhitthana hour.',
            datePublished: '2026-07-13',
          }),
          faqSchema(faqs),
          productSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Vipassana meditation cushion', path: PATH },
          ]),
        )}
      />

      <section className="py-16 md:py-20 max-w-3xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <p className="mono-label text-[0.66rem] mb-5 flex items-center gap-2">
            <span className="text-cork-deep">RETREAT</span>
            <span className="w-6 h-px bg-line-strong" />
            LONG SITS
          </p>
          <h1 className="font-display font-semibold text-ink tracking-[-0.035em] leading-[1.02] text-[clamp(2.1rem,5vw,3.4rem)] mb-8">
            A Vipassana meditation cushion is judged by one thing: the sixtieth minute.
          </h1>
        </FadeIn>

        <FadeIn delay={100}>
          <AnswerBlock>
            A 10-day Vipassana course in the Goenka tradition asks for around ten hours of seated
            meditation a day, and from roughly day four, three of those daily sittings are adhitthana
            — an hour in which you do not change posture at all. Most meditation cushions are
            designed for a twenty-minute sit and fail this test in a predictable way: they compress,
            the pelvis rolls backward, the lumbar curve flattens, and the back muscles spend the
            remaining forty minutes holding you up. The Lotus Seat is built for the hour instead of
            the minute — an 8° cork base that fixes the pelvic angle, natural latex that does not
            creep or soften with body heat, and a 10–15 mm channel that keeps the coccyx off the
            surface for the whole sitting.
          </AnswerBlock>
        </FadeIn>
      </section>

      <section className="pb-20 max-w-5xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.7rem,3.6vw,2.5rem)] mb-4">
            What a retreat actually asks of a seat
          </h2>
          <p className="text-ink-soft leading-relaxed mb-10 max-w-2xl">
            Retreat conditions are not a harder version of home practice. They are a different load
            case — and they are the only honest test of whether a meditation seat is engineered or
            merely upholstered.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
          {demands.map((demand, i) => (
            <FadeIn key={demand.label} delay={i * 70}>
              <div className="bg-paper p-6 h-full">
                <p className="font-mono text-3xl text-ink tabular-nums leading-none">
                  {demand.metric}
                </p>
                <p className="mono-label text-[0.62rem] mt-2 mb-4">{demand.label}</p>
                <p className="text-ink-soft text-[0.92rem] leading-relaxed">{demand.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="py-20 bg-surface border-y border-line">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.7rem,3.6vw,2.5rem)] mb-6">
              Why the standard retreat cushion fails at minute forty
            </h2>
            <div className="prose">
              <p className="text-ink-soft leading-relaxed mb-5">
                The cushions stacked at the back of a Dhamma hall are flat, generic and shared. They
                are also, in fairness, adequate for a great many people — but they are padding, and
                padding has no opinion about where your pelvis sits. On a flat cushion the pelvis
                tips backward, the lumbar curve flattens, and the erector spinae take over the job of
                holding your torso upright. In a twenty-minute sit you would shift your weight and
                the problem would reset. In an adhitthana hour you have committed not to move.
              </p>
              <p className="text-ink-soft leading-relaxed mb-5">
                So the ache is not a failure of resolve, and it is not the sensation the practice
                asks you to observe with equanimity. It is a mechanical consequence of a seat that
                let your skeleton fall out of alignment forty minutes ago and left your muscles to
                cover for it. The practice is hard enough on its own terms without also being a
                test of your postural endurance.
              </p>
              <p className="text-ink-soft leading-relaxed">
                And the material matters more here than anywhere else. Memory foam softens as it
                warms to body temperature — the seat you sit down on is not the seat you are on at
                minute sixty. Kapok and buckwheat compact and stay compacted; by day eight of a
                ten-day course, the cushion has quietly become shorter than the one you arrived
                with. Natural latex returns to shape instantly and holds its support properties
                across the whole sitting, and across all ten days. That is the entire reason it is
                in this seat.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 max-w-3xl mx-auto px-5 sm:px-8">
        <FadeIn>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.03] text-[clamp(1.7rem,3.6vw,2.5rem)] mb-6">
            Which traditions and postures it suits
          </h2>
          <p className="text-ink-soft leading-relaxed mb-6 max-w-2xl">
            The seat is agnostic about what you are doing with your attention. It cares only about
            what your pelvis is doing, so it serves any cross-legged practice:
          </p>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
            {[
              'Vipassana — including 10-day Goenka-tradition courses',
              'Zen / zazen in Burmese or half-lotus',
              'Theravada and Insight retreats',
              'Mindfulness and secular MBSR practice',
              'Breathwork and pranayama',
              'Yoga nidra and seated yoga practice',
            ].map((item) => (
              <li key={item} className="flex items-baseline gap-3 text-ink-soft text-[0.95rem]">
                <span className="font-mono text-[0.7rem] text-cork-deep shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-ink-soft leading-relaxed max-w-2xl">
            Supported postures: Sukhasana (easy pose), Burmese, Siddhasana and Half Lotus. It is{' '}
            <em>not</em> built for kneeling or seiza practice — a kneeling bench is the correct tool
            for that, and we would rather point you to one than sell you the wrong seat. The
            reasoning behind every posture decision is laid out on{' '}
            <Link href="/science" className="text-cork-deep underline underline-offset-2">
              the science page
            </Link>
            , and if long sits are leaving you sore rather than numb, the{' '}
            <Link
              href="/meditation-cushion-for-back-pain"
              className="text-cork-deep underline underline-offset-2"
            >
              back pain page
            </Link>{' '}
            covers that mechanism directly.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <p className="mt-10 border border-line bg-surface/60 px-5 py-4 text-ink-soft text-[0.85rem] leading-relaxed max-w-2xl">
            <span className="mono-label text-[0.62rem] text-cork-deep block mb-2">DISCLOSURE</span>
            The Lotus Seat is independent. It is not affiliated with, endorsed by, or connected to
            the Vipassana Research Institute, Dhamma.org, or any meditation centre or teacher. Check
            your centre&rsquo;s current policy on personal cushions before you travel.
          </p>
        </FadeIn>
      </section>

      <FaqAccordion faqs={faqs} heading="Retreats and long sits: common questions." label="RETREAT" />

      <section className="py-20 md:py-24 text-center px-5 sm:px-8">
        <FadeIn>
          <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4vw,3rem)] max-w-2xl mx-auto mb-5">
            Sit the hour. Not the clock.
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
