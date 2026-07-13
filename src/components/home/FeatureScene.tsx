'use client'

import { useCallback, useEffect, useRef } from 'react'
import type { CushionScene, CameraPose } from '@/components/showcase/cushionScene'

const MODEL_URL = '/models/cushion-v7.obj'

/**
 * F-02 is the one claim a photograph of the real unit cannot make: the seat lifted
 * clear of the cork tray, so the depth of the latex core is a thing you look at
 * rather than a number you're told. So the model is spent here and nowhere else —
 * the other four systems are photographs, which prove the object exists.
 *
 * The camera is fixed; only the lift animates. Arriving at the panel raises the
 * seat off the tray, which is the argument, and once it settles the loop stops —
 * a homepage should not hold a requestAnimationFrame open to render a still frame.
 */
const LATEX_POSE: Omit<CameraPose, 'lift'> = { th: 0.62, ph: 1.12, d: 1180, ty: 115 }

type FeatureSceneProps = {
  /** True while F-02 is the active panel: the seat rides up off the tray. */
  active: boolean
  /** Fired once the model is built and the first frame is on the canvas. */
  onReady?: () => void
}

export default function FeatureScene({ active, onReady }: FeatureSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<CushionScene | null>(null)
  const liftRef = useRef(0)
  const rafRef = useRef(0)

  // Read the live value inside the loop rather than re-creating it: rebuilding the
  // scene on every scroll past F-02 would re-fetch and re-tessellate the model.
  const activeRef = useRef(active)
  activeRef.current = active

  const onReadyRef = useRef(onReady)
  onReadyRef.current = onReady

  /** Drive the lift to wherever `active` currently points, then stop. */
  const settle = useCallback(() => {
    const scene = sceneRef.current
    if (!scene) return
    cancelAnimationFrame(rafRef.current)

    // Reduced motion gets the exploded view outright — the separation is the
    // information, the rise is only the flourish.
    const k = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.08

    const step = () => {
      const target = activeRef.current ? 1 : 0
      const next = liftRef.current + (target - liftRef.current) * k
      liftRef.current = Math.abs(target - next) < 0.001 ? target : next
      scene.renderPose({ ...LATEX_POSE, lift: liftRef.current })
      if (liftRef.current !== target) rafRef.current = requestAnimationFrame(step)
    }
    step()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let cancelled = false

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
        scene.setWireframe(0) // the object in its materials, not the drawing
        sceneRef.current = scene

        settle()
        onReadyRef.current?.() // only now is there something to fade up to
      } catch (err) {
        // Leave the photograph underneath showing: the figure stays correct, it just
        // doesn't get the extra argument.
        console.error('[FeatureScene] init failed', err)
      }
    }
    start()

    const observer = new ResizeObserver(() => {
      const scene = sceneRef.current
      if (!scene) return
      scene.resize(canvas.clientWidth, canvas.clientHeight)
      scene.renderPose({ ...LATEX_POSE, lift: liftRef.current }) // repaint the still frame
    })
    observer.observe(canvas)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [settle])

  useEffect(() => {
    settle()
  }, [active, settle])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
