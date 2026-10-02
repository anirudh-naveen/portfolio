import { computed, nextTick, ref, watchEffect } from 'vue'

// Ordered left to right as they appear on the navbar switch.
export const THEMES = ['vintage', 'modern', 'cyberpunk'] as const
export type SiteTheme = (typeof THEMES)[number]

// Keep in sync with the pre-paint script in index.html.
const STORAGE_KEY = 'site-theme'

const themeClass: Record<SiteTheme, string> = {
  vintage: 'theme-vintage',
  modern: 'theme-modern',
  cyberpunk: 'theme-cyber',
}

function readSaved(): SiteTheme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return THEMES.find((t) => t === saved) ?? 'modern'
  } catch {
    return 'modern'
  }
}

const theme = ref<SiteTheme>(readSaved())

watchEffect(() => {
  const root = document.documentElement
  for (const t of THEMES) root.classList.toggle(themeClass[t], t === theme.value)
  try {
    localStorage.setItem(STORAGE_KEY, theme.value)
  } catch {
    // Storage blocked; the choice still applies for this visit.
  }
})

const isCyber = computed(() => theme.value === 'cyberpunk')
const isVintage = computed(() => theme.value === 'vintage')

// Switching themes plays a "time warp" loading screen. The theme swaps only once the screen is
// covered; the trip through time (the year roll) starts once the new theme's images and fonts
// are ready, so the re-render never competes with the animation and makes it stutter.
export const WARP_COVER_MS = 320
export const WARP_REVEAL_MS = 420
export const WARP_ROLL_MS = 1000
// Lets the roll settle on the destination year before the screen lifts.
const ARRIVAL_PAUSE_MS = 180
const ASSET_WAIT_CAP_MS = 3000

// The theme the switch shows: updates at once, while `theme` waits for the warp to cover the page.
const selectedTheme = ref<SiteTheme>(theme.value)
const warping = ref(false)
const warpFrom = ref<SiteTheme>(theme.value)
const warpTo = ref<SiteTheme>(theme.value)
// True once the new theme is ready and the year can roll.
const warpLoaded = ref(false)
let busy = false

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms))
// Falls back to a timer, as hidden tabs pause animation frames.
const nextFrame = () =>
  Promise.race([new Promise<void>((resolve) => requestAnimationFrame(() => resolve())), wait(50)])

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Resolves once the page re-rendered in the new theme has its fonts and images decoded.
async function themeAssetsReady() {
  await nextTick()
  await nextFrame()
  await nextFrame()
  const images = [...document.images].filter((img) => img.loading !== 'lazy')
  await Promise.race([
    Promise.allSettled([document.fonts.ready, ...images.map((img) => img.decode())]),
    wait(ASSET_WAIT_CAP_MS),
  ])
}

async function runWarp() {
  busy = true
  warpFrom.value = theme.value
  warpTo.value = selectedTheme.value
  warpLoaded.value = false
  warping.value = true
  // A beat past the fade-in, so the screen is fully opaque before anything changes.
  await wait(WARP_COVER_MS + 100)

  // Picks made while covered retarget the trip instead of queueing another one.
  while (theme.value !== selectedTheme.value) {
    warpLoaded.value = false
    warpTo.value = selectedTheme.value
    theme.value = selectedTheme.value
    await themeAssetsReady()
    warpLoaded.value = true
    await wait(WARP_ROLL_MS + ARRIVAL_PAUSE_MS)
  }

  warping.value = false
  await wait(WARP_REVEAL_MS)
  busy = false
  if (selectedTheme.value !== theme.value) runWarp()
}

function setTheme(next: SiteTheme) {
  selectedTheme.value = next
  if (prefersReducedMotion()) {
    theme.value = next
    return
  }
  if (!busy && next !== theme.value) runWarp()
}

export function useTheme() {
  return {
    theme,
    selectedTheme,
    isCyber,
    isVintage,
    setTheme,
    warping,
    warpFrom,
    warpTo,
    warpLoaded,
  }
}
