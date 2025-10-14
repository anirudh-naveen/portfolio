<template>
  <nav class="navbar">
    <div class="nav-container">
      <h1 class="logo">Anirudh Naveen</h1>
      <div class="links">
        <RouterLink to="/" class="nav-link" exact-active-class="active">Home</RouterLink>
        <RouterLink to="/projects" class="nav-link" exact-active-class="active">Projects</RouterLink>
        <RouterLink to="/contact" class="nav-link" exact-active-class="active">Contact</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// No additional script logic needed for this navbar
</script>

<style scoped>
.navbar {
  background: rgba(10, 20, 14, 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
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
}

.links {
  display: flex;
  gap: 1.5rem;
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
