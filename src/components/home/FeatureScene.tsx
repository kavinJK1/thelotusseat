'use client'

import { useEffect, useRef } from 'react'
import type { CushionScene, CameraPose } from '@/components/showcase/cushionScene'

const MODEL_URL = '/models/cushion-v7.obj'

/**
 * The 3D alternative to the feature photograph: one live scene that flies the
 * camera to the view each system is best argued from.
 *
 * These poses are the section's own, not the scroll showcase's. Borrowing the
 * showcase's scroll positions put the camera at distances framed for its wide
 * canvas, which overflowed this square figure, and it reached F-03 by landing
 * halfway between two unrelated keyframes — an angle nobody chose.
 *
 * The two profile claims are deliberately distinguished rather than faked apart:
 * F-01 is elevated enough to read the cork base as a solid wedge, while F-03 drops
 * almost to the horizon so the top surface's front-to-back rise reads as a
 * silhouette — the ramp becomes a line you can see instead of a number you're told.
 */
const FEATURE_POSE: Record<string, CameraPose> = {
  tilt: { th: 1.57, ph: 1.32, d: 900, ty: 40, lift: 0 }, // side: the cork wedge in profile
  latex: { th: 0.62, ph: 1.12, d: 1180, ty: 115, lift: 1 }, // split: the seat above the tray
  ramp: { th: 1.4, ph: 1.46, d: 820, ty: 70, lift: 0 }, // near-horizon: the rise as a silhouette
  channel: { th: 0.95, ph: 0.22, d: 1150, ty: 10, lift: 0 }, // top-down: the relief channel
  cover: { th: 3.35, ph: 0.92, d: 980, ty: 75, lift: 0 }, // back: the rear panel and its lotus
}

const HERO: CameraPose = { th: 0.8, ph: 1.05, d: 980, ty: 45, lift: 0 }

export default function FeatureScene({ activeId }: { activeId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Read inside the animation loop rather than re-running the effect: re-creating
  // the scene on every feature change would re-fetch and re-tessellate the model.
  const targetRef = useRef<CameraPose>(FEATURE_POSE[activeId] ?? HERO)
  targetRef.current = FEATURE_POSE[activeId] ?? HERO

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let scene: CushionScene | null = null
    let raf = 0
    let cancelled = false
    let current: CameraPose = { ...targetRef.current }

    // Honour reduced motion by cutting straight to each view instead of flying to
    // it. The angle is the information; the flight is the flourish.
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const start = async () => {
      try {
        const [{ createCushionScene }, res] = await Promise.all([
          import('@/components/showcase/cushionScene'),
          fetch(MODEL_URL),
        ])
        if (!res.ok) throw new Error(`model fetch failed: ${res.status}`)
        const objText = await res.text()
        if (cancelled) return

        scene = createCushionScene(canvas, objText, canvas.clientWidth, canvas.clientHeight)
        scene.setWireframe(0) // the object in its materials, not the drawing

        const tick = () => {
          raf = requestAnimationFrame(tick)
          const to = targetRef.current
          // Ease toward the active feature's view instead of cutting to it — the
          // move between angles is most of what makes this worth the bytes.
          const k = still ? 1 : 0.06
          current = {
            th: current.th + (to.th - current.th) * k,
            ph: current.ph + (to.ph - current.ph) * k,
            d: current.d + (to.d - current.d) * k,
            ty: current.ty + (to.ty - current.ty) * k,
            lift: current.lift + (to.lift - current.lift) * k,
          }
          scene!.renderPose(current)
        }
        tick()
      } catch (err) {
        console.error('[FeatureScene] init failed', err)
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
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
