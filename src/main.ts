import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const Page = { name: 'Page', render: () => null }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Page },
    { path: '/experience', name: 'Experience', component: Page },
    { path: '/skills', name: 'Skills', component: Page },
    { path: '/projects', name: 'Projects', component: Page },
    { path: '/contact', name: 'Contact', component: Page },
  ],
  scrollBehavior() {
    return false
  },
})

createApp(App).use(router).mount('#app')
