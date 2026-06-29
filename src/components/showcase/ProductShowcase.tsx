'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import CushionModel from './CushionModel'

// ── Chapter definitions ──────────────────────────────────────────────────────
const chapters = [
  {
    id: 'intro',
    label: '',
    headline: 'The Lotus Seat',
    sub: 'A meditation seat engineered from the ground up. Every layer, every curve, every angle — intentional.',
    rotY: 0.5,
    rotX: 0.05,
    explode: 0,
    highlight: 0,
    annotations: [],
  },
  {
    id: 'cork',
    label: '01',
    headline: '8° Ergonomic Tilt',
    sub: 'The cork composite base is inclined at exactly 8°. That single angle tips the pelvis forward into its natural lordotic position — realigning the entire spine without effort.',
    rotY: 0.6,
    rotX: -0.15,
    explode: 0.3,
    highlight: 5,
    annotations: [
      { label: '8° tilt', x: 62, y: 78, align: 'right' },
      { label: 'Cork composite', x: 38, y: 85, align: 'left' },
    ],
  },
  {
    id: 'layer1',
    label: '02',
    headline: 'Base Support Layer',
    sub: '70 mm of soft natural latex (ILD 75–85) provides the structural foundation. Flat, firm, and consistent — it holds its form across hours of sitting.',
    rotY: 0.2,
    rotX: -0.1,
    explode: 0.6,
    highlight: 1,
    annotations: [
      { label: '70 mm thick', x: 65, y: 55, align: 'right' },
      { label: 'Natural latex · ILD 75–85', x: 35, y: 62, align: 'left' },
    ],
  },
  {
    id: 'layer2',
    label: '03',
    headline: 'Ramped Comfort Layer',
    sub: 'The top layer is 32 mm at the front and 50 mm at the back — an 18 mm ramp that supports the sacrum, encourages an upright spine, and works in harmony with the base tilt.',
    rotY: -0.1,
    rotX: -0.25,
    explode: 0.75,
    highlight: 2,
    annotations: [
      { label: '50 mm rear', x: 30, y: 38, align: 'left' },
      { label: '32 mm front', x: 68, y: 48, align: 'right' },
      { label: 'ILD 45–55', x: 50, y: 30, align: 'left' },
    ],
  },
  {
    id: 'channel',
    label: '04',
    headline: 'Central Relief Channel',
    sub: 'A 10–15 mm sculpted channel lifts the coccyx away from contact with the surface — eliminating tailbone pressure, the most common reason meditation sessions end early.',
    rotY: 0.05,
    rotX: -0.5,
    explode: 0.5,
    highlight: 4,
    annotations: [
      { label: '10–15 mm depth', x: 50, y: 30, align: 'left' },
      { label: 'Coccyx relief', x: 52, y: 35, align: 'left' },
    ],
  },
  {
    id: 'cover',
    label: '05',
    headline: 'Breathable Cover',
    sub: 'Upholstery-grade cotton-poly and linen blend at 300–350 GSM. Warm ivory. Tone-on-tone lotus embroidery on the back panel. The only decoration on an otherwise minimal form.',
    rotY: 0.8,
    rotX: -0.1,
    explode: 0.2,
    highlight: 3,
    annotations: [
      { label: 'Cotton-poly linen · 300–350 GSM', x: 62, y: 42, align: 'right' },
      { label: 'Lotus embroidery', x: 38, y: 35, align: 'left' },
    ],
  },
  {
    id: 'assembled',
    label: '',
    headline: 'One seat. Designed to last.',
    sub: 'Pre-orders are open now — limited to the first production run.',
    rotY: 0.4,
    rotX: -0.18,
    explode: 0,
    highlight: 0,
    annotations: [],
    cta: true,
  },
]

// ── Animated camera ──────────────────────────────────────────────────────────
function AnimatedCamera({ targetZ, targetY }: { targetZ: number; targetY: number }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05)
    camera.lookAt(0, 0, 0)
  })
  return null
}

// ── Main showcase ────────────────────────────────────────────────────────────
export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [chapter, setChapter] = useState(0)
  const [visible, setVisible] = useState(false)
  const chapterCount = chapters.length

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const totalHeight = container.scrollHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / totalHeight))
      const chapterIndex = Math.min(
        chapterCount - 1,
        Math.floor(progress * chapterCount)
      )
      setChapter(chapterIndex)
      setVisible(scrolled > -100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [chapterCount])

  const current = chapters[chapter]
  const cameraZ = chapter === 3 ? 3.6 : chapter === 4 ? 3.0 : 3.8
  const cameraY = chapter === 4 ? 1.2 : 0.9

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${chapterCount * 100}vh` }}
    >
      {/* Sticky canvas area */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0E0B08] flex items-center justify-center">

        {/* 3D Canvas */}
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0.9, 3.8], fov: 40 }}
            dpr={[1, 2]}
            shadows
          >
            <AnimatedCamera targetZ={cameraZ} targetY={cameraY} />

            {/* Lighting — warm studio setup */}
            <ambientLight intensity={0.55} />
            <directionalLight
              position={[4, 6, 4]}
              intensity={2.2}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <directionalLight position={[-4, 3, -2]} intensity={0.7} color="#C4A882" />
            <directionalLight position={[0, -2, 3]} intensity={0.3} color="#FFEEDD" />
            <pointLight position={[0, 4, 1]} intensity={0.8} color="#FFF5E6" />

            <Suspense fallback={null}>
              <CushionModel
                explode={current.explode}
                highlightLayer={current.highlight}
                rotationY={current.rotY}
                rotationX={current.rotX}
              />
              {/* Ground plane receives shadows */}
              <mesh position={[0, -0.76, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[6, 6]} />
                <shadowMaterial opacity={0.25} />
              </mesh>
            </Suspense>
          </Canvas>
        </div>

        {/* Annotations overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {current.annotations.map((ann, i) => (
            <div
              key={`${current.id}-${i}`}
              className="absolute flex items-center gap-2 transition-all duration-700"
              style={{
                left: `${ann.x}%`,
                top: `${ann.y}%`,
                transform: `translate(${ann.align === 'right' ? '-100%' : '0'}, -50%)`,
                opacity: visible ? 1 : 0,
              }}
            >
              {ann.align === 'right' && (
                <span className="text-[10px] font-medium tracking-widest text-sand uppercase text-right leading-tight">
                  {ann.label}
                </span>
              )}
              <span className="block w-8 h-px bg-sand/60 shrink-0" />
              <span className="block w-1.5 h-1.5 rounded-full bg-sand shrink-0" />
              {ann.align === 'left' && (
                <span className="block w-8 h-px bg-sand/60 shrink-0" />
              )}
              {ann.align === 'left' && (
                <span className="text-[10px] font-medium tracking-widest text-sand uppercase leading-tight">
                  {ann.label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Chapter number */}
        {current.label && (
          <div className="absolute top-8 right-8 font-serif text-7xl font-medium text-white/5 select-none">
            {current.label}
          </div>
        )}

        {/* Progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                const container = containerRef.current
                if (!container) return
                const target = (i / chapterCount) * (container.scrollHeight - window.innerHeight)
                window.scrollTo({ top: container.offsetTop + target, behavior: 'smooth' })
              }}
              className={`w-1.5 rounded-full transition-all duration-300 ${
                i === chapter ? 'h-6 bg-sand' : 'h-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Text panel */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12 pt-20 bg-gradient-to-t from-[#0E0B08] via-[#0E0B08]/80 to-transparent">
          <div
            key={current.id}
            className="max-w-lg transition-all duration-500"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-warm-white leading-tight mb-3">
              {current.headline}
            </h2>
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-md">
              {current.sub}
            </p>
            {current.cta && (
              <a
                href="/contact"
                className="inline-flex items-center mt-6 bg-sand text-near-black px-7 py-3.5 rounded-full text-sm font-medium hover:bg-sand-light transition-colors"
              >
                Pre-Order Now
              </a>
            )}
          </div>
        </div>

        {/* Scroll hint — only on first chapter */}
        {chapter === 0 && (
          <div className="absolute bottom-6 right-10 flex items-center gap-2 text-white/25 text-xs tracking-widest uppercase animate-pulse">
            <span>Scroll</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
    </section>
  )
}
