import FadeIn from '@/components/FadeIn'

/*
 * Section 6 — Meditation.
 *
 * The three classical seated postures, each stated in the site's own plain,
 * measured voice rather than a wellness register. The lead figure carries the one
 * idea every posture shares and the whole product exists to serve: an upright,
 * self-stacking spine over a forward-tilted pelvis. The traditional yogic frame
 * (prana, nadis) is named as *tradition*, never asserted as physiology.
 */

const CORK = 'var(--color-cork)'
const CORK_DEEP = 'var(--color-cork-deep)'
const INK = 'var(--color-ink)'
const SOFT = 'var(--color-ink-soft)'
const LINE = 'var(--color-line-strong)'
const mono = { fontFamily: 'var(--font-mono)' }

/** Side elevation: a seated figure whose spine stacks in a plumb line over the
 *  pelvis, sat on the forward-tilted seat. The shared meaning behind all three poses. */
function UprightFigure() {
  return (
    <svg
      viewBox="0 0 360 360"
      className="w-full h-auto"
      role="img"
      aria-label="Side view of a person seated cross-legged on the forward-tilted Lotus Seat. The pelvis is rotated forward and the spine stacks vertically over it in a straight plumb line, with the head balanced directly above the base of the spine."
    >
      {/* floor datum */}
      <line x1="40" y1="312" x2="320" y2="312" stroke={LINE} strokeWidth="1" />
      <text x="180" y="334" textAnchor="middle" style={mono} fontSize="11" fill={SOFT} letterSpacing="1">DATUM · FLOOR</text>

      {/* the seat — forward-tilted cork wedge */}
      <path d="M104,312 L268,312 L268,250 L104,286 Z" fill="color-mix(in oklch, var(--color-cork) 40%, transparent)" stroke={CORK} strokeWidth="1.5" />
      <text x="186" y="303" textAnchor="middle" style={mono} fontSize="10" fill={CORK_DEEP} fontWeight="600">8° SEAT</text>

      {/* plumb line — crown through the base of the spine */}
      <line x1="196" y1="60" x2="196" y2="272" stroke={CORK} strokeWidth="1" strokeDasharray="4 5" />

      {/* folded legs, resting low and forward on the seat */}
      <path d="M196,264 C170,262 132,268 112,282" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
      <path d="M196,264 C176,266 150,278 138,290" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" opacity="0.55" />

      {/* pelvis, rotated forward on the crest of the wedge */}
      <circle cx="196" cy="258" r="15" fill={INK} />

      {/* stacked spine — self-supporting, vertical */}
      <path d="M196,244 C193,214 194,190 196,168 C198,146 197,124 196,104" fill="none" stroke={INK} strokeWidth="11" strokeLinecap="round" />

      {/* head, balanced over the base of the spine */}
      <circle cx="196" cy="82" r="21" fill="none" stroke={INK} strokeWidth="8" />

      {/* callout — the point. Text right-anchored so it never runs past the viewBox. */}
      <line x1="196" y1="168" x2="286" y2="150" stroke={CORK} strokeWidth="1" />
      <circle cx="196" cy="168" r="3" fill={CORK} />
      <text x="352" y="146" textAnchor="end" style={mono} fontSize="12" fill={INK} fontWeight="600">SPINE STACKS</text>
      <text x="352" y="162" textAnchor="end" style={mono} fontSize="10.5" fill={SOFT}>NO MUSCULAR EFFORT</text>
    </svg>
  )
}

/** Top-down leg schematics — the one thing that actually differs between the poses.
 *  Text carries the precise meaning; the glyph only orients it (never relied on alone). */
function PostureGlyph({ variant }: { variant: 'sukhasana' | 'siddhasana' | 'padmasana' }) {
  const common = (
    <>
      {/* pelvis / seat centre */}
      <circle cx="60" cy="58" r="13" fill="none" stroke={INK} strokeWidth="2.5" />
    </>
  )

  return (
    <svg viewBox="0 0 120 120" className="w-16 h-16" role="img" aria-hidden focusable="false">
      {variant === 'sukhasana' && (
        <>
          {/* easy pose — shins loosely crossed in front, feet under opposite knee */}
          <path d="M50,66 C34,74 26,86 22,96" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <path d="M70,66 C86,74 94,86 98,96" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <path d="M40,92 L80,92" stroke={CORK} strokeWidth="6" strokeLinecap="round" />
          {common}
        </>
      )}
      {variant === 'siddhasana' && (
        <>
          {/* accomplished pose — heels stacked on the centre line, ankles aligned */}
          <path d="M52,68 C40,78 40,92 52,100" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <path d="M68,68 C80,78 80,92 68,100" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1="60" y1="72" x2="60" y2="104" stroke={CORK} strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="60" cy="82" r="3.4" fill={CORK} />
          <circle cx="60" cy="96" r="3.4" fill={CORK} />
          {common}
        </>
      )}
      {variant === 'padmasana' && (
        <>
          {/* full lotus — each foot drawn up onto the opposite thigh, soles up */}
          <path d="M50,66 C34,72 30,90 46,98" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <path d="M70,66 C86,72 90,90 74,98" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="74" cy="60" rx="7" ry="4.5" fill={CORK} transform="rotate(28 74 60)" />
          <ellipse cx="46" cy="60" rx="7" ry="4.5" fill={CORK} transform="rotate(-28 46 60)" />
          {common}
        </>
      )}
    </svg>
  )
}

interface Posture {
  id: string
  sanskrit: string
  english: string
  glyph: 'sukhasana' | 'siddhasana' | 'padmasana'
  use: string
  spine: string
  longer: string
}

const postures: readonly Posture[] = [
  {
    id: 'A-01',
    sanskrit: 'Sukhasana',
    english: 'Easy pose',
    glyph: 'sukhasana',
    use: 'The simple cross-legged seat — the starting point for most practitioners and the one used for longer, undirected sitting.',
    spine: 'It only stays comfortable if the hips sit above the knees; otherwise the pelvis rolls back and the spine collapses.',
    longer: 'The 8° tilt supplies that hip-over-knee lift for you, so easy pose stays genuinely easy past the first few minutes.',
  },
  {
    id: 'A-02',
    sanskrit: 'Siddhasana',
    english: 'Accomplished pose',
    glyph: 'siddhasana',
    use: 'A stable, symmetrical seat traditionally favoured for long meditation and breathwork, with the heels aligned on the body’s midline.',
    spine: 'Its stability depends on a level pelvis. In traditional yoga an upright spine is held to let prana move freely along the nadis.',
    longer: 'A forward-rotated, well-supported pelvis holds that symmetry without strain — the posture stays true as the sit lengthens.',
  },
  {
    id: 'A-03',
    sanskrit: 'Padmasana',
    english: 'Full lotus',
    glyph: 'padmasana',
    use: 'The classical meditation posture, each foot resting on the opposite thigh — the most locked and stable of the three, and the most demanding.',
    spine: 'The deep fold makes an upright spine harder to hold, which is exactly when pelvic support matters most.',
    longer: 'The forward tilt and firm latex base take the postural load off the hips, so an advanced seat is sustainable, not endured.',
  },
]

export default function MeditationPostures() {
  return (
    <section id="meditation" className="scroll-mt-16 py-20 md:py-28 bg-paper border-b border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-x-14 gap-y-12 items-center">
          {/* Statement */}
          <div>
            <p className="mono-label text-[0.66rem] mb-5 flex items-center gap-2">
              <span className="text-cork-deep">THE PRACTICE</span>
              <span className="w-6 h-px bg-line-strong" />
              SEATED POSTURES
            </p>
            <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4vw,3rem)] max-w-xl">
              Every seated posture asks for the same thing.
            </h2>
            <p className="mt-6 text-ink-soft text-lg leading-relaxed max-w-md">
              An upright spine, balanced over a forward-tilted pelvis. Get that, and the
              posture holds itself. The seat is built to give it to you — whichever of the
              three you take.
            </p>
          </div>

          {/* Lead figure — the shared idea */}
          <FadeIn>
            <figure className="reg-frame border border-line bg-surface/50">
              <figcaption className="flex items-center justify-between border-b border-line px-3 py-2">
                <span className="mono-label text-[0.62rem]">POSTURE · SIDE ELEVATION</span>
                <span className="mono-label text-[0.62rem] text-cork-deep">UPRIGHT SPINE</span>
              </figcaption>
              <div className="relative">
                <div aria-hidden className="absolute inset-0 tech-grid opacity-40" />
                <div className="relative p-4 sm:p-6">
                  <UprightFigure />
                </div>
              </div>
            </figure>
          </FadeIn>
        </div>

        {/* The three postures */}
        <div className="mt-14 grid md:grid-cols-3 gap-px bg-line border border-line">
          {postures.map((p, i) => (
            <FadeIn key={p.id} delay={i * 70}>
              <article className="h-full bg-paper px-6 py-7 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-[0.72rem] text-cork-deep tabular-nums">{p.id}</span>
                    <h3 className="font-display font-semibold text-ink text-xl tracking-[-0.01em] mt-1.5 leading-none">
                      {p.sanskrit}
                    </h3>
                    <p className="mono-label text-[0.62rem] mt-1.5">{p.english.toUpperCase()}</p>
                  </div>
                  <PostureGlyph variant={p.glyph} />
                </div>

                <dl className="mt-6 border-t border-line">
                  <div className="py-3.5 border-b border-line">
                    <dt className="mono-label text-[0.6rem] text-cork-deep">WHY IT’S USED</dt>
                    <dd className="text-ink-soft text-[0.9rem] leading-relaxed mt-1.5">{p.use}</dd>
                  </div>
                  <div className="py-3.5 border-b border-line">
                    <dt className="mono-label text-[0.6rem] text-cork-deep">WHY THE SPINE MATTERS</dt>
                    <dd className="text-ink-soft text-[0.9rem] leading-relaxed mt-1.5">{p.spine}</dd>
                  </div>
                  <div className="py-3.5">
                    <dt className="mono-label text-[0.6rem] text-cork-deep">HOW THE SEAT HELPS</dt>
                    <dd className="text-ink text-[0.9rem] leading-relaxed mt-1.5 font-medium">{p.longer}</dd>
                  </div>
                </dl>
              </article>
            </FadeIn>
          ))}
        </div>

        {/* Tradition, named as tradition — not asserted as physiology. */}
        <p className="mt-8 text-ink-soft/90 text-[0.82rem] leading-relaxed max-w-2xl">
          Prana and the nadis are concepts from traditional yoga, described here as they are
          understood within that tradition rather than as scientific claims. What the seat
          changes is measurable and mechanical: the angle of your pelvis, and the effort it
          takes to keep your spine upright.
        </p>
      </div>
    </section>
  )
}
