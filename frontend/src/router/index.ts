import TeamPageVue from '@/views/TeamPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/team', component: TeamPageVue },
    
  ]
})

export default router
