'use client'

import { useImperativeHandle, useRef, type RefObject } from 'react'
import {
  frameAt,
  GROUND_Y,
  PELVIS_PATH,
  SEAT_CORK,
  SEAT_CUSHION,
  VIEWBOX,
  ZAFU,
} from './postureGeometry'

export type PostureProofHandle = {
  /** Drive the morph: 0 = slumped on a zafu, 1 = upright on the Lotus Seat. */
  setT: (t: number) => void
}

type PostureProofProps = {
  ref?: RefObject<PostureProofHandle | null>
  /** Mobile plate: two states, pelvic rotation and the 8° tilt only. */
  compact?: boolean
  /**
   * Render at a fixed morph position instead of being scroll-driven. The
   * reduced-motion fallback uses this to show both end states side by side
   * rather than animating between them.
   */
  staticT?: number
}

/** The zafu fades out early; the seat and its tilt callout arrive later, in that order. */
const zafuOpacity = (t: number) => Math.max(0, 1 - t * 2.2)
const seatOpacity = (t: number) => Math.max(0, (t - 0.45) / 0.55)
const tiltOpacity = (t: number) => Math.max(0, (t - 0.6) / 0.4)
/** The head-carriage bracket only means something while there IS an offset. */
const offsetOpacity = (dx: number) => Math.max(0, Math.min(1, (Math.abs(dx) - 8) / 16))

const pelvisLabel = (deg: number) => `PELVIS ${deg < 0 ? '−' : '+'}${Math.abs(deg).toFixed(0)}°`
const stateLabel = (t: number) => (t < 0.5 ? 'C-CURVE · LOADED' : 'STACKED · NEUTRAL')

/**
 * The measured plate: same body, same posture, two seat geometries. Scroll drives
 * the morph, so the viewer watches the pelvis rotate and the spine stack rather
 * than being told that it does.
 *
 * Scroll updates are written straight to SVG attributes — this redraws every frame
 * and must never go through React state. Every attribute is therefore initialised
 * from the same frameAt() the imperative path uses, so a plate that is never driven
 * (the reduced-motion fallback) still renders a coherent, correctly-labelled frame.
 */
export default function PostureProof({ ref, compact = false, staticT }: PostureProofProps) {
  const t0 = staticT ?? 0
  const f0 = frameAt(t0)

  const torsoRef = useRef<SVGPathElement>(null)
  const spineRef = useRef<SVGPathElement>(null)
  const headRef = useRef<SVGCircleElement>(null)
  const pelvisRef = useRef<SVGGElement>(null)
  const legRef = useRef<SVGPathElement>(null)
  const footRef = useRef<SVGCircleElement>(null)
  const gravityRef = useRef<SVGLineElement>(null)
  const offsetGroupRef = useRef<SVGGElement>(null)
  const offsetLineRef = useRef<SVGLineElement>(null)
  const offsetLabelRef = useRef<SVGTextElement>(null)
  const vertebraeRefs = useRef<(SVGRectElement | null)[]>([])
  const zafuRef = useRef<SVGGElement>(null)
  const seatRef = useRef<SVGGElement>(null)
  const tiltRef = useRef<SVGGElement>(null)
  const pelvisLabelRef = useRef<SVGTextElement>(null)
  const stateLabelRef = useRef<SVGTextElement>(null)

  useImperativeHandle(ref, () => ({
    setT(t: number) {
      const f = frameAt(t)

      torsoRef.current?.setAttribute('d', f.torsoPath)
      spineRef.current?.setAttribute('d', f.spinePath)
      legRef.current?.setAttribute('d', f.legPath)
      headRef.current?.setAttribute('cx', String(f.head.cx))
      headRef.current?.setAttribute('cy', String(f.head.cy))
      footRef.current?.setAttribute('cx', String(f.ankle.x))
      footRef.current?.setAttribute('cy', String(f.ankle.y))
      pelvisRef.current?.setAttribute(
        'transform',
        `translate(${f.pelvis.x} ${f.pelvis.y}) rotate(${f.pelvis.angle.toFixed(2)})`,
      )

      f.vertebrae.forEach((v, i) => {
        vertebraeRefs.current[i]?.setAttribute(
          'transform',
          `translate(${v.x} ${v.y}) rotate(${v.angle.toFixed(2)})`,
        )
      })

      zafuRef.current?.setAttribute('opacity', zafuOpacity(t).toFixed(3))
      seatRef.current?.setAttribute('opacity', seatOpacity(t).toFixed(3))
      tiltRef.current?.setAttribute('opacity', tiltOpacity(t).toFixed(3))

      pelvisLabelRef.current!.textContent = pelvisLabel(f.pelvisDeg)

      if (!compact) {
        gravityRef.current?.setAttribute('x1', String(f.gravityX))
        gravityRef.current?.setAttribute('x2', String(f.gravityX))
        offsetLineRef.current?.setAttribute('x1', String(f.sacrumX))
        offsetLineRef.current?.setAttribute('x2', String(f.gravityX))
        offsetLabelRef.current!.textContent = `Δ ${f.offsetMm} mm`
        offsetLabelRef.current!.setAttribute('x', String((f.sacrumX + f.gravityX) / 2))
        offsetGroupRef.current?.setAttribute(
          'opacity',
          offsetOpacity(f.gravityX - f.sacrumX).toFixed(3),
        )
        stateLabelRef.current!.textContent = stateLabel(t)
      }
    },
  }))

  const ink = 'var(--color-ink)'
  const soft = 'var(--color-ink-soft)'
  const line = 'var(--color-line-strong)'
  const cork = 'var(--color-cork-deep)'
  const mono = { fontFamily: 'var(--font-mono)' }

  return (
    <svg
      viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.w} ${VIEWBOX.h}`}
      className="w-full h-full"
      role="img"
      aria-label="Side-elevation comparison. On a flat round zafu the pelvis rotates 14 degrees backward, the lumbar spine collapses into a C-curve, and the head carries about 55 millimetres forward of the sacrum — a load the back muscles hold for the whole sit. On the Lotus Seat's 8-degree wedge the pelvis rotates 8 degrees forward, the lumbar curve returns, and the spine stacks over the sacrum."
    >
      {/* Floor datum */}
      <line x1="70" y1={GROUND_Y} x2="475" y2={GROUND_Y} stroke={line} strokeWidth="1" />

      {/* Seats: the zafu (the control) crossfades to the Lotus Seat */}
      <g ref={zafuRef} opacity={zafuOpacity(t0)}>
        <ellipse
          cx={ZAFU.cx}
          cy={ZAFU.cy}
          rx={ZAFU.rx}
          ry={ZAFU.ry}
          fill="var(--color-surface)"
          stroke={line}
          strokeWidth="1.5"
        />
        <text x={ZAFU.cx} y={GROUND_Y + 20} textAnchor="middle" style={mono} fontSize="11" fill={soft} letterSpacing="1">
          FLAT ZAFU
        </text>
      </g>

      <g ref={seatRef} opacity={seatOpacity(t0)}>
        <path d={SEAT_CORK} fill="var(--color-cork)" fillOpacity="0.35" stroke={cork} strokeWidth="1.5" />
        <path d={SEAT_CUSHION} fill="var(--color-surface)" stroke={line} strokeWidth="1.5" />
        <text x="260" y={GROUND_Y + 20} textAnchor="middle" style={mono} fontSize="11" fill={cork} letterSpacing="1">
          LOTUS SEAT · LS-01
        </text>

        <g ref={tiltRef} opacity={tiltOpacity(t0)}>
          <line x1="160" y1="418" x2="300" y2="418" stroke={cork} strokeWidth="1" strokeDasharray="4 4" />
          <path d="M262,418 A100,100 0 0 0 258,404" fill="none" stroke={cork} strokeWidth="1.5" />
          <text x="276" y="412" style={mono} fontSize="13" fontWeight="600" fill={cork}>
            8°
          </text>
        </g>
      </g>

      {/* Line of gravity and head-carriage offset — desktop plate only */}
      {!compact && (
        <>
          <line
            ref={gravityRef}
            x1={f0.gravityX}
            y1="120"
            x2={f0.gravityX}
            y2={GROUND_Y}
            stroke={cork}
            strokeWidth="1"
            strokeDasharray="3 5"
            opacity="0.75"
          />
          <g ref={offsetGroupRef} opacity={offsetOpacity(f0.gravityX - f0.sacrumX)}>
            <line ref={offsetLineRef} x1={f0.sacrumX} y1="150" x2={f0.gravityX} y2="150" stroke={cork} strokeWidth="1" />
            <text
              ref={offsetLabelRef}
              x={(f0.sacrumX + f0.gravityX) / 2}
              y="142"
              textAnchor="middle"
              style={mono}
              fontSize="11.5"
              fontWeight="600"
              fill={cork}
            >
              Δ {f0.offsetMm} mm
            </text>
          </g>
        </>
      )}

      {/* Figure */}
      <g>
        {/* Body silhouette — the plate reads as a seated person, not an anatomy chart */}
        <path
          ref={torsoRef}
          d={f0.torsoPath}
          fill={ink}
          fillOpacity="0.07"
          stroke={soft}
          strokeOpacity="0.45"
          strokeWidth="1.25"
        />

        {/* Crossed leg: hip → knee → ankle */}
        <path
          ref={legRef}
          d={f0.legPath}
          fill="none"
          stroke={soft}
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
        />
        <circle ref={footRef} cx={f0.ankle.x} cy={f0.ankle.y} r="8" fill={soft} opacity="0.35" />

        {/* Pelvis — the element the whole argument turns on */}
        <g ref={pelvisRef} transform={`translate(${f0.pelvis.x} ${f0.pelvis.y}) rotate(${f0.pelvis.angle})`}>
          <path d={PELVIS_PATH} fill="var(--color-cork)" fillOpacity="0.9" stroke={cork} strokeWidth="1.5" />
        </g>

        {/* Spine */}
        <path ref={spineRef} d={f0.spinePath} fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        {f0.vertebrae.map((v, i) => (
          <rect
            key={i}
            ref={(el) => {
              vertebraeRefs.current[i] = el
            }}
            x="-4.5"
            y="-6"
            width="9"
            height="12"
            rx="2"
            transform={`translate(${v.x} ${v.y}) rotate(${v.angle})`}
            fill="var(--color-paper)"
            stroke={ink}
            strokeWidth="1.5"
          />
        ))}

        {/* Skull */}
        <circle
          ref={headRef}
          cx={f0.head.cx}
          cy={f0.head.cy}
          r={f0.head.r}
          fill="var(--color-paper)"
          stroke={ink}
          strokeWidth="2"
        />
      </g>

      {/* Readouts — the label both plates share, plus the spine state on desktop */}
      <text ref={pelvisLabelRef} x="72" y="150" style={mono} fontSize="13" fontWeight="600" fill={cork}>
        {pelvisLabel(f0.pelvisDeg)}
      </text>
      {!compact && (
        <text ref={stateLabelRef} x="72" y="170" style={mono} fontSize="11.5" fill={soft} letterSpacing="0.5">
          {stateLabel(t0)}
        </text>
      )}
    </svg>
  )
}
