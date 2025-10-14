<template>
  <section class="landing">
    <div class="container">
      <div class="orb-background">
        <Orb
          :hoverIntensity="0.5"
          :rotateOnHover="true"
          :hue="90"
          :forceHoverState="true"
        />
      </div>

      <h1 class="name">Hi. <br /> I'm Anirudh Naveen.</h1>
      <h2 class="title">Software Developer</h2>
      <p class="description">
        I’m a creator who loves turning ideas into something real, whether it’s through design, code, or storytelling. <br />
        I thrive on blending creativity with logic to build projects that are both imaginative and meaningful.
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
    </div>
  </section>

  <!-- Languages Section -->
  <section class="languages">
    <div class="languages-container">
      <h2 class="languages-title">Languages</h2>
      <div class="languages-grid">
        <div class="languages-card">C</div>
        <div class="languages-card">Java</div>
        <div class="languages-card">Python</div>
        <div class="languages-card">C++</div>
        <div class="languages-card">C#</div>
        <div class="languages-card">HTML</div>
        <div class="languages-card">TypeScript</div>
        <div class="languages-card">SQL</div>
        <div class="languages-card">Swift</div>
        <div class="languages-card">Assembly</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import Orb from "@/bits/TheOrb.vue";
</script>

<style scoped>
/* --- Main Section --- */
.landing {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    url("@/assets/GoldenLines.png"),
    radial-gradient(circle at top left, #183a17, #0e1b12);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
  background-clip: text;
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
  transition: transform 0.3s ease, filter 0.3s ease;
  margin-bottom: 0.5rem;
}

.skill-card span {
  color: #e2dcb3;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;
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

/* --- Languages Section --- */
.languages {
  background: #09110e;
  padding: 6rem 1rem;
  color: #f4e4c1;
}

.languages-container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.languages-title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #d4af37;
  position: relative;
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
