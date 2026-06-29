'use client'

import { useRef, useMemo, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Flat rounded rectangle — used for the rigid cork base
function createRoundedBox(w: number, h: number, d: number, r: number, segs: number) {
  const shape = new THREE.Shape()
  shape.absarc(r, r, r, -Math.PI / 2, -Math.PI, true)
  shape.absarc(r, d - r, r, Math.PI, Math.PI / 2, true)
  shape.absarc(w - r, d - r, r, Math.PI / 2, 0, true)
  shape.absarc(w - r, r, r, 0, -Math.PI / 2, true)
  shape.closePath()
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: h,
    bevelEnabled: false,
    steps: 1,
    curveSegments: segs,
  })
  geo.center()
  return geo
}

// Pillow/cushion shape — beveled extrusion so all edges are rounded
function createCushionLayer(w: number, h: number, d: number, r: number, segs: number) {
  const shape = new THREE.Shape()
  shape.absarc(r, r, r, -Math.PI / 2, -Math.PI, true)
  shape.absarc(r, d - r, r, Math.PI, Math.PI / 2, true)
  shape.absarc(w - r, d - r, r, Math.PI / 2, 0, true)
  shape.absarc(w - r, r, r, 0, -Math.PI / 2, true)
  shape.closePath()
  const bevel = Math.min(h * 0.42, r * 0.75)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.01, h - bevel * 2),
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel * 0.85,
    bevelOffset: 0,
    bevelSegments: 10,
    steps: 1,
    curveSegments: segs,
  })
  geo.center()
  return geo
}

interface CushionModelProps {
  explode: number        // 0 = assembled, 1 = fully exploded
  highlightLayer: number // 0=all, 1=base latex, 2=top latex, 3=cover, 4=channel, 5=cork
  rotationY: number
  rotationX: number
}

const CushionModel = forwardRef<THREE.Group, CushionModelProps>(
  ({ explode, highlightLayer, rotationY, rotationX }, ref) => {
    const groupRef = useRef<THREE.Group>(null)
    const layer1Ref = useRef<THREE.Mesh>(null)
    const layer2Ref = useRef<THREE.Mesh>(null)
    const coverRef = useRef<THREE.Mesh>(null)
    const channelRef = useRef<THREE.Mesh>(null)
    const corkRef = useRef<THREE.Mesh>(null)

    // Real proportions: 500×440mm → W=2.2, D=1.94
    const W = 2.2
    const D = 1.94

    const corkGeo    = useMemo(() => createRoundedBox(W, 0.16, D, 0.22, 10), [W, D])
    const layer1Geo  = useMemo(() => createCushionLayer(W * 0.96, 0.62, D * 0.96, 0.34, 12), [W, D])
    const layer2Geo  = useMemo(() => createCushionLayer(W * 0.94, 0.46, D * 0.94, 0.30, 12), [W, D])
    const coverGeo   = useMemo(() => createCushionLayer(W * 0.98, 0.14, D * 0.98, 0.28, 12), [W, D])
    const channelGeo = useMemo(() => new THREE.CylinderGeometry(0.24, 0.20, 0.10, 40), [])

    // Materials
    const corkMat = useMemo(() => new THREE.MeshStandardMaterial({
      color: new THREE.Color('#7A5C38'),
      roughness: 0.95,
      metalness: 0,
    }), [])

    const latexMat = useMemo(() => new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EED9B4'),
      roughness: 0.55,
      metalness: 0,
    }), [])

    const topLatexMat = useMemo(() => new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E4CA98'),
      roughness: 0.60,
      metalness: 0,
    }), [])

    const fabricMat = useMemo(() => new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F0E6D2'),
      roughness: 0.92,
      metalness: 0,
    }), [])

    const channelMat = useMemo(() => new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C8B48C'),
      roughness: 0.85,
      metalness: 0,
    }), [])

    const opacity = (layer: number) =>
      highlightLayer === 0 || highlightLayer === layer ? 1.0 : 0.15

    useFrame(() => {
      const sep = explode
      // Smooth model rotation to target
      if (groupRef.current) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationY, 0.06)
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, rotationX, 0.06)
      }

      if (corkRef.current) {
        corkRef.current.position.y = THREE.MathUtils.lerp(corkRef.current.position.y, -0.56 - sep * 0.55, 0.08)
        ;(corkRef.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(
          (corkRef.current.material as THREE.MeshStandardMaterial).opacity, opacity(5), 0.08
        )
        ;(corkRef.current.material as THREE.MeshStandardMaterial).transparent = true
      }
      if (layer1Ref.current) {
        layer1Ref.current.position.y = THREE.MathUtils.lerp(layer1Ref.current.position.y, -0.08 - sep * 0.32, 0.08)
        ;(layer1Ref.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(
          (layer1Ref.current.material as THREE.MeshStandardMaterial).opacity, opacity(1), 0.08
        )
        ;(layer1Ref.current.material as THREE.MeshStandardMaterial).transparent = true
      }
      if (layer2Ref.current) {
        layer2Ref.current.position.y = THREE.MathUtils.lerp(layer2Ref.current.position.y, 0.30 + sep * 0.38, 0.08)
        ;(layer2Ref.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(
          (layer2Ref.current.material as THREE.MeshStandardMaterial).opacity, opacity(2), 0.08
        )
        ;(layer2Ref.current.material as THREE.MeshStandardMaterial).transparent = true
      }
      if (coverRef.current) {
        coverRef.current.position.y = THREE.MathUtils.lerp(coverRef.current.position.y, 0.60 + sep * 0.48, 0.08)
        ;(coverRef.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(
          (coverRef.current.material as THREE.MeshStandardMaterial).opacity, opacity(3), 0.08
        )
        ;(coverRef.current.material as THREE.MeshStandardMaterial).transparent = true
      }
      if (channelRef.current) {
        channelRef.current.position.y = THREE.MathUtils.lerp(channelRef.current.position.y, 0.67 + sep * 0.48, 0.08)
        channelRef.current.position.z = THREE.MathUtils.lerp(channelRef.current.position.z, 0.12, 0.08)
        ;(channelRef.current.material as THREE.MeshStandardMaterial).opacity = THREE.MathUtils.lerp(
          (channelRef.current.material as THREE.MeshStandardMaterial).opacity, opacity(4), 0.08
        )
        ;(channelRef.current.material as THREE.MeshStandardMaterial).transparent = true
      }
    })

    return (
      // Outer ref for forwarded ref; inner groupRef for animation
      // 8° product tilt applied to the whole assembly
      <group ref={ref}>
        <group ref={groupRef} rotation-x={-0.14}>
          {/* Cork base */}
          <mesh ref={corkRef} geometry={corkGeo} material={corkMat} position={[0, -0.56, 0]} castShadow receiveShadow />

          {/* Base latex layer */}
          <mesh ref={layer1Ref} geometry={layer1Geo} material={latexMat} position={[0, -0.08, 0]} castShadow />

          {/* Ramped top latex layer */}
          <mesh ref={layer2Ref} geometry={layer2Geo} material={topLatexMat} position={[0, 0.30, 0]} castShadow />

          {/* Fabric cover */}
          <mesh ref={coverRef} geometry={coverGeo} material={fabricMat} position={[0, 0.60, 0]} castShadow />

          {/* Relief channel */}
          <mesh
            ref={channelRef}
            geometry={channelGeo}
            material={channelMat}
            position={[0, 0.67, 0.12]}
            rotation-x={Math.PI / 2}
            castShadow
          />
        </group>
      </group>
    )
  }
)

CushionModel.displayName = 'CushionModel'
export default CushionModel
