<template>
  <nav class="navbar">
    <div class="nav-container">
      <a href="#home" class="logo" @click.prevent="emit('navigate', '/')">
        <span class="logo-kicker">NET // NODE</span>
        ANIRUDH NAVEEN
      </a>
      <div class="links">
        <a
          href="#home"
          class="nav-link"
          :class="{ active: activeSection === 'home' }"
          @click.prevent="emit('navigate', '/')"
          >Home</a
        >
        <a
          href="#experience"
          class="nav-link"
          :class="{ active: activeSection === 'experience' }"
          @click.prevent="emit('navigate', '/experience')"
          >Experience</a
        >
        <a
          href="#skills"
          class="nav-link"
          :class="{ active: activeSection === 'skills' }"
          @click.prevent="emit('navigate', '/skills')"
          >Skills</a
        >
        <a
          href="#projects"
          class="nav-link"
          :class="{ active: activeSection === 'projects' }"
          @click.prevent="emit('navigate', '/projects')"
          >Projects</a
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
defineProps<{
  activeSection: 'home' | 'experience' | 'skills' | 'projects' | 'contact'
}>()

const emit = defineEmits<{
  navigate: [path: string]
}>()
</script>

<style scoped>
.navbar {
  background: linear-gradient(180deg, rgba(7, 11, 20, 0.94), rgba(10, 18, 32, 0.78));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  padding: 0.7rem 1.5rem 0.55rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-decoration: none;
  text-transform: uppercase;
  line-height: 1.05;
}

.logo-kicker {
  font-family: 'Share Tech Mono', monospace;
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
  font-family: 'Share Tech Mono', monospace;
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
</style>
