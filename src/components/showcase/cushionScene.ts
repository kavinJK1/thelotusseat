import * as THREE from 'three'
import { CAMERA_KEYS, type CameraKey } from './cushionKeys'

/**
 * Procedural build of the Lotus Seat: the OBJ supplies the cork tray and the raw
 * cushion volume; the sewn cover (panels, rolled rim, stitching, lotus) is generated
 * on top of a heightfield sampled from that volume so every detail follows the real
 * wedge profile instead of floating above a guessed surface.
 */

export type CushionScene = {
  render: (progress: number) => void
  resize: (width: number, height: number) => void
  dispose: () => void
}

type ObjBody = { name: string; pos: number[]; nor: number[] }

function parseOBJ(text: string): ObjBody[] {
  const v: number[][] = []
  const vn: number[][] = []
  const objects: ObjBody[] = []
  let cur: ObjBody | null = null
  for (const line of text.split('\n')) {
    const t = line.trim().split(/\s+/)
    if (t[0] === 'v') v.push([+t[1], +t[2], +t[3]])
    else if (t[0] === 'vn') vn.push([+t[1], +t[2], +t[3]])
    else if (t[0] === 'o') {
      cur = { name: t[1], pos: [], nor: [] }
      objects.push(cur)
    } else if (t[0] === 'f' && cur) {
      for (let k = 1; k <= 3; k++) {
        const [vi, , ni] = t[k].split('/')
        cur.pos.push(...v[+vi - 1])
        cur.nor.push(...vn[+ni - 1])
      }
    }
  }
  return objects
}

const ease = (t: number) => t * t * (3 - 2 * t)
const smooth01 = (t: number) => {
  const c = Math.max(0, Math.min(1, t))
  return c * c * (3 - 2 * c)
}

/** Upholstery-grade woven cotton-linen blend: warp/weft grid, yarn variation, slubs. */
function fabricTexture(base: string, dark: string, light: string, size = 1024) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  g.fillStyle = base
  g.fillRect(0, 0, size, size)
  for (let i = 0; i < 120; i++) {
    const x = Math.random() * size,
      y = Math.random() * size,
      r = size * (0.04 + Math.random() * 0.09)
    const gr = g.createRadialGradient(x, y, 0, x, y, r)
    gr.addColorStop(0, Math.random() < 0.5 ? dark : light)
    gr.addColorStop(1, 'rgba(0,0,0,0)')
    g.globalAlpha = 0.04
    g.fillStyle = gr
    g.fillRect(x - r, y - r, 2 * r, 2 * r)
  }
  for (let y = 0; y < size; y += 3) {
    g.globalAlpha = 0.07 + Math.random() * 0.13
    g.fillStyle = Math.random() < 0.5 ? dark : light
    g.fillRect(0, y + Math.random() * 0.8, size, 1.3 + Math.random() * 0.6)
  }
  for (let x = 0; x < size; x += 3) {
    g.globalAlpha = 0.06 + Math.random() * 0.11
    g.fillStyle = Math.random() < 0.5 ? dark : light
    g.fillRect(x + Math.random() * 0.8, 0, 1.3 + Math.random() * 0.6, size)
  }
  for (let y = 0; y < size; y += 3) {
    for (let x = (y / 3) % 2 ? 0 : 3; x < size; x += 6) {
      g.globalAlpha = 0.08
      g.fillStyle = light
      g.fillRect(x, y, 1.6, 1.6)
    }
  }
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * size,
      y = Math.random() * size,
      l = 4 + Math.random() * 14
    g.globalAlpha = 0.1 + Math.random() * 0.12
    g.fillStyle = Math.random() < 0.65 ? light : dark
    if (Math.random() < 0.5) g.fillRect(x, y, l, 1.8 + Math.random())
    else g.fillRect(x, y, 1.8 + Math.random(), l)
  }
  for (let i = 0; i < 16000; i++) {
    g.globalAlpha = 0.04 + Math.random() * 0.07
    g.fillStyle = Math.random() < 0.5 ? light : dark
    g.fillRect(Math.random() * size, Math.random() * size, 1, 1)
  }
  g.globalAlpha = 1
  const tx = new THREE.CanvasTexture(c)
  tx.wrapS = tx.wrapT = THREE.RepeatWrapping
  tx.colorSpace = THREE.SRGBColorSpace
  tx.anisotropy = 16
  return tx
}

function weaveBump(size = 512) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  g.fillStyle = '#808080'
  g.fillRect(0, 0, size, size)
  for (let y = 0; y < size; y += 3) {
    g.globalAlpha = 0.3
    g.fillStyle = '#9a9a9a'
    g.fillRect(0, y, size, 1.4)
    g.globalAlpha = 0.22
    g.fillStyle = '#666666'
    g.fillRect(0, y + 1.6, size, 1.0)
  }
  for (let x = 0; x < size; x += 3) {
    g.globalAlpha = 0.2
    g.fillStyle = '#a2a2a2'
    g.fillRect(x, 0, 1.3, size)
  }
  for (let i = 0; i < 700; i++) {
    const x = Math.random() * size,
      y = Math.random() * size,
      l = 4 + Math.random() * 12
    g.globalAlpha = 0.35
    g.fillStyle = '#b0b0b0'
    if (Math.random() < 0.5) g.fillRect(x, y, l, 2)
    else g.fillRect(x, y, 2, l)
  }
  g.globalAlpha = 1
  const tx = new THREE.CanvasTexture(c)
  tx.wrapS = tx.wrapT = THREE.RepeatWrapping
  return tx
}

/** Agglomerated cork: dense fine granules with occasional larger chips. */
function corkTexture(size = 1024) {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  g.fillStyle = '#c69a62'
  g.fillRect(0, 0, size, size)
  const shades = ['#a97b45', '#8a6136', '#d9b076', '#b98c52', '#9d7040', '#e2bc82', '#c49058', '#7d5730']
  for (let i = 0; i < 90000; i++) {
    const x = Math.random() * size,
      y = Math.random() * size,
      r = 0.4 + Math.random() * 1.1
    g.fillStyle = shades[(Math.random() * shades.length) | 0]
    g.globalAlpha = 0.3 + Math.random() * 0.35
    g.beginPath()
    g.ellipse(x, y, r, r * (0.6 + Math.random() * 0.4), Math.random() * 3, 0, 7)
    g.fill()
  }
  for (let i = 0; i < 2500; i++) {
    const x = Math.random() * size,
      y = Math.random() * size,
      r = 1.4 + Math.random() * 2.4
    g.fillStyle = shades[(Math.random() * shades.length) | 0]
    g.globalAlpha = 0.12 + Math.random() * 0.18
    g.beginPath()
    g.ellipse(x, y, r, r * 0.6, Math.random() * 3, 0, 7)
    g.fill()
  }
  g.globalAlpha = 1
  const tx = new THREE.CanvasTexture(c)
  tx.wrapS = tx.wrapT = THREE.RepeatWrapping
  tx.colorSpace = THREE.SRGBColorSpace
  tx.anisotropy = 16
  return tx
}

export function createCushionScene(canvas: HTMLCanvasElement, objText: string, width: number, height: number): CushionScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
  renderer.setSize(width, height, false)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.95

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf4efe6)
  const camera = new THREE.PerspectiveCamera(38, width / height, 1, 6000)

  scene.add(new THREE.HemisphereLight(0xfff3e4, 0x7a6c5a, 0.5))
  const sun = new THREE.DirectionalLight(0xffedd6, 1.15)
  sun.position.set(420, 520, 640)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  const sc = sun.shadow.camera
  sc.left = sc.bottom = -450
  sc.right = sc.top = 450
  sc.far = 2500
  scene.add(sun)
  const fill = new THREE.DirectionalLight(0xd8e2f0, 0.28)
  fill.position.set(-500, 300, -300)
  scene.add(fill)
  const rim = new THREE.DirectionalLight(0xffe2c2, 0.22)
  rim.position.set(-200, 260, 620)
  scene.add(rim)

  const root = new THREE.Group()
  root.rotation.x = -Math.PI / 2
  scene.add(root)
  // everything but the cork tray lives here, tilted to the tray's wedge incline
  // (22 mm rise over 408 mm) and lowered so the tray rim wraps the bottom edge
  const cushion = new THREE.Group()
  cushion.rotation.y = Math.atan2(22, 408)
  cushion.position.z = -16
  root.add(cushion)

  const textures: THREE.Texture[] = []
  const geometries: THREE.BufferGeometry[] = []
  const materials: THREE.Material[] = []
  const track = <T extends THREE.BufferGeometry>(g: T) => {
    geometries.push(g)
    return g
  }

  // ---------- materials ----------
  const bump = weaveBump()
  const fabCream = fabricTexture('#c8b5a4', '#a4907d', '#ddccbb')
  const fabTerra = fabricTexture('#a97050', '#835237', '#c28a66')
  const fabDome = fabricTexture('#d2c3b0', '#ae9d88', '#e5d7c4')
  const cork = corkTexture()
  textures.push(bump, fabCream, fabTerra, fabDome, cork)
  ;[fabCream, fabTerra, fabDome].forEach((t) => t.repeat.set(6, 6))
  bump.repeat.set(22, 22)
  cork.repeat.set(1.6, 1.6)

  const fabricMat = (map: THREE.Texture, double?: boolean) =>
    new THREE.MeshStandardMaterial({
      map,
      bumpMap: bump,
      bumpScale: 1.1,
      roughness: 0.96,
      metalness: 0,
      side: double ? THREE.DoubleSide : THREE.FrontSide,
    })

  const M_CREAM = fabricMat(fabCream)
  const M_TERRA = fabricMat(fabTerra, true)
  const M_DOME = fabricMat(fabDome, true)
  M_TERRA.polygonOffset = true
  M_TERRA.polygonOffsetFactor = -2
  M_TERRA.polygonOffsetUnits = -2
  M_DOME.polygonOffset = true
  M_DOME.polygonOffsetFactor = -6
  M_DOME.polygonOffsetUnits = -6
  const M_CORK = new THREE.MeshStandardMaterial({ map: cork, roughness: 1, metalness: 0 })
  const M_SOFT = M_CREAM.clone()
  M_SOFT.side = THREE.DoubleSide
  // groove shadow tone, thread tones: deeper than the fabric so seams read as creases
  const CREASE = new THREE.MeshStandardMaterial({ color: 0x9d8b74, roughness: 1, metalness: 0 })
  const THREADMAT = new THREE.MeshStandardMaterial({ color: 0x94816b, roughness: 0.8, metalness: 0 })
  const DARKTHREAD = new THREE.MeshStandardMaterial({ color: 0x74513a, roughness: 0.7, metalness: 0 })
  const GOLD = new THREE.MeshStandardMaterial({ color: 0xb08d55, roughness: 0.85 })
  const SHADOW = new THREE.ShadowMaterial({ opacity: 0.24 })
  materials.push(M_CREAM, M_TERRA, M_DOME, M_CORK, M_SOFT, CREASE, THREADMAT, DARKTHREAD, GOLD, SHADOW)

  function addUVs(geo: THREE.BufferGeometry) {
    const p = geo.attributes.position
    const uv = new Float32Array(p.count * 2)
    for (let i = 0; i < p.count; i++) {
      uv[2 * i] = (p.getX(i) + 210) / 420
      uv[2 * i + 1] = (p.getY(i) + 210) / 420
    }
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  }

  const KEEP: Record<string, THREE.Material> = {
    'Unnamed-0': M_CORK, // cork tray
    'Unnamed-1': M_CREAM, // cushion volume (drives the heightfield, not rendered)
    'Unnamed-2': M_CREAM, // insert oval
  }
  const SKIP_RENDER: Record<string, boolean> = { 'Unnamed-1': true } // replaced by the procedural pillow below
  const PARSED = parseOBJ(objText)

  /** Sample the max height per x-slice of a body, filling gaps by interpolation. */
  function heightField(body: ObjBody) {
    const NB = 211
    const hf = new Array<number>(NB).fill(-1)
    for (let i = 0; i < body.pos.length; i += 3) {
      const b = Math.round((body.pos[i] + 210) / 2)
      if (b >= 0 && b < NB && body.pos[i + 2] > hf[b]) hf[b] = body.pos[i + 2]
    }
    let last = -1
    for (let i = 0; i < NB; i++) {
      if (hf[i] >= 0) {
        if (last >= 0 && i - last > 1) {
          for (let j = last + 1; j < i; j++) hf[j] = hf[last] + ((hf[i] - hf[last]) * (j - last)) / (i - last)
        } else if (last < 0) {
          for (let j = 0; j < i; j++) hf[j] = hf[i]
        }
        last = i
      }
    }
    for (let i = NB - 1; i >= 0; i--) if (hf[i] < 0) hf[i] = i < NB - 1 ? hf[i + 1] : 66
    return hf
  }

  // ---- warp the cushion to the real side profile (continuous wedge) ----
  // thin front edge (~55) rising across the seat, soft hump to the crest (~150),
  // slight fall to the back edge
  ;(function warp() {
    const body = PARSED.find((o) => o.name === 'Unnamed-1')!
    const hf = heightField(body)
    const s0 = (x: number) => {
      const f = (x + 210) / 2,
        i = Math.max(0, Math.min(209, Math.floor(f))),
        t = f - i
      return hf[i] * (1 - t) + hf[i + 1] * t
    }
    const tz = (x: number) => {
      if (x >= -10) {
        const u = (210 - x) / 220
        return 47 + 28 * u + 4 * Math.sin(Math.PI * u) // puffy sloped seat
      }
      if (x >= -130) {
        const t = (-10 - x) / 120
        return 75 + 51 * (t * t * (3 - 2 * t)) // hump to crest
      }
      const q = (-130 - x) / 80
      return 126 - 26 * q * q // rounded crest rolling to the back edge
    }
    for (const name of ['Unnamed-1', 'Unnamed-2']) {
      const o = PARSED.find((q) => q.name === name)!
      const isBody = name === 'Unnamed-1'
      for (let i = 0; i < o.pos.length; i += 3) {
        let z = o.pos[i + 2]
        if (z <= 0.01) continue
        const s = s0(o.pos[i])
        // erase the OBJ's wrong molded grooves: snap shallow depressions to the surface
        if (isBody && z > s - 6.5) z = s
        o.pos[i + 2] = (z * tz(o.pos[i])) / s
      }
    }
  })()

  for (const o of PARSED) {
    if (!(o.name in KEEP) || SKIP_RENDER[o.name]) continue
    const geo = track(new THREE.BufferGeometry())
    geo.setAttribute('position', new THREE.Float32BufferAttribute(o.pos, 3))
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(o.nor, 3))
    addUVs(geo)
    const mesh = new THREE.Mesh(geo, KEEP[o.name])
    mesh.castShadow = mesh.receiveShadow = true
    ;(o.name === 'Unnamed-0' ? root : cushion).add(mesh)
  }

  // ---------- top surface, sampled from the real body mesh ----------
  const SEAM_X = -16 // terracotta band meets the seat here
  const HF = heightField(PARSED.find((o) => o.name === 'Unnamed-1')!)

  function surfZ(x: number, y?: number) {
    const f = (x + 210) / 2,
      i = Math.max(0, Math.min(209, Math.floor(f))),
      t = f - i
    const base = HF[i] * (1 - t) + HF[i + 1] * t
    if (y === undefined) return base
    // lateral puff: the top rolls off toward the side edges like a stuffed cushion
    const ty = Math.min(1, Math.abs(y) / 210)
    return base - (base - 8) * 0.16 * Math.pow(ty, 3.0)
  }
  /** Surface normal from the heightfield gradient — stitching offset along it stays proud of the fabric. */
  function surfN(x: number, y: number): [number, number, number] {
    const e = 2
    const dzdx = (surfZ(x + e, y) - surfZ(x - e, y)) / (2 * e)
    const dzdy = (surfZ(x, y + e) - surfZ(x, y - e)) / (2 * e)
    const l = Math.sqrt(dzdx * dzdx + dzdy * dzdy + 1)
    return [-dzdx / l, -dzdy / l, 1 / l]
  }

  const CXP = 10,
    HX = 200,
    HY = 210,
    RC = 34,
    RE = 13
  /** Signed distance into the pillow's rounded-rect top (positive inside). */
  function panelSdf(px: number, py: number) {
    const qx = Math.abs(px - CXP) - (HX - RC),
      qy = Math.abs(py) - (HY - RC)
    const ax = Math.max(qx, 0),
      ay = Math.max(qy, 0)
    return -(Math.hypot(ax, ay) + Math.min(Math.max(qx, qy), 0) - RC)
  }
  /** Pull a panel/stitch point inside the rolled edge — bisection keeps corners smooth. */
  function panelClamp(x: number, y: number, margin?: number): [number, number] {
    const m = margin ?? 15.5
    if (panelSdf(x, y) >= m) return [x, y]
    let lo = 0.05,
      hi = 1
    for (let it = 0; it < 22; it++) {
      const t = (lo + hi) / 2
      if (panelSdf(CXP + (x - CXP) * t, y * t) < m) hi = t
      else lo = t
    }
    return [CXP + (x - CXP) * lo, y * lo]
  }

  const DOME_CX = -180,
    DOME_RX = 150,
    DOME_RY = 166
  // panel thickness fields: full in the interior, tapering to 0 at every edge so
  // panels lie flush (a real sewn panel has no step). The 0.5 floor keeps them a
  // hair above the sheet — never coplanar, which would z-fight.
  const terraOff = (x: number, y: number) =>
    0.5 + 0.9 * smooth01((SEAM_X - x) / 28) * smooth01((panelSdf(x, y) - 15.5) / 26)
  const domeOff = (x: number, y: number) => {
    const rd = 1 - Math.sqrt(Math.pow((x - DOME_CX) / DOME_RX, 2) + Math.pow(y / DOME_RY, 2))
    return terraOff(x, y) + 0.4 + 0.9 * smooth01((rd * DOME_RX) / 22)
  }

  function drapedGridMesh(
    pts2d: (u: number, v: number) => [number, number],
    nu: number,
    nv: number,
    mat: THREE.Material,
    zOff: (x: number, y: number) => number,
  ) {
    const pos: number[] = [],
      idx: number[] = []
    for (let j = 0; j <= nv; j++)
      for (let i = 0; i <= nu; i++) {
        const [x, y] = pts2d(i / nu, j / nv)
        const off = zOff(x, y)
        const n = surfN(x, y)
        pos.push(x + n[0] * off, y + n[1] * off, surfZ(x, y) + n[2] * off)
      }
    for (let j = 0; j < nv; j++)
      for (let i = 0; i < nu; i++) {
        const a = j * (nu + 1) + i,
          b = a + 1,
          c = a + nu + 1,
          d = c + 1
        idx.push(a, b, d, a, d, c)
      }
    const g = track(new THREE.BufferGeometry())
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    g.setIndex(idx)
    g.computeVertexNormals()
    addUVs(g)
    const m = new THREE.Mesh(g, mat)
    m.castShadow = m.receiveShadow = true
    cushion.add(m)
  }

  // terracotta band: back edge to the seam, full width, hugging the rounded rim
  drapedGridMesh(
    (u, v) => panelClamp(-180 + (SEAM_X + 180) * u, -200 + 400 * v),
    48,
    24,
    M_TERRA,
    terraOff,
  )
  // cream lotus panel: U-shape, chord on the back edge, curve reaching near the seam
  drapedGridMesh(
    (u, v) => {
      const th = -Math.PI / 2 + Math.PI * v
      return panelClamp(DOME_CX + DOME_RX * u * Math.cos(th), DOME_RY * u * Math.sin(th))
    },
    40,
    80,
    M_DOME,
    domeOff,
  )

  // ---------- stitching ----------
  type StitchStyle = { seam?: boolean; dark?: boolean; dash?: boolean }
  const stitchMat: StitchStyle = { seam: true } // crease + tone-on-tone dashes
  const brownSeam: StitchStyle = { seam: true, dark: true } // crease + dark dashes on the suede band
  const faceStitch: StitchStyle = { dash: true } // plain dashes on vertical faces

  function roundedRect(cx: number, cy: number, L: number, W: number, r: number, n = 14): [number, number][] {
    const pts: [number, number][] = [],
      hx = L / 2 - r,
      hy = W / 2 - r
    const corner = (ccx: number, ccy: number, a0: number) => {
      for (let i = 0; i <= n; i++) {
        const a = a0 + (i * (Math.PI / 2)) / n
        pts.push([ccx + r * Math.cos(a), ccy + r * Math.sin(a)])
      }
    }
    corner(cx + hx, cy + hy, 0)
    corner(cx - hx, cy + hy, Math.PI / 2)
    corner(cx - hx, cy - hy, Math.PI)
    corner(cx + hx, cy - hy, 1.5 * Math.PI)
    pts.push(pts[0])
    return pts
  }

  function densify(pts: [number, number][], step = 5): [number, number][] {
    const out: [number, number][] = []
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i],
        [x2, y2] = pts[i + 1]
      const d = Math.hypot(x2 - x1, y2 - y1),
        n = Math.max(1, Math.ceil(d / step))
      for (let k = 0; k < n; k++) out.push([x1 + ((x2 - x1) * k) / n, y1 + ((y2 - y1) * k) / n])
    }
    out.push(pts[pts.length - 1])
    return out
  }

  function makeCurve(pts3: number[][], dz: number) {
    let v = pts3.map((p) => new THREE.Vector3(p[0], p[1], p[2] - dz))
    const closed = v[0].distanceTo(v[v.length - 1]) < 0.8
    if (closed) v = v.slice(0, -1)
    return new THREE.CatmullRomCurve3(v, closed)
  }

  /** Evenly arc-length-spaced thread dashes (~3.8 mm machine stitch) — no corner gaps. */
  function addDashes(curve: THREE.CatmullRomCurve3, dark?: boolean) {
    const L = curve.getLength()
    const n = Math.max(4, Math.round(L / 3.8))
    const g = track(new THREE.CylinderGeometry(0.32, 0.32, 2.2, 5, 1))
    const inst = new THREE.InstancedMesh(g, dark ? DARKTHREAD : THREADMAT, n)
    const m4 = new THREE.Matrix4(),
      q = new THREE.Quaternion(),
      up = new THREE.Vector3(0, 1, 0),
      s = new THREE.Vector3(1, 1, 1)
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n
      const pos = curve.getPointAt(t)
      q.setFromUnitVectors(up, curve.getTangentAt(t).normalize())
      m4.compose(pos, q, s)
      inst.setMatrixAt(i, m4)
    }
    inst.castShadow = true
    cushion.add(inst)
  }

  function addLine(pts3: number[][], style: StitchStyle) {
    if (style.seam) {
      // quilting seam: sunken crease (reads as a groove shadow) + running-stitch dashes
      const segs = Math.max(64, pts3.length * 2)
      const c1 = new THREE.Mesh(track(new THREE.TubeGeometry(makeCurve(pts3, 1.1), segs, 0.9, 6, false)), CREASE)
      c1.receiveShadow = true
      cushion.add(c1)
      addDashes(makeCurve(pts3, 0.3), style.dark)
      return
    }
    if (style.dash) addDashes(makeCurve(pts3, 0), style.dark)
  }

  const drape = (pts: [number, number][], off: number): number[][] =>
    densify(pts, 5).map((p) => {
      const [x, y] = panelClamp(p[0], p[1], 17.5)
      const n = surfN(x, y)
      return [x + n[0] * off, y + n[1] * off, surfZ(x, y) + n[2] * off]
    })

  // ---------- procedural pillow shell: soft rolled edges + rounded corners ----------
  ;(function pillowBody() {
    function clampIn(x: number, y: number, target: number): [number, number] {
      let t = 1
      while (t > 0.05 && panelSdf(CXP + (x - CXP) * t, y * t) < target) t -= 0.01
      return [CXP + (x - CXP) * t, y * t]
    }
    // interior top sheet: flat to the roll start (no crease, no crumple)
    const nx = 90,
      ny = 90,
      pos: number[] = [],
      idx: number[] = []
    for (let j = 0; j <= ny; j++)
      for (let i = 0; i <= nx; i++) {
        const [x, y] = clampIn(CXP - HX + (2 * HX * i) / nx, -HY + (2 * HY * j) / ny, RE)
        pos.push(x, y, surfZ(x, y))
      }
    for (let j = 0; j < ny; j++)
      for (let i = 0; i < nx; i++) {
        const a = j * (nx + 1) + i,
          b = a + 1,
          c = a + nx + 1,
          d2 = c + 1
        idx.push(a, b, d2, a, d2, c)
      }
    const sheet = track(new THREE.BufferGeometry())
    sheet.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    sheet.setIndex(idx)
    sheet.computeVertexNormals()
    addUVs(sheet)
    const mSheet = new THREE.Mesh(sheet, M_SOFT)
    mSheet.castShadow = mSheet.receiveShadow = true
    cushion.add(mSheet)

    // one continuous strip: overlap flap -> quarter roll -> wall -> bottom tuck
    const per = densify(roundedRect(CXP, 0, 2 * HX, 2 * HY, RC, 16), 5)
    const wpos: number[] = [],
      NA = 8,
      CN = NA + 5
    for (let pi = 0; pi < per.length; pi++) {
      const p = per[pi]
      const pPrev = per[Math.max(0, pi - 1)],
        pNext = per[Math.min(per.length - 1, pi + 1)]
      const tx = pNext[0] - pPrev[0],
        ty = pNext[1] - pPrev[1],
        tl = Math.max(1e-6, Math.hypot(tx, ty))
      const nxd = ty / tl,
        nyd = -tx / tl // outward normal from tangent
      const ix = p[0] - nxd * RE,
        iy = p[1] - nyd * RE
      const s = surfZ(ix, iy)
      wpos.push(ix - nxd * 1.8, iy - nyd * 1.8, s + 0.25) // flap tucked over the sheet
      for (let k = 0; k <= NA; k++) {
        const a = ((k / NA) * Math.PI) / 2
        wpos.push(ix + nxd * RE * Math.sin(a), iy + nyd * RE * Math.sin(a), s - RE + RE * Math.cos(a))
      }
      wpos.push(p[0], p[1], 6) // wall base
      wpos.push(p[0] - nxd * 2, p[1] - nyd * 2, 1.5) // bottom tuck
      wpos.push(p[0] - nxd * 6, p[1] - nyd * 6, 0)
    }
    // the sewn cover wraps its colour panels over the rolled edge: flap+roll faces
    // take the panel material of their region; walls and bottom stay cream
    function rimMat(px: number, py: number) {
      if (px > SEAM_X - 2) return 0
      const rd = Math.sqrt(Math.pow((px - DOME_CX) / DOME_RX, 2) + Math.pow(py / DOME_RY, 2))
      return rd < 0.995 ? 2 : 1
    }
    const idxs: number[][] = [[], [], []]
    for (let i = 0; i < per.length - 1; i++) {
      const mi = rimMat(per[i][0], per[i][1])
      for (let r2 = 0; r2 < CN - 1; r2++) {
        const a = i * CN + r2,
          b = a + 1,
          c = (i + 1) * CN + r2,
          d2 = c + 1
        idxs[r2 <= NA ? mi : 0].push(a, c, b, b, c, d2)
      }
    }
    const posAttr = new THREE.Float32BufferAttribute(wpos, 3)
    const skirtMats = [M_SOFT, M_TERRA, M_DOME]
    for (let mi = 0; mi < 3; mi++) {
      if (!idxs[mi].length) continue
      const skirt = track(new THREE.BufferGeometry())
      skirt.setAttribute('position', posAttr)
      skirt.setIndex(idxs[mi])
      skirt.computeVertexNormals()
      addUVs(skirt)
      const mSkirt = new THREE.Mesh(skirt, skirtMats[mi])
      mSkirt.castShadow = mSkirt.receiveShadow = true
      cushion.add(mSkirt)
    }
  })()

  // insert oval: double ring — the deep crease around the raised pad
  addLine(drape(roundedRect(100, 0, 142, 78, 28), 1.1), stitchMat)
  addLine(drape(roundedRect(100, 0, 150, 86, 31), 0.6), stitchMat)

  // curved side seams: bottom-front corners up to the seam
  for (const s of [1, -1]) {
    const pts: [number, number][] = [
      [SEAM_X, 104 * s],
      [20, 110 * s],
      [80, 122 * s],
      [125, 144 * s],
      [158, 172 * s],
      [176, 199 * s],
    ]
    addLine(drape(pts, 0.6), stitchMat)
  }

  // inner border stitch: rounded loop tight to the edge
  addLine(drape(roundedRect(10, 0, 362, 382, 20, 10), 0.6), stitchMat)

  // boundary seams either side of the terracotta/cream join
  addLine(drape([[SEAM_X + 4, -192], [SEAM_X + 4, 0], [SEAM_X + 4, 192]], 0.7), brownSeam)
  addLine(drape([[SEAM_X - 1, -192], [SEAM_X - 1, 0], [SEAM_X - 1, 192]], 0.6), stitchMat)

  // cream panel edge: outer dark stitch on the band + inner tone-on-tone stitch
  for (const [rx, ry, off, style] of [
    [DOME_RX, DOME_RY, 1.3, brownSeam],
    [DOME_RX - 13, DOME_RY - 15, 1.9, stitchMat],
  ] as [number, number, number, StitchStyle][]) {
    const pts: [number, number][] = []
    for (let i = 0; i <= 72; i++) {
      const th = (-Math.PI / 2 + (Math.PI * i) / 72) * 0.8 // stop short of the rolled rim
      pts.push([DOME_CX + rx * Math.cos(th), ry * Math.sin(th)])
    }
    addLine(drape(pts, off), style)
  }

  // crest stitch: along the back edge under the roll, wrapping both back corners
  ;(function crestStitch() {
    const pts: number[][] = []
    const addPt = (px: number, py: number, drop: number) => {
      const [ix, iy] = panelClamp(px, py, 15)
      pts.push([px, py, surfZ(ix, iy) - 15 - drop])
    }
    const R = 34.8
    for (let i = 6; i >= 1; i--) {
      const a = Math.PI + (i / 6) * (Math.PI / 4)
      addPt(-156 + R * Math.cos(a), -176 + R * Math.sin(a), (i / 6) * 10)
    }
    for (let i = 0; i <= 64; i++) addPt(-190.6, -176 + (352 * i) / 64, 0)
    for (let i = 1; i <= 6; i++) {
      const a = Math.PI - (i / 6) * (Math.PI / 4)
      addPt(-156 + R * Math.cos(a), 176 + R * Math.sin(a), (i / 6) * 10)
    }
    addLine(pts, faceStitch)
  })()

  // lock topstitch on the top face, inside the piping join
  addLine(drape(roundedRect(10, 0, 366, 386, 24, 12), 0.9), faceStitch)

  // side face stitching: outer loop at the panel edge + inner loop inset ~10 mm,
  // both following the wedge silhouette
  ;(function sideFaces() {
    function sideLoop(Y: number, xf: number, xb: number, zb: number, topOff: number) {
      const pts: number[][] = []
      for (let x = xf; x >= xb; x -= 8) pts.push([x, Y, zb]) // bottom, front→back
      {
        const zt = surfZ(xb, Y) - topOff
        for (let z = zb + 8; z <= zt; z += 8) pts.push([xb, Y, z]) // back edge up
      }
      for (let x = xb; x <= xf; x += 6) pts.push([x, Y, surfZ(x, Y) - topOff]) // top, over the shoulder
      {
        const zt = surfZ(xf, Y) - topOff
        for (let z = zt - 8; z >= zb + 8; z -= 8) pts.push([xf, Y, z]) // front edge down
      }
      pts.push(pts[0])
      addLine(pts, faceStitch)
    }
    for (const s of [1, -1]) {
      sideLoop(209.2 * s, 172, -166, 7, 10)
      sideLoop(209.2 * s, 166, -160, 16, 20)
    }
  })()

  // back face stitching: outer edge loop + inner loop
  ;(function backFace() {
    function loop(hy: number, z0: number, z1: number, r: number) {
      const pts: number[][] = [],
        X = -190.2
      const corner = (cy: number, cz: number, a0: number) => {
        for (let i = 0; i <= 12; i++) {
          const a = a0 + (i * (Math.PI / 2)) / 12
          pts.push([X, cy + r * Math.cos(a), cz + r * Math.sin(a)])
        }
      }
      corner(hy - r, z1 - r, 0)
      corner(-(hy - r), z1 - r, Math.PI / 2)
      corner(-(hy - r), z0 + r, Math.PI)
      corner(hy - r, z0 + r, 1.5 * Math.PI)
      pts.push(pts[0])
      addLine(pts, faceStitch)
    }
    loop(174, 6, 97, 16)
    loop(164, 14, 88, 13)
  })()

  // hand-embroidered lotus, draped on the slope inside the cream panel
  ;(function lotus() {
    const cx = -148,
      cy = 0
    function petal(angleDeg: number, len: number, wid: number) {
      const a = (angleDeg * Math.PI) / 180,
        ca = Math.cos(a),
        sa = Math.sin(a),
        pts: THREE.Vector3[] = []
      for (let i = 0; i <= 40; i++) {
        const tt = i <= 20 ? i / 20 : (40 - i) / 20
        const uu = tt * len,
          ww = Math.sin(Math.PI * Math.min(tt, 1)) * wid * (i <= 20 ? 1 : -1)
        const x = cx + uu * ca - ww * sa,
          y = cy + uu * sa + ww * ca
        const nn = surfN(x, y),
          lo = domeOff(x, y) + 1.5 // proud of the fabric, visible at grazing angles
        pts.push(new THREE.Vector3(x + nn[0] * lo, y + nn[1] * lo, surfZ(x, y) + nn[2] * lo))
      }
      const tg = track(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 80, 1.05, 6, false))
      cushion.add(new THREE.Mesh(tg, GOLD))
    }
    petal(0, 66, 13)
    petal(30, 56, 12)
    petal(-30, 56, 12)
    petal(62, 46, 10)
    petal(-62, 46, 10)
    petal(92, 36, 8)
    petal(-92, 36, 8)
  })()

  // ---------- stage ----------
  const ground = new THREE.Mesh(track(new THREE.PlaneGeometry(4000, 4000)), SHADOW)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -38
  ground.receiveShadow = true
  scene.add(ground)

  // ---------- scroll-driven camera ----------
  const LIFT_BASE = cushion.position.z,
    LIFT_MM = 175

  function render(p: number) {
    let i = 0
    while (i < CAMERA_KEYS.length - 2 && p >= CAMERA_KEYS[i + 1].p) i++
    const a = CAMERA_KEYS[i],
      b = CAMERA_KEYS[i + 1]
    const t = ease(Math.max(0, Math.min(1, (p - a.p) / (b.p - a.p))))
    const L = (k: keyof CameraKey) => a[k] + (b[k] - a[k]) * t
    const th = L('th'),
      ph = L('ph'),
      d = L('d'),
      ty = L('ty'),
      lift = L('lift')
    camera.position.set(d * Math.sin(ph) * Math.cos(th), ty + d * Math.cos(ph), d * Math.sin(ph) * Math.sin(th))
    camera.lookAt(0, ty, 0)
    cushion.position.z = LIFT_BASE + lift * LIFT_MM // root is x-rotated: local z is world up
    renderer.render(scene, camera)
  }

  function resize(w: number, h: number) {
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h, false)
  }

  function dispose() {
    geometries.forEach((g) => g.dispose())
    materials.forEach((m) => m.dispose())
    textures.forEach((t) => t.dispose())
    renderer.dispose()
  }

  return { render, resize, dispose }
}
