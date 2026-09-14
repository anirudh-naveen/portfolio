<template>
  <section id="projects" class="projects">
    <div class="projects-container">
      <p class="kicker">UPLINK // PUBLIC FEED</p>
      <h2 class="projects-title">Projects</h2>

      <div class="feed">
        <article v-for="p in projects" :key="p.slug" class="post">
          <header class="post-head">
            <div class="avatar" aria-hidden="true">
              <span>{{ p.author.initials }}</span>
            </div>
            <div class="ident">
              <p class="handle">{{ p.author.name }}</p>
              <p class="node">@{{ p.author.id }} · NODE PUBLIC</p>
            </div>
            <span class="live-tag">LIVE</span>
          </header>

          <img :src="p.image" :alt="p.title" class="post-img" />

          <div class="post-body">
            <div class="actions">
              <button
                type="button"
                class="action like"
                :class="{ on: likes[p.slug]?.liked }"
                :aria-pressed="likes[p.slug]?.liked === true"
                @click="toggleLike(p.slug)"
              >
                <svg class="cyber-heart" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 21.5 L2 11.2 L2 7.2 L6.2 3 L12 8.4 L17.8 3 L22 7.2 L22 11.2 Z" />
                </svg>
                BOOST
              </button>
              <button type="button" class="action comment" disabled>REPLY</button>
              <a :href="p.link" target="_blank" rel="noreferrer" class="action link">OPEN</a>
            </div>

            <p class="like-count">
              <svg class="cyber-heart" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 21.5 L2 11.2 L2 7.2 L6.2 3 L12 8.4 L17.8 3 L22 7.2 L22 11.2 Z" />
              </svg>
              {{ displayCount(p.slug) }} signal boost{{ displayCount(p.slug) === 1 ? '' : 's' }}
            </p>

            <p class="caption">
              <span class="caption-user">@{{ p.author.id }}</span>
              <span class="caption-title">{{ p.title }}</span>
              <span class="caption-desc">{{ p.description }}</span>
            </p>

            <ul class="tags" aria-label="Skills">
              <li v-for="tag in p.tags" :key="tag">#{{ tag }}</li>
            </ul>

            <div class="comment-lock">
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
import { onMounted, reactive } from 'vue'
import activeKnockoutImg from '@/assets/projects/ActiveKnockout.png'
import travelPlannerImg from '@/assets/projects/TravelPlanner.png'
import everythingMazesImg from '@/assets/projects/EverythingMazes.png'
import findAnimationImg from '@/assets/projects/FindAnimation.png'
import fakeNewsImg from '@/assets/projects/FakeNewsDetector.png'

const NAMESPACE = 'anirudh-naveen-portfolio'
const STORAGE_KEY = 'maji-feed-likes'

const maji = { name: 'Maji', id: 'iMaji', initials: 'MJ' }
const thutoy = { name: 'Thutoy', id: 'Thutoy123', initials: 'TH' }

const projects = [
  {
    slug: 'find-animation',
    title: 'Find Animation',
    description: 'MEVN stack web app to search, view, and track animation movies and series.',
    link: 'https://github.com/anirudh-naveen/Find-Animation/blob/main/README.md',
    image: findAnimationImg,
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
    description:
      'Deep Learning model that is trained to detect fake news with a certain confidence level.',
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
    description:
      'Unity-built video game where players can generate, customize, and play through mazes.',
    link: 'https://github.com/anirudh-naveen/Everything-Mazes',
    image: everythingMazesImg,
    author: maji,
    tags: ['Unity', 'C#', 'ShaderLab', 'Git'],
  },
]

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
  padding: 6rem 1rem 4rem;
  overflow: hidden;
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
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
}

.projects-title {
  font-size: 2.6rem;
  color: var(--accent);
  margin: 0 0 0.4rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-shadow: 0 0 18px var(--glow);
}

.kicker {
  margin: 0 0 0.5rem;
  color: var(--accent-2);
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.38em;
  text-transform: uppercase;
}

.feed-alias {
  margin: 0 0 1.8rem;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  color: var(--accent-2);
}

.feed {
  display: flex;
  flex-direction: column;
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
  font-family: 'Share Tech Mono', monospace;
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
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: var(--accent-2);
}

.live-tag {
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  color: var(--accent-2);
  border: 1px solid color-mix(in srgb, var(--accent-2) 45%, transparent);
  padding: 0.2rem 0.4rem;
}

.post-img {
  width: 100%;
  height: 280px;
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
  gap: 0.45rem;
  margin-bottom: 0.55rem;
}

.action {
  font-family: 'Share Tech Mono', monospace;
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
  font-family: 'Share Tech Mono', monospace;
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
  font-family: 'Share Tech Mono', monospace;
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
  font-family: 'Share Tech Mono', monospace;
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
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 0.55rem 0.65rem;
  opacity: 0.55;
}

.comment-lock p {
  margin: 0.4rem 0 0;
  font-family: 'Share Tech Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent-2);
}

@media (max-width: 768px) {
  .projects-title {
    font-size: 2rem;
  }

  .post-img {
    height: 220px;
  }
}
</style>
