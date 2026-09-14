<template>
  <div class="glitch-overlay" :class="{ active }" aria-hidden="true">
    <canvas ref="canvasRef" class="static-canvas"></canvas>
    <div class="tear tear-a"></div>
    <div class="tear tear-b"></div>
    <div class="tear tear-c"></div>
    <div class="rgb rgb-cyan"></div>
    <div class="rgb rgb-violet"></div>
    <pre class="burst-code">{{ burst }}</pre>
    <p class="sync-label">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'

const props = defineProps<{
  active: boolean
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const burst = ref('')
const label = ref('SYNC // CHANNEL')

const dumps = [
  '0xA7 F2 19 00 C3 8E DE AD BE EF 11 4C\n>> stream.corrupt(); retry=3\npacket lost @ node-7  ttl=1',
  'SIG/INT  ::  mesh.handshake FAIL\nroute 10.0.8.21  proto neon\n0xC0FFEE >> /dev/net/tun',
  'CRC mismatch  block 0x7FF4\nre-seeding rng from /dev/urandom\nawait jack_in()  status=HOLD',
  'TRACE  /sys/ghost  200\nencrypt(payload)  AES-256-GCM\nudp://237.1.1.1:9000  open',
]

const labels = ['SYNC // CHANNEL', 'SIGNAL INTERRUPT', 'RE-ROUTING MESH', 'CRC REALIGN']

let raf = 0
let timer = 0

function paintStatic() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const { width, height } = canvas
  const image = ctx.createImageData(width, height)
  const data = image.data

  for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() * 255
    data[i] = v * 0.55
    data[i + 1] = v * 0.7
    data[i + 2] = 255
    data[i + 3] = 70 + Math.random() * 80
  }

  ctx.putImageData(image, 0, 0)
  raf = requestAnimationFrame(paintStatic)
}

function start() {
  const canvas = canvasRef.value
  if (canvas) {
    canvas.width = 180
    canvas.height = 100
  }

  burst.value = dumps[Math.floor(Math.random() * dumps.length)] ?? ''
  label.value = labels[Math.floor(Math.random() * labels.length)] ?? 'SYNC // CHANNEL'
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(paintStatic)

  window.clearInterval(timer)
  timer = window.setInterval(() => {
    burst.value = dumps[Math.floor(Math.random() * dumps.length)] ?? ''
    label.value = labels[Math.floor(Math.random() * labels.length)] ?? 'SYNC // CHANNEL'
  }, 90)
}

function stop() {
  cancelAnimationFrame(raf)
  window.clearInterval(timer)
}

watch(
  () => props.active,
  (isActive) => {
    if (isActive) start()
    else stop()
  },
)

onUnmounted(stop)
</script>

<style scoped>
.glitch-overlay {
  position: fixed;
  top: 4.75rem;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  background: rgba(7, 11, 20, 0.2);
}

.glitch-overlay.active {
  visibility: visible;
  animation: shroud 0.62s steps(3, end) forwards;
}

.static-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  mix-blend-mode: screen;
  opacity: 0.85;
}

.tear {
  position: absolute;
  left: -8%;
  width: 116%;
  height: 14px;
  mix-blend-mode: screen;
}

.tear-a {
  top: 22%;
  background: linear-gradient(90deg, transparent, var(--accent) 20%, var(--accent-2) 80%, transparent);
  animation: rip 0.18s steps(2, end) infinite;
}

.tear-b {
  top: 48%;
  height: 9px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  animation: rip 0.14s steps(2, end) infinite reverse;
}

.tear-c {
  top: 71%;
  height: 22px;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 70%, white), transparent);
  animation: rip 0.22s steps(2, end) infinite;
}

.rgb {
  position: absolute;
  inset: 0;
  mix-blend-mode: screen;
  opacity: 0.35;
}

.rgb-cyan {
  background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 25%, transparent), transparent 40%);
  transform: translateX(-10px);
}

.rgb-violet {
  background: linear-gradient(270deg, color-mix(in srgb, var(--accent-2) 28%, transparent), transparent 40%);
  transform: translateX(10px);
}

.burst-code {
  position: absolute;
  left: 8%;
  top: 28%;
  margin: 0;
  color: var(--accent);
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  font-size: clamp(0.75rem, 1.6vw, 1.05rem);
  line-height: 1.55;
  letter-spacing: 0.08em;
  text-shadow:
    2px 0 var(--accent-2),
    -2px 0 var(--accent);
  mix-blend-mode: screen;
  animation: jitter 0.12s steps(2, end) infinite;
}

.sync-label {
  position: absolute;
  right: 7%;
  bottom: 12%;
  margin: 0;
  color: var(--accent);
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  font-size: 0.85rem;
  letter-spacing: 0.28em;
  text-shadow: 0 0 12px var(--glow);
}

@keyframes shroud {
  0% {
    opacity: 0;
    clip-path: inset(40% 0 40% 0);
  }
  8% {
    opacity: 1;
    clip-path: inset(0 0 0 0);
  }
  22% {
    transform: translateX(-14px);
  }
  36% {
    transform: translateX(10px);
  }
  52% {
    transform: none;
    opacity: 1;
  }
  78% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    clip-path: inset(48% 0 48% 0);
  }
}

@keyframes rip {
  from {
    transform: translateX(-6%);
  }
  to {
    transform: translateX(6%);
  }
}

@keyframes jitter {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(3px, -1px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .glitch-overlay.active {
    animation: none;
    opacity: 0;
    visibility: hidden;
  }
}
</style>
