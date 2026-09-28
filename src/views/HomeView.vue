<template>
  <section id="home" class="landing" :class="{ modern: !isCyber, vintage: isVintage }">
    <div class="hud-frame"></div>
    <svg v-if="isVintage" class="compass" viewBox="-56 -60 112 116" aria-hidden="true">
      <circle r="46" fill="none" stroke="currentColor" stroke-width="0.9" />
      <circle r="42" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="1 2" />
      <g stroke="currentColor" stroke-width="0.6" stroke-linejoin="round">
        <path
          d="M0 -26 L5 -5 L26 0 L5 5 L0 26 L-5 5 L-26 0 L-5 -5 Z"
          transform="rotate(45)"
          fill="none"
        />
        <path
          d="M0 -40 L7 -7 L0 0 Z M40 0 L7 7 L0 0 Z M0 40 L-7 7 L0 0 Z M-40 0 L-7 -7 L0 0 Z"
          fill="currentColor"
        />
        <path
          d="M0 -40 L-7 -7 L0 0 Z M40 0 L7 -7 L0 0 Z M0 40 L7 7 L0 0 Z M-40 0 L-7 7 L0 0 Z"
          fill="none"
        />
      </g>
      <text y="-49" text-anchor="middle" font-size="10" fill="currentColor">N</text>
    </svg>
    <SectionCues down-to="/experience" />
    <div class="container">
      <p class="page-kicker">{{ kicker }}</p>
      <h2 class="home-title">Bio</h2>
      <article class="id-card">
        <header v-if="isCyber" class="id-header">
          <p class="kicker">NET // CITIZEN FILE</p>
          <p class="serial">ID-AN-020806 // STATUS: CLEAR</p>
        </header>

        <div class="id-body">
          <div v-if="!isCyber" class="id-photo" aria-hidden="true">
            <span class="monogram">{{ isVintage ? 'A.N.' : 'AN' }}</span>
          </div>
          <div v-else class="id-photo" aria-hidden="true">
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
              <dt>Birthdate</dt>
              <dd>02/08/2006</dd>
            </div>
            <div class="id-row">
              <dt>Residence</dt>
              <dd>Atlanta, GA</dd>
            </div>
            <div class="id-row">
              <dt>Occupation</dt>
              <dd>Software Engineer</dd>
            </div>
            <div class="id-row concentrations-row">
              <dt>Specialization</dt>
              <dd>
                <ul class="concentrations">
                  <li>Artificial Intelligence</li>
                  <li>Cybersecurity</li>
                  <li>Full-Stack</li>
                </ul>
              </dd>
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
  </section>
</template>

<script lang="ts" setup>
import SectionCues from '@/components/SectionCues.vue'
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { isCyber, isVintage } = useTheme()

const kicker = computed(() =>
  isCyber.value ? 'IDENTIFICATION // CONFIDENTIAL' : isVintage.value ? 'Chapter I' : 'Introduction',
)
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
  box-sizing: border-box;
  overflow: visible;
  background: radial-gradient(ellipse at top left, #1c2a12 0%, #0a1220 46%, #070b14 100%);
  font-family: var(--font-body);
  padding: 6rem 1rem 6.2rem;
  color: var(--text);
}

.page-kicker {
  margin: 0 0 0.5rem;
  color: var(--accent-2);
  font-family: var(--font-mono);
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
  font-family: var(--font-mono);
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
  font-family: var(--font-mono);
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
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
}

.serial {
  margin: 0;
  color: var(--accent-2);
  font-family: var(--font-mono);
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
  font-family: var(--font-mono);
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
  font-family: var(--font-mono);
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
  font-family: var(--font-mono);
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

/* Modern theme */

.landing.modern {
  --accent: var(--brand);
  background: var(--bg-void);
}

.landing.modern .hud-frame {
  display: none;
}

.landing.modern .page-kicker {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.landing.modern .home-title {
  color: var(--text);
  font-size: 2.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-transform: none;
  text-shadow: none;
}

.landing.modern .id-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  clip-path: none;
  box-shadow: var(--shadow);
  padding: 2rem;
}

.landing.modern .id-body {
  gap: 1.75rem;
  margin-bottom: 1.75rem;
}

.landing.modern .id-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--brand), color-mix(in srgb, var(--brand) 50%, #ec4899));
}

.landing.modern .monogram {
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.landing.modern .id-row {
  padding: 0.7rem 0;
  border-bottom: 1px solid var(--border);
}

.landing.modern .id-row:last-child {
  border-bottom: 0;
}

.landing.modern .id-row dt {
  color: var(--text-muted);
  font-size: 0.88rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
}

.landing.modern .id-row dd {
  color: var(--text);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-transform: none;
  text-shadow: none;
}

.landing.modern .concentrations-row dt {
  padding-top: 0.25rem;
}

.landing.modern .concentrations li {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border: 0;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
  padding: 0.3rem 0.75rem;
}

.landing.modern .link-button {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 999px;
  clip-path: none;
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
  padding: 0.5rem 1rem 0.5rem 0.75rem;
}

.landing.modern .link-button:hover {
  background: var(--surface-hover);
  border-color: var(--border-strong);
  color: var(--text);
  box-shadow: none;
}

.landing.modern .link-icon {
  width: 20px;
  height: 20px;
}

/* Vintage theme: a page taped into a scrapbook */

.landing.vintage {
  background: var(--paper-a), var(--bg-void);
}

.landing.vintage .compass {
  position: absolute;
  right: 4%;
  bottom: 7%;
  width: 170px;
  color: var(--text-muted);
  opacity: 0.32;
  transform: rotate(-14deg);
  font-family: var(--font-display);
  pointer-events: none;
}

.landing.vintage .page-kicker {
  color: var(--accent);
  font-family: var(--font-hand);
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
  transform: rotate(-2deg);
}

.landing.vintage .home-title {
  font-family: var(--font-display);
  font-size: 3.4rem;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.landing.vintage .id-card {
  position: relative;
  border-radius: 2px;
  border-color: color-mix(in srgb, var(--border) 70%, transparent);
  background:
    linear-gradient(180deg, rgb(255 252 240 / 0.5), transparent 40%),
    radial-gradient(ellipse at 100% 100%, rgb(139 90 43 / 0.14), transparent 45%),
    var(--bg-card);
  transform: rotate(-0.6deg);
}

.landing.vintage .id-card::before,
.landing.vintage .id-card::after {
  content: '';
  position: absolute;
  top: -12px;
  width: 96px;
  height: 26px;
  background: var(--tape);
  box-shadow: 0 1px 2px rgb(62 39 17 / 0.15);
  clip-path: polygon(3% 8%, 97% 0, 100% 92%, 1% 100%);
}

.landing.vintage .id-card::before {
  left: 18px;
  transform: rotate(-6deg);
}

.landing.vintage .id-card::after {
  right: 18px;
  transform: rotate(5deg);
}

.landing.vintage .id-photo {
  position: relative;
  overflow: visible;
  border: 7px solid #f8f0da;
  border-bottom-width: 22px;
  border-radius: 1px;
  background:
    radial-gradient(ellipse at 50% 35%, #b89464, #7a5a36 70%, #4d3720),
    #7a5a36;
  box-shadow: var(--shadow);
  transform: rotate(-3deg);
}

/* Black photo corners holding the picture on the page */
.landing.vintage .id-photo::before,
.landing.vintage .id-photo::after {
  content: '';
  position: absolute;
  width: 22px;
  height: 22px;
  background: #2b1d10;
}

.landing.vintage .id-photo::before {
  top: -10px;
  left: -10px;
  clip-path: polygon(0 0, 100% 0, 0 100%);
}

.landing.vintage .id-photo::after {
  right: -10px;
  bottom: -25px;
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}

.landing.vintage .monogram {
  color: #f3e3bf;
  font-family: var(--font-display);
  font-size: 2.6rem;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 0 rgb(0 0 0 / 0.3);
}

.landing.vintage .id-row {
  border-bottom: 1px dashed var(--border);
}

.landing.vintage .id-row dt {
  font-size: 0.95rem;
  font-variant: small-caps;
  letter-spacing: 0.06em;
  text-transform: lowercase;
}

.landing.vintage .id-row dd {
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0;
}

/* Rubber-stamped specialisations */
.landing.vintage .concentrations li {
  border: 1.5px solid var(--accent);
  border-radius: 3px;
  background: transparent;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.85;
  transform: rotate(-1.5deg);
}

.landing.vintage .concentrations li:nth-child(2) {
  color: var(--ink-blue);
  border-color: var(--ink-blue);
  transform: rotate(1.2deg);
}

.landing.vintage .link-button {
  border-radius: 2px;
  border-style: dashed;
  font-size: 1rem;
  font-style: italic;
  background: rgb(255 250 235 / 0.4);
}

.landing.vintage .link-button:hover {
  border-style: solid;
  border-color: var(--accent);
  color: var(--accent);
  background: rgb(255 250 235 / 0.7);
}

.landing.vintage .link-icon {
  filter: sepia(0.7) saturate(0.8);
}

@media (max-width: 768px) {
  .landing.modern .home-title {
    font-size: 2.1rem;
  }

  .landing.vintage .home-title {
    font-size: 2.6rem;
  }

  .landing.modern .id-card {
    padding: 1.4rem;
  }

  .landing.vintage .compass {
    width: 110px;
    bottom: 3%;
  }
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
