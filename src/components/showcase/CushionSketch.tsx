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
  { d: 'M206,492 L728,486 L716,542 L216,548 Z', start: 0.0, span: 0.13 },
  { d: 'M216,548 L206,492', start: 0.08, span: 0.04, w: 1.6 },

  // The cushion's front wall, sitting down into the tray
  {
    d: 'M222,432 L228,486 Q230,500 250,499 L700,492 Q716,491 716,478 L718,424',
    start: 0.1,
    span: 0.16,
    w: 2.4,
  },

  // The top face: a rounded square in perspective — back edge shorter and higher,
  // front edge wider and lower. Drawn as a trapezoid, not a dome.
  {
    d: 'M300,304 L636,304 Q712,318 720,400 Q724,424 700,432 L250,440 Q216,440 214,406 Q212,318 300,304 Z',
    start: 0.16,
    span: 0.22,
    w: 2.4,
  },

  // The terracotta yoke: a crescent dipping forward, framing the cream rear panel
  { d: 'M330,318 C400,378 546,378 614,318', start: 0.32, span: 0.13, accent: true },
  { d: 'M316,328 C392,398 552,398 628,328', start: 0.36, span: 0.13, accent: true },

  // The relief channel — foreshortened by the angle of the top face
  {
    d: 'M444,388 C424,392 418,404 424,414 C430,424 450,428 472,426 C494,424 510,414 508,402 C506,390 490,384 472,384 C462,384 452,386 444,388 Z',
    start: 0.44,
    span: 0.14,
  },

  // Contour seams sweeping up from the front corners toward the yoke
  { d: 'M272,428 C332,414 392,404 432,396', start: 0.5, span: 0.11 },
  { d: 'M664,424 C610,412 552,402 514,396', start: 0.54, span: 0.11 },

  // The lotus, hand-set in gold on the rear panel
  {
    d: 'M472,344 C468,330 472,322 472,316 C472,322 476,330 472,344 M458,346 C450,336 446,328 444,322 C450,328 458,336 458,346 M486,346 C494,336 498,328 500,322 C494,328 486,336 486,346 M448,352 C436,348 428,344 422,342 C430,346 440,350 448,352 M496,352 C508,348 516,344 522,342 C514,346 504,350 496,352',
    start: 0.6,
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
  { label: 'Gold lotus, hand-set', x: 150, y: 186, leader: 'M304,198 C356,236 414,290 452,330', start: 0.66 },
  {
    label: 'Relief channel — coccyx clear',
    x: 858,
    y: 214,
    leader: 'M812,236 C716,296 600,364 518,400',
    start: 0.72,
    anchor: 'end',
  },
  {
    label: 'Ramped latex 32→50mm',
    x: 872,
    y: 468,
    leader: 'M812,478 C784,482 752,486 722,488',
    start: 0.78,
    anchor: 'end',
  },
  { label: 'Solid cork base — 8° wedge', x: 76, y: 580, leader: 'M200,570 C264,560 324,546 376,530', start: 0.84 },
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
    <svg viewBox="0 0 900 600" className="w-full h-full" role="img" aria-label="The Lotus Seat as a designer's sketch: the cushion drawn in marker over its cork base, with handwritten callouts naming the hand-set gold lotus, the central relief channel that keeps the coccyx clear, the ramped latex core tapering from 32 to 50 millimetres, and the solid cork base that forms the 8-degree wedge.">
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
