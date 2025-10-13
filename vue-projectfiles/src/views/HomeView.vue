<template>
  <section class="landing">
    <div class="container">
      <h1 class="name">Anirudh Naveen</h1>
      <h2 class="title">Software Developer</h2>
      <p class="description">
        Building elegant solutions to complex problems.<br />
        Passionate about clean code and user experience.
      </p>
      <div class="links">
        <a href="https://github.com/anirudh-naveen" target="_blank" class="link-button">GitHub</a>
        <a href="https://www.linkedin.com/in/anirudhnaveen/" target="_blank" class="link-button">LinkedIn</a>
        <a href="https://www.instagram.com/anirudhnav/" target="_blank" class="link-button">Instagram</a>
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section class="skills">
    <div class="skills-container">
      <h2 class="skills-title">Skills</h2>
      <div class="skills-grid">
        <div class="skill-card">Vue.js</div>
        <div class="skill-card">TypeScript</div>
        <div class="skill-card">Firebase</div>
        <div class="skill-card">Android</div>
        <div class="skill-card">Python</div>
        <div class="skill-card">C++</div>
        <div class="skill-card">UI/UX</div>
        <div class="skill-card">Machine Learning</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Add animation or interactivity here if needed later
</script>

<style scoped>
/* --- Hero Section --- */
.landing {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top left, #183a17, #0e1b12);
  font-family: "Poppins", -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 3rem 1rem;
  color: #eae8e1;
  animation: fadeIn 1.2s ease-in-out;
}

.container {
  text-align: center;
  max-width: 800px;
}

.name {
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(90deg, #d4af37, #6f8a49);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.6rem;
  color: #b6b49f;
  margin-bottom: 2rem;
  letter-spacing: 1px;
}

.description {
  font-size: 1.1rem;
  color: #c9c7b6;
  line-height: 1.6;
  margin-bottom: 3rem;
}

.links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.link-button {
  padding: 0.75rem 2rem;
  background: transparent;
  border: 1px solid #d4af37;
  border-radius: 30px;
  color: #d4af37;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.link-button:hover {
  background: #d4af37;
  color: #0e1b12;
  transform: translateY(-2px);
}

/* --- Skills Section --- */
.skills {
  background: #0d1912;
  padding: 6rem 1rem;
  color: #f4e4c1;
}

.skills-container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.skills-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #d4af37;
  position: relative;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

.skill-card {
  background: linear-gradient(145deg, #17391a, #0e1b12);
  border: 1px solid #264f27;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  color: #e2dcb3;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(15, 27, 18, 0.5);
}

.skill-card:hover {
  transform: translateY(-5px);
  border-color: #d4af37;
  box-shadow: 0 8px 16px rgba(212, 175, 55, 0.3);
}

/* --- Animations --- */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .name {
    font-size: 2.8rem;
  }
  .skills-title {
    font-size: 2rem;
  }
}
</style>
