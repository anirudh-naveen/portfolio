<template>
  <section id="home" class="landing">
    <div class="container">
      <div class="orb-background">
        <Orb :hoverIntensity="0.5" :rotateOnHover="true" :hue="90" :forceHoverState="true" />
      </div>

      <h1 class="name">
        Hi. <br />
        I'm Anirudh Naveen.
      </h1>
      <h2 class="title">Software Engineer</h2>
      <ul class="concentrations">
        <li>Artificial Intelligence</li>
        <li>Cybersecurity</li>
        <li>Full-Stack</li>
      </ul>
      <p class="description">
        I’m a creator who loves turning ideas into something real, whether it’s through design,
        code, or storytelling. <br />
        I thrive on blending creativity with logic to build projects that are both imaginative and
        meaningful.
      </p>
      <div class="links">
        <a href="https://github.com/anirudh-naveen" target="_blank" class="link-button">GitHub</a>
        <a href="https://www.linkedin.com/in/anirudhnaveen/" target="_blank" class="link-button"
          >LinkedIn</a
        >
        <a href="https://www.instagram.com/anirudhnav/" target="_blank" class="link-button"
          >Instagram</a
        >
      </div>
    </div>
    <a href="#skills" class="scroll-cue" aria-label="Scroll to next section">
      <span></span>
    </a>
  </section>
</template>

<script lang="ts" setup>
import Orb from '@/bits/TheOrb.vue'
</script>

<style scoped>
.landing {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  box-sizing: border-box;
  background:
    url('@/assets/GoldenLines.png'), radial-gradient(circle at top left, #183a17, #0e1b12);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  font-family:
    'Poppins',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  padding: 6rem 1rem 5rem;
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
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.6rem;
  color: #b6b49f;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.concentrations {
  display: inline-block;
  text-align: left;
  list-style-type: disc;
  margin: 0 auto 2rem;
  padding-left: 1.4rem;
  color: #d4af37;
}

.concentrations li {
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  font-weight: 500;
  line-height: 1.7;
}

.concentrations li::marker {
  color: #d4af37;
}

.description {
  font-size: 1rem;
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

.scroll-cue {
  position: absolute;
  bottom: 1.75rem;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 44px;
  border: 1px solid rgba(212, 175, 55, 0.65);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
  box-sizing: border-box;
}

.scroll-cue span {
  width: 6px;
  height: 6px;
  background: #d4af37;
  border-radius: 50%;
  animation: cue 1.6s ease-in-out infinite;
}

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

@keyframes cue {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(14px);
  }
}

@media (max-width: 768px) {
  .name {
    font-size: 2.8rem;
  }
}
</style>
