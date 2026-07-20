'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { CushionScene } from '@/components/showcase/cushionScene'
import { OmMandala } from './Motifs'

const MODEL_URL = '/models/cushion-v7.obj'

/** Framing for the turntable — the whole seat, assembled, seen slightly from above. */
const BASE_POSE = { ph: 1.06, d: 1260, ty: 108, lift: 0 }
/** How fast it turns, in radians per second — a slow, calm rotation. */
const SPIN = 0.32

/**
 * The seat on a turntable. It rotates on its own so a visitor sees every side
 * without doing anything. Reduced-motion users get a single fixed angle instead of
 * a spin, and the rotation pauses whenever the section is off-screen so it isn't
 * quietly burning a render loop the whole time you're reading the FAQ.
 */
export default function Product3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<CushionScene | null>(null)
  const thRef = useRef(0.6)
  const rafRef = useRef(0)
  const visibleRef = useRef(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let cancelled = false
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let last = 0

    const frame = (now: number) => {
      const scene = sceneRef.current
      if (!scene) return
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
      last = now
      if (!reduce && visibleRef.current) thRef.current += SPIN * dt
      scene.renderPose({ ...BASE_POSE, th: thRef.current })
      rafRef.current = requestAnimationFrame(frame)
    }

    const start = async () => {
      try {
        const [{ createCushionScene }, res] = await Promise.all([
          import('@/components/showcase/cushionScene'),
          fetch(MODEL_URL),
        ])
        if (!res.ok) throw new Error(`model fetch failed: ${res.status}`)
        const objText = await res.text()
        if (cancelled) return

        const scene = createCushionScene(canvas, objText, canvas.clientWidth, canvas.clientHeight)
        scene.setWireframe(0)
        sceneRef.current = scene

        if (reduce) {
          scene.renderPose({ ...BASE_POSE, th: thRef.current })
        } else {
          rafRef.current = requestAnimationFrame(frame)
        }
        setReady(true)
      } catch (err) {
        // The photograph underneath stays visible, so the section is never blank.
        console.error('[Product3D] init failed', err)
      }
    }
    start()

    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting }, { threshold: 0.05 })
    io.observe(canvas)

    const ro = new ResizeObserver(() => {
      const scene = sceneRef.current
      if (!scene) return
      scene.resize(canvas.clientWidth, canvas.clientHeight)
      scene.renderPose({ ...BASE_POSE, th: thRef.current })
    })
    ro.observe(canvas)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafRef.current)
      io.disconnect()
      ro.disconnect()
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [])

  return (
    <section id="in-3d" className="scroll-mt-16 py-20 md:py-28 grad-dusk on-dusk relative border-t border-line overflow-hidden">
      <div aria-hidden className="absolute inset-0 tech-grid opacity-80" />
      <OmMandala className="absolute top-16 right-6 w-40 h-40 text-glow opacity-40 hidden sm:block" />
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.18em] font-medium text-glow/80 mb-4">See it from every side</p>
            <h2 className="font-display font-medium text-glow tracking-[-0.01em] leading-[1.03] text-[clamp(2.2rem,5vw,3.5rem)] max-w-lg">
              The seat, in three dimensions.
            </h2>
          </div>
          <p className="text-glow/80 text-sm max-w-xs leading-relaxed">
            A real 3D model, turning on its own — cork base, latex core and woven cover,
            from every angle.
          </p>
        </div>

        <figure className="reg-frame relative border border-glow/25 bg-glow/5 overflow-hidden">
          <div className="relative aspect-[16/10] w-full">
            {/* Fallback photo — shown until the model has drawn its first frame. */}
            <Image
              src="/images/product/seat-elevation.jpg"
              alt="The Lotus Seat, cream cushion with a terracotta back and gold lotus on a cork base"
              fill
              sizes="(min-width: 1024px) 76vw, 100vw"
              className={`object-contain transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
            />
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        </figure>
      </div>
    </section>
  )
}
