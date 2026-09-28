<template>
  <div
    id="app"
    :class="{ 'is-glitching': glitching }"
    :data-theme="activeSection"
  >
    <AppNavbar :active-section="activeSection" @navigate="navigate" />

    <div class="page-stage" :class="{ 'is-scroll-glitch': scrollFlicker }">
      <template v-if="isCyber">
        <NetBackground />
        <AmbientGlitch :burst="scrollFlicker" />
        <div class="scanlines" aria-hidden="true"></div>
        <div class="grain" aria-hidden="true"></div>
      </template>
      <template v-else-if="isVintage">
        <VintageMap />
        <div class="paper-wear" aria-hidden="true"></div>
      </template>

      <HomeView />
      <ExperienceView />
      <ProjectsView />
      <SkillsView />
      <ContactView />
    </div>

    <nav class="section-dots" aria-label="Page sections">
      <button
        v-for="section in sections"
        :key="section.id"
        type="button"
        class="section-dot"
        :class="{ active: activeSection === section.id }"
        :aria-label="section.label"
        :aria-current="activeSection === section.id ? 'true' : undefined"
        @click="navigate(section.path)"
      />
    </nav>

    <GlitchTransition v-if="isCyber" :active="glitching" />
    <CloudTransition v-else-if="isVintage" :active="clouding" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AmbientGlitch from '@/components/AmbientGlitch.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import CloudTransition from '@/components/CloudTransition.vue'
import GlitchTransition from '@/components/GlitchTransition.vue'
import NetBackground from '@/components/NetBackground.vue'
import VintageMap from '@/components/VintageMap.vue'
import HomeView from '@/views/HomeView.vue'
import ExperienceView from '@/views/ExperienceView.vue'
import SkillsView from '@/views/SkillsView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'
import { useTheme } from '@/composables/useTheme'

type SectionId = 'home' | 'experience' | 'skills' | 'projects' | 'contact'

const sections = [
  { id: 'home', path: '/', label: 'Bio' },
  { id: 'experience', path: '/experience', label: 'Experience' },
  { id: 'projects', path: '/projects', label: 'Projects' },
  { id: 'skills', path: '/skills', label: 'Skills' },
  { id: 'contact', path: '/contact', label: 'Contact' },
] as const

const router = useRouter()
const route = useRoute()
const { isCyber, isVintage } = useTheme()
const activeSection = ref<SectionId>('home')
const glitching = ref(false)
const clouding = ref(false)
const scrollFlicker = ref(false)

// Vintage: clouds fully cover the page at ~32% of CloudTransition's 950ms run
// (plus up to 90ms of puff stagger), so jump just after that and unmount once all have faded.
const CLOUD_COVER_MS = 340
const CLOUD_TOTAL_MS = 1080

const spyIds = ['home', 'experience', 'projects', 'skills', 'contact'] as const

let lockSpy = false
let unlockTimer: number | null = null
let ticking = false
let lastY = 0
let lastFlicker = 0
let flickerTimer: number | null = null

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function sectionFromPath(path: string): SectionId {
  if (path === '/experience') return 'experience'
  if (path === '/skills') return 'skills'
  if (path === '/projects') return 'projects'
  if (path === '/contact') return 'contact'
  return 'home'
}

function navIdFromElement(id: string): SectionId {
  if (id === 'experience' || id === 'skills' || id === 'projects' || id === 'contact') return id
  return 'home'
}

function scrollToSection(id: SectionId, behavior: ScrollBehavior = 'smooth') {
  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
}

function updateActiveFromScroll() {
  if (lockSpy) return

  const marker = 120
  let current: SectionId = 'home'

  for (const id of spyIds) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= marker) {
      current = navIdFromElement(id)
    }
  }

  if (activeSection.value === current) return

  activeSection.value = current
  const path = sections.find((section) => section.id === current)?.path
  if (path && route.path !== path) {
    void router.replace(path)
  }
}

function pulseScrollGlitch() {
  if (!isCyber.value || lockSpy || glitching.value || prefersReducedMotion()) return

  const now = performance.now()
  if (now - lastFlicker < 420) return
  lastFlicker = now

  scrollFlicker.value = false
  requestAnimationFrame(() => {
    scrollFlicker.value = true
    if (flickerTimer !== null) window.clearTimeout(flickerTimer)
    flickerTimer = window.setTimeout(() => {
      scrollFlicker.value = false
    }, 170)
  })
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    updateActiveFromScroll()
    const y = window.scrollY
    if (Math.abs(y - lastY) > 10) pulseScrollGlitch()
    lastY = y
    ticking = false
  })
}

async function navigate(path: string) {
  const id = sectionFromPath(path)
  const reduceMotion = prefersReducedMotion()
  const glitch = isCyber.value && !reduceMotion
  const cloud = isVintage.value && !reduceMotion

  lockSpy = true
  activeSection.value = id

  if (route.path !== path) {
    void router.push(path)
  }

  if (glitch) {
    glitching.value = false
    await nextTick()
    glitching.value = true
    await new Promise((resolve) => window.setTimeout(resolve, 90))
  } else if (cloud) {
    clouding.value = false
    await nextTick()
    clouding.value = true
    // Time the cover from the clouds' first painted frame, not from the click.
    // (The timeout guards against hidden tabs, where animation frames never fire.)
    await nextTick()
    await new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve))
      window.setTimeout(resolve, 150)
    })
    await new Promise((resolve) => window.setTimeout(resolve, CLOUD_COVER_MS))
  }

  // Behind the clouds the page jumps; the next section is revealed as they blow away.
  scrollToSection(id, reduceMotion ? 'auto' : cloud ? 'instant' : 'smooth')

  if (unlockTimer !== null) window.clearTimeout(unlockTimer)
  unlockTimer = window.setTimeout(
    () => {
      glitching.value = false
      clouding.value = false
      lockSpy = false
    },
    reduceMotion ? 200 : cloud ? CLOUD_TOTAL_MS - CLOUD_COVER_MS : 640,
  )
}

provide('navigateTo', navigate)

onMounted(() => {
  const initial = sectionFromPath(route.path)
  activeSection.value = initial
  lastY = window.scrollY
  if (initial !== 'home') {
    requestAnimationFrame(() => scrollToSection(initial, 'auto'))
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  updateActiveFromScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (unlockTimer !== null) window.clearTimeout(unlockTimer)
  if (flickerTimer !== null) window.clearTimeout(flickerTimer)
})
</script>

<style>
html {
  scroll-behavior: smooth;
}

html,
body {
  margin: 0;
}

#app {
  position: relative;
  margin: 0;
}

:root {
  --bg-void: #070b14;
  --bg-deep: #0a1220;
  --bg-mid: #102033;
  --bg-card: #10182a;
  --bg-card-2: #0a1220;
  --accent: #d4ff3f;
  --accent-2: #5eead4;
  --text: #e7f0dc;
  --text-muted: #93a39a;
  --text-dim: #6d7c78;
  --border: #1d3344;
  --glow: rgba(212, 255, 63, 0.4);
  --font-body: 'Rajdhani', sans-serif;
  --font-mono: 'Share Tech Mono', monospace;
}

html.theme-modern {
  color-scheme: light;
  --bg-void: #ffffff;
  --bg-deep: #f7f7f8;
  --bg-card: #ffffff;
  --text: #111827;
  --text-muted: #4b5563;
  --text-dim: #9ca3af;
  --border: #e5e7eb;
  --border-strong: #d1d5db;
  --surface-hover: #f3f4f6;
  --brand: #4f46e5;
  --on-brand: #ffffff;
  --like: #e11d48;
  --accent: var(--brand);
  --accent-2: var(--text-muted);
  --glow: transparent;
  --shadow-sm: 0 1px 2px rgb(16 24 40 / 0.05);
  --shadow: 0 1px 3px rgb(16 24 40 / 0.06), 0 12px 32px -16px rgb(16 24 40 / 0.18);
  --font-body: 'Inter Variable', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: var(--font-body);
}

@media (prefers-color-scheme: dark) {
  html.theme-modern {
    color-scheme: dark;
    --bg-void: #0b0c0f;
    --bg-deep: #111317;
    --bg-card: #16181d;
    --text: #ecedf0;
    --text-muted: #a1a7b3;
    --text-dim: #6b7280;
    --border: #262932;
    --border-strong: #353945;
    --surface-hover: #1d2027;
    --brand: #818cf8;
    --on-brand: #0b0c0f;
    --like: #fb7185;
    --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.4);
    --shadow: 0 1px 3px rgb(0 0 0 / 0.4), 0 12px 32px -16px rgb(0 0 0 / 0.6);
  }
}

/* Vintage: sepia ink on sun-faded map paper. Reuses the modern layout and swaps the palette. */
html.theme-vintage {
  color-scheme: light;
  --bg-void: #ecdcb8;
  --bg-deep: #e3cea2;
  --bg-card: #f5ead0;
  --text: #3a2717;
  --text-muted: #6a4f33;
  --text-dim: #8f7555;
  --border: #c6ab7c;
  --border-strong: #a2865a;
  --surface-hover: #e8d6ae;
  --brand: #8e3b1f;
  --ink-blue: #2f4a5a;
  --on-brand: #f8efd8;
  --like: #9b1c1c;
  --tape: rgb(236 224 186 / 0.72);
  --accent: var(--brand);
  --accent-2: var(--text-muted);
  --glow: transparent;
  --shadow-sm: 1px 2px 4px rgb(62 39 17 / 0.2);
  --shadow: 2px 6px 14px -4px rgb(62 39 17 / 0.38);
  --font-body: 'EB Garamond Variable', Georgia, 'Times New Roman', serif;
  --font-mono: var(--font-body);
  --font-display: 'IM Fell English', Georgia, serif;
  --font-hand: 'Caveat Variable', 'Bradley Hand', cursive;

  /* Page texture: map folds, faint longitude/latitude lines, coffee ring, damp stains, darkened edges. */
  --paper-a:
    linear-gradient(
      90deg,
      transparent calc(50% - 1px),
      rgb(80 50 20 / 0.13) 50%,
      rgb(255 250 235 / 0.35) calc(50% + 1px),
      transparent calc(50% + 3px)
    ),
    linear-gradient(
      180deg,
      transparent calc(50% - 1px),
      rgb(80 50 20 / 0.1) 50%,
      rgb(255 250 235 / 0.3) calc(50% + 1px),
      transparent calc(50% + 3px)
    ),
    radial-gradient(
      circle at 86% 22%,
      transparent 0 54px,
      rgb(120 72 28 / 0.14) 56px,
      rgb(120 72 28 / 0.05) 62px,
      transparent 66px
    ),
    radial-gradient(ellipse 38% 30% at 8% 88%, rgb(139 90 43 / 0.2), transparent 70%),
    radial-gradient(ellipse 30% 22% at 94% 70%, rgb(110 70 30 / 0.12), transparent 70%),
    repeating-linear-gradient(0deg, rgb(92 60 28 / 0.06) 0 1px, transparent 1px 110px),
    repeating-linear-gradient(90deg, rgb(92 60 28 / 0.06) 0 1px, transparent 1px 110px),
    radial-gradient(ellipse at center, transparent 45%, rgb(95 58 22 / 0.26) 100%);
  --paper-b:
    linear-gradient(
      90deg,
      transparent calc(50% - 1px),
      rgb(80 50 20 / 0.13) 50%,
      rgb(255 250 235 / 0.35) calc(50% + 1px),
      transparent calc(50% + 3px)
    ),
    radial-gradient(
      circle at 10% 16%,
      transparent 0 44px,
      rgb(120 72 28 / 0.12) 46px,
      rgb(120 72 28 / 0.04) 52px,
      transparent 56px
    ),
    radial-gradient(ellipse 34% 26% at 92% 12%, rgb(139 90 43 / 0.17), transparent 70%),
    radial-gradient(ellipse 26% 20% at 18% 96%, rgb(110 70 30 / 0.14), transparent 70%),
    repeating-linear-gradient(0deg, rgb(92 60 28 / 0.06) 0 1px, transparent 1px 110px),
    repeating-linear-gradient(90deg, rgb(92 60 28 / 0.06) 0 1px, transparent 1px 110px),
    radial-gradient(ellipse at center, transparent 45%, rgb(95 58 22 / 0.26) 100%);
}

html.theme-modern #app[data-theme],
html.theme-vintage #app[data-theme] {
  --accent: var(--brand);
  --glow: transparent;
}

#app[data-theme='home'] {
  --accent: #d4ff3f;
  --glow: rgba(212, 255, 63, 0.42);
}

#app[data-theme='experience'] {
  --accent: #ffb12a;
  --glow: rgba(255, 177, 42, 0.42);
}

#app[data-theme='skills'] {
  --accent: #ff3b4e;
  --glow: rgba(255, 59, 78, 0.42);
}

#app[data-theme='projects'] {
  --accent: #5ec8ff;
  --glow: rgba(94, 200, 255, 0.42);
}

#app[data-theme='contact'] {
  --accent: #e879f9;
  --glow: rgba(232, 121, 249, 0.42);
}

body {
  background-color: var(--bg-void);
  color: var(--text);
  font-family: var(--font-body);
}

html.theme-modern body {
  -webkit-font-smoothing: antialiased;
}

html.theme-vintage body {
  font-size: 1.05rem;
}

html.theme-vintage ::selection {
  background: rgb(142 59 31 / 0.25);
}

/* Worn-paper overlay: fibre grain and scorched edges over the whole viewport. */
.paper-wear {
  position: fixed;
  inset: 0;
  z-index: 8;
  pointer-events: none;
  background:
    radial-gradient(ellipse 120% 100% at center, transparent 62%, rgb(74 42 14 / 0.3) 100%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.36 0 0 0 0 0.24 0 0 0 0 0.11 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23p)'/%3E%3C/svg%3E");
  mix-blend-mode: multiply;
  opacity: 0.55;
}

.scanlines {
  position: fixed;
  inset: 0;
  z-index: 8;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgba(7, 11, 20, 0.18) 0px,
    rgba(7, 11, 20, 0.18) 1px,
    transparent 1px,
    transparent 3px
  );
  mix-blend-mode: multiply;
  opacity: 0.4;
}

.grain {
  position: fixed;
  inset: 0;
  z-index: 9;
  pointer-events: none;
  opacity: 0.07;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

.page-stage {
  position: relative;
}

#app.is-glitching .scanlines,
.page-stage.is-scroll-glitch .scanlines {
  opacity: 0.7;
}

#app.is-glitching .grain,
.page-stage.is-scroll-glitch .grain {
  opacity: 0.14;
}

.page-stage.is-scroll-glitch {
  animation: pageTear 0.16s steps(2, end);
}

@keyframes pageTear {
  0% {
    filter: none;
  }
  40% {
    filter: contrast(1.12) saturate(1.18);
  }
  70% {
    filter: contrast(1.2) saturate(1.1) hue-rotate(-8deg);
  }
  100% {
    filter: none;
  }
}

.section-dots {
  position: fixed;
  right: 1.1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  z-index: 999;
}

.section-dot {
  width: 9px;
  height: 9px;
  padding: 0;
  border: 1px solid var(--accent);
  border-radius: 0;
  background: transparent;
  cursor: pointer;
  transform: rotate(45deg);
  transition:
    transform 0.25s ease,
    background 0.25s ease;
}

.section-dot:hover,
.section-dot.active {
  background: var(--accent);
  box-shadow: 0 0 12px var(--glow);
}

html.theme-modern .section-dot,
html.theme-vintage .section-dot {
  width: 8px;
  height: 8px;
  border: 0;
  border-radius: 50%;
  background: var(--border-strong);
  transform: none;
}

html.theme-modern .section-dot:hover,
html.theme-vintage .section-dot:hover {
  background: var(--text-dim);
  box-shadow: none;
}

html.theme-modern .section-dot.active,
html.theme-vintage .section-dot.active {
  background: var(--accent);
  box-shadow: none;
  transform: scale(1.3);
}

html.theme-vintage .section-dot {
  width: 9px;
  height: 9px;
  border: 1.5px solid var(--text-muted);
  background: transparent;
}

html.theme-vintage .section-dot.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--bg-void), 0 0 0 3px var(--accent);
}

@media (max-width: 768px) {
  .section-dots {
    right: 0.65rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .scanlines,
  .grain,
  .page-stage.is-scroll-glitch {
    animation: none;
  }
}
</style>
