<template>
  <div class="cue-frame">
    <ScrollCue v-if="upTo" direction="up" :to="upTo" />
    <ScrollCue v-if="downTo" :to="downTo" />
  </div>
</template>

<script lang="ts" setup>
import ScrollCue from '@/components/ScrollCue.vue'

defineProps<{
  upTo?: string
  downTo?: string
}>()
</script>

<style scoped>
.cue-frame {
  position: absolute;
  inset: 4.8rem 1rem 1.2rem;
  pointer-events: none;
  z-index: 4;
}

.cue-frame :deep(.scroll-cue) {
  pointer-events: auto;
}
</style>
