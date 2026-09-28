import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import '@fontsource/rajdhani/latin-500.css'
import '@fontsource/rajdhani/latin-600.css'
import '@fontsource/rajdhani/latin-700.css'
import '@fontsource/share-tech-mono/latin-400.css'
import '@fontsource-variable/inter'
import '@fontsource/im-fell-english/latin-400.css'
import '@fontsource/im-fell-english/latin-400-italic.css'
import '@fontsource-variable/eb-garamond'
import '@fontsource-variable/eb-garamond/wght-italic.css'
import '@fontsource-variable/caveat'
import App from './App.vue'

const Page = { name: 'Page', render: () => null }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Page },
    { path: '/experience', name: 'Experience', component: Page },
    { path: '/projects', name: 'Projects', component: Page },
    { path: '/skills', name: 'Skills', component: Page },
    { path: '/contact', name: 'Contact', component: Page },
  ],
  scrollBehavior() {
    return false
  },
})

createApp(App).use(router).mount('#app')
