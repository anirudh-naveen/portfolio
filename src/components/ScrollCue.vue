<template>
  <a
    :href="href"
    class="scroll-cue"
    :class="direction"
    :aria-label="direction === 'up' ? 'Scroll to previous section' : 'Scroll to next section'"
    @click.prevent="navigateTo?.(to)"
  >
    <span></span>
  </a>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'

const props = withDefaults(
  defineProps<{
    to: string
    direction?: 'up' | 'down'
  }>(),
  { direction: 'down' },
)

const navigateTo = inject<(path: string) => void>('navigateTo')
const href = computed(() => `#${props.to.replace(/^\//, '') || 'home'}`)
</script>

<style scoped>
.scroll-cue {
  position: absolute;
  bottom: 1.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 22px;
  height: 38px;
  border: 1px solid var(--accent);
  clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
  display: flex;
  justify-content: center;
  padding-top: 8px;
  box-sizing: border-box;
}

.scroll-cue.up {
  position: relative;
  top: auto;
  bottom: auto;
  left: auto;
  transform: none;
  margin: 0 auto 1.15rem;
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

@keyframes cue-down {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(14px);
  }
}

@keyframes cue-up {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-14px);
  }
}
</style>
