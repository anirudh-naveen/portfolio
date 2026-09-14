<template>
  <div class="net-layer" aria-hidden="true">
    <div class="net-grid"></div>
    <p
      v-for="snippet in snippets"
      :key="snippet.id"
      class="net-snippet"
      :style="{
        left: snippet.x + '%',
        top: snippet.y + '%',
        fontSize: snippet.size + 'px',
        transform: `rotate(${snippet.rotate}deg)`,
        animationDelay: snippet.delay + 's',
      }"
    >
      {{ snippet.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Snippet {
  id: number
  text: string
  x: number
  y: number
  rotate: number
  size: number
  delay: number
}

const fragments = [
  '7A 7A E9 E9 BD BD',
  '1C 1C 7A 1C 55 7A',
  'BD E9 1C 1C E9 7A',
  '0x7FF4A21C >> 3',
  'BUFFER // ICEPICK',
  'SEQ 1C 1C UPLOAD',
  'ssh ghost@net.core',
  'CRC32 0xDEADBEEF',
  'while (signal) sync();',
  'TLS 1.3 handshake ok',
  'MOV RAX, 0xC0FFEE',
  'trace_id=9f3a-c21e',
  'udp://237.1.1.1:9000',
  'RAM COST -1 UNIT',
  'neural.net.forward()',
  'fe80::1ff:fe23',
  'hexdump -C /dev/urandom',
  'STATUS=HOLD',
  'route.add("0.0.0.0/0")',
  'BREACH PROTOCOL',
  'sysctl net.core',
  'await mesh.connect()',
  '55 E9 1C 1C 1C 7A',
  'E9 BD BD 55 1C BD',
  'fn main() { loop {} }',
  'HTTP/2 204 NO CONTENT',
  'id_rsa.pub [ed25519]',
  'kube-proxy --v=4',
  'PING 8.8.8.8 ttl=54',
  'if (breach) isolate();',
]

const snippets = ref<Snippet[]>([])

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

onMounted(() => {
  snippets.value = Array.from({ length: 96 }, (_, id) => ({
    id,
    text: fragments[id % fragments.length] ?? '',
    x: rand(1, 90),
    y: rand(1, 98),
    rotate: rand(-8, 8),
    size: rand(10, 13),
    delay: rand(0, 8),
  }))
})
</script>

<style scoped>
.net-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
  pointer-events: none;
  overflow: hidden;
  mix-blend-mode: screen;
  opacity: 0.2;
}

.net-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent) 16%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 12%, transparent) 1px, transparent 1px);
  background-size: 52px 52px;
}

.net-snippet {
  position: absolute;
  margin: 0;
  color: var(--accent);
  font-family: 'Share Tech Mono', 'Courier New', monospace;
  letter-spacing: 0.08em;
  white-space: nowrap;
  user-select: none;
  text-shadow: 0 0 8px var(--glow);
  animation: fragmentPulse 7s steps(2, end) infinite;
}

@keyframes fragmentPulse {
  0%,
  88% {
    opacity: 0.5;
    filter: none;
  }
  90% {
    opacity: 0.12;
    filter: blur(0.4px);
  }
  93% {
    opacity: 0.85;
  }
  100% {
    opacity: 0.5;
  }
}

:global(#app.is-glitching) .net-layer,
:global(#app.is-scroll-glitch) .net-layer {
  opacity: 0.42;
}

@media (prefers-reduced-motion: reduce) {
  .net-snippet {
    animation: none;
  }
}
</style>
