<template>
  <section id="skills" class="skills">
    <div class="hud-frame"></div>
    <div class="skills-container">
      <p class="kicker">CYBERWARE // INSTALLED</p>
      <h2 class="skills-title">Skills</h2>
      <h3 class="technologies-title">Technologies</h3>
      <div class="skills-grid">
        <div class="skill-card">
          <img src="@/assets/technologies/MongoDB.png" alt="MongoDB" />
          <p>MongoDB</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/technologies/Express.svg" alt="Express.js" />
          <p>Express.js</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/technologies/Vue.png" alt="Vue.js" />
          <p>Vue.js</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/technologies/Node.png" alt="Node.js" />
          <p>Node.js</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/technologies/Git.png" alt="Git" />
          <p>Git</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/technologies/Firebase.png" alt="Firebase" />
          <p>Firebase</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/technologies/Docker.png" alt="Docker" />
          <p>Docker</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/technologies/AndroidStudio.png" alt="Android Studio" />
          <p>Android Studio</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/technologies/Unity.png" alt="Unity" />
          <p>Unity</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/technologies/Blender.png" alt="Blender" />
          <p>Blender</p>
        </div>
      </div>

      <h3 class="languages-title">Languages</h3>
      <div class="languages-grid">
        <div class="languages-card">C</div>
        <div class="languages-card">Java</div>
        <div class="languages-card">Python</div>
        <div class="languages-card">C++</div>
        <div class="languages-card">C#</div>
        <div class="languages-card">HTML</div>
        <div class="languages-card">JavaScript</div>
        <div class="languages-card">TypeScript</div>
        <div class="languages-card">SQL</div>
        <div class="languages-card">Golang</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  --accent: #ff3b4e;
  --glow: rgba(255, 59, 78, 0.42);
  position: relative;
  background: radial-gradient(ellipse at top, #2a1018 0%, #0a1220 52%, #070b14 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 1rem;
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
  clip-path: polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px);
}

.skills-container {
  position: relative;
  z-index: 1;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  justify-items: center;
}

.skill-card {
  background: linear-gradient(180deg, rgba(16, 24, 42, 0.92), rgba(10, 18, 32, 0.92));
  border: 1px solid color-mix(in srgb, var(--accent) 35%, #1d3344);
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 132px;
  transition: all 0.2s ease;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
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
  margin: 3.2rem 0 1.4rem;
  color: var(--accent-2);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-family: 'Share Tech Mono', monospace;
}

.languages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.8rem;
  justify-items: center;
}

.languages-card {
  width: 100%;
  background: rgba(10, 18, 32, 0.88);
  border: 1px solid color-mix(in srgb, var(--accent-2) 28%, #1d3344);
  padding: 0.7rem 1rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-2);
  transition: all 0.2s ease;
}

.languages-card:hover {
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 0 16px var(--glow);
}

@media (max-width: 768px) {
  .skills-title {
    font-size: 2rem;
  }
}
</style>
