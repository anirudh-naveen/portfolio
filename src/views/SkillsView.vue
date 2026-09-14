<template>
  <section id="skills" class="skills">
    <div class="skills-container">
      <h2 class="skills-title">Skills</h2>
      <div class="skills-grid">
        <div class="skill-card">
          <img src="@/assets/MongoDB.png" alt="MongoDB" />
          <p>MongoDB</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/Express.svg" alt="Express.js" />
          <p>Express.js</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/Vue.png" alt="Vue.js" />
          <p>Vue.js</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/Node.png" alt="Node.js" />
          <p>Node.js</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/Git.png" alt="Git" />
          <p>Git</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/Firebase.png" alt="Firebase" />
          <p>Firebase</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/Docker.png" alt="Docker" />
          <p>Docker</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/AndroidStudio.png" alt="Android Studio" />
          <p>Android Studio</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/Unity.png" alt="Unity" />
          <p>Unity</p>
        </div>
        <div class="skill-card">
          <img src="@/assets/Blender.png" alt="Blender" />
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
  background: #0d1912;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 1rem;
  color: #f4e4c1;
  scroll-snap-align: start;
  box-sizing: border-box;
}

.skills-container {
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.skills-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #d4af37;
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
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 140px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(15, 27, 18, 0.5);
}

.skill-card img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: brightness(0.9);
  transition:
    transform 0.3s ease,
    filter 0.3s ease;
  margin-bottom: 0.5rem;
}

.skill-card:hover {
  transform: translateY(-5px);
  border-color: #d4af37;
  box-shadow: 0 8px 16px rgba(212, 175, 55, 0.3);
}

.skill-card:hover img {
  transform: scale(1.1);
  filter: brightness(1.2);
}

.languages-title {
  font-size: 2rem;
  margin: 4rem 0 2rem;
  color: #d4af37;
}

.languages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

.languages-card {
  background: linear-gradient(145deg, #17391a, #0e1b12);
  border: 1px solid #264f27;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  color: #e2dcb3;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(15, 27, 18, 0.5);
}

.languages-card:hover {
  transform: translateY(-5px);
  border-color: #d4af37;
  box-shadow: 0 8px 16px rgba(212, 175, 55, 0.3);
}

@media (max-width: 768px) {
  .skills-title {
    font-size: 2rem;
  }

  .languages-title {
    font-size: 1.6rem;
    margin-top: 3rem;
  }
}
</style>
