/**
 * The measured inset that sits in the corner of each feature photograph.
 *
 * A photograph proves the object exists — which, for a pre-order with no reviews
 * yet, is the most valuable thing on the page. What it cannot do is state a
 * *measurement*: no camera angle shows you 8 degrees, or a 32→50 mm ramp. Those
 * claims were previously asserted in the caption and shown nowhere.
 *
 * So the photo keeps its job and this takes the other one. It is drawn, not
 * anchored to the image — the five photographs are framed differently, and a
 * dimension rule pinned to pixel coordinates would point at nothing in four of
 * them. A detail view is also simply what a datasheet does here.
 */
const STROKE = 'var(--color-ink)'
const ACCENT = 'var(--color-cork-deep)'
const SOFT = 'var(--color-ink-soft)'

/** Shared text style — the mono face, at the size the rest of the drawings use. */
const label = {
  fontFamily: 'var(--font-mono)',
  fontSize: 9,
  fill: SOFT,
  letterSpacing: '0.02em',
} as const

const dim = { ...label, fill: ACCENT } as const

/**
 * Each diagram carries its own viewBox, cropped to what it actually draws. An 8°
 * wedge is genuinely shallow, and the alternative to cropping is exaggerating the
 * angle to fill a square — which would make the drawing lie about the one number
 * it exists to state.
 */
type Diagram = { vb: string; node: React.ReactNode }

const DIAGRAMS: Record<string, Diagram> = {
  // 8° wedge: the cork base in section, with the angle it holds.
  // A 16 mm rise over a 116 mm run is 7.85° — drawn true, not dramatised.
  tilt: {
    vb: '6 48 128 44',
    node: (
      <>
        <line x1="12" y1="70" x2="128" y2="70" stroke={SOFT} strokeWidth="1" strokeDasharray="3 3" />
        <path d="M12,70 L128,70 L128,54 Z" fill="var(--color-cork)" fillOpacity="0.25" stroke={ACCENT} strokeWidth="1.2" />
        <path d="M52,70 A40,40 0 0 0 51.6,64.5" fill="none" stroke={ACCENT} strokeWidth="1" />
        <text x="56" y="67" style={dim}>8°</text>
        <text x="12" y="84" style={label}>CORK BASE · SECTION</text>
      </>
    ),
  },

  // 70 mm of latex: the depth of the core, dimensioned.
  latex: {
    vb: '6 16 128 76',
    node: (
      <>
        <rect x="34" y="34" width="76" height="34" fill="var(--color-surface)" stroke={STROKE} strokeWidth="1.2" />
        <line x1="24" y1="34" x2="24" y2="68" stroke={ACCENT} strokeWidth="1" />
        <path d="M21,37 L24,34 L27,37 M21,65 L24,68 L27,65" fill="none" stroke={ACCENT} strokeWidth="1" />
        <text x="30" y="28" style={dim}>70 mm</text>
        <text x="12" y="84" style={label}>LATEX CORE · ILD 75–85</text>
      </>
    ),
  },

  // The ramp: 32 mm at the front, 50 mm at the rear — the 18 mm graduated rise.
  ramp: {
    vb: '0 16 140 76',
    node: (
      <>
        <path d="M34,68 L110,68 L110,32 L34,50 Z" fill="var(--color-surface)" stroke={STROKE} strokeWidth="1.2" />
        <line x1="26" y1="50" x2="26" y2="68" stroke={ACCENT} strokeWidth="1" />
        <path d="M23,53 L26,50 L29,53 M23,65 L26,68 L29,65" fill="none" stroke={ACCENT} strokeWidth="1" />
        <text x="8" y="46" style={dim}>32</text>
        <line x1="118" y1="32" x2="118" y2="68" stroke={ACCENT} strokeWidth="1" />
        <path d="M115,35 L118,32 L121,35 M115,65 L118,68 L121,65" fill="none" stroke={ACCENT} strokeWidth="1" />
        <text x="122" y="28" style={dim}>50</text>
        <text x="12" y="84" style={label}>COMFORT LAYER · mm</text>
      </>
    ),
  },

  // The relief channel: the coccyx cut-out, in section, and how deep it runs.
  channel: {
    vb: '6 24 128 68',
    node: (
      <>
        <path
          d="M22,42 L58,42 C64,42 64,58 70,58 C76,58 76,42 82,42 L118,42 L118,68 L22,68 Z"
          fill="var(--color-surface)"
          stroke={STROKE}
          strokeWidth="1.2"
        />
        <line x1="70" y1="42" x2="70" y2="58" stroke={ACCENT} strokeWidth="1" />
        <path d="M67,45 L70,42 L73,45 M67,55 L70,58 L73,55" fill="none" stroke={ACCENT} strokeWidth="1" />
        <text x="76" y="36" style={dim}>10–15</text>
        <text x="12" y="84" style={label}>RELIEF CHANNEL · mm</text>
      </>
    ),
  },
}

/**
 * F-05 is the cover: a material, not a measurement. The photograph already does
 * that job better than any drawing could, so this deliberately renders nothing.
 */
export default function FeatureDiagram({ id }: { id: string }) {
  const diagram = DIAGRAMS[id]
  if (!diagram) return null

  return (
    <div className="absolute bottom-3 right-3 z-10 w-[9.5rem] border border-line bg-paper/92 backdrop-blur-[2px] rounded-[2px] px-2 py-1.5">
      <svg viewBox={diagram.vb} className="w-full h-auto" role="img" aria-hidden>
        {diagram.node}
      </svg>
    </div>
  )
}
