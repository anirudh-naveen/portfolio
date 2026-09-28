import { computed, ref, watchEffect } from 'vue'

export type SiteTheme = 'modern' | 'cyberpunk'

// Keep in sync with the pre-paint script in index.html.
const STORAGE_KEY = 'site-theme'

function readSaved(): SiteTheme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'cyberpunk' ? 'cyberpunk' : 'modern'
  } catch {
    return 'modern'
  }
}

const theme = ref<SiteTheme>(readSaved())

watchEffect(() => {
  const root = document.documentElement
  root.classList.toggle('theme-cyber', theme.value === 'cyberpunk')
  root.classList.toggle('theme-modern', theme.value === 'modern')
  try {
    localStorage.setItem(STORAGE_KEY, theme.value)
  } catch {
    // Storage blocked; the choice still applies for this visit.
  }
})

const isCyber = computed(() => theme.value === 'cyberpunk')

function toggleTheme() {
  theme.value = isCyber.value ? 'modern' : 'cyberpunk'
}

export function useTheme() {
  return { theme, isCyber, toggleTheme }
}
