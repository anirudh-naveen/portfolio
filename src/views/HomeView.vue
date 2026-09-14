<template>
  <section id="home" class="landing">
    <div class="hud-frame"></div>
    <div class="container">
      <p class="page-kicker">IDENTIFICATION // CONFIDENTIAL</p>
      <h2 class="home-title">Bio</h2>
      <article class="id-card">
        <header class="id-header">
          <p class="kicker">NET // CITIZEN FILE</p>
          <p class="serial">ID-AN-020806 // STATUS: CLEAR</p>
        </header>

        <div class="id-body">
          <div class="id-photo" aria-hidden="true">
            <div class="photo-silhouette"></div>
            <div class="redact-bars">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p class="redact-stamp">REDACTED</p>
            <p class="photo-label">IMG // CLASSIFIED</p>
          </div>

          <dl class="id-fields">
            <div class="id-row">
              <dt>Name</dt>
              <dd>Anirudh Naveen</dd>
            </div>
            <div class="id-row">
              <dt>DOB</dt>
              <dd>02/08/2006</dd>
            </div>
            <div class="id-row">
              <dt>Last Seen</dt>
              <dd>Austin, TX</dd>
            </div>
            <div class="id-row">
              <dt>Occupation</dt>
              <dd>Software Engineer</dd>
            </div>
            <div class="id-row concentrations-row">
              <dt>Concentrations</dt>
              <dd>
                <ul class="concentrations">
                  <li>Artificial Intelligence</li>
                  <li>Cybersecurity</li>
                  <li>Full-Stack</li>
                </ul>
              </dd>
            </div>
            <div class="id-row">
              <dt>Bounty</dt>
              <dd>$120,000</dd>
            </div>
          </dl>
        </div>

        <div class="links">
          <a href="https://github.com/anirudh-naveen" target="_blank" class="link-button">
            <img src="@/assets/socialmedia/github.png" alt="" class="link-icon" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/anirudhnaveen/" target="_blank" class="link-button">
            <img src="@/assets/socialmedia/linkedin.png" alt="" class="link-icon" />
            LinkedIn
          </a>
          <a href="https://www.instagram.com/anirudhnav/" target="_blank" class="link-button">
            <img src="@/assets/socialmedia/instagram.png" alt="" class="link-icon" />
            Instagram
          </a>
        </div>
      </article>
    </div>
    <ScrollCue to="/experience" />
  </section>
</template>

<script lang="ts" setup>
import ScrollCue from '@/components/ScrollCue.vue'
</script>

<style scoped>
.landing {
  --accent: #d4ff3f;
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

.page-kicker {
  margin: 0 0 0.5rem;
  color: var(--accent-2);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.38em;
  text-align: center;
  text-transform: uppercase;
}

.home-title {
  font-size: 2.6rem;
  margin: 0 0 2.4rem;
  color: var(--accent);
  letter-spacing: 0.18em;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0 0 18px var(--glow);
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
  width: 100%;
  max-width: 760px;
}

.id-card {
  text-align: left;
  background: linear-gradient(180deg, rgba(12, 20, 18, 0.82), rgba(7, 11, 20, 0.9));
  border: 1px solid color-mix(in srgb, var(--accent) 38%, transparent);
  clip-path: polygon(
    16px 0,
    100% 0,
    100% calc(100% - 16px),
    calc(100% - 16px) 100%,
    0 100%,
    0 16px
  );
  padding: 1.4rem 1.5rem 1.35rem;
  box-shadow: 0 0 28px rgba(0, 0, 0, 0.35);
}

.id-body {
  display: grid;
  grid-template-columns: 148px 1fr;
  gap: 1.15rem;
  margin-bottom: 1.35rem;
  align-items: stretch;
}

.id-photo {
  position: relative;
  min-height: 176px;
  background:
    repeating-linear-gradient(
      0deg,
      rgba(212, 255, 63, 0.04) 0px,
      rgba(212, 255, 63, 0.04) 1px,
      transparent 1px,
      transparent 4px
    ),
    radial-gradient(circle at 50% 28%, #243040 0%, #070b14 74%);
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  overflow: hidden;
}

.photo-silhouette {
  position: absolute;
  inset: 0;
}

.photo-silhouette::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 16%;
  width: 42%;
  height: 28%;
  transform: translateX(-50%);
  background: #2c3948;
  border-radius: 50%;
  opacity: 0.7;
}

.photo-silhouette::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 10%;
  width: 70%;
  height: 42%;
  transform: translateX(-50%);
  background: #2c3948;
  clip-path: polygon(18% 0, 82% 0, 100% 100%, 0 100%);
  opacity: 0.7;
}

.redact-bars {
  position: absolute;
  inset: 16% 8% 24%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
}

.redact-bars span {
  display: block;
  height: 15%;
  background: #05070c;
  box-shadow: 0 0 0 1px rgba(212, 255, 63, 0.08);
}

.redact-stamp {
  position: absolute;
  left: 50%;
  top: 48%;
  z-index: 2;
  margin: 0;
  transform: translate(-50%, -50%) rotate(-18deg);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: var(--accent);
  border: 2px solid var(--accent);
  padding: 0.18rem 0.38rem;
  background: rgba(7, 11, 20, 0.62);
  text-shadow: 0 0 10px var(--glow);
}

.photo-label {
  position: absolute;
  left: 0.4rem;
  right: 0.4rem;
  bottom: 0.35rem;
  z-index: 2;
  margin: 0;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.52rem;
  letter-spacing: 0.14em;
  color: var(--accent-2);
}

.id-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
  border-bottom: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
  padding-bottom: 0.7rem;
  margin-bottom: 1.1rem;
}

.kicker {
  margin: 0;
  color: var(--accent-2);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
}

.serial {
  margin: 0;
  color: var(--accent-2);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.id-fields {
  margin: 0;
}

.id-row {
  display: grid;
  grid-template-columns: 8.2rem 1fr;
  gap: 0.75rem;
  align-items: baseline;
  padding: 0.55rem 0;
  border-bottom: 1px dotted color-mix(in srgb, var(--accent) 22%, transparent);
}

.id-row dt {
  margin: 0;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-2);
}

.id-row dd {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--accent);
  text-shadow: 0 0 12px var(--glow);
}

.concentrations-row {
  align-items: start;
}

.concentrations-row dt {
  padding-top: 0.35rem;
}

.concentrations {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.concentrations li {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 55%, transparent);
  padding: 0.32rem 0.55rem;
}

.links {
  display: flex;
  gap: 0.65rem;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 0.15rem;
}

.link-button {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.95rem;
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
  text-decoration: none;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  transition: all 0.2s ease;
}

.link-icon {
  width: 22px;
  height: 22px;
  object-fit: contain;
  flex-shrink: 0;
}

.link-button:hover {
  background: var(--accent);
  color: var(--bg-void);
  box-shadow: 0 0 18px var(--glow);
}

@media (max-width: 768px) {
  .id-body {
    grid-template-columns: 1fr;
  }

  .id-photo {
    min-height: 160px;
    max-width: 180px;
  }

  .id-row {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }

  .id-row dd {
    font-size: 1.05rem;
  }

  .hud-frame {
    inset: 4.4rem 0.6rem 0.8rem;
  }
}
</style>
