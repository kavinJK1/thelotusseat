/**
 * Geometry for the posture proof: a side-elevation figure that morphs between
 * sitting slumped on a flat round zafu (t = 0) and sitting upright on the
 * Lotus Seat's 8° wedge (t = 1).
 *
 * The claim being drawn is pelvic rotation, not "sitting is bad": the same body
 * in the same posture, on two seat geometries. Everything downstream of the
 * pelvis — lumbar curve, head position, line of gravity — follows from it.
 *
 * Pure functions only, no DOM: the scroll loop calls frameAt() every frame and
 * writes the result straight to SVG attributes.
 */

/** Side elevation drawn in a 520×470 viewBox; the figure faces +x (right). */
export const VIEWBOX = { x: 55, y: 100, w: 435, h: 375 } as const

/**
 * Scale factor for the dimension callouts. The seat's 440 mm depth spans
 * 224 px in this elevation, so one px is ~1.96 mm.
 */
const MM_PER_PX = 440 / 224

/** Seat silhouettes. The zafu is drawn plainer than the Lotus Seat on purpose:
 *  it's the control in the comparison, not a competitor being caricatured. */
export const ZAFU = { cx: 255, cy: 400, rx: 98, ry: 40 } as const
export const SEAT_CORK = 'M146,440 L374,440 L374,412 L146,420 Z'
export const SEAT_CUSHION =
  'M146,420 L146,368 C146,346 164,332 194,331 C214,330 226,338 236,348 C258,358 300,372 374,392 L374,412 Z'
export const GROUND_Y = 440

type Pt = readonly [number, number]

/** Sacrum → skull base, 9 landmarks. Slumped bows posteriorly (a C-curve); the
 *  head then juts anteriorly to keep the eyes level — the classic loaded stack. */
const SPINE_SLUMPED: readonly Pt[] = [
  [255, 350], [251, 329], [245, 308], [239, 287], [235, 265],
  [235, 243], [241, 221], [253, 201], [268, 185],
]

/** Upright: the wedge tips the pelvis anteriorly, the lumbar returns to a shallow
 *  lordosis, and the segments stack — no muscular effort to hold it. */
const SPINE_UPRIGHT: readonly Pt[] = [
  [222, 330], [224, 309], [228, 288], [230, 266], [229, 244],
  [226, 222], [223, 200], [222, 178], [222, 157],
]

const HEAD_SLUMPED: Pt = [283, 172]
const HEAD_UPRIGHT: Pt = [224, 138]
const HEAD_R = 21

/** Hip, knee, ankle. On the low zafu the knees ride at or above the hip, which is
 *  what rolls the pelvis back; on the wedge the hip sits above the knee. */
const LEG_SLUMPED = { hip: [272, 358] as Pt, knee: [365, 352] as Pt, ankle: [300, 405] as Pt }
const LEG_UPRIGHT = { hip: [242, 340] as Pt, knee: [360, 385] as Pt, ankle: [295, 415] as Pt }

/** Pelvis tilt in degrees: negative is posterior rotation (tucked under). */
const PELVIS_DEG_SLUMPED = -14
const PELVIS_DEG_UPRIGHT = 8

/** The pelvis outline, drawn around the sacrum at the local origin. */
export const PELVIS_PATH = 'M0,0 L26,-13 L35,3 L21,18 L2,16 Z'

const round2 = (n: number) => Math.round(n * 100) / 100
const lerp = (a: number, b: number, t: number) => round2(a + (b - a) * t)
const lerpPt = (a: Pt, b: Pt, t: number): Pt => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)]

/** Catmull-Rom through the landmarks, emitted as a cubic path — the spine reads as
 *  one continuous curve rather than a 9-segment polyline. */
function smoothPath(pts: readonly Pt[]): string {
  if (pts.length < 2) return ''
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d
}

/** Half-widths of the torso at each spine landmark, anterior (chest/belly side)
 *  and posterior (back side). Gives the figure a body instead of a bare spine. */
const TORSO_ANTERIOR = [30, 34, 37, 40, 43, 45, 44, 36, 20]
const TORSO_POSTERIOR = [24, 26, 28, 30, 32, 34, 34, 28, 16]

/** Closed torso outline: the spine landmarks swept out to the body's silhouette,
 *  so the plate reads as a seated person rather than an anatomy chart. */
function torsoPath(pts: readonly Pt[]): string {
  const anterior: Pt[] = []
  const posterior: Pt[] = []
  for (let i = 0; i < pts.length; i++) {
    const prev = pts[i - 1] ?? pts[i]
    const next = pts[i + 1] ?? pts[i]
    const tx = next[0] - prev[0]
    const ty = next[1] - prev[1]
    const len = Math.hypot(tx, ty) || 1
    // Anterior normal: the spine runs sacrum → skull, so this points to the front.
    const nx = -ty / len
    const ny = tx / len
    anterior.push([pts[i][0] + nx * TORSO_ANTERIOR[i], pts[i][1] + ny * TORSO_ANTERIOR[i]])
    posterior.push([pts[i][0] - nx * TORSO_POSTERIOR[i], pts[i][1] - ny * TORSO_POSTERIOR[i]])
  }
  const up = smoothPath(anterior)
  const down = smoothPath([...posterior].reverse()).replace(/^M/, 'L')
  return `${up} ${down} Z`
}

export type Vertebra = { x: number; y: number; angle: number }

export type PostureFrame = {
  spinePath: string
  /** Body silhouette swept from the spine landmarks. */
  torsoPath: string
  /** One block per landmark, oriented across the local tangent. */
  vertebrae: Vertebra[]
  head: { cx: number; cy: number; r: number }
  /** Pelvis transform: translate to the sacrum, then rotate. */
  pelvis: { x: number; y: number; angle: number }
  legPath: string
  /** Ankle position, so the foot can be drawn without re-parsing legPath. */
  ankle: { x: number; y: number }
  /** Vertical line of gravity dropped from the skull's centre of mass. */
  gravityX: number
  sacrumX: number
  sacrumY: number
  /** Horizontal distance the head sits ahead of the sacrum, in millimetres. */
  offsetMm: number
  pelvisDeg: number
}

/** The whole figure at morph position t (0 = zafu/slumped, 1 = Lotus Seat/upright). */
export function frameAt(t: number): PostureFrame {
  const k = Math.max(0, Math.min(1, t))
  const pts = SPINE_SLUMPED.map((p, i) => lerpPt(p, SPINE_UPRIGHT[i], k))

  const vertebrae = pts.map((p, i) => {
    const prev = pts[i - 1] ?? p
    const next = pts[i + 1] ?? p
    // Rounded at the source: raw atan2 output differs in the last float digit
    // between the server and client renders, which trips hydration.
    const angle = round2((Math.atan2(next[1] - prev[1], next[0] - prev[0]) * 180) / Math.PI)
    return { x: round2(p[0]), y: round2(p[1]), angle }
  })

  const head = lerpPt(HEAD_SLUMPED, HEAD_UPRIGHT, k)
  const hip = lerpPt(LEG_SLUMPED.hip, LEG_UPRIGHT.hip, k)
  const knee = lerpPt(LEG_SLUMPED.knee, LEG_UPRIGHT.knee, k)
  const ankle = lerpPt(LEG_SLUMPED.ankle, LEG_UPRIGHT.ankle, k)
  const [sx, sy] = pts[0]

  return {
    spinePath: smoothPath(pts),
    torsoPath: torsoPath(pts),
    vertebrae,
    head: { cx: head[0], cy: head[1], r: HEAD_R },
    pelvis: { x: sx, y: sy, angle: lerp(PELVIS_DEG_SLUMPED, PELVIS_DEG_UPRIGHT, k) },
    legPath: `M${hip[0].toFixed(1)},${hip[1].toFixed(1)} L${knee[0].toFixed(1)},${knee[1].toFixed(1)} L${ankle[0].toFixed(1)},${ankle[1].toFixed(1)}`,
    ankle: { x: ankle[0], y: ankle[1] },
    gravityX: head[0],
    sacrumX: sx,
    sacrumY: sy,
    offsetMm: Math.round(Math.abs(head[0] - sx) * MM_PER_PX),
    pelvisDeg: lerp(PELVIS_DEG_SLUMPED, PELVIS_DEG_UPRIGHT, k),
  }
}
