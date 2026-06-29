'use client'

import { useRef, useMemo, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Rounded box geometry helper
function createRoundedBox(w: number, h: number, d: number, r: number, segs: number) {
  const shape = new THREE.Shape()
  const eps = r
  shape.absarc(eps, eps, r, -Math.PI / 2, -Math.PI, true)
  shape.absarc(eps, d - eps, r, Math.PI, Math.PI / 2, true)
  shape.absarc(w - eps, d - eps, r, Math.PI / 2, 0, true)
  shape.absarc(w - eps, eps, r, 0, -Math.PI / 2, true)

  const extrudeSettings = {
    depth: h,
    bevelEnabled: false,
    steps: 1,
    curveSegments: segs,
  }
  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  geo.center()
  return geo
}

interface CushionModelProps {
  explode: number        // 0 = assembled, 1 = fully exploded
  highlightLayer: number // 0=all, 1=base, 2=top, 3=cover, 4=channel
  rotationY: number
  rotationX: number
}

const CushionModel = forwardRef<THREE.Group, CushionModelProps>(
  ({ explode, highlightLayer, rotationY, rotationX }, ref) => {
    const baseRef = useRef<THREE.Mesh>(null)
    const layer1Ref = useRef<THREE.Mesh>(null)
    const layer2Ref = useRef<THREE.Mesh>(null)
    const coverRef = useRef<THREE.Mesh>(null)
    const channelRef = useRef<THREE.Mesh>(null)
    const corkRef = useRef<THREE.Mesh>(null)

    // Dimensions scaled down for scene (real: 500x440mm)
    const W = 2.0
    const D = 1.76

    const corkGeo = useMemo(() => createRoundedBox(W, 0.12, D, 0.12, 8), [W, D])
    const layer1Geo = useMemo(() => createRoundedBox(W * 0.97, 0.45, D * 0.97, 0.1, 8), [W, D])
    const layer2Geo = useMemo(() => createRoundedBox(W * 0.97, 0.32, D * 0.97, 0.1, 8), [W, D])
    const coverGeo = useMemo(() => createRoundedBox(W, 0.04, D, 0.12, 8), [W, D])

    // Relief channel (oval indentation)
    const channelGeo = useMemo(() => {
      const geo = new THREE.CylinderGeometry(0.22, 0.18, 0.08, 32)
      return geo
    }, [])

    // Materials
    const corkMat = useMemo(() => new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9B7B4A'),
      roughness: 0.9,
      metalness: 0,
    }), [])

    const latexMat = useMemo(() => new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F5E6C8'),
      roughness: 0.6,
      metalness: 0,
    }), [])

    const topLatexMat = useMemo(() => new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EDD9A8'),
      roughness: 0.65,
      metalness: 0,
    }), [])

    const fabricMat = useMemo(() => new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EDE0C8'),
      roughness: 0.95,
      metalness: 0,
    }), [])

    const channelMat = useMemo(() => new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4C4A0'),
      roughness: 0.8,
      metalness: 0,
    }), [])

    // Highlight logic — dim non-focused layers
    const opacity = (layer: number) => highlightLayer === 0 || highlightLayer === layer ? 1.0 : 0.2
    const transparent = (layer: number) => highlightLayer !== 0 && highlightLayer !== layer

    useFrame(() => {
      // Layer positions with explode animation
      const sep = explode
      if (corkRef.current) {
        corkRef.current.position.y = THREE.MathUtils.lerp(corkRef.current.position.y, -0.42 - sep * 0.5, 0.08)
        corkRef.current.rotation.x = THREE.MathUtils.lerp(corkRef.current.rotation.x, explode * -0.15, 0.08)
        ;(corkRef.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(
          (corkRef.current.material as THREE.MeshStandardMaterial).opacity,
          opacity(5),
          0.08
        )
        ;(corkRef.current.material as THREE.MeshStandardMaterial).transparent = true
      }
      if (layer1Ref.current) {
        layer1Ref.current.position.y = THREE.MathUtils.lerp(layer1Ref.current.position.y, -0.1 - sep * 0.3, 0.08)
        ;(layer1Ref.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(
          (layer1Ref.current.material as THREE.MeshStandardMaterial).opacity, opacity(1), 0.08
        )
        ;(layer1Ref.current.material as THREE.MeshStandardMaterial).transparent = transparent(1)
      }
      if (layer2Ref.current) {
        layer2Ref.current.position.y = THREE.MathUtils.lerp(layer2Ref.current.position.y, 0.18 + sep * 0.35, 0.08)
        ;(layer2Ref.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(
          (layer2Ref.current.material as THREE.MeshStandardMaterial).opacity, opacity(2), 0.08
        )
        ;(layer2Ref.current.material as THREE.MeshStandardMaterial).transparent = transparent(2)
      }
      if (coverRef.current) {
        coverRef.current.position.y = THREE.MathUtils.lerp(coverRef.current.position.y, 0.38 + sep * 0.45, 0.08)
        ;(coverRef.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(
          (coverRef.current.material as THREE.MeshStandardMaterial).opacity, opacity(3), 0.08
        )
        ;(coverRef.current.material as THREE.MeshStandardMaterial).transparent = transparent(3)
      }
      if (channelRef.current) {
        channelRef.current.position.y = THREE.MathUtils.lerp(channelRef.current.position.y, 0.44 + sep * 0.45, 0.08)
        channelRef.current.position.z = THREE.MathUtils.lerp(channelRef.current.position.z, 0.1, 0.08)
        ;(channelRef.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(
          (channelRef.current.material as THREE.MeshStandardMaterial).opacity, opacity(4), 0.08
        )
        ;(channelRef.current.material as THREE.MeshStandardMaterial).transparent = transparent(4)
      }
    })

    return (
      <group ref={ref} rotation-y={rotationY} rotation-x={rotationX}>
        {/* Cork base */}
        <mesh ref={corkRef} geometry={corkGeo} material={corkMat} position={[0, -0.42, 0]} castShadow />

        {/* Layer 1 — base latex */}
        <mesh ref={layer1Ref} geometry={layer1Geo} material={latexMat} position={[0, -0.1, 0]} castShadow />

        {/* Layer 2 — ramped top latex */}
        <mesh ref={layer2Ref} geometry={layer2Geo} material={topLatexMat} position={[0, 0.18, 0]} castShadow />

        {/* Cover */}
        <mesh ref={coverRef} geometry={coverGeo} material={fabricMat} position={[0, 0.38, 0]} castShadow />

        {/* Relief channel */}
        <mesh ref={channelRef} geometry={channelGeo} material={channelMat} position={[0, 0.44, 0.1]} rotation-x={Math.PI / 2} castShadow />
      </group>
    )
  }
)

CushionModel.displayName = 'CushionModel'

export default CushionModel
