<template>
  <section id="projects" class="projects">
    <div class="projects-container">
      <p class="kicker">ARCHIVE // DEPLOYED</p>
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
import activeKnockoutImg from '@/assets/ActiveKnockout.png'
import travelPlannerImg from '@/assets/TravelPlanner.png'
import everythingMazesImg from '@/assets/EverythingMazes.png'
import findAnimationImg from '@/assets/FindAnimation.png'
import fakeNewsImg from '@/assets/FakeNewsDetector.png'

const projects = [
  {
    title: 'Find Animation',
    description: 'MEVN stack web app to search, view, and track animation movies and series.',
    link: 'https://github.com/anirudh-naveen/Find-Animation/blob/main/README.md',
    image: findAnimationImg,
  },
  {
    title: 'Fake News Detector',
    description:
      'Deep Learning model that is trained to detect fake news with a certain confidence level.',
    link: 'https://github.com/anirudh-naveen/fake-news-detector/blob/main/README.md',
    image: fakeNewsImg,
  },
  {
    title: 'Travel Planner',
    description: 'Android app to share trip itineraries and experiences using a Firebase database.',
    link: 'https://github.com/anirudh-naveen/Travel-Planner?tab=readme-ov-file',
    image: travelPlannerImg,
  },
  {
    title: 'Active Knockout',
    description: 'Meta Quest VR exercise experience with interactive boxing gameplay.',
    link: 'https://github.com/anirudh-naveen/ActiveKnockout',
    image: activeKnockoutImg,
  },
  {
    title: 'Everything Mazes',
    description:
      'Unity-built video game where players can generate, customize, and play through mazes.',
    link: 'https://github.com/anirudh-naveen/Everything-Mazes',
    image: everythingMazesImg,
  },
]
</script>

<style scoped>
.projects {
  --accent: #5ec8ff;
  --accent-2: #9cdcff;
  --glow: rgba(94, 200, 255, 0.42);
  position: relative;
  min-height: 100vh;
  padding: 6rem 1rem;
  overflow: hidden;
  background: radial-gradient(ellipse at center, #123048 0%, #0a1220 48%, #070b14 100%);
  scroll-snap-align: start;
  box-sizing: border-box;
}

.projects::before {
  content: '';
  position: absolute;
  inset: 4.8rem 1rem 1.2rem;
  border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
  pointer-events: none;
  clip-path: polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px);
}

.projects-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.projects-title {
  font-size: 2.6rem;
  color: var(--accent);
  margin: 0 0 2.4rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-shadow: 0 0 18px var(--glow);
}

.kicker {
  margin: 0 0 0.5rem;
  color: var(--accent);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.38em;
  text-transform: uppercase;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.4rem;
}

.project-card {
  background: linear-gradient(180deg, rgba(16, 24, 42, 0.94), rgba(10, 18, 32, 0.94));
  border: 1px solid color-mix(in srgb, var(--accent) 32%, #1d3344);
  overflow: hidden;
  text-align: left;
  transition: all 0.2s ease;
  clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
}

.project-card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 22px var(--glow);
}

.project-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  filter: saturate(0.85) contrast(1.05);
}

.project-content {
  padding: 1.2rem 1.3rem 1.4rem;
}

.project-content h3 {
  color: var(--accent);
  font-size: 1.25rem;
  margin: 0 0 0.4rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-content p {
  color: var(--text-muted);
  font-size: 1rem;
  margin-bottom: 0.9rem;
}

.project-link {
  color: var(--accent-2);
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.project-link:hover {
  color: var(--accent);
}
</style>
