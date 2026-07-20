import FadeIn from '@/components/FadeIn'

const mono = { fontFamily: 'var(--font-mono)' }

const INK = 'var(--color-ink)'
const SOFT = 'var(--color-ink-soft)'
const LINE = 'var(--color-line-strong)'
const CORK = 'var(--color-cork)'
const CORK_DEEP = 'var(--color-cork-deep)'
const CORKFILL = 'color-mix(in oklch, var(--color-cork) 45%, transparent)'
const SURFACE = 'var(--color-surface)'
const SURFACE2 = 'color-mix(in oklch, var(--color-surface) 70%, var(--color-paper))'

/** A simple cut-through of the seat, labelled in plain words. */
function CrossSection() {
  return (
    <svg
      viewBox="0 0 820 500"
      className="w-full h-auto"
      role="img"
      aria-label="A cut-through of the Lotus Seat from the side: a tilted cork base at the bottom, a firm latex base layer above it, a shaped top layer that rises toward the back, and a dip down the middle that takes pressure off the tailbone."
    >
      {/* floor */}
      <line x1="120" y1="452" x2="700" y2="452" stroke={LINE} strokeWidth="1" />
      <text x="410" y="478" textAnchor="middle" style={mono} fontSize="12" fill={SOFT} letterSpacing="1">FLOOR</text>

      {/* tilted cork base */}
      <path d="M160,452 L660,452 L660,346 L160,418 Z" fill={CORKFILL} stroke={CORK} strokeWidth="1.5" />
      {/* firm latex base layer */}
      <path d="M160,418 L660,346 L660,306 L160,378 Z" fill={SURFACE} stroke={LINE} strokeWidth="1.5" />
      {/* shaped top layer with the central dip */}
      <path
        d="M160,356 L360,330 C400,324 425,324 448,338 C472,352 520,352 544,338 C568,324 600,306 660,258 L660,306 L160,378 Z"
        fill={SURFACE2}
        stroke={LINE}
        strokeWidth="1.5"
      />

      {/* 8° angle */}
      <line x1="160" y1="418" x2="286" y2="418" stroke={CORK} strokeWidth="1" strokeDasharray="4 4" />
      <path d="M250,418 A90,90 0 0 0 244,404" fill="none" stroke={CORK} strokeWidth="1.5" />
      <text x="266" y="410" style={mono} fontSize="14" fill={CORK_DEEP} fontWeight="600">8°</text>

      {/* tailbone dip (up) */}
      <line x1="496" y1="345" x2="496" y2="150" stroke={CORK} strokeWidth="1" />
      <circle cx="496" cy="345" r="3" fill={CORK} />
      <text x="496" y="138" textAnchor="middle" style={mono} fontSize="13" fill={INK} fontWeight="600">DIP FOR YOUR TAILBONE</text>

      {/* shaped top layer (right) */}
      <line x1="628" y1="284" x2="700" y2="244" stroke={CORK} strokeWidth="1" />
      <circle cx="628" cy="284" r="3" fill={CORK} />
      <text x="704" y="240" style={mono} fontSize="13" fill={INK} fontWeight="600">SHAPED TOP</text>
      <text x="704" y="257" style={mono} fontSize="11.5" fill={SOFT}>higher at the back</text>

      {/* latex base (left) */}
      <line x1="250" y1="398" x2="150" y2="398" stroke={CORK} strokeWidth="1" />
      <circle cx="250" cy="398" r="3" fill={CORK} />
      <text x="146" y="394" textAnchor="end" style={mono} fontSize="13" fill={INK} fontWeight="600">FIRM LATEX</text>
      <text x="146" y="411" textAnchor="end" style={mono} fontSize="11.5" fill={SOFT}>springy support</text>

      {/* cork base (bottom) */}
      <line x1="410" y1="430" x2="410" y2="472" stroke={CORK} strokeWidth="1" />
      <circle cx="410" cy="430" r="3" fill={CORK} />
      <text x="410" y="494" textAnchor="middle" style={mono} fontSize="13" fill={CORK_DEEP} fontWeight="600">TILTED CORK BASE</text>
    </svg>
  )
}

const points = [
  {
    title: 'A gentle tilt',
    body: 'The seat leans forward 8°, so your hips do the right thing on their own — no propping, no folded blankets.',
  },
  {
    title: 'Springy, not sinking',
    body: 'Natural latex pushes back and keeps its shape. Memory foam lets you sink in and slump; latex holds you up and breathes.',
  },
  {
    title: 'Room for your tailbone',
    body: 'A shaped dip down the middle keeps the pressure off the spot that usually aches first.',
  },
]

export default function Design() {
  return (
    <section id="design" className="scroll-mt-16 py-20 md:py-28 bg-paper border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-x-14 gap-y-12 items-center">
          <div>
            <p className="mono-label text-[0.72rem] mb-4 text-cork-deep">03 — The design</p>
            <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4vw,3rem)]">
              Simple to sit on. Considered underneath.
            </h2>
            <p className="mt-5 text-ink-soft text-lg leading-relaxed max-w-md">
              Three layers, each doing one job. Together they hold you in a posture that
              would otherwise take real effort to keep.
            </p>

            <ul className="mt-9 border-t border-line">
              {points.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[auto_1fr] gap-x-5 py-5 border-b border-line">
                  <span className="font-mono text-sm text-cork-deep tabular-nums pt-0.5">{`0${i + 1}`}</span>
                  <div>
                    <h3 className="font-display font-semibold text-ink text-[1.02rem] tracking-[-0.01em]">{p.title}</h3>
                    <p className="text-ink-soft text-sm leading-relaxed mt-1.5 max-w-sm">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <FadeIn>
            <figure className="reg-frame border border-line bg-surface/50">
              <figcaption className="border-b border-line px-3 py-2">
                <span className="mono-label text-[0.62rem]">The seat, cut through from the side</span>
              </figcaption>
              <div className="relative">
                <div aria-hidden className="absolute inset-0 tech-grid opacity-40" />
                <div className="relative p-4 sm:p-6">
                  <CrossSection />
                </div>
              </div>
            </figure>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
