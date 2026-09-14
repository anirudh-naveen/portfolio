<template>
  <nav class="navbar">
    <div class="nav-container">
      <a href="#home" class="logo" @click.prevent="emit('navigate', '/')">Anirudh Naveen</a>
      <div class="links">
        <a
          href="#home"
          class="nav-link"
          :class="{ active: activeSection === 'home' }"
          @click.prevent="emit('navigate', '/')"
          >Home</a
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
  activeSection: 'home' | 'skills' | 'projects' | 'contact'
}>()

const emit = defineEmits<{
  navigate: [path: string]
}>()
</script>

<style scoped>
.navbar {
  background: rgba(10, 20, 14, 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  color: #d4af37;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
}

.links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-link {
  color: #e2dcb3;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #d4af37;
}

.active {
  color: #d4af37;
  border-bottom: 2px solid #d4af37;
  padding-bottom: 2px;
}
</style>
