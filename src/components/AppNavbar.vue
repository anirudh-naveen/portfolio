<template>
  <nav class="navbar" :class="{ modern: !isCyber, vintage: isVintage }">
    <div class="nav-container">
      <div class="brand">
        <a href="#home" class="logo" @click.prevent="emit('navigate', '/')">
          <span v-if="isCyber" class="logo-kicker">NET // NODE</span>
          {{ isCyber ? 'ANIRUDH NAVEEN' : 'Anirudh Naveen' }}
        </a>
        <div
          ref="switchRef"
          class="theme-switch"
          role="radiogroup"
          aria-label="Site theme"
          :style="{ '--pos': THEMES.indexOf(theme) }"
          @keydown="onSwitchKey"
        >
          <span class="switch-thumb" aria-hidden="true"></span>
          <button
            v-for="option in THEMES"
            :key="option"
            type="button"
            class="switch-stop"
            role="radio"
            :aria-checked="theme === option"
            :aria-label="themeLabels[option]"
            :title="`${themeLabels[option]} theme`"
            :tabindex="theme === option ? 0 : -1"
            @click="setTheme(option)"
          ></button>
        </div>
      </div>
      <div class="links">
        <a
          href="#home"
          class="nav-link"
          :class="{ active: activeSection === 'home' }"
          @click.prevent="emit('navigate', '/')"
          >Bio</a
        >
        <a
          href="#experience"
          class="nav-link"
          :class="{ active: activeSection === 'experience' }"
          @click.prevent="emit('navigate', '/experience')"
          >Experience</a
        >
        <a
          href="#projects"
          class="nav-link"
          :class="{ active: activeSection === 'projects' }"
          @click.prevent="emit('navigate', '/projects')"
          >Projects</a
        >
        <a
          href="#skills"
          class="nav-link"
          :class="{ active: activeSection === 'skills' }"
          @click.prevent="emit('navigate', '/skills')"
          >Skills</a
        >
        <a
          href="#contact"
          class="nav-link"
          :class="{ active: activeSection === 'contact' }"
          @click.prevent="emit('navigate', '/contact')"
          >Contact</a
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { THEMES, useTheme, type SiteTheme } from '@/composables/useTheme'

const { theme, isCyber, isVintage, setTheme } = useTheme()

const themeLabels: Record<SiteTheme, string> = {
  vintage: 'Vintage',
  modern: 'Modern',
  cyberpunk: 'Cyberpunk',
}

const switchRef = ref<HTMLElement | null>(null)

// Arrow keys move between stops, as expected for a radio group.
async function onSwitchKey(event: KeyboardEvent) {
  const step = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[event.key]
  if (!step) return
  event.preventDefault()
  const index = THEMES.indexOf(theme.value)
  const next = THEMES[Math.min(THEMES.length - 1, Math.max(0, index + step))]
  if (!next) return
  setTheme(next)
  await nextTick()
  switchRef.value?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus()
}

defineProps<{
  activeSection: 'home' | 'experience' | 'skills' | 'projects' | 'contact'
}>()

const emit = defineEmits<{
  navigate: [path: string]
}>()
</script>

<style scoped>
/*
  Shared geometry: the bar padding, brand row height, logo column width and switch size are
  identical in every theme so the theme switch never moves when the theme changes.
*/
.navbar {
  --brand-height: 2.6rem;
  --logo-width: 13.5rem;
  background: linear-gradient(180deg, #070b14 0%, rgba(10, 18, 32, 0.97) 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  padding: 0.7rem 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3000;
}

.navbar::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  opacity: 0.55;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo {
  display: flex;
  flex-direction: column;
  color: var(--accent);
  font-family: var(--font-body);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-decoration: none;
  text-transform: uppercase;
  line-height: 1.05;
}

.logo-kicker {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.32em;
  color: var(--accent-2);
}

.links {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.4rem 0.7rem;
  border: 1px solid transparent;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.nav-link:hover {
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
}

.active {
  color: var(--bg-void);
  background: var(--accent);
  border-color: var(--accent);
  box-shadow: 0 0 14px var(--glow);
}

.brand {
  display: grid;
  grid-template-columns: var(--logo-width) auto;
  align-items: center;
  justify-content: start;
  gap: 0.9rem;
  height: var(--brand-height);
  flex-shrink: 0;
}

.logo {
  white-space: nowrap;
}

/* Three-stop theme switch: vintage | modern | cyberpunk. Same box size in every theme. */

.theme-switch {
  --stop: 16px;
  --inset: 2px;
  position: relative;
  display: flex;
  padding: var(--inset);
  box-sizing: border-box;
  /* Outline drawn as a shadow so it adds no size */
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 55%, transparent);
}

.switch-thumb {
  position: absolute;
  top: var(--inset);
  left: var(--inset);
  width: var(--stop);
  height: var(--stop);
  background: var(--accent);
  box-shadow: 0 0 8px var(--glow);
  transform: translateX(calc(var(--pos) * var(--stop)));
  transition: transform 0.22s ease;
  pointer-events: none;
}

.switch-stop {
  position: relative;
  width: var(--stop);
  height: var(--stop);
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.switch-stop::after {
  content: '';
  position: absolute;
  inset: 6px;
  background: color-mix(in srgb, var(--accent) 45%, transparent);
}

.switch-stop[aria-checked='true']::after {
  opacity: 0;
}

.switch-stop:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  z-index: 1;
}

.theme-switch:hover {
  box-shadow:
    inset 0 0 0 1px var(--accent),
    0 0 10px var(--glow);
}

/* Modern theme */

.navbar.modern {
  background: color-mix(in srgb, var(--bg-void) 82%, transparent);
  backdrop-filter: saturate(1.6) blur(14px);
  border-bottom: 1px solid var(--border);
}

.navbar.modern::after {
  display: none;
}

.navbar.modern .logo {
  color: var(--text);
  font-size: 1.1rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  text-transform: none;
}

.navbar.modern .nav-link {
  color: var(--text-muted);
  font-size: 0.92rem;
  letter-spacing: 0;
  text-transform: none;
  padding: 0.4rem 0.8rem;
  border: 0;
  border-radius: 999px;
}

.navbar.modern .nav-link:hover {
  color: var(--text);
  background: var(--surface-hover);
}

.navbar.modern .nav-link.active {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  box-shadow: none;
}

.navbar.modern .theme-switch {
  border-radius: 999px;
  background: var(--border-strong);
  box-shadow: none;
}

.navbar.modern .theme-switch:hover {
  box-shadow: none;
  background: color-mix(in srgb, var(--border-strong) 80%, var(--text-dim));
}

.navbar.modern .switch-thumb {
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.3);
}

.navbar.modern .switch-stop {
  border-radius: 50%;
}

.navbar.modern .switch-stop::after {
  inset: 6px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--text) 30%, transparent);
}

/* Vintage theme: brass slider set into a leather strap */

.navbar.vintage {
  background:
    linear-gradient(180deg, rgb(255 250 235 / 0.35), transparent),
    color-mix(in srgb, var(--bg-void) 94%, transparent);
  backdrop-filter: none;
  border-bottom: 3px double var(--border-strong);
  box-shadow: 0 4px 14px -8px rgb(62 39 17 / 0.45);
}

.navbar.vintage .logo {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.navbar.vintage .nav-link {
  font-size: 1.05rem;
  font-style: italic;
  border-radius: 0;
  padding: 0.3rem 0.7rem;
}

.navbar.vintage .nav-link:hover {
  background: transparent;
  color: var(--accent);
}

.navbar.vintage .nav-link.active {
  background: transparent;
  color: var(--accent);
  box-shadow: inset 0 -2px 0 var(--accent);
}

/*
  Triangles, to pair with modern's circles and cyberpunk's squares. The pointed leather strap
  is drawn on a pseudo-element so its clip-path doesn't clip the stops' focus rings.
*/
.navbar.vintage .theme-switch {
  border-radius: 0;
  background: none;
  box-shadow: none;
}

.navbar.vintage .theme-switch::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #5a3a1e, #3f2811);
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.55);
  clip-path: polygon(5px 0, calc(100% - 5px) 0, 100% 50%, calc(100% - 5px) 100%, 5px 100%, 0 50%);
}

.navbar.vintage .theme-switch:hover {
  background: none;
}

.navbar.vintage .theme-switch:hover::before {
  background: linear-gradient(180deg, #6a4524, #4a2f15);
}

/* Brass pointer */
.navbar.vintage .switch-thumb {
  border-radius: 0;
  background: linear-gradient(160deg, #f4dc9a, #c29a45 55%, #7d5a1f);
  box-shadow: none;
  filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.5));
  clip-path: polygon(50% 8%, 92% 90%, 8% 90%);
}

.navbar.vintage .switch-stop {
  border-radius: 0;
}

.navbar.vintage .switch-stop::after {
  inset: 5px;
  border-radius: 0;
  background: rgb(233 212 166 / 0.45);
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}

@media (max-width: 640px) {
  .navbar {
    padding: 0.5rem 1rem;
  }

  .nav-container {
    flex-direction: column;
    align-items: stretch;
    gap: 0.3rem;
  }

  .links {
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 0.15rem;
    margin: 0 -0.4rem;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .nav-link {
    flex: 0 0 auto;
  }

  .navbar.modern .nav-link {
    font-size: 0.88rem;
    padding: 0.35rem 0.7rem;
  }

  .navbar.vintage .nav-link {
    font-size: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .switch-thumb {
    transition: none;
  }
}
</style>
