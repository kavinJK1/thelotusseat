'use client'

import { useEffect, useRef, useState } from 'react'
import { CAMERA_KEYS } from './cushionKeys'
import type { CushionScene } from './cushionScene'

const MODEL_URL = '/models/cushion-v7.obj'

/** One caption per camera keyframe — index order must match CAMERA_KEYS. */
const CAPTIONS = [
  {
    title: 'Made for stillness',
    body: 'A sculpted meditation seat on a natural cork base. Scroll to see what makes it different.',
  },
  {
    title: 'Ergonomic wedge profile',
    body: 'An 18 mm front-to-back rise tilts the pelvis gently forward — upright posture without effort.',
  },
  {
    title: 'Sculpted relief channel',
    body: 'Light contour quilting shapes a pressure-free centre channel. Stitches sit in valleys, never across sit zones.',
  },
  {
    title: 'Hand-embroidered lotus',
    body: 'A golden lotus on the raised back panel, framed by twin contour seams on soft woven cotton-linen.',
  },
  {
    title: 'Natural cork base',
    body: 'The seat lifts from a solid cork tray that grounds the cushion, protects your floor, and keeps everything in place.',
  },
  {
    title: 'Crafted for calm',
    body: 'Woven cotton-linen cover · natural latex core · solid cork base.',
  },
]

const ease = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (t: number) => Math.max(0, Math.min(1, t))

export default function CushionScrollShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const captionRefs = useRef<(HTMLDivElement | null)[]>([])
  const hintRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    // Respect reduced-motion and skip WebGL entirely where it isn't supported:
    // the section still reads as a caption list, so nothing is lost.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setFailed(true)
      return
    }

    let scene: CushionScene | null = null
    let raf = 0
    let cancelled = false
    let smoothed = 0

    /** Progress through the section's scroll track (0 at pin start, 1 at pin end). */
    const sectionProgress = () => {
      const rect = section.getBoundingClientRect()
      const track = rect.height - window.innerHeight
      return track > 0 ? clamp01(-rect.top / track) : 0
    }

    const paintCaptions = (p: number) => {
      captionRefs.current.forEach((el, i) => {
        if (!el || !CAMERA_KEYS[i]) return
        const o = Math.max(0, 1 - Math.abs(p - CAMERA_KEYS[i].p) / 0.085)
        el.style.opacity = ease(o).toFixed(3)
      })
      if (hintRef.current) hintRef.current.style.opacity = p < 0.03 ? '1' : '0'
    }

    const start = async () => {
      try {
        // three + the scene builder are ~600 kB of the payload: fetch them alongside
        // the model, and only once this section actually mounts.
        const [{ createCushionScene }, res] = await Promise.all([import('./cushionScene'), fetch(MODEL_URL)])
        if (!res.ok) throw new Error(`model fetch failed: ${res.status}`)
        const objText = await res.text()
        if (cancelled) return

        const { clientWidth: w, clientHeight: h } = canvas
        scene = createCushionScene(canvas, objText, w || window.innerWidth, h || window.innerHeight)

        const tick = () => {
          raf = requestAnimationFrame(tick)
          smoothed += (sectionProgress() - smoothed) * 0.075 // inertial smoothing
          scene!.render(smoothed)
          paintCaptions(smoothed)
        }
        tick()
      } catch (err) {
        console.error('[CushionScrollShowcase] scene init failed', err)
        if (!cancelled) setFailed(true)
      }
    }
    start()

    const onResize = () => {
      if (!scene) return
      scene.resize(canvas.clientWidth, canvas.clientHeight)
    }
    const observer = new ResizeObserver(onResize)
    observer.observe(canvas)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      observer.disconnect()
      scene?.dispose()
    }
  }, [])

  if (failed) {
    return (
      <section className="bg-[#f4efe6] py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-10">
          {CAPTIONS.map((c) => (
            <div key={c.title}>
              <div className="w-11 h-0.5 bg-cork mb-4" />
              <h3 className="text-2xl md:text-3xl text-ink mb-2">{c.title}</h3>
              <p className="text-ink-soft leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="relative h-[650vh] bg-[#f4efe6]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <p className="mono-label absolute left-6 top-7 text-[0.66rem] text-ink-soft md:left-9">
          The Lotus Seat
        </p>

        {CAPTIONS.map((c, i) => (
          <div
            key={c.title}
            ref={(el) => {
              captionRefs.current[i] = el
            }}
            className="pointer-events-none absolute bottom-[16vh] left-[7vw] max-w-[400px] pr-5 opacity-0"
          >
            <div className="w-11 h-0.5 bg-cork mb-4" />
            <h3 className="text-[28px] md:text-[30px] leading-tight text-ink mb-2.5">{c.title}</h3>
            <p className="text-[15.5px] leading-relaxed text-ink-soft">{c.body}</p>
          </div>
        ))}

        <div
          ref={hintRef}
          className="mono-label absolute bottom-7 left-1/2 -translate-x-1/2 text-[0.62rem] text-ink-soft transition-opacity duration-500"
        >
          Scroll to explore
        </div>
      </div>
    </section>
  )
}
