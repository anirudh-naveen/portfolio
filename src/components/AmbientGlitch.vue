<template>
  <div class="ambient" :class="{ burst }" aria-hidden="true">
    <div class="ambient-noise"></div>
    <div class="ambient-rgb"></div>
    <div
      v-for="slice in slices"
      :key="slice.id"
      class="ambient-slice"
      :style="{
        top: slice.top + '%',
        height: slice.height + 'px',
        opacity: slice.opacity,
        animationDuration: slice.duration + 'ms',
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  burst: boolean
}>()

interface Slice {
  id: number
  top: number
  height: number
  opacity: number
  duration: number
}

const slices = ref<Slice[]>([])
let nextId = 0
let loopTimer = 0

function spawn(count = 1, stronger = false) {
  const born = Array.from({ length: count }, () => {
    nextId += 1
    return {
      id: nextId,
      top: Math.random() * 92,
      height: stronger ? 3 + Math.random() * 10 : 1 + Math.random() * 4,
      opacity: stronger ? 0.32 + Math.random() * 0.2 : 0.1 + Math.random() * 0.16,
      duration: stronger ? 140 + Math.random() * 70 : 90 + Math.random() * 80,
    }
  })

  slices.value = [...slices.value, ...born]
  window.setTimeout(() => {
    const ids = new Set(born.map((slice) => slice.id))
    slices.value = slices.value.filter((slice) => !ids.has(slice.id))
  }, 240)
}

function schedule() {
  const wait = 2200 + Math.random() * 4200
  loopTimer = window.setTimeout(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      spawn(Math.random() > 0.7 ? 2 : 1)
    }
    schedule()
  }, wait)
}

watch(
  () => props.burst,
  (isBurst) => {
    if (isBurst) spawn(3, true)
  },
)

onMounted(schedule)
onUnmounted(() => window.clearTimeout(loopTimer))
</script>

<style scoped>
.ambient {
  position: fixed;
  inset: 0;
  z-index: 7;
  pointer-events: none;
  overflow: hidden;
}

.ambient-noise {
  position: absolute;
  inset: 0;
  opacity: 0.045;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: noiseShift 0.32s steps(2, end) infinite;
}

.ambient-rgb {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  mix-blend-mode: screen;
  background: linear-gradient(
    90deg,
    rgba(94, 200, 255, 0.18),
    transparent 42%,
    rgba(255, 59, 78, 0.12)
  );
  animation: rgbDrift 5.5s steps(4, end) infinite;
}

.ambient.burst .ambient-noise {
  opacity: 0.1;
}

.ambient.burst .ambient-rgb {
  opacity: 0.1;
}

.ambient-slice {
  position: absolute;
  left: -6%;
  width: 112%;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, var(--accent) 80%, white) 18%,
    transparent 78%
  );
  mix-blend-mode: screen;
  animation: sliceRip steps(2, end);
}

@keyframes noiseShift {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-1.5%, 1%);
  }
}

@keyframes rgbDrift {
  0%,
  84%,
  100% {
    transform: none;
    opacity: 0.035;
  }
  86% {
    transform: translateX(-6px);
    opacity: 0.08;
  }
  90% {
    transform: translateX(5px);
    opacity: 0.05;
  }
}

@keyframes sliceRip {
  from {
    transform: translateX(-5%);
  }
  to {
    transform: translateX(5%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ambient {
    display: none;
  }
}
</style>
