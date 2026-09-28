<template>
  <section id="projects" class="projects" :class="{ modern: !isCyber }">
    <SectionCues up-to="/experience" down-to="/skills" />
    <div class="projects-container">
      <p class="kicker">{{ isCyber ? 'UPLINK // PUBLIC FEED' : 'Selected work' }}</p>
      <h2 class="projects-title">Projects</h2>

      <div class="feed">
        <article v-for="p in projects" :key="p.slug" class="post">
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
          >
            <img :src="p.image" :alt="p.title" class="post-img" />
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
import { computed, onMounted, reactive } from 'vue'
import SectionCues from '@/components/SectionCues.vue'
import { useTheme } from '@/composables/useTheme'
import activeKnockoutImg from '@/assets/projects/ActiveKnockout.png'
import travelPlannerImg from '@/assets/projects/TravelPlanner.png'
import everythingMazesImg from '@/assets/projects/EverythingMazes.png'
import aniLounge from '@/assets/projects/AniLounge.png'
import fakeNewsImg from '@/assets/projects/FakeNewsDetector.png'

const { isCyber } = useTheme()

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

.projects.modern .projects-container {
  max-width: 1120px;
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

@media (max-width: 768px) {
  .projects.modern .projects-title {
    font-size: 2.1rem;
  }
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
