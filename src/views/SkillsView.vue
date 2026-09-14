<template>
  <section id="skills" class="skills">
    <div class="hud-frame"></div>
    <ScrollCue direction="up" to="/projects" />
    <div class="skills-container">
      <p class="kicker">CYBERWARE // INSTALLED</p>
      <h2 class="skills-title">Skills</h2>
      <h3 class="technologies-title">Technologies</h3>
    </div>

    <div class="marquee" aria-label="Technologies">
      <div class="marquee-track tech">
        <div v-for="copy in 2" :key="`tech-${copy}`" class="marquee-group">
          <div v-for="item in technologies" :key="`${copy}-${item.name}`" class="skill-card">
            <span class="ad-tag" aria-hidden="true"><span>AD</span></span>
            <img :src="item.image" :alt="item.name" />
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="skills-container">
      <h3 class="languages-title">Languages</h3>
    </div>

    <div class="marquee" aria-label="Languages">
      <div class="marquee-track lang">
        <div v-for="copy in 2" :key="`lang-${copy}`" class="marquee-group">
          <div v-for="name in languages" :key="`${copy}-${name}`" class="languages-card">
            {{ name }}
          </div>
        </div>
      </div>
    </div>
    <ScrollCue to="/contact" />
  </section>
</template>

<script lang="ts" setup>
import ScrollCue from '@/components/ScrollCue.vue'
import androidStudio from '@/assets/technologies/AndroidStudio.png'
import blender from '@/assets/technologies/Blender.png'
import docker from '@/assets/technologies/Docker.png'
import express from '@/assets/technologies/Express.svg'
import firebase from '@/assets/technologies/Firebase.png'
import git from '@/assets/technologies/Git.png'
import mongo from '@/assets/technologies/MongoDB.png'
import node from '@/assets/technologies/Node.png'
import unity from '@/assets/technologies/Unity.png'
import vue from '@/assets/technologies/Vue.png'

const technologies = [
  { name: 'MongoDB', image: mongo },
  { name: 'Express.js', image: express },
  { name: 'Vue.js', image: vue },
  { name: 'Node.js', image: node },
  { name: 'Git', image: git },
  { name: 'Firebase', image: firebase },
  { name: 'Docker', image: docker },
  { name: 'Android Studio', image: androidStudio },
  { name: 'Unity', image: unity },
  { name: 'Blender', image: blender },
]

const languages = [
  'C',
  'Java',
  'Python',
  'C++',
  'C#',
  'HTML',
  'JavaScript',
  'TypeScript',
  'SQL',
  'Golang',
]
</script>

<style scoped>
.skills {
  --accent: #ff3b4e;
  --glow: rgba(255, 59, 78, 0.42);
  position: relative;
  background: radial-gradient(ellipse at top, #2a1018 0%, #0a1220 52%, #070b14 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 0 5rem;
  color: var(--text);
  scroll-snap-align: start;
  box-sizing: border-box;
  overflow: hidden;
}

.hud-frame {
  position: absolute;
  inset: 4.8rem 1rem 1.2rem;
  border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  pointer-events: none;
  clip-path: polygon(
    18px 0,
    100% 0,
    100% calc(100% - 18px),
    calc(100% - 18px) 100%,
    0 100%,
    0 18px
  );
}

.skills-container {
  position: relative;
  z-index: 1;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.kicker {
  margin: 0 0 0.5rem;
  color: var(--accent-2);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.38em;
  text-transform: uppercase;
}

.skills-title {
  font-size: 2.6rem;
  margin: 0 0 2.4rem;
  color: var(--accent);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-shadow: 0 0 18px var(--glow);
}

.marquee {
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-left 32s linear infinite;
}

.marquee-track.lang {
  animation-duration: 26s;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-group {
  display: flex;
  gap: 0.8rem;
  padding-right: 0.8rem;
}

.skill-card {
  position: relative;
  background: linear-gradient(180deg, rgba(16, 24, 42, 0.92), rgba(10, 18, 32, 0.92));
  border: 1px solid color-mix(in srgb, var(--accent) 35%, #1d3344);
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0 0 148px;
  width: 148px;
  height: 132px;
  transition: all 0.2s ease;
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
}

.ad-tag {
  position: absolute;
  top: 0.28rem;
  right: 0.32rem;
  display: inline-block;
  isolation: isolate;
  background: var(--accent);
  padding: 0.08rem 0.28rem;
  line-height: 1.2;
}

.ad-tag span {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.52rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: #000;
  mix-blend-mode: destination-out;
}

.skill-card p {
  margin: 0;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-2);
}

.skill-card img {
  width: 52px;
  height: 52px;
  object-fit: contain;
  filter: brightness(0.95) saturate(0.9);
  margin-bottom: 0.5rem;
}

.skill-card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 18px var(--glow);
}

.skill-card:hover p {
  color: var(--accent);
}

.technologies-title {
  font-size: 1.5rem;
  margin: 0 0 1.4rem;
  color: var(--accent-2);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-family: 'Share Tech Mono', monospace;
}

.languages-title {
  font-size: 1.5rem;
  margin: 5rem 0 1.4rem;
  color: var(--accent-2);
  letter-spacing: 0.22em;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Share Tech Mono', monospace;
}

.languages-card {
  flex: 0 0 auto;
  min-width: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(10, 18, 32, 0.88);
  border: 1px solid color-mix(in srgb, var(--accent-2) 28%, #1d3344);
  padding: 0.7rem 1.2rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-2);
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.languages-card:hover {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 0 16px var(--glow);
}

@keyframes marquee-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 768px) {
  .skills-title {
    font-size: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
