<template>
  <section class="projects">
    <div class="projects-container">
      <h2 class="projects-title">Projects</h2>
      <div class="project-grid">
        <div class="project-card" v-for="p in projects" :key="p.title">
          <img :src="p.image" :alt="p.title" class="project-img" />
          <div class="project-content">
            <h3>{{ p.title }}</h3>
            <p>{{ p.description }}</p>
            <a :href="p.link" target="_blank" class="project-link">View Project</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const projects = [
  {
    title: "Travel Community App",
    description: "Android app to share trip itineraries and experiences using Firebase.",
    link: "https://github.com/anirudh-naveen",
    image: "https://placehold.co/600x400/1b2b18/FFF?text=Travel+Community"
  },
  {
    title: "AI Marketplace Tool",
    description: "Platform that uses AI to generate product listings and descriptions.",
    link: "https://github.com/anirudh-naveen",
    image: "https://placehold.co/600x400/1b2b18/FFF?text=AI+Marketplace"
  },
  {
    title: "Maze Generator (Unity)",
    description: "Procedural maze generator built with Unity and C#.",
    link: "https://github.com/anirudh-naveen",
    image: "https://placehold.co/600x400/1b2b18/FFF?text=Maze+Generator"
  }
]
</script>

<style scoped>
.projects {
  padding: 6rem 1rem;
  background: #0d1912;
}

.projects-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.projects-title {
  font-size: 2.5rem;
  color: #d4af37;
  margin-bottom: 3rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: linear-gradient(145deg, #17391a, #0e1b12);
  border: 1px solid #264f27;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 6px 16px rgba(15, 27, 18, 0.4);
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: #d4af37;
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
}

.project-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  color: #f4e4c1;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.project-content p {
  color: #b8c5b0;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.project-link {
  color: #d4af37;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.project-link:hover {
  color: #f6e7b5;
}
</style>
