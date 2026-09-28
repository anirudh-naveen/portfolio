import { computed, ref, watchEffect } from 'vue'

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

function setTheme(next: SiteTheme) {
  theme.value = next
}

export function useTheme() {
  return { theme, isCyber, isVintage, setTheme }
}
