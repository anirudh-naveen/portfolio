<template>
  <section id="experience" class="experience">
    <div class="hud-frame"></div>
    <SectionCues up-to="/" down-to="/projects" />
    <div class="experience-container">
      <p class="kicker">RECORD // EMPLOYMENT</p>
      <h2 class="experience-title">Experience</h2>

      <ol class="timeline">
        <li v-for="item in entries" :key="item.org" class="timeline-item">
          <div class="logo-slot">
            <img :src="item.logo" :alt="item.org" />
          </div>
          <div class="timeline-card">
            <p class="timeline-dates">{{ item.dates }}</p>
            <h3 class="timeline-org">{{ item.org }}</h3>
            <p class="timeline-role">{{ item.role }}</p>
            <p v-if="item.description" class="timeline-desc">{{ item.description }}</p>
            <div v-else class="timeline-desc redacted" aria-label="Redacted">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script lang="ts" setup>
import SectionCues from '@/components/SectionCues.vue'
import ibmLogo from '@/assets/experience/IBM.png'
import landisGyrLogo from '@/assets/experience/Landis+Gyr.png'
import arbysLogo from '@/assets/experience/Arbys.png'
import taekwondoLogo from '@/assets/experience/Taekwondo.png'

const entries = [
  {
    org: 'IBM',
    role: 'Software Engineer Intern',
    dates: 'AUG 2026 — DEC 2026',
    description: 'Worked on Vault Radar with the HashiCorp team.',
    logo: ibmLogo,
  },
  {
    org: 'Landis+Gyr',
    role: 'Software Engineer Intern',
    dates: 'MAY 2026 — AUG 2026',
    description: 'Worked on Emerge with the software developer team.',
    logo: landisGyrLogo,
  },
  {
    org: "Arby's",
    role: 'Line Cook',
    dates: 'MAY 2023 — AUG 2024',
    description: '',
    logo: arbysLogo,
  },
  {
    org: 'World Champion Taekwondo',
    role: 'Black Belt II',
    dates: 'AUG 2016 — MAY 2021',
    description: '',
    logo: taekwondoLogo,
  },
]
</script>

<style scoped>
.experience {
  --accent: #ffb12a;
  --glow: rgba(255, 177, 42, 0.42);
  position: relative;
  min-height: 100vh;
  background: radial-gradient(ellipse at top, #2a1c0c 0%, #0a1220 52%, #070b14 100%);
  padding: 8.6rem 1rem 6.2rem;
  color: var(--text);
  scroll-snap-align: start;
  box-sizing: border-box;
  overflow: visible;
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

.experience-container {
  position: relative;
  z-index: 1;
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
}

.kicker {
  margin: 0 0 0.5rem;
  color: var(--accent-2);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.38em;
  text-transform: uppercase;
  text-align: center;
}

.experience-title {
  font-size: 2.6rem;
  margin: 0 0 2.6rem;
  color: var(--accent);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 0 0 18px var(--glow);
}

.timeline {
  list-style: none;
  margin: 0;
  padding: 0 0 0 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-left: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
}

.timeline-item {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 1rem;
  align-items: start;
  position: relative;
  padding-left: 1.2rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 1.35rem;
  width: 9px;
  height: 9px;
  background: var(--accent);
  box-shadow: 0 0 10px var(--glow);
  transform: rotate(45deg);
}

.logo-slot {
  width: 72px;
  height: 72px;
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  background: rgba(10, 18, 32, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0.35rem;
  box-sizing: border-box;
}

.logo-slot img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.timeline-card {
  text-align: left;
  background: linear-gradient(180deg, rgba(16, 24, 42, 0.92), rgba(10, 18, 32, 0.92));
  border: 1px solid color-mix(in srgb, var(--accent) 32%, #1d3344);
  padding: 0.9rem 1.05rem 1rem;
  clip-path: polygon(
    10px 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%,
    0 10px
  );
}

.timeline-dates {
  margin: 0 0 0.25rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-2);
}

.timeline-org {
  margin: 0 0 0.15rem;
  color: var(--accent);
  font-size: 1.25rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.timeline-role {
  margin: 0 0 0.7rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-2);
}

.timeline-desc {
  margin: 0;
  min-height: 2.4rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  line-height: 1.45;
  color: var(--accent-2);
  border: 1px dashed color-mix(in srgb, var(--accent-2) 35%, transparent);
  padding: 0.55rem 0.7rem;
}

.timeline-desc.redacted {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.38rem;
  text-transform: none;
}

.timeline-desc.redacted span {
  display: block;
  height: 0.72rem;
  background: #05070c;
  box-shadow: 0 0 0 1px rgba(255, 177, 42, 0.1);
}

.timeline-desc.redacted span:nth-child(1) {
  width: 92%;
}

.timeline-desc.redacted span:nth-child(2) {
  width: 74%;
}

.timeline-desc.redacted span:nth-child(3) {
  width: 58%;
}

@media (max-width: 768px) {
  .experience-title {
    font-size: 2rem;
  }

  .timeline-item {
    grid-template-columns: 56px 1fr;
    gap: 0.7rem;
  }

  .logo-slot {
    width: 56px;
    height: 56px;
  }
}
</style>
