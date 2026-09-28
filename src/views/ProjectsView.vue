<template>
  <section id="projects" class="projects" :class="{ modern: !isCyber, vintage: isVintage }">
    <SectionCues up-to="/experience" down-to="/skills" />
    <div class="projects-container">
      <p class="kicker">
        {{ isCyber ? 'UPLINK // PUBLIC FEED' : isVintage ? 'Chapter III' : 'Selected work' }}
      </p>
      <h2 class="projects-title">Projects</h2>
      <p v-if="isVintage" class="scrap-hint">
        Tear a photo off the page to rearrange them.
        <button v-if="isReordered" type="button" class="tidy" @click="resetOrder">
          Tidy up
        </button>
      </p>

      <div ref="feedRef" class="feed">
        <article
          v-for="p in displayed"
          :key="p.slug"
          class="post"
          :class="{ torn: draggingSlug === p.slug }"
          :data-slug="p.slug"
          @pointerdown="onPointerDown($event, p.slug)"
        >
          <header v-if="isCyber" class="post-head">
            <div class="avatar" aria-hidden="true">
              <span>{{ p.author.initials }}</span>
            </div>
            <div class="ident">
              <p class="handle">{{ p.author.name }}</p>
              <p class="node">@{{ p.author.id }} · NODE PUBLIC</p>
            </div>
            <span class="live-tag">LIVE</span>
          </header>

          <a
            :href="p.link"
            class="post-img-link"
            target="_blank"
            rel="noreferrer"
            :aria-label="`Open ${p.title}`"
            draggable="false"
          >
            <img :src="p.image" :alt="p.title" class="post-img" draggable="false" />
          </a>

          <div class="post-body">
            <div class="actions">
              <button
                type="button"
                class="action like"
                :class="{ on: likes[p.slug]?.liked }"
                :aria-pressed="likes[p.slug]?.liked === true"
                :aria-label="isCyber ? undefined : `Like ${p.title} (${displayCount(p.slug)})`"
                @click="toggleLike(p.slug)"
              >
                <svg class="cyber-heart" viewBox="0 0 24 24" aria-hidden="true">
                  <path :d="heartPath" />
                </svg>
                {{ isCyber ? 'BOOST' : displayCount(p.slug) }}
              </button>
              <button v-if="isCyber" type="button" class="action comment" disabled>REPLY</button>
              <a :href="p.link" target="_blank" rel="noreferrer" class="action link">{{
                isCyber ? 'OPEN' : 'View project →'
              }}</a>
            </div>

            <p v-if="isCyber" class="like-count">
              <svg class="cyber-heart" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21.5 L2 11.2 L2 7.2 L6.2 3 L12 8.4 L17.8 3 L22 7.2 L22 11.2 Z" />
              </svg>
              {{ displayCount(p.slug) }} signal boost{{ displayCount(p.slug) === 1 ? '' : 's' }}
            </p>

            <p class="caption">
              <span v-if="isCyber" class="caption-user">@{{ p.author.id }}</span>
              <span class="caption-title">{{ p.title }}</span>
              <span class="caption-desc">{{ p.description }}</span>
            </p>

            <ul class="tags" aria-label="Skills">
              <li v-for="tag in p.tags" :key="tag">{{ isCyber ? '#' : '' }}{{ tag }}</li>
            </ul>

            <div v-if="isCyber" class="comment-lock">
              <input type="text" disabled placeholder="Add a transmission..." />
              <p>COMMENTS LOCKED BY AUTHOR</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import SectionCues from '@/components/SectionCues.vue'
import { useTearToReorder } from '@/composables/useTearToReorder'
import { useTheme } from '@/composables/useTheme'
import activeKnockoutImg from '@/assets/projects/ActiveKnockout.png'
import travelPlannerImg from '@/assets/projects/TravelPlanner.png'
import everythingMazesImg from '@/assets/projects/EverythingMazes.png'
import aniLounge from '@/assets/projects/AniLounge.png'
import fakeNewsImg from '@/assets/projects/FakeNewsDetector.png'

const { isCyber, isVintage } = useTheme()

const heartPath = computed(() =>
  isCyber.value
    ? 'M12 21.5 L2 11.2 L2 7.2 L6.2 3 L12 8.4 L17.8 3 L22 7.2 L22 11.2 Z'
    : 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
)

const NAMESPACE = 'anirudh-naveen-portfolio'
const STORAGE_KEY = 'maji-feed-likes'

const maji = { name: 'Maji', id: 'iMaji', initials: 'MJ' }
const thutoy = { name: 'Thutoy', id: 'Thutoy123', initials: 'TH' }

const projects = [
  {
    slug: 'anilounge',
    title: 'AniLounge',
    description: 'Web application to search, track, and discuss animated movies and series.',
    link: 'https://www.anilounge.net',
    image: aniLounge,
    author: maji,
    tags: [
      'MongoDB',
      'Express.js',
      'Vue.js',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Git',
      'Gemini',
    ],
  },
  {
    slug: 'fake-news-detector',
    title: 'Fake News Detector',
    description: 'Deep Learning model that is trained to detect fake or sensationalized news.',
    link: 'https://github.com/anirudh-naveen/fake-news-detector/blob/main/README.md',
    image: fakeNewsImg,
    author: maji,
    tags: ['Python', 'TensorFlow', 'Keras', 'Streamlit', 'Docker', 'LSTM', 'NumPy', 'Pandas'],
  },
  {
    slug: 'travel-planner',
    title: 'Travel Planner',
    description: 'Android app to share trip itineraries and experiences using a Firebase database.',
    link: 'https://github.com/anirudh-naveen/Travel-Planner?tab=readme-ov-file',
    image: travelPlannerImg,
    author: maji,
    tags: ['Java', 'Android Studio', 'Firebase', 'MVVM', 'Git'],
  },
  {
    slug: 'active-knockout',
    title: 'Active Knockout',
    description: 'Meta Quest VR exercise experience with interactive boxing gameplay.',
    link: 'https://github.com/anirudh-naveen/ActiveKnockout',
    image: activeKnockoutImg,
    author: thutoy,
    tags: ['Unity', 'C#', 'Blender', 'Meta Quest', 'VR'],
  },
  {
    slug: 'everything-mazes',
    title: 'Everything Mazes',
    description: 'Unity video game where players can generate, customize, and play through mazes.',
    link: 'https://github.com/anirudh-naveen/Everything-Mazes',
    image: everythingMazesImg,
    author: maji,
    tags: ['Unity', 'C#', 'ShaderLab', 'Git'],
  },
]

// Vintage only: visitors can tear the polaroids off and rearrange them.
const feedRef = ref<HTMLElement | null>(null)
const { displayed, draggingSlug, isReordered, onPointerDown, resetOrder } = useTearToReorder(
  projects,
  isVintage,
  feedRef,
  'vintage-project-order',
)

interface LikeState {
  liked: boolean
  pushed: boolean
  remote: number
}

const likes = reactive<Record<string, LikeState>>({})

function storage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Record<string, { liked: boolean; pushed: boolean }>) : {}
  } catch {
    return {}
  }
}

function persist() {
  const dump: Record<string, { liked: boolean; pushed: boolean }> = {}
  for (const slug of Object.keys(likes)) {
    const row = likes[slug]
    if (!row) continue
    dump[slug] = { liked: row.liked, pushed: row.pushed }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dump))
}

async function readRemote(slug: string) {
  const res = await fetch(`https://abacus.jasoncameron.dev/get/${NAMESPACE}/${slug}`)
  if (res.status === 404) return 0
  if (!res.ok) throw new Error('get failed')
  const data = (await res.json()) as { value?: number }
  return Number(data.value ?? 0)
}

async function hitRemote(slug: string) {
  const res = await fetch(`https://abacus.jasoncameron.dev/hit/${NAMESPACE}/${slug}`)
  if (!res.ok) throw new Error('hit failed')
  const data = (await res.json()) as { value?: number }
  return Number(data.value ?? 0)
}

function displayCount(slug: string) {
  const row = likes[slug]
  if (!row) return 0
  let value = row.remote
  if (row.liked && !row.pushed) value += 1
  if (!row.liked && row.pushed) value -= 1
  return Math.max(0, value)
}

async function toggleLike(slug: string) {
  const row = likes[slug]
  if (!row) return

  if (row.liked) {
    row.liked = false
    persist()
    return
  }

  row.liked = true
  persist()

  if (row.pushed) return

  try {
    row.remote = await hitRemote(slug)
    row.pushed = true
    persist()
  } catch {
    persist()
  }
}

onMounted(async () => {
  const saved = storage()
  await Promise.all(
    projects.map(async (project) => {
      const local = saved[project.slug]
      let remote = 0
      try {
        remote = await readRemote(project.slug)
      } catch {
        remote = 0
      }
      likes[project.slug] = {
        liked: local?.liked ?? false,
        pushed: local?.pushed ?? false,
        remote,
      }
    }),
  )
})
</script>

<style scoped>
.projects {
  --accent: #5ec8ff;
  --glow: rgba(94, 200, 255, 0.42);
  position: relative;
  min-height: 100vh;
  padding: 8.6rem 1rem 6.2rem;
  overflow: visible;
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
  clip-path: polygon(
    18px 0,
    100% 0,
    100% calc(100% - 18px),
    calc(100% - 18px) 100%,
    0 100%,
    0 18px
  );
}

.projects-container {
  position: relative;
  z-index: 1;
  max-width: 1120px;
  margin: 0 auto;
  text-align: center;
}

.projects-title {
  font-size: 2.6rem;
  color: var(--accent);
  margin: 0 0 1.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-shadow: 0 0 18px var(--glow);
}

.kicker {
  margin: 0 0 0.5rem;
  color: var(--accent-2);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.38em;
  text-transform: uppercase;
}

.feed-alias {
  margin: 0 0 1.8rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  color: var(--accent-2);
}

/* Three projects per row in every theme (one column on phones) */
.feed {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.35rem;
}

.post {
  text-align: left;
  background: linear-gradient(180deg, rgba(16, 24, 42, 0.96), rgba(10, 18, 32, 0.96));
  border: 1px solid color-mix(in srgb, var(--accent) 32%, #1d3344);
  clip-path: polygon(
    14px 0,
    100% 0,
    100% calc(100% - 14px),
    calc(100% - 14px) 100%,
    0 100%,
    0 14px
  );
}

.post-head {
  display: grid;
  grid-template-columns: 42px 1fr auto;
  gap: 0.7rem;
  align-items: center;
  padding: 0.8rem 0.9rem;
}

.avatar {
  width: 42px;
  height: 42px;
  border: 1px solid var(--accent);
  background:
    repeating-linear-gradient(
      0deg,
      rgba(94, 200, 255, 0.08),
      rgba(94, 200, 255, 0.08) 1px,
      transparent 1px,
      transparent 4px
    ),
    #070b14;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--accent);
}

.ident {
  min-width: 0;
}

.handle {
  margin: 0;
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.node {
  margin: 0.1rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: var(--accent-2);
}

.live-tag {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  color: var(--accent-2);
  border: 1px solid color-mix(in srgb, var(--accent-2) 45%, transparent);
  padding: 0.2rem 0.4rem;
}

.post-img-link {
  display: block;
  cursor: pointer;
}

.post-img-link:hover .post-img {
  filter: saturate(1) contrast(1.08) brightness(1.06);
}

.post-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
  filter: saturate(0.9) contrast(1.06);
  border-top: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
}

.post-body {
  padding: 0.8rem 0.95rem 1rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 0.55rem;
}

.action {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-2);
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--accent-2) 35%, transparent);
  padding: 0.35rem 0.55rem;
  cursor: pointer;
  text-decoration: none;
}

.action.like {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.cyber-heart {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  fill: none;
  stroke: #ff2d95;
  stroke-width: 1.6;
  stroke-linejoin: miter;
  stroke-linecap: square;
}

.action.like.on {
  color: #ff2d95;
  border-color: #ff2d95;
  box-shadow: 0 0 12px rgba(255, 45, 149, 0.45);
}

.action.like.on .cyber-heart {
  fill: #ff2d95;
  stroke: #ff2d95;
}

.action.comment {
  opacity: 0.45;
  cursor: not-allowed;
}

.action.link:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.like-count {
  margin: 0 0 0.55rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ff2d95;
}

.like-count .cyber-heart {
  fill: #ff2d95;
  stroke: #ff2d95;
}

.caption {
  margin: 0 0 0.55rem;
  color: var(--accent-2);
  font-size: 0.98rem;
  line-height: 1.45;
}

.caption-user {
  color: var(--accent);
  font-family: var(--font-mono);
  margin-right: 0.35rem;
}

.caption-title {
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.caption-desc {
  display: block;
  margin-top: 0.2rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0 0 0.9rem;
  padding: 0;
  list-style: none;
}

.tags li {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 42%, transparent);
  background: rgba(94, 200, 255, 0.08);
  padding: 0.22rem 0.42rem;
  clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
}

.comment-lock input {
  width: 100%;
  box-sizing: border-box;
  background: rgba(7, 11, 20, 0.8);
  border: 1px dashed color-mix(in srgb, var(--accent-2) 35%, transparent);
  color: var(--accent-2);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 0.55rem 0.65rem;
  opacity: 0.55;
}

.comment-lock p {
  margin: 0.4rem 0 0;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent-2);
}

/* Modern theme */

.projects.modern {
  --accent: var(--brand);
  background: var(--bg-void);
}

.projects.modern::before {
  display: none;
}

.projects.modern .kicker {
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.projects.modern .projects-title {
  margin-bottom: 2.4rem;
  color: var(--text);
  font-size: 2.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-transform: none;
  text-shadow: none;
}

.projects.modern .feed {
  gap: 1.5rem;
}

.projects.modern .post {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 18px;
  clip-path: none;
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.projects.modern .post:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

.projects.modern .post-img {
  height: 190px;
  border-top: 0;
  border-bottom: 1px solid var(--border);
  filter: none;
}

.projects.modern .post-img-link:hover .post-img {
  filter: none;
}

.projects.modern .post-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.1rem 1.25rem 1.1rem;
}

.projects.modern .caption {
  order: 1;
  margin-bottom: 0.9rem;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.55;
}

.projects.modern .caption-title {
  display: block;
  color: var(--text);
  font-size: 1.15rem;
  font-weight: 650;
  letter-spacing: -0.01em;
  text-transform: none;
}

.projects.modern .caption-desc {
  margin-top: 0.3rem;
}

.projects.modern .tags {
  order: 2;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.projects.modern .tags li {
  background: var(--surface-hover);
  border: 0;
  border-radius: 999px;
  clip-path: none;
  color: var(--text-muted);
  font-size: 0.74rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
  padding: 0.2rem 0.6rem;
}

.projects.modern .actions {
  order: 3;
  align-items: center;
  justify-content: space-between;
  margin: auto 0 0;
  padding-top: 0.9rem;
  border-top: 1px solid var(--border);
}

.projects.modern .action {
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
  padding: 0.35rem 0.75rem;
}

.projects.modern .action.like:hover {
  border-color: var(--border-strong);
  color: var(--text);
}

.projects.modern .cyber-heart {
  width: 15px;
  height: 15px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.projects.modern .action.like.on {
  background: color-mix(in srgb, var(--like) 10%, transparent);
  border-color: color-mix(in srgb, var(--like) 40%, transparent);
  color: var(--like);
  box-shadow: none;
}

.projects.modern .action.like.on .cyber-heart {
  fill: var(--like);
  stroke: var(--like);
}

.projects.modern .action.link {
  border: 0;
  padding-right: 0;
  color: var(--accent);
  font-weight: 600;
}

.projects.modern .action.link:hover {
  color: var(--text);
}

/* Vintage theme: polaroids taped into the scrapbook */

.projects.vintage {
  background: var(--paper-a), var(--bg-void);
}

.projects.vintage .kicker {
  color: var(--accent);
  font-family: var(--font-hand);
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
  transform: rotate(-2deg);
}

.projects.vintage .projects-title {
  font-family: var(--font-display);
  font-size: 3.4rem;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.projects.vintage .feed {
  gap: 2.4rem 2rem;
}

.projects.vintage .post {
  position: relative;
  overflow: visible;
  padding: 12px 12px 0;
  border: 1px solid rgb(62 39 17 / 0.12);
  border-radius: 2px;
  background:
    radial-gradient(ellipse at 0% 100%, rgb(139 90 43 / 0.1), transparent 40%),
    #faf3df;
  box-shadow: var(--shadow);
  transform: rotate(-1.2deg);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.projects.vintage .post:nth-child(3n + 2) {
  transform: rotate(0.9deg);
}

.projects.vintage .post:nth-child(3n) {
  transform: rotate(-0.4deg);
}

.projects.vintage .post:hover {
  transform: rotate(0deg) translateY(-4px);
  box-shadow: 4px 12px 22px -6px rgb(62 39 17 / 0.45);
}

.projects.vintage .post::before {
  content: '';
  position: absolute;
  top: -13px;
  left: 50%;
  z-index: 1;
  width: 104px;
  height: 26px;
  background: var(--tape);
  box-shadow: 0 1px 2px rgb(62 39 17 / 0.15);
  clip-path: polygon(2% 10%, 98% 0, 100% 90%, 0 100%);
  transform: translateX(-50%) rotate(-3deg);
}

/* Tear-to-rearrange */

.projects.vintage .post {
  cursor: grab;
  user-select: none;
  -webkit-touch-callout: none;
}

.projects.vintage .post-img-link,
.projects.vintage .action {
  -webkit-user-drag: none;
}

.projects.vintage .post.torn {
  z-index: 20;
  cursor: grabbing;
  transform: rotate(0deg) scale(1.04);
  box-shadow: 10px 22px 34px -10px rgb(62 39 17 / 0.55);
  transition: box-shadow 0.2s ease;
  animation: rip 0.22s ease-out;
}

/* Half the tape stays behind: what's left on the photo has a ragged, ripped edge */
.projects.vintage .post.torn::before {
  width: 50px;
  margin-left: -26px;
  clip-path: polygon(0 12%, 100% 0, 88% 22%, 100% 40%, 84% 58%, 96% 78%, 86% 100%, 2% 100%);
}

@keyframes rip {
  0% {
    transform: rotate(0deg) scale(1);
  }
  40% {
    transform: rotate(-2.5deg) scale(1.07);
  }
  100% {
    transform: rotate(0deg) scale(1.04);
  }
}

.projects.vintage .scrap-hint {
  margin: -1.2rem 0 2rem;
  color: var(--text-muted);
  font-family: var(--font-hand);
  font-size: 1.3rem;
  transform: rotate(-1deg);
}

.projects.vintage .tidy {
  margin-left: 0.4rem;
  padding: 0;
  border: 0;
  background: none;
  color: var(--accent);
  font: inherit;
  text-decoration: underline wavy color-mix(in srgb, var(--accent) 50%, transparent);
  text-underline-offset: 4px;
  cursor: pointer;
}

.projects.vintage .post-img {
  border: 1px solid rgb(62 39 17 / 0.2);
  filter: sepia(0.45) saturate(0.8) contrast(0.95);
  transition: filter 0.3s ease;
}

.projects.vintage .post-img-link:hover .post-img {
  filter: sepia(0.1);
}

.projects.vintage .post-body {
  padding: 0.9rem 0.4rem 0.9rem;
}

.projects.vintage .caption {
  font-size: 1.05rem;
}

/* Handwritten polaroid caption */
.projects.vintage .caption-title {
  color: var(--ink-blue);
  font-family: var(--font-hand);
  font-size: 1.9rem;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.1;
}

.projects.vintage .tags li {
  border: 1px solid var(--border);
  border-radius: 2px;
  background: rgb(255 250 235 / 0.6);
  font-size: 0.85rem;
  font-style: italic;
}

.projects.vintage .actions {
  border-top: 1px dashed var(--border);
}

.projects.vintage .action {
  border-radius: 2px;
  font-size: 0.95rem;
  background: transparent;
}

.projects.vintage .action.link {
  font-style: italic;
}

@media (max-width: 768px) {
  .projects.modern .projects-title {
    font-size: 2.1rem;
  }

  .projects.vintage .projects-title {
    font-size: 2.6rem;
  }
}

@media (max-width: 768px) {
  .projects-title {
    font-size: 2rem;
  }

  .post-img {
    height: 160px;
  }

  .projects.modern .post-img {
    height: 150px;
  }
}

@media (max-width: 640px) {
  .projects-container {
    max-width: 560px;
  }

  .feed {
    grid-template-columns: 1fr;
  }

  .post-img,
  .projects.modern .post-img {
    height: 210px;
  }
}
</style>
