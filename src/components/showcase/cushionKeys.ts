/**
 * Camera keyframes along the section's scroll progress (0..1).
 * th/ph/d = camera spherical position, ty = look-at height,
 * lift = how far the seat floats off the cork tray.
 *
 * Kept free of any `three` import so the caption layer can read the keyframe
 * positions without pulling the WebGL bundle into the initial chunk.
 */
export type CameraKey = {
  p: number
  th: number
  ph: number
  d: number
  ty: number
  lift: number
}

export const CAMERA_KEYS: readonly CameraKey[] = [
  { p: 0.0, th: 0.8, ph: 1.05, d: 980, ty: 45, lift: 0 }, // hero three-quarter
  { p: 0.18, th: 1.57, ph: 1.32, d: 820, ty: 40, lift: 0 }, // low side: wedge profile
  { p: 0.36, th: 0.95, ph: 0.22, d: 900, ty: 10, lift: 0 }, // top-down: relief channel
  { p: 0.54, th: 3.35, ph: 0.92, d: 760, ty: 75, lift: 0 }, // back: dome panel & lotus
  { p: 0.74, th: 0.62, ph: 1.12, d: 1050, ty: 115, lift: 1 }, // split: seat above the tray
  { p: 1.0, th: 0.8, ph: 1.0, d: 920, ty: 55, lift: 0 }, // reassembled: closing shot
]
