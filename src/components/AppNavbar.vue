<template>
  <nav class="navbar" :class="{ modern: !isCyber, vintage: isVintage }">
    <div class="nav-container">
      <div class="brand">
        <button
          type="button"
          class="logo"
          :aria-label="`Anirudh Naveen. Theme: ${themeLabels[selectedTheme]}. Click to switch theme.`"
          :title="`Switch theme (now ${themeLabels[selectedTheme]})`"
          @click="cycleTheme"
        >
          <span v-if="isCyber" class="logo-kicker">NET // NODE</span>
          <span class="logo-row">
            {{ isCyber ? 'ANIRUDH NAVEEN' : 'Anirudh Naveen' }}
            <span class="theme-marks" aria-hidden="true">
              <span
                v-for="option in THEMES"
                :key="option"
                class="mark"
                :class="[option, { on: selectedTheme === option }]"
              ></span>
            </span>
          </span>
        </button>
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
import { THEMES, useTheme, type SiteTheme } from '@/composables/useTheme'

const { selectedTheme, isCyber, isVintage, setTheme } = useTheme()

const themeLabels: Record<SiteTheme, string> = {
  vintage: 'Vintage',
  modern: 'Modern',
  cyberpunk: 'Cyberpunk',
}

// The name doubles as the theme switch: each click moves to the next theme.
function cycleTheme() {
  const index = THEMES.indexOf(selectedTheme.value)
  setTheme(THEMES[(index + 1) % THEMES.length]!)
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
  Shared geometry: the bar padding and brand row height are identical in every theme so the
  name (the theme switch) stays put when the theme changes.
*/
.navbar {
  --brand-height: 2.6rem;
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
  align-items: flex-start;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
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
  display: flex;
  align-items: center;
  height: var(--brand-height);
  flex-shrink: 0;
}

.logo {
  white-space: nowrap;
}

.logo:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
}

.logo-row {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

/* One mark per theme, attached to the name: vintage triangle, modern circle, cyber square */
.theme-marks {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.mark {
  width: 6px;
  height: 6px;
  background: currentColor;
  opacity: 0.3;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.mark.vintage {
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}

.mark.modern {
  border-radius: 50%;
}

/* Beside the circle the square reads as a blob at full size, so it shrinks a touch here */
.navbar.modern .mark.cyberpunk {
  width: 4.5px;
  height: 4.5px;
}

.mark.on {
  opacity: 1;
  transform: scale(1.35);
}

.logo:hover .mark:not(.on) {
  opacity: 0.55;
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

/* Vintage theme */

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
  .mark {
    transition: none;
  }
}
</style>
