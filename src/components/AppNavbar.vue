<template>
  <nav class="navbar" :class="{ modern: !isCyber }">
    <div class="nav-container">
      <div class="brand">
        <a href="#home" class="logo" @click.prevent="emit('navigate', '/')">
          <span v-if="isCyber" class="logo-kicker">NET // NODE</span>
          {{ isCyber ? 'ANIRUDH NAVEEN' : 'Anirudh Naveen' }}
        </a>
        <button
          type="button"
          class="theme-toggle"
          role="switch"
          :aria-checked="isCyber"
          aria-label="Cyberpunk theme"
          :title="isCyber ? 'Switch to modern theme' : 'Switch to cyberpunk theme'"
          @click="toggleTheme"
        >
          <span class="toggle-track" aria-hidden="true"><span class="toggle-thumb"></span></span>
          <span class="toggle-label" aria-hidden="true">Cyberpunk</span>
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
import { useTheme } from '@/composables/useTheme'

const { isCyber, toggleTheme } = useTheme()

defineProps<{
  activeSection: 'home' | 'experience' | 'skills' | 'projects' | 'contact'
}>()

const emit = defineEmits<{
  navigate: [path: string]
}>()
</script>

<style scoped>
.navbar {
  background: linear-gradient(180deg, #070b14 0%, rgba(10, 18, 32, 0.97) 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  padding: 0.7rem 1.5rem 0.55rem;
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
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.5rem;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.theme-toggle:hover {
  border-color: var(--accent);
  box-shadow: 0 0 12px var(--glow);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.toggle-track {
  position: relative;
  width: 26px;
  height: 12px;
  border: 1px solid var(--accent);
  box-sizing: border-box;
}

.toggle-thumb {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 8px;
  height: 8px;
  background: var(--accent);
  box-shadow: 0 0 8px var(--glow);
  transform: translateX(14px);
  transition: transform 0.2s ease;
}

/* Modern theme */

.navbar.modern {
  background: color-mix(in srgb, var(--bg-void) 82%, transparent);
  backdrop-filter: saturate(1.6) blur(14px);
  border-bottom: 1px solid var(--border);
  padding: 0.8rem 1.5rem;
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

.navbar.modern .theme-toggle {
  gap: 0.45rem;
  padding: 0.25rem 0.6rem 0.25rem 0.3rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
}

.navbar.modern .theme-toggle:hover {
  border-color: var(--border-strong);
  color: var(--text);
  box-shadow: none;
}

.navbar.modern .toggle-track {
  width: 28px;
  height: 16px;
  border: 0;
  border-radius: 999px;
  background: var(--border-strong);
}

.navbar.modern .toggle-thumb {
  top: 2px;
  left: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.25);
  transform: none;
}

@media (max-width: 640px) {
  .navbar.modern {
    padding: 0.6rem 1rem 0.5rem;
  }

  .navbar.modern .nav-container {
    flex-direction: column;
    align-items: stretch;
    gap: 0.4rem;
  }

  .navbar.modern .brand {
    justify-content: space-between;
  }

  .navbar.modern .logo {
    white-space: nowrap;
  }

  .navbar.modern .links {
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 0.15rem;
    margin: 0 -0.4rem;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .navbar.modern .nav-link {
    flex: 0 0 auto;
    font-size: 0.88rem;
    padding: 0.35rem 0.7rem;
  }
}

@media (max-width: 560px) {
  .toggle-label {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .toggle-thumb {
    transition: none;
  }
}
</style>
