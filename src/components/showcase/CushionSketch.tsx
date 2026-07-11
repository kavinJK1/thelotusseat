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
  // The cork tray — drawn first, the thing everything else sits on
  { d: 'M196,494 L708,488 L696,548 L206,554 Z', start: 0.0, span: 0.12 },
  { d: 'M206,554 L196,494', start: 0.07, span: 0.04, w: 1.6 },

  // The cushion in front elevation. The seat's whole silhouette is its SCULPTED
  // RAISED BACK: the rear rises and rolls over into the back panel, which is what
  // carries the yoke and the lotus. Drawing it as a flat slab lost the object.
  {
    d: 'M214,470 C204,380 214,300 246,268 C292,224 608,224 654,268 C688,300 696,380 686,470 C620,494 290,494 214,470 Z',
    start: 0.1,
    span: 0.24,
    w: 2.4,
  },

  // Where the raised back rolls forward into the seat
  { d: 'M232,318 C300,300 600,300 668,318', start: 0.3, span: 0.1, w: 1.4 },

  // The terracotta yoke: a crescent across the raised back, framing the cream panel
  { d: 'M238,300 C304,384 596,384 662,300', start: 0.34, span: 0.13, accent: true },
  { d: 'M248,326 C314,412 586,412 652,326', start: 0.38, span: 0.13, accent: true },

  // The relief channel, centred in the seat
  {
    d: 'M420,404 C404,412 400,432 404,450 C408,468 428,476 450,476 C472,476 492,468 496,450 C500,432 496,412 480,404 C464,396 436,396 420,404 Z',
    start: 0.46,
    span: 0.14,
  },

  // Contour seams sweeping from the lower corners up toward the yoke
  { d: 'M268,472 C300,440 344,418 394,406', start: 0.52, span: 0.11 },
  { d: 'M632,472 C600,440 556,418 506,406', start: 0.56, span: 0.11 },

  // The lotus, hand-set in gold on the raised back panel
  {
    d: 'M450,296 C446,280 450,268 450,262 C450,268 454,280 450,296 M434,298 C424,286 420,276 418,268 C426,276 434,286 434,298 M466,298 C476,286 480,276 482,268 C474,276 466,286 466,298 M422,304 C408,298 398,292 392,288 C402,294 412,300 422,304 M478,304 C492,298 502,292 508,288 C498,294 488,300 478,304',
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
  { label: 'Sculpted raised back', x: 116, y: 156, leader: 'M258,168 C296,196 318,224 338,250', start: 0.66 },
  { label: 'Gold lotus, hand-set', x: 866, y: 168, leader: 'M812,180 C700,216 540,252 470,272', start: 0.71, anchor: 'end' },
  {
    label: 'Relief channel — coccyx clear',
    x: 876,
    y: 336,
    leader: 'M812,348 C700,382 570,414 508,436',
    start: 0.76,
    anchor: 'end',
  },
  { label: 'Ramped latex 32→50mm', x: 880, y: 494, leader: 'M812,486 C766,482 722,478 694,476', start: 0.81, anchor: 'end' },
  { label: 'Solid cork base — 8° wedge', x: 60, y: 586, leader: 'M186,576 C240,562 296,548 344,534', start: 0.86 },
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
