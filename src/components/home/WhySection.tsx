import FadeIn from '@/components/FadeIn'

const mono = { fontFamily: 'var(--font-mono)' }

// The cross-section is drawn on the tokens, not on hex, so it inverts with the stage.
const INK = 'var(--color-ink)'
const SOFT = 'var(--color-ink-soft)'
const LINE = 'var(--color-line-strong)'
const CORK = 'var(--color-cork)'
const CORKFILL = 'color-mix(in oklch, var(--color-cork) 45%, transparent)'
const SURFACE = 'var(--color-surface)'
const SURFACE2 = 'color-mix(in oklch, var(--color-surface) 70%, var(--color-paper))'

/** Side-elevation cross-section of the seat — the engineering, drawn to scale-ish. */
function CrossSection() {
  return (
    <svg
      viewBox="0 0 820 520"
      className="w-full h-auto"
      role="img"
      aria-label="Cross-section of The Lotus Seat: an 8-degree inclined cork composite base, a 70 mm responsive natural-latex base layer, a ramped comfort layer tapering from 32 mm at the front to 50 mm at the rear, and a central relief channel 10 to 15 mm deep."
    >
      {/* ground / datum */}
      <line x1="120" y1="452" x2="700" y2="452" stroke={LINE} strokeWidth="1" />
      <line x1="120" y1="452" x2="120" y2="466" stroke={LINE} strokeWidth="1" />
      <line x1="700" y1="452" x2="700" y2="466" stroke={LINE} strokeWidth="1" />
      <text x="410" y="480" textAnchor="middle" style={mono} fontSize="12" fill={SOFT} letterSpacing="1">DATUM · FLOOR</text>

      {/* cork inclined base */}
      <path d="M160,452 L660,452 L660,346 L160,418 Z" fill={CORKFILL} stroke={CORK} strokeWidth="1.5" />
      {/* latex base layer (70mm) */}
      <path d="M160,418 L660,346 L660,306 L160,378 Z" fill={SURFACE} stroke={LINE} strokeWidth="1.5" />
      {/* ramped comfort layer with central relief channel */}
      <path
        d="M160,356 L360,330 C400,324 425,324 448,338 C472,352 520,352 544,338 C568,324 600,306 660,258 L660,306 L160,378 Z"
        fill={SURFACE2}
        stroke={LINE}
        strokeWidth="1.5"
      />

      {/* 8° angle annotation at front */}
      <line x1="160" y1="418" x2="286" y2="418" stroke={CORK} strokeWidth="1" strokeDasharray="4 4" />
      <path d="M250,418 A90,90 0 0 0 244,404" fill="none" stroke={CORK} strokeWidth="1.5" />
      <text x="266" y="410" style={mono} fontSize="14" fill={CORK} fontWeight="600">8°</text>

      {/* --- callouts --- */}
      {/* relief channel (up) */}
      <line x1="496" y1="345" x2="496" y2="150" stroke={CORK} strokeWidth="1" />
      <circle cx="496" cy="345" r="3" fill={CORK} />
      <text x="496" y="138" textAnchor="middle" style={mono} fontSize="13" fill={CORK} fontWeight="600">RELIEF CHANNEL</text>
      <text x="496" y="120" textAnchor="middle" style={mono} fontSize="11.5" fill={SOFT}>10–15 mm · COCCYX OFF-LOAD</text>

      {/* ramped comfort layer (right) */}
      <line x1="628" y1="284" x2="712" y2="240" stroke={CORK} strokeWidth="1" />
      <circle cx="628" cy="284" r="3" fill={CORK} />
      <text x="716" y="236" style={mono} fontSize="13" fill={INK} fontWeight="600">RAMPED LAYER</text>
      <text x="716" y="254" style={mono} fontSize="11.5" fill={SOFT}>32→50 mm</text>
      <text x="716" y="270" style={mono} fontSize="11.5" fill={SOFT}>ILD 45–55</text>

      {/* latex base (left) */}
      <line x1="250" y1="398" x2="150" y2="398" stroke={CORK} strokeWidth="1" />
      <circle cx="250" cy="398" r="3" fill={CORK} />
      <text x="146" y="394" textAnchor="end" style={mono} fontSize="13" fill={INK} fontWeight="600">LATEX BASE</text>
      <text x="146" y="412" textAnchor="end" style={mono} fontSize="11.5" fill={SOFT}>70 mm · ILD 75–85</text>

      {/* cork base (bottom) */}
      <line x1="410" y1="430" x2="410" y2="500" stroke={CORK} strokeWidth="1" />
      <circle cx="410" cy="430" r="3" fill={CORK} />
      <text x="410" y="502" textAnchor="middle" style={mono} fontSize="13" fill={CORK} fontWeight="600">INCLINED CORK BASE</text>
    </svg>
  )
}

const points = [
  {
    k: '01',
    title: '8° base tilt',
    body: 'The inclined cork base rotates the pelvis forward into its natural lordotic curve — the spine stacks upright without muscular effort.',
  },
  {
    k: '02',
    title: 'Responsive latex, not memory foam',
    body: 'Latex returns to shape instantly. It supports weight without letting the body sink and lose posture — session after session.',
  },
  {
    k: '03',
    title: 'Relief where it’s needed',
    body: 'A sculpted central channel lifts the coccyx clear of contact — the single most common reason a sit ends too soon.',
  },
]

export default function WhySection() {
  return (
    <section id="engineering" className="scroll-mt-16 py-20 md:py-28 bg-paper border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-x-14 gap-y-12 items-center">
          {/* Text */}
          <div>
            <p className="mono-label text-[0.66rem] mb-5 flex items-center gap-2">
              <span className="text-cork-deep">FIG. 01</span>
              <span className="w-6 h-px bg-line-strong" />
              CONSTRUCTION
            </p>
            <h2 className="font-display font-semibold text-ink tracking-[-0.03em] leading-[1.02] text-[clamp(1.9rem,4vw,3rem)]">
              Ergonomics, in cross-section.
            </h2>
            <p className="mt-5 text-ink-soft text-lg leading-relaxed max-w-md">
              Meditation discomfort is postural, not a matter of softness. Every layer of
              the seat resolves a specific point in the kinetic chain from floor to skull.
            </p>

            <ul className="mt-9 border-t border-line">
              {points.map((p) => (
                <li key={p.k} className="grid grid-cols-[auto_1fr] gap-x-5 py-5 border-b border-line">
                  <span className="font-mono text-sm text-cork-deep tabular-nums pt-0.5">{p.k}</span>
                  <div>
                    <h3 className="font-display font-semibold text-ink text-[1.02rem] tracking-[-0.01em]">{p.title}</h3>
                    <p className="text-ink-soft text-sm leading-relaxed mt-1.5 max-w-sm">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Diagram */}
          <FadeIn>
            <figure className="reg-frame border border-line bg-surface/50">
              <figcaption className="flex items-center justify-between border-b border-line px-3 py-2">
                <span className="mono-label text-[0.62rem]">SECTION A–A · SIDE ELEVATION</span>
                <span className="mono-label text-[0.62rem]">SCALE ~1:8</span>
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
