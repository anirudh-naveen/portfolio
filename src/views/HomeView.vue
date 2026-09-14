<template>
  <section id="home" class="landing">
    <div class="hud-frame"></div>
    <div class="container">
      <div class="orb-background">
        <Orb :hoverIntensity="0.5" :rotateOnHover="true" :hue="90" :forceHoverState="true" />
      </div>

      <p class="kicker">NET // IDENTITY BUFFER</p>
      <h1 class="name">ID://Anirudh-Naveen</h1>
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
    <a
      href="#skills"
      class="scroll-cue"
      aria-label="Scroll to next section"
      @click.prevent="navigateTo?.('/skills')"
    >
      <span></span>
    </a>
  </section>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import Orb from '@/bits/TheOrb.vue'

const navigateTo = inject<(path: string) => void>('navigateTo')
</script>

<style scoped>
.landing {
  --accent: #d4ff3f;
  --accent-2: #b6e000;
  --glow: rgba(212, 255, 63, 0.42);
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  box-sizing: border-box;
  overflow: hidden;
  background: radial-gradient(ellipse at top left, #1c2a12 0%, #0a1220 46%, #070b14 100%);
  font-family: 'Rajdhani', sans-serif;
  padding: 6rem 1rem 5rem;
  color: var(--text);
}

.hud-frame {
  position: absolute;
  inset: 4.8rem 1rem 1.2rem;
  border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
  pointer-events: none;
  z-index: 0;
  clip-path: polygon(
    18px 0,
    100% 0,
    100% calc(100% - 18px),
    calc(100% - 18px) 100%,
    0 100%,
    0 18px
  );
}

.hud-frame::before,
.hud-frame::after {
  content: '';
  position: absolute;
  width: 42px;
  height: 42px;
  border: 1px solid var(--accent);
}

.hud-frame::before {
  top: -1px;
  left: -1px;
  border-right: 0;
  border-bottom: 0;
}

.hud-frame::after {
  right: -1px;
  bottom: -1px;
  border-left: 0;
  border-top: 0;
}

.container {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
}

.kicker {
  margin: 0 0 0.8rem;
  color: var(--accent);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.38em;
  text-transform: uppercase;
}

.name {
  font-size: 4rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.05;
  color: var(--accent);
  text-shadow: 0 0 18px var(--glow);
  margin: 0 0 0.7rem;
}

.title {
  font-family: 'Share Tech Mono', monospace;
  font-size: 1.05rem;
  color: var(--text-muted);
  margin-bottom: 1.2rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.concentrations {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.55rem;
  list-style: none;
  margin: 0 auto 1.8rem;
  padding: 0;
}

.concentrations li {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 55%, transparent);
  padding: 0.35rem 0.65rem;
}

.description {
  font-size: 1.05rem;
  color: var(--text-dim);
  line-height: 1.55;
  margin-bottom: 2.4rem;
  letter-spacing: 0.02em;
}

.links {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.link-button {
  padding: 0.7rem 1.4rem;
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  transition: all 0.2s ease;
}

.link-button:hover {
  background: var(--accent);
  color: var(--bg-void);
  box-shadow: 0 0 18px var(--glow);
}

.scroll-cue {
  position: absolute;
  bottom: 1.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 22px;
  height: 38px;
  border: 1px solid var(--accent);
  clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
  display: flex;
  justify-content: center;
  padding-top: 8px;
  box-sizing: border-box;
}

.scroll-cue span {
  width: 5px;
  height: 5px;
  background: var(--accent);
  animation: cue 1.6s steps(2, end) infinite;
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
    font-size: 2.4rem;
  }

  .hud-frame {
    inset: 4.4rem 0.6rem 0.8rem;
  }
}
</style>
