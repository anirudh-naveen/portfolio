<template>
  <a
    :href="href"
    class="scroll-cue"
    :class="[direction, { modern: !isCyber, vintage: isVintage }]"
    :aria-label="direction === 'up' ? 'Scroll to previous section' : 'Scroll to next section'"
    @click.prevent="navigateTo?.(to)"
  >
    <svg v-if="isVintage" class="cue-shape" viewBox="0 0 32 34" aria-hidden="true">
      <polygon :points="direction === 'up' ? '16,2 30,32 2,32' : '2,2 30,2 16,32'" />
    </svg>
    <span></span>
  </a>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useTheme } from '@/composables/useTheme'

const props = withDefaults(
  defineProps<{
    to: string
    direction?: 'up' | 'down'
  }>(),
  { direction: 'down' },
)

const { isCyber, isVintage } = useTheme()
const navigateTo = inject<(path: string) => void>('navigateTo')
const href = computed(() => `#${props.to.replace(/^\//, '') || 'home'}`)
</script>

<style scoped>
.scroll-cue {
  position: absolute;
  bottom: 0.45rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 22px;
  height: 38px;
  border: 1px solid var(--accent);
  background: var(--bg-void);
  clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
  display: flex;
  justify-content: center;
  padding-top: 8px;
  box-sizing: border-box;
}

.scroll-cue.up {
  top: 0.45rem;
  bottom: auto;
  padding-top: 0;
  padding-bottom: 8px;
  align-items: flex-end;
}

.scroll-cue span {
  width: 5px;
  height: 5px;
  background: var(--accent);
  animation: cue-down 1.6s steps(2, end) infinite;
}

.scroll-cue.up span {
  animation-name: cue-up;
}

.scroll-cue.modern {
  border: 1.5px solid var(--border-strong);
  border-radius: 999px;
  background: var(--bg-card);
  clip-path: none;
}

.scroll-cue.modern:hover {
  border-color: var(--accent);
}

.scroll-cue.modern span {
  border-radius: 50%;
  background: var(--text-dim);
  animation-timing-function: ease-in-out;
}

.scroll-cue.modern:hover span {
  background: var(--accent);
}

/* Vintage: a triangle pointing the way, like a map marker */
.scroll-cue.vintage {
  width: 32px;
  height: 34px;
  border: 0;
  border-radius: 0;
  background: transparent;
  padding-top: 7px;
}

.scroll-cue.vintage.up {
  padding-top: 0;
  padding-bottom: 7px;
}

.cue-shape {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.cue-shape polygon {
  fill: var(--bg-card);
  stroke: var(--border-strong);
  stroke-width: 1.5;
  stroke-linejoin: round;
  transition: stroke 0.2s ease;
}

.scroll-cue.vintage:hover .cue-shape polygon {
  stroke: var(--accent);
}

/* The dot travels toward the point, stopping before the triangle narrows too far */
.scroll-cue.vintage span {
  position: relative;
  --travel: 12px;
}

@keyframes cue-down {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(var(--travel, 14px));
  }
}

@keyframes cue-up {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(calc(-1 * var(--travel, 14px)));
  }
}
</style>
