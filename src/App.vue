<template>
  <div id="app">
    <AppNavbar :active-section="activeSection" @navigate="navigate" />

    <HomeView />
    <SkillsView />
    <ProjectsView />
    <ContactView />

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
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import HomeView from '@/views/HomeView.vue'
import SkillsView from '@/views/SkillsView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'

type SectionId = 'home' | 'skills' | 'projects' | 'contact'

const sections = [
  { id: 'home', path: '/', label: 'Home' },
  { id: 'skills', path: '/skills', label: 'Skills' },
  { id: 'projects', path: '/projects', label: 'Projects' },
  { id: 'contact', path: '/contact', label: 'Contact' },
] as const

const router = useRouter()
const route = useRoute()
const activeSection = ref<SectionId>('home')

const spyIds = ['home', 'skills', 'projects', 'contact'] as const

let lockSpy = false
let unlockTimer: number | null = null
let ticking = false

function sectionFromPath(path: string): SectionId {
  if (path === '/skills') return 'skills'
  if (path === '/projects') return 'projects'
  if (path === '/contact') return 'contact'
  return 'home'
}

function navIdFromElement(id: string): SectionId {
  if (id === 'skills' || id === 'projects' || id === 'contact') return id
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

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    updateActiveFromScroll()
    ticking = false
  })
}

function navigate(path: string) {
  const id = sectionFromPath(path)
  lockSpy = true
  activeSection.value = id

  if (route.path !== path) {
    void router.push(path)
  }

  scrollToSection(id)

  if (unlockTimer !== null) window.clearTimeout(unlockTimer)
  unlockTimer = window.setTimeout(() => {
    lockSpy = false
  }, 900)
}

onMounted(() => {
  const initial = sectionFromPath(route.path)
  activeSection.value = initial
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
})
</script>

<style>
html {
  scroll-behavior: smooth;
  scroll-snap-type: y proximity;
}

html,
body,
#app {
  margin: 0;
}

body {
  background-color: #0d1912;
  color: #f4e4c1;
  font-family: 'Poppins', sans-serif;
}

.section-dots {
  position: fixed;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 999;
}

.section-dot {
  width: 10px;
  height: 10px;
  padding: 0;
  border: 1px solid #d4af37;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    background 0.25s ease;
}

.section-dot:hover,
.section-dot.active {
  background: #d4af37;
  transform: scale(1.25);
}

@media (max-width: 768px) {
  .section-dots {
    right: 0.7rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
    scroll-snap-type: none;
  }
}
</style>
