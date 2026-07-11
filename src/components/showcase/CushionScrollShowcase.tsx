'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { CushionScene } from './cushionScene'
import CushionSketch, { type CushionSketchHandle } from './CushionSketch'
import PostureProof, { type PostureProofHandle } from './PostureProof'

const MODEL_URL = '/models/cushion-v7.obj'

/**
 * The stage. One scroll track, four chapters, in the order the product actually
 * came into being:
 *
 *   SKETCH     the drawing, inked on by hand
 *   STRUCTURE  the same object as a white-line engineering drawing
 *   MATERIAL   the drawing resolves into cork, latex and woven cotton
 *   POSTURE    the measured plate — what the geometry does to a spine
 *
 * The chrome is a viewfinder's, but nothing on it is borrowed: the readout is the
 * seat's own specification, and the timer counts a sit, because that is what this
 * object is for.
 */
const CH = {
  sketchOut: 0.16,
  wireIn: 0.22,
  revealIn: 0.4,
  revealOut: 0.5,
  // The object gets a real dwell in its materials (0.50–0.64) before the plate
  // takes the frame. Handing straight from the reveal to the plate wasted it.
  plateIn: 0.64,
  plateOut: 0.8,
} as const

/** Camera progress (in CAMERA_KEYS space) held while the plate has the frame. */
const CAMERA_HOLD = 0.27

const CHAPTERS = [
  { label: 'SKETCH', at: 0.0 },
  { label: 'STRUCTURE', at: 0.22 },
  { label: 'MATERIAL', at: 0.5 },
  { label: 'POSTURE', at: 0.64 },
  { label: 'TEARDOWN', at: 0.8 },
]

/** Captions are timed against section progress, not the camera: the camera holds
 *  still through two chapters, so keying off it would strand them. */
const CAPTIONS = [
  { at: 0.3, title: 'Made for stillness', body: 'A sculpted seat on a solid cork base. Scroll to take it apart.' },
  { at: 0.57, title: 'The wedge', body: 'An 18 mm front-to-back rise. The pelvis tips forward; the spine stops fighting.' },
  { at: 0.825, title: 'Relief channel', body: 'A sculpted centre channel lifts the coccyx clear of contact.' },
  { at: 0.874, title: 'The lotus', body: 'Hand-set in gold on the raised rear panel — the only ornament on the object.' },
  { at: 0.929, title: 'Cork base', body: 'The seat lifts away from a solid cork tray: the wedge, the grip, the floor protection.' },
  { at: 0.99, title: 'LS-01', body: 'Woven cotton-linen · natural latex · solid cork.' },
]
/** How wide a window each caption owns, in section progress. */
const CAPTION_WINDOW = 0.045

const ease = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (t: number) => Math.max(0, Math.min(1, t))
/** Ramp from 0→1 across [a, b]. */
const ramp = (p: number, a: number, b: number) => clamp01((p - a) / (b - a))

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/** Subscribed rather than written into state from an effect, so the preference is
 *  right on first paint and follows the user if they change it mid-session. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED_MOTION)
      query.addEventListener('change', onChange)
      return () => query.removeEventListener('change', onChange)
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  )
}

/** Section progress → camera progress. The camera idles through the sketch and holds
 *  in side elevation while the posture plate has the frame. */
function cameraProgress(p: number): number {
  if (p <= CH.wireIn) return 0
  if (p < CH.plateIn) return ((p - CH.wireIn) / (CH.plateIn - CH.wireIn)) * CAMERA_HOLD
  if (p < CH.plateOut) return CAMERA_HOLD
  return CAMERA_HOLD + ((p - CH.plateOut) / (1 - CH.plateOut)) * (1 - CAMERA_HOLD)
}

/** 1 = engineering drawing, 0 = the object in its materials. */
const wireAmount = (p: number) => 1 - ramp(p, CH.revealIn, CH.revealOut)
const sketchOpacity = (p: number) => 1 - ease(ramp(p, CH.sketchOut, CH.wireIn))
const plateOpacity = (p: number) =>
  ease(Math.min(ramp(p, CH.plateIn, CH.plateIn + 0.03), 1 - ramp(p, CH.plateOut - 0.03, CH.plateOut)))

const mmss = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`

export default function CushionScrollShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sketchLayerRef = useRef<HTMLDivElement>(null)
  const plateLayerRef = useRef<HTMLDivElement>(null)
  const sketchRef = useRef<CushionSketchHandle>(null)
  const postureRef = useRef<PostureProofHandle>(null)
  const posturePhoneRef = useRef<PostureProofHandle>(null)
  const captionRefs = useRef<(HTMLDivElement | null)[]>([])
  const timerRef = useRef<HTMLSpanElement>(null)
  const scrubRef = useRef<HTMLDivElement>(null)
  const chapterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [failed, setFailed] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  // Reduced motion and WebGL-less clients get the static plate below: the section
  // still makes its whole argument, so nothing is lost.
  const showStatic = reducedMotion || failed

  useEffect(() => {
    if (showStatic) return
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    let scene: CushionScene | null = null
    let raf = 0
    let cancelled = false
    let smoothed = 0
    const started = performance.now()

    /** Progress through this section's own scroll track (0 at pin start, 1 at pin end). */
    const sectionProgress = () => {
      const rect = section.getBoundingClientRect()
      const track = rect.height - window.innerHeight
      return track > 0 ? clamp01(-rect.top / track) : 0
    }

    const paint = (p: number) => {
      const sketch = sketchOpacity(p)
      const plate = plateOpacity(p)

      if (sketchLayerRef.current) {
        sketchLayerRef.current.style.opacity = sketch.toFixed(3)
        sketchLayerRef.current.style.visibility = sketch > 0.002 ? 'visible' : 'hidden'
      }
      if (plateLayerRef.current) {
        plateLayerRef.current.style.opacity = plate.toFixed(3)
        plateLayerRef.current.style.visibility = plate > 0.002 ? 'visible' : 'hidden'
      }
      canvas.style.opacity = clamp01(1 - sketch - plate).toFixed(3)

      sketchRef.current?.setT(clamp01(p / CH.sketchOut))
      const morph = ease(clamp01((p - (CH.plateIn + 0.02)) / 0.1))
      postureRef.current?.setT(morph)
      posturePhoneRef.current?.setT(morph)

      captionRefs.current.forEach((el, i) => {
        if (!el) return
        const near = Math.max(0, 1 - Math.abs(p - CAPTIONS[i].at) / CAPTION_WINDOW)
        el.style.opacity = (ease(near) * clamp01(1 - sketch - plate)).toFixed(3)
      })

      if (scrubRef.current) scrubRef.current.style.transform = `scaleX(${p.toFixed(4)})`
      const active = CHAPTERS.reduce((acc, c, i) => (p >= c.at ? i : acc), 0)
      chapterRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = i === active ? '1' : '0.35'
      })
      if (timerRef.current) timerRef.current.textContent = mmss((performance.now() - started) / 1000)
    }

    const start = async () => {
      try {
        // three and the scene builder are the bulk of the payload: fetched alongside
        // the model, and only once this section actually mounts.
        const [{ createCushionScene }, res] = await Promise.all([import('./cushionScene'), fetch(MODEL_URL)])
        if (!res.ok) throw new Error(`model fetch failed: ${res.status}`)
        const objText = await res.text()
        if (cancelled) return

        scene = createCushionScene(
          canvas,
          objText,
          canvas.clientWidth || window.innerWidth,
          canvas.clientHeight || window.innerHeight,
        )
        scene.setWireframe(1)

        const tick = () => {
          raf = requestAnimationFrame(tick)
          smoothed += (sectionProgress() - smoothed) * 0.075 // inertial smoothing
          scene!.setWireframe(wireAmount(smoothed))
          scene!.render(cameraProgress(smoothed))
          paint(smoothed)
        }
        tick()
      } catch (err) {
        console.error('[CushionScrollShowcase] scene init failed', err)
        if (!cancelled) setFailed(true)
      }
    }
    start()

    const observer = new ResizeObserver(() => scene?.resize(canvas.clientWidth, canvas.clientHeight))
    observer.observe(canvas)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      observer.disconnect()
      scene?.dispose()
    }
  }, [showStatic])

  if (showStatic) {
    return (
      <section className="bg-paper border-y border-line py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="display-xl text-ink max-w-3xl">The pelvis is the mechanism</h2>
          <p className="mt-6 text-ink-soft text-lg leading-relaxed max-w-xl">
            On a flat cushion the pelvis rolls backward and the lumbar spine collapses into a
            C-curve. The 8° wedge rotates it forward instead — the curve returns, the segments
            stack, and the effort disappears.
          </p>

          <figure className="mt-10 reg-frame border border-line bg-surface/40">
            <figcaption className="border-b border-line px-3 py-2 mono-label text-[0.62rem]">
              THE DRAWING · LS-01
            </figcaption>
            <div className="aspect-[3/2]">
              <CushionSketch staticT={1} />
            </div>
          </figure>

          {/* Reduced motion: both end states side by side, no morph required. */}
          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            {[
              { t: 0, cap: 'ON A FLAT ZAFU' },
              { t: 1, cap: 'ON THE LOTUS SEAT' },
            ].map((s) => (
              <figure key={s.cap} className="reg-frame border border-line bg-surface/40">
                <figcaption className="border-b border-line px-3 py-2 mono-label text-[0.62rem]">{s.cap}</figcaption>
                <div className="p-3 aspect-[435/375]">
                  <PostureProof staticT={s.t} />
                </div>
              </figure>
            ))}
          </div>

          <div className="mt-10 border-t border-line">
            {CAPTIONS.map((c) => (
              <div key={c.title} className="grid sm:grid-cols-[12rem_1fr] gap-x-8 py-5 border-b border-line">
                <h3 className="font-display font-semibold text-ink text-[1.05rem] tracking-[-0.01em]">{c.title}</h3>
                <p className="text-ink-soft text-[0.95rem] leading-relaxed max-w-lg mt-1.5 sm:mt-0">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      aria-label="The Lotus Seat, from sketch to structure to material, and the posture it produces"
      className="relative h-[500vh] md:h-[800vh] bg-paper"
    >
      <div className="viewfinder sticky top-0 h-screen overflow-hidden">
        <span aria-hidden className="vf-b" />

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Chapter 1 — the drawing */}
        <div ref={sketchLayerRef} className="absolute inset-0 flex items-center justify-center px-6">
          <div className="w-full max-w-5xl aspect-[3/2]">
            <CushionSketch ref={sketchRef} />
          </div>
        </div>

        {/* Chapter 4 — the measured plate */}
        <div ref={plateLayerRef} style={{ opacity: 0, visibility: 'hidden' }} className="absolute inset-0 bg-paper">
          <div aria-hidden className="absolute inset-0 tech-grid tech-grid-fade opacity-40" />
          <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
            <div className="lg:w-[38%] w-full max-w-md">
              <p className="mono-label text-[0.66rem] flex items-center gap-2">
                <span className="text-cork">FIG. 02</span>
                <span className="w-6 h-px bg-line-strong" />
                POSTURAL MECHANISM
              </p>
              <h2 className="mt-4 display-xl text-ink text-[clamp(1.7rem,3.4vw,2.8rem)]">
                The pelvis is the mechanism
              </h2>
              <p className="mt-4 text-ink-soft leading-relaxed text-[0.98rem] max-w-sm">
                On a flat cushion the pelvis rolls backward and the lumbar spine collapses into
                a C-curve — the head drifts ahead of the sacrum and the back holds it there for
                the whole sit. The 8° wedge rotates the pelvis forward instead.
              </p>
            </div>

            <figure className="lg:w-[62%] w-full max-w-2xl reg-frame border border-line bg-surface/40">
              <figcaption className="flex items-center justify-between border-b border-line px-3 py-2">
                <span className="mono-label text-[0.62rem]">SECTION B–B · SAGITTAL</span>
                <span className="mono-label text-[0.62rem]">SCROLL TO COMPARE</span>
              </figcaption>
              <div className="p-2 sm:p-4">
                <div className="hidden sm:block aspect-[435/375]">
                  <PostureProof ref={postureRef} />
                </div>
                <div className="sm:hidden aspect-[435/375]">
                  <PostureProof ref={posturePhoneRef} compact />
                </div>
              </div>
            </figure>
          </div>
        </div>

        {/* Captions for the 3D chapters */}
        {CAPTIONS.map((c, i) => (
          <div
            key={c.title}
            ref={(el) => {
              captionRefs.current[i] = el
            }}
            className="pointer-events-none absolute bottom-[16vh] left-6 sm:left-[7vw] max-w-[24rem] pr-5 opacity-0"
          >
            <div className="w-10 h-0.5 bg-cork mb-4" />
            <h3 className="display-xl text-ink text-[clamp(1.5rem,2.6vw,2.2rem)]">{c.title}</h3>
            <p className="mt-2.5 text-ink-soft text-[0.95rem] leading-relaxed">{c.body}</p>
          </div>
        ))}

        {/* ---- Viewfinder chrome: the seat's own readout, not a camera's ---- */}
        <div className="pointer-events-none absolute top-9 left-9 sm:top-10 sm:left-11 mono-label text-[0.62rem] leading-relaxed">
          <div>LS-01 · 8° WEDGE</div>
          <div className="text-ink-soft/80">500 × 440 MM · ILD 45–85</div>
        </div>

        <div className="pointer-events-none absolute top-9 right-9 sm:top-10 sm:right-11 mono-label text-[0.62rem] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cork inline-block" />
          <span>SIT</span>
          <span ref={timerRef} className="tabular-nums">
            00:00
          </span>
        </div>

        {/* Scrubber: the teardown's own timeline */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 w-[min(46rem,80vw)]">
          <div className="relative h-px w-full bg-line">
            <div
              ref={scrubRef}
              className="absolute inset-0 h-px bg-cork origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <div className="mt-2.5 flex justify-between">
            {CHAPTERS.map((c, i) => (
              <span
                key={c.label}
                ref={(el) => {
                  chapterRefs.current[i] = el
                }}
                className="mono-label text-[0.56rem] transition-opacity duration-300"
                style={{ opacity: i === 0 ? 1 : 0.35 }}
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
