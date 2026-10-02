<template>
  <Transition name="warp" @before-enter="depart">
    <div
      v-if="warping"
      class="time-warp"
      :class="[direction, `to-${warpTo}`]"
      :style="{
        '--cover': WARP_COVER_MS + 'ms',
        '--reveal': WARP_REVEAL_MS + 'ms',
        fontFamily: ERAS[warpFrom].font,
      }"
      role="status"
      aria-live="polite"
    >
      <div class="streaks" aria-hidden="true">
        <span
          v-for="streak in streaks"
          :key="streak.id"
          :style="{
            top: streak.top + '%',
            width: streak.width + 'vw',
            height: streak.height + 'px',
            animationDuration: streak.duration + 'ms',
            animationDelay: -streak.delay + 'ms',
            opacity: streak.opacity,
          }"
        ></span>
      </div>
      <div class="vignette" aria-hidden="true"></div>

      <div class="console">
        <p class="heading" :class="{ loading: !warpLoaded }">
          {{ direction === 'past' ? 'Travelling back in time' : 'Travelling forward in time' }}
        </p>
        <!-- The year in both eras' fonts, morphing from one into the other as it rolls -->
        <p class="year" aria-hidden="true">
          <span class="face" :style="faceStyle(fontFrom, 1 - morph)">{{ year }}</span>
          <span class="face" :style="faceStyle(fontTo, morph)">{{ year }}</span>
        </p>
        <p class="sr-only">Switching to the {{ ERAS[warpTo].name }} theme</p>

        <div class="timeline" aria-hidden="true">
          <div class="track">
            <div class="travelled" :style="travelledStyle"></div>
            <div class="marker" :style="{ left: position * 100 + '%' }"></div>
          </div>
          <ol class="eras">
            <li
              v-for="option in THEMES"
              :key="option"
              :class="{ destination: option === warpTo }"
              :style="{ left: (THEMES.indexOf(option) / (THEMES.length - 1)) * 100 + '%' }"
            >
              <span class="era-year">{{ ERAS[option].year }}</span>
              <span class="era-name">{{ ERAS[option].name }}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  THEMES,
  WARP_COVER_MS,
  WARP_REVEAL_MS,
  WARP_ROLL_MS,
  useTheme,
  type SiteTheme,
} from '@/composables/useTheme'

const { warping, warpFrom, warpTo, warpLoaded } = useTheme()

// Each theme is an era; the trip rolls the year between them in that era's typeface.
// Fonts are set here rather than read from the theme, which swaps mid-trip underneath.
const ERAS: Record<SiteTheme, { year: number; name: string; font: string; weight: number }> = {
  vintage: { year: 1925, name: 'Vintage', font: "'IM Fell English', Georgia, serif", weight: 400 },
  modern: {
    year: new Date().getFullYear(),
    name: 'Modern',
    font: "'Inter Variable', system-ui, sans-serif",
    weight: 700,
  },
  cyberpunk: { year: 2077, name: 'Cyberpunk', font: "'Rajdhani', sans-serif", weight: 700 },
}

const indexOf = (t: SiteTheme) => THEMES.indexOf(t) / (THEMES.length - 1)

const direction = computed(() =>
  THEMES.indexOf(warpTo.value) < THEMES.indexOf(warpFrom.value) ? 'past' : 'future',
)

const year = ref(ERAS[warpFrom.value].year)
const position = ref(indexOf(warpFrom.value))
const startPosition = ref(position.value)

// Morph progress from fontFrom (0) to fontTo (1).
const fontFrom = ref<SiteTheme>(warpFrom.value)
const fontTo = ref<SiteTheme>(warpFrom.value)
const morph = ref(0)

// A face fades in sharpening and widening into shape, and the other blurs away.
function faceStyle(era: SiteTheme, weight: number) {
  return {
    fontFamily: ERAS[era].font,
    fontWeight: ERAS[era].weight,
    opacity: weight,
    filter: `blur(${(1 - weight) * 10}px)`,
    transform: `scale(${0.88 + 0.12 * weight}, ${1.08 - 0.08 * weight})`,
  }
}

const travelledStyle = computed(() => {
  const from = Math.min(startPosition.value, position.value)
  const to = Math.max(startPosition.value, position.value)
  return { left: from * 100 + '%', width: (to - from) * 100 + '%' }
})

const streaks = Array.from({ length: 46 }, (_, id) => ({
  id,
  top: Math.random() * 100,
  width: 8 + Math.random() * 34,
  height: Math.random() < 0.2 ? 2 : 1,
  duration: 380 + Math.random() * 520,
  delay: Math.random() * 900,
  opacity: 0.25 + Math.random() * 0.6,
}))

let frame = 0

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

// Rolls the year and slides the marker from wherever they are now to the destination.
function rollTo(target: SiteTheme, duration: number) {
  cancelAnimationFrame(frame)
  const fromYear = year.value
  const fromPos = position.value
  const toYear = ERAS[target].year
  const toPos = indexOf(target)
  const start = performance.now()
  // Rolls never overlap, so the face on show is whichever the last roll ended on.
  fontFrom.value = morph.value >= 0.5 ? fontTo.value : fontFrom.value
  fontTo.value = target
  morph.value = 0

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const k = ease(t)
    year.value = Math.round(fromYear + (toYear - fromYear) * k)
    position.value = fromPos + (toPos - fromPos) * k
    // The shapes melt across the middle of the trip, settling before the year does.
    morph.value = Math.min(1, Math.max(0, (k - 0.15) / 0.6))
    if (t < 1) frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
}

// Holds at the departure year while the new theme loads underneath.
function depart() {
  cancelAnimationFrame(frame)
  year.value = ERAS[warpFrom.value].year
  position.value = indexOf(warpFrom.value)
  startPosition.value = position.value
  fontFrom.value = warpFrom.value
  fontTo.value = warpFrom.value
  morph.value = 0
}

// Roll only once the new theme is ready, so the re-render can't stutter it. A theme picked
// mid-trip loads first, then the roll heads there from the current year.
watch(warpLoaded, (loaded) => {
  if (loaded && warping.value) rollTo(warpTo.value, WARP_ROLL_MS)
})
</script>

<style scoped>
.time-warp {
  --ink: #f4ead8;
  --glow: #ffd27a;
  --bg-a: #120d22;
  --bg-b: #04030a;
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: radial-gradient(ellipse at 50% 50%, var(--bg-a) 0%, var(--bg-b) 75%);
  color: var(--ink);
  cursor: progress;
  contain: layout paint;
}

/* Destination eras tint the trip */
.time-warp.to-vintage {
  --ink: #f3e3bf;
  --glow: #e0a85a;
  --bg-a: #2b1c0e;
  --bg-b: #0b0703;
}

.time-warp.to-modern {
  --ink: #eef0ff;
  --glow: #a5b4fc;
  --bg-a: #1a1840;
  --bg-b: #05050d;
}

.time-warp.to-cyberpunk {
  --ink: #e9ffd0;
  --glow: #d4ff3f;
  --bg-a: #0f2130;
  --bg-b: #03060b;
}

.warp-enter-active {
  transition: opacity var(--cover) ease-out;
}

.warp-leave-active {
  transition: opacity var(--reveal) ease-in;
}

.warp-enter-from,
.warp-leave-to {
  opacity: 0;
}

/* Light streaking past: rightwards into the future, leftwards into the past */
.streaks {
  position: absolute;
  inset: 0;
  contain: strict;
}

.streaks span {
  position: absolute;
  left: 0;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, var(--glow));
  /* Transform-only motion stays on the compositor, smooth even while the page re-renders */
  will-change: transform;
  animation-name: streak-future;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.past .streaks span {
  background: linear-gradient(270deg, transparent, var(--glow));
  animation-name: streak-past;
}

.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 50%,
    color-mix(in srgb, var(--bg-b) 85%, transparent) 0%,
    transparent 38%,
    transparent 70%,
    var(--bg-b) 100%
  );
}

.console {
  position: relative;
  width: min(560px, calc(100vw - 32px));
  text-align: center;
}

.heading {
  margin: 0 0 0.4rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--ink) 70%, transparent);
}

.heading.loading {
  animation: heading-pulse 0.9s ease-in-out infinite alternate;
}

@keyframes heading-pulse {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.45;
  }
}

.year {
  display: grid;
  justify-items: center;
  margin: 0 0 2.2rem;
  font-size: clamp(4.5rem, 16vw, 8.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  text-shadow:
    0 0 24px color-mix(in srgb, var(--glow) 55%, transparent),
    0 0 2px var(--glow);
}

/* Both faces share one cell, so they overlap exactly while morphing */
.face {
  grid-area: 1 / 1;
  will-change: opacity, filter, transform;
}

.future .year {
  text-shadow:
    -14px 0 18px color-mix(in srgb, var(--glow) 35%, transparent),
    0 0 24px color-mix(in srgb, var(--glow) 55%, transparent);
}

.past .year {
  text-shadow:
    14px 0 18px color-mix(in srgb, var(--glow) 35%, transparent),
    0 0 24px color-mix(in srgb, var(--glow) 55%, transparent);
}

/* Timeline doubling as the loading bar */
.timeline {
  position: relative;
  margin: 0 1.5rem;
  padding-bottom: 2.6rem;
}

.track {
  position: relative;
  height: 2px;
  background: color-mix(in srgb, var(--ink) 22%, transparent);
}

.travelled {
  position: absolute;
  top: 0;
  bottom: 0;
  background: var(--glow);
  box-shadow: 0 0 10px var(--glow);
}

.marker {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--ink);
  box-shadow:
    0 0 0 3px color-mix(in srgb, var(--glow) 45%, transparent),
    0 0 18px var(--glow);
  transform: translate(-50%, -50%);
}

.eras {
  margin: 0;
  padding: 0;
  list-style: none;
}

.eras li {
  position: absolute;
  top: -5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  transform: translateX(-50%);
  color: color-mix(in srgb, var(--ink) 50%, transparent);
  transition: color 0.3s ease;
}

.eras li::before {
  content: '';
  width: 2px;
  height: 12px;
  margin-bottom: 0.45rem;
  background: currentColor;
}

.eras li.destination {
  color: var(--ink);
}

.era-year {
  font-size: 0.8rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.era-name {
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@keyframes streak-future {
  from {
    transform: translateX(-45vw);
  }
  to {
    transform: translateX(110vw);
  }
}

@keyframes streak-past {
  from {
    transform: translateX(110vw);
  }
  to {
    transform: translateX(-45vw);
  }
}
</style>
