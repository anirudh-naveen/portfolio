<template>
  <div ref="layerRef" class="map-layer" aria-hidden="true">
    <svg
      v-if="map"
      class="map"
      :viewBox="`0 0 ${map.width} ${map.height}`"
      :width="map.width"
      :height="map.height"
    >
      <defs>
        <g id="map-conifer">
          <path d="M0 -12 L6 -2 L3 -2 L7 5 L-7 5 L-3 -2 L-6 -2 Z" class="tree-fill" />
          <path d="M0 5 V9" class="ink-line" />
        </g>
        <g id="map-oak">
          <circle cy="-3" r="6" class="tree-fill light" />
          <path d="M-2 -5 Q0 -7 2 -5" class="ink-line thin" />
          <path d="M0 3 V9" class="ink-line" />
        </g>
        <g id="map-peak">
          <path d="M-13 6 L0 -11 L13 6" class="paper-fill" />
          <path d="M2 -7 L-1 6 M5 -3 L3 6 M8 1 L7 6" class="ink-line thin" />
        </g>
        <g id="map-town">
          <path
            d="M-15 6 V-2 L-10 -7 L-5 -2 V6 Z M-4 6 V-5 L2 -11 L8 -5 V6 Z M8 6 V0 L12 -4 L16 0 V6 Z"
            class="paper-fill"
          />
          <path d="M2 -11 V-18 M0 -16 H4" class="ink-line" />
          <path d="M-18 6 H19" class="ink-line" />
        </g>
      </defs>

      <path :d="map.river" class="river" />

      <path v-for="(trail, i) in map.trails" :key="`t${i}`" :d="trail" class="trail" />

      <path :d="map.road" class="road-edge" />
      <path :d="map.road" class="road-core" />

      <use
        v-for="(peak, i) in map.peaks"
        :key="`m${i}`"
        href="#map-peak"
        :transform="`translate(${peak.x} ${peak.y}) scale(${peak.s})`"
      />

      <use
        v-for="(tree, i) in map.trees"
        :key="`f${i}`"
        :href="tree.kind === 0 ? '#map-conifer' : '#map-oak'"
        :transform="`translate(${tree.x} ${tree.y}) scale(${tree.s})`"
      />

      <g v-for="town in map.towns" :key="town.name">
        <circle :cx="town.x" :cy="town.y + 2" r="30" class="town-ring" />
        <use href="#map-town" :transform="`translate(${town.x} ${town.y}) scale(1.5)`" />
        <text :x="town.x" :y="town.y + 34" class="town-label">{{ town.name }}</text>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'

interface Point {
  x: number
  y: number
}

interface MapData {
  width: number
  height: number
  road: string
  river: string
  trails: string[]
  towns: (Point & { name: string })[]
  trees: (Point & { s: number; kind: 0 | 1 })[]
  peaks: (Point & { s: number })[]
}

const TOWN_NAMES = [
  'Ashford',
  'Wrenholt',
  'Marrowgate',
  'Eldermere',
  'Thornbury',
  'Saltmarsh',
  'Kingsreach',
  'Oakhaven',
  'Brightwater',
  'Hollow Cross',
  'Ravensmoor',
  'Stonebridge',
]

const layerRef = ref<HTMLElement | null>(null)
const map = shallowRef<MapData | null>(null)

// Fixed seed so the map is the same on every visit and only rescales on resize.
function seeded(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Catmull-Rom spline through the points, as cubic Béziers.
function smoothPath(points: Point[]) {
  const first = points[0]
  if (!first) return ''
  let d = `M${first.x.toFixed(1)} ${first.y.toFixed(1)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]!
    const p1 = points[i]!
    const p2 = points[i + 1]!
    const p3 = points[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

function generate(width: number, height: number): MapData {
  const rand = seeded(1886)
  const between = (min: number, max: number) => min + rand() * (max - min)
  // Keep landmarks in the side margins, clear of the page content in the middle.
  const edgeX = (side: number) =>
    side === 0 ? between(0.02, 0.2) * width : between(0.8, 0.98) * width

  const townCount = Math.max(5, Math.min(TOWN_NAMES.length, Math.round(height / 460)))
  const towns = Array.from({ length: townCount }, (_, i) => {
    const band = height / townCount
    const side = rand() < 0.75 ? i % 2 : (i + 1) % 2
    return {
      name: TOWN_NAMES[i]!,
      x: edgeX(side),
      y: Math.min(height - 60, Math.max(90, (i + 0.5) * band + between(-0.2, 0.2) * band)),
    }
  })

  // The main road winds from town to town down the whole page.
  const roadPoints: Point[] = [{ x: (towns[0]?.x ?? 0) + between(-60, 60), y: -20 }]
  towns.forEach((town, i) => {
    roadPoints.push(town)
    const next = towns[i + 1]
    if (next) {
      roadPoints.push({
        x: (town.x + next.x) / 2 + between(-0.12, 0.12) * width,
        y: (town.y + next.y) / 2 + between(-40, 40),
      })
    }
  })
  const last = towns[towns.length - 1]
  roadPoints.push({ x: (last?.x ?? 0) + between(-60, 60), y: height + 20 })

  // A river meanders across the map with a few long bends.
  const phase = between(0, Math.PI * 2)
  const riverPoints: Point[] = []
  for (let y = -40; y <= height + 400; y += 380) {
    riverPoints.push({ x: width * (0.5 + 0.46 * Math.sin(y / 1100 + phase)), y })
  }

  // Forest patches along the margins.
  const trees: MapData['trees'] = []
  const forestCount = Math.round(height / 230)
  for (let f = 0; f < forestCount; f++) {
    const cx = edgeX(rand() < 0.5 ? 0 : 1)
    const cy = between(40, height - 40)
    const rx = between(36, 90)
    const ry = rx * between(0.5, 0.8)
    const count = Math.round(between(10, 22))
    const kind = rand() < 0.5 ? 0 : 1
    for (let t = 0; t < count; t++) {
      const a = rand() * Math.PI * 2
      const r = Math.sqrt(rand())
      trees.push({
        x: cx + Math.cos(a) * rx * r,
        y: cy + Math.sin(a) * ry * r,
        s: between(1.1, 1.6),
        kind: rand() < 0.8 ? kind : kind === 0 ? 1 : 0,
      })
    }
  }
  // Lone trees dotted about the margins between forests.
  for (let t = 0; t < Math.round(height / 90); t++) {
    trees.push({
      x: edgeX(rand() < 0.5 ? 0 : 1),
      y: between(20, height - 20),
      s: between(1, 1.4),
      kind: rand() < 0.5 ? 0 : 1,
    })
  }
  trees.sort((a, b) => a.y - b.y)

  // Mountain ranges: short rows of peaks.
  const peaks: MapData['peaks'] = []
  const rangeCount = Math.round(height / 520)
  for (let m = 0; m < rangeCount; m++) {
    const side = rand() < 0.5 ? 0 : 1
    let x = edgeX(side)
    const y = between(60, height - 60)
    const count = Math.round(between(3, 6))
    for (let p = 0; p < count; p++) {
      peaks.push({ x, y: y + between(-8, 8), s: between(1.2, 1.8) })
      x += (side === 0 ? 1 : -1) * between(24, 34)
    }
  }
  peaks.sort((a, b) => a.y - b.y)

  // Footpaths from some towns off into the countryside.
  const trails = towns
    .filter(() => rand() < 0.7)
    .map((town) => {
      const toSide = town.x < width / 2 ? 1 : -1
      const end = {
        x: town.x + toSide * between(0.08, 0.2) * width,
        y: town.y + between(-260, 260),
      }
      const mid = {
        x: (town.x + end.x) / 2 + between(-50, 50),
        y: (town.y + end.y) / 2 + between(-50, 50),
      }
      return smoothPath([town, mid, end])
    })

  return {
    width,
    height,
    road: smoothPath(roadPoints),
    river: smoothPath(riverPoints),
    trails,
    towns,
    trees,
    peaks,
  }
}

let observer: ResizeObserver | null = null
let lastSize = ''

function redraw() {
  const stage = layerRef.value?.parentElement
  if (!stage) return
  const width = Math.round(stage.clientWidth)
  const height = Math.round(stage.scrollHeight)
  const size = `${width}x${height}`
  if (!width || !height || size === lastSize) return
  lastSize = size
  map.value = generate(width, height)
}

onMounted(() => {
  redraw()
  const stage = layerRef.value?.parentElement
  if (stage) {
    observer = new ResizeObserver(redraw)
    observer.observe(stage)
  }
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
/*
  z-index 1 puts the map above the section backgrounds (paper) but, because it comes first in
  the DOM, below each section's content container (also z-index 1).
*/
.map-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  mix-blend-mode: multiply;
  opacity: 0.55;
}

.town-ring {
  fill: none;
  stroke: var(--ink);
  stroke-width: 0.8;
  stroke-dasharray: 1 3;
}

.map {
  display: block;
  --ink: #5b4128;
  --paper: #efe1c0;
  --leaf: #5d6a3a;
  --leaf-light: #8c9058;
  --water: #3f6273;
}

.ink-line {
  fill: none;
  stroke: var(--ink);
  stroke-width: 1.1;
  stroke-linecap: round;
}

.ink-line.thin {
  stroke-width: 0.7;
}

.tree-fill {
  fill: var(--leaf);
  stroke: var(--ink);
  stroke-width: 0.8;
}

.tree-fill.light {
  fill: var(--leaf-light);
}

.paper-fill {
  fill: var(--paper);
  stroke: var(--ink);
  stroke-width: 1.1;
  stroke-linejoin: round;
}

/* Double-line road: a dark edge with a paper-coloured core */
.road-edge {
  fill: none;
  stroke: var(--ink);
  stroke-width: 6;
  stroke-linecap: round;
}

.road-core {
  fill: none;
  stroke: var(--paper);
  stroke-width: 3.2;
  stroke-linecap: round;
}

.trail {
  fill: none;
  stroke: var(--ink);
  stroke-width: 1.4;
  stroke-dasharray: 2 6;
  stroke-linecap: round;
}

.river {
  fill: none;
  stroke: var(--water);
  stroke-width: 3;
  stroke-linecap: round;
  opacity: 0.8;
}

.town-label {
  fill: var(--ink);
  font-family: var(--font-display);
  font-size: 18px;
  font-style: italic;
  text-anchor: middle;
  paint-order: stroke;
  stroke: var(--paper);
  stroke-width: 3px;
  stroke-linejoin: round;
}
</style>
