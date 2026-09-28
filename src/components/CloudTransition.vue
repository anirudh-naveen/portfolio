<template>
  <div class="cloud-overlay" aria-hidden="true">
    <div v-if="active" :key="runId" class="cloud-stage">
      <div class="fog"></div>
      <div
        v-for="puff in puffs"
        :key="puff.id"
        class="puff"
        :style="{
          left: puff.x + '%',
          top: puff.y + '%',
          width: puff.size + 'vmax',
          animationDelay: puff.delay + 'ms',
          '--from': puff.from + 'vw',
          '--to': puff.to + 'vw',
        }"
      ></div>
      <svg class="winds" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
        <g
          v-for="gust in gusts"
          :key="gust.id"
          :transform="`translate(${gust.x} ${gust.y}) scale(${gust.scale})`"
        >
          <path
            class="gust"
            :d="GUST_PATH"
            pathLength="1"
            :style="{ animationDelay: gust.delay + 'ms' }"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  active: boolean
}>()

interface Puff {
  id: number
  x: number
  y: number
  size: number
  delay: number
  from: number
  to: number
}

interface Gust {
  id: number
  x: number
  y: number
  scale: number
  delay: number
}

// A streak of wind ending in a curl, as drawn on old maps.
const GUST_PATH =
  'M0 20 C 90 0, 180 40, 280 20 S 430 0, 480 22 C 520 40, 505 72, 478 64 C 455 57, 462 34, 486 40'

const runId = ref(0)
const puffs = ref<Puff[]>([])
const gusts = ref<Gust[]>([])

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function build() {
  runId.value += 1
  puffs.value = Array.from({ length: 16 }, (_, id) => ({
    id,
    x: rand(-15, 90),
    y: rand(-15, 88),
    size: rand(26, 48),
    delay: rand(0, 90),
    from: -rand(20, 45),
    to: rand(35, 70),
  }))
  gusts.value = Array.from({ length: 8 }, (_, id) => ({
    id,
    x: rand(-120, 620),
    y: rand(30, 540),
    scale: rand(0.55, 1.1),
    delay: rand(20, 260),
  }))
}

watch(
  () => props.active,
  (isActive) => {
    if (isActive) build()
  },
)
</script>

<style scoped>
.cloud-overlay {
  position: fixed;
  inset: 0;
  /* Under the paper-wear layer so the clouds pick up the same grain as the page */
  z-index: 7;
  pointer-events: none;
  overflow: hidden;
}

.cloud-stage {
  position: absolute;
  inset: 0;
}

/* Near-opaque mist at the peak hides the jump to the next section */
.fog {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, #f6edd6 0%, #eee0bf 60%, #dcc699 100%);
  opacity: 0;
  animation: fog 0.95s ease-in-out forwards;
}

.puff {
  position: absolute;
  aspect-ratio: 1.6;
  border-radius: 50%;
  background:
    radial-gradient(
      closest-side,
      #fcf7e9 0%,
      rgb(248 240 219 / 0.96) 42%,
      rgb(238 224 190 / 0.65) 68%,
      transparent 100%
    ),
    radial-gradient(closest-side at 50% 64%, rgb(120 84 44 / 0.22), transparent 85%);
  opacity: 0;
  transform: translate(-50%, -50%);
  animation: billow 0.95s cubic-bezier(0.3, 0.6, 0.4, 1) both;
}

.winds {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.gust {
  fill: none;
  stroke: #6a4f33;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-dasharray: 0.55 1;
  stroke-dashoffset: 1;
  opacity: 0;
  animation: gust 0.55s cubic-bezier(0.4, 0, 0.6, 1) forwards;
}

@keyframes fog {
  0% {
    opacity: 0;
  }
  32%,
  56% {
    opacity: 0.97;
  }
  100% {
    opacity: 0;
  }
}

@keyframes billow {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) translateX(var(--from)) scale(0.55);
  }
  32% {
    opacity: 1;
    transform: translate(-50%, -50%) translateX(0) scale(1);
  }
  56% {
    opacity: 1;
    transform: translate(-50%, -50%) translateX(4vw) scale(1.05);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translateX(var(--to)) scale(1.18);
  }
}

@keyframes gust {
  0% {
    opacity: 0;
    stroke-dashoffset: 1;
    transform: translateX(-60px);
  }
  20% {
    opacity: 0.75;
  }
  75% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    stroke-dashoffset: -0.6;
    transform: translateX(160px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cloud-overlay {
    display: none;
  }
}
</style>
