<template>
  <div
    id="app"
    :class="{ 'is-glitching': glitching }"
    :data-theme="activeSection"
  >
    <AppNavbar :active-section="activeSection" @navigate="navigate" />

    <div class="page-stage" :class="{ 'is-scroll-glitch': scrollFlicker }">
      <NetBackground />
      <AmbientGlitch :burst="scrollFlicker" />
      <div class="scanlines" aria-hidden="true"></div>
      <div class="grain" aria-hidden="true"></div>

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

    <GlitchTransition :active="glitching" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, provide, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AmbientGlitch from '@/components/AmbientGlitch.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import GlitchTransition from '@/components/GlitchTransition.vue'
import NetBackground from '@/components/NetBackground.vue'
import HomeView from '@/views/HomeView.vue'
import ExperienceView from '@/views/ExperienceView.vue'
import SkillsView from '@/views/SkillsView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'

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
const activeSection = ref<SectionId>('home')
const glitching = ref(false)
const scrollFlicker = ref(false)

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
  if (lockSpy || glitching.value || prefersReducedMotion()) return

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

  lockSpy = true
  activeSection.value = id

  if (route.path !== path) {
    void router.push(path)
  }

  if (!reduceMotion) {
    glitching.value = false
    await nextTick()
    glitching.value = true
    await new Promise((resolve) => window.setTimeout(resolve, 90))
  }

  scrollToSection(id, reduceMotion ? 'auto' : 'smooth')

  if (unlockTimer !== null) window.clearTimeout(unlockTimer)
  unlockTimer = window.setTimeout(
    () => {
      glitching.value = false
      lockSpy = false
    },
    reduceMotion ? 200 : 640,
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
  scroll-snap-type: y proximity;
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
  font-family: 'Rajdhani', sans-serif;
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
    filter: contrast(1.12) saturate(1.15);
  }
  55% {
    transform: translateX(2px);
  }
  75% {
    transform: translateX(-2px);
  }
  100% {
    filter: none;
    transform: none;
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

@media (max-width: 768px) {
  .section-dots {
    right: 0.65rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
    scroll-snap-type: none;
  }

  .scanlines,
  .grain,
  .page-stage.is-scroll-glitch {
    animation: none;
  }
}
</style>
