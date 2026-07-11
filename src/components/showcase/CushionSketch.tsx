'use client'

import { useId, useImperativeHandle, useRef, type RefObject } from 'react'

export type CushionSketchHandle = {
  /** 0 = blank page, 1 = the drawing fully inked and annotated. */
  setT: (t: number) => void
}

type CushionSketchProps = {
  ref?: RefObject<CushionSketchHandle | null>
  staticT?: number
}

/**
 * The drawing that came before the object: the seat as its designer first sketched
 * it, inked on as you scroll, with the callouts in the drawing's own hand.
 *
 * The line work is clean geometry pushed through a turbulence displacement filter —
 * that's what gives it the wobble of a marker instead of the deadness of a vector.
 */

/** Each stroke draws over a slice of the chapter, in the order a hand would draw it. */
type Stroke = { d: string; start: number; span: number; w?: number; accent?: boolean }

const STROKES: Stroke[] = [
  // Traced from the front elevation. The cushion is a rounded TRAPEZOID — narrower
  // across the raised back, wider at the seat — not a rounded rectangle.
  // The cork tray, drawn first: everything else sits on it.
  { d: 'M258,492 L668,490 L658,534 L266,536 Z', start: 0.0, span: 0.12 },

  // The cushion's silhouette
  {
    d: 'M268,244 C272,186 322,152 386,150 L534,150 C598,152 648,186 652,244 C662,312 668,404 660,478 C596,498 324,498 262,478 C254,404 258,312 268,244 Z',
    start: 0.08,
    span: 0.24,
    w: 2.4,
  },

  // The seam where the raised back meets the seat — a near-horizontal rule right
  // across the object. This is the line that makes the yoke read as a band.
  { d: 'M280,268 C380,278 540,278 634,268', start: 0.3, span: 0.1, accent: true },

  // The cream back panel, cut out of that band: a deep U dipping almost to the seam.
  // The terracotta is what's LEFT of the band — thick wings at the shoulders,
  // pinched to a thin strip at the centre. Two parallel arcs never read as this.
  { d: 'M330,155 C360,290 560,290 594,161', start: 0.34, span: 0.14, accent: true },

  // The relief channel: a tall rounded oval, directly beneath the seam
  {
    d: 'M463,279 C438,279 427,300 427,341 C427,382 440,403 463,403 C486,403 499,382 499,341 C499,300 488,279 463,279 Z',
    start: 0.44,
    span: 0.14,
  },

  // The contour seams: long sweeps from the lower corners up to the seam, bowing
  // outward, framing the channel
  { d: 'M310,455 C300,398 330,322 397,276', start: 0.5, span: 0.12 },
  { d: 'M616,455 C626,398 596,322 529,276', start: 0.54, span: 0.12 },

  // Piping along the bottom edge
  { d: 'M276,470 C380,486 548,486 650,470', start: 0.58, span: 0.08, w: 1.3 },

  // The lotus, hand-set in gold on the back panel
  {
    d: 'M463,196 C459,180 463,168 463,162 C463,168 467,180 463,196 M447,198 C437,186 433,176 431,168 C439,176 447,186 447,198 M479,198 C489,186 493,176 495,168 C487,176 479,186 479,198 M435,204 C421,198 411,192 405,188 C415,194 425,200 435,204 M491,204 C505,198 515,192 521,188 C511,194 501,200 491,204',
    start: 0.62,
    span: 0.14,
    w: 1.7,
    accent: true,
  },
]

type Callout = {
  label: string
  x: number
  y: number
  /** Leader line from the label to the thing it names. */
  leader: string
  start: number
  anchor?: 'start' | 'end'
}

const CALLOUTS: Callout[] = [
  { label: 'Sculpted raised back', x: 116, y: 130, leader: 'M262,142 C282,152 296,164 308,182', start: 0.66 },
  { label: 'Gold lotus, hand-set', x: 866, y: 168, leader: 'M812,180 C712,196 570,190 504,186', start: 0.71, anchor: 'end' },
  {
    label: 'Relief channel — coccyx clear',
    x: 876,
    y: 336,
    leader: 'M812,348 C716,352 592,346 504,342',
    start: 0.76,
    anchor: 'end',
  },
  { label: 'Ramped latex 32→50mm', x: 880, y: 452, leader: 'M812,444 C766,436 706,428 666,424', start: 0.81, anchor: 'end' },
  { label: 'Solid cork base — 8° wedge', x: 60, y: 580, leader: 'M190,570 C240,552 300,528 366,514', start: 0.86 },
]

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
/** Progress of one stroke within the chapter. */
const at = (t: number, start: number, span: number) => clamp01((t - start) / span)

export default function CushionSketch({ ref, staticT }: CushionSketchProps) {
  const t0 = staticT ?? 0
  const uid = useId().replace(/:/g, '')
  const strokeRefs = useRef<(SVGPathElement | null)[]>([])
  const calloutRefs = useRef<(SVGGElement | null)[]>([])
  const titleRef = useRef<SVGTextElement>(null)

  useImperativeHandle(ref, () => ({
    setT(t: number) {
      STROKES.forEach((s, i) => {
        const el = strokeRefs.current[i]
        if (!el) return
        el.style.strokeDashoffset = String(1 - at(t, s.start, s.span))
      })
      CALLOUTS.forEach((c, i) => {
        const el = calloutRefs.current[i]
        if (!el) return
        el.style.opacity = String(at(t, c.start, 0.1))
      })
      if (titleRef.current) titleRef.current.style.opacity = String(at(t, 0.9, 0.1))
    },
  }))

  const ink = 'var(--color-ink)'
  const cork = 'var(--color-cork)'

  return (
    <svg viewBox="0 0 900 600" className="w-full h-full" role="img" aria-label="The Lotus Seat as a designer's sketch: the cushion drawn in marker over its cork base, with handwritten callouts naming the sculpted raised back, the hand-set gold lotus, the central relief channel that keeps the coccyx clear, the ramped latex core tapering from 32 to 50 millimetres, and the solid cork base that forms the 8-degree wedge.">
      <defs>
        {/* Clean geometry in, marker wobble out. */}
        <filter id={`sketch-${uid}`} x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`glow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#sketch-${uid})`}>
        <g filter={`url(#glow-${uid})`}>
          {STROKES.map((s, i) => (
            <path
              key={i}
              ref={(el) => {
                strokeRefs.current[i] = el
              }}
              d={s.d}
              fill="none"
              stroke={s.accent ? cork : ink}
              strokeWidth={s.w ?? 2}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: 1 - at(t0, s.start, s.span),
                opacity: 0.92,
              }}
            />
          ))}
        </g>
      </g>

      {CALLOUTS.map((c, i) => (
        <g
          key={c.label}
          ref={(el) => {
            calloutRefs.current[i] = el
          }}
          style={{ opacity: at(t0, c.start, 0.1) }}
        >
          <path d={c.leader} fill="none" stroke={ink} strokeWidth="1.1" opacity="0.55" filter={`url(#sketch-${uid})`} />
          <text
            x={c.x}
            y={c.y}
            textAnchor={c.anchor ?? 'start'}
            className="hand"
            fontSize="21"
            fontWeight={600}
            fill={ink}
            opacity="0.9"
          >
            {c.label}
          </text>
        </g>
      ))}

      <text ref={titleRef} x="168" y="96" className="hand" fontSize="30" fontWeight={600} fill={cork} style={{ opacity: at(t0, 0.9, 0.1) }}>
        Lotus Seat — LS-01
      </text>
    </svg>
  )
}
