import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import HomeView from './views/HomeView.vue'
import ProjectsView from '/Users/anirudh/Documents/GitHub/Website/vue-projectfiles/src/views/ProjectsView.vue'
import ContactView from '/Users/anirudh/Documents/GitHub/Website/vue-projectfiles/src/views/ProjectsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/projects', name: 'Projects', component: ProjectsView },
    { path: '/contact', name: 'Contact', component: ContactView }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

createApp(App).use(router).mount('#app')
