
import GalleryPageVue from '@/views/GalleryPage.vue'
import TeamPageVue from '@/views/TeamPage.vue'
import QuestionsPageVue from '@/views/QuestionsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import OpenPageVue from '@/views/OpenPage.vue'
import HomePageVue from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: OpenPageVue },
    { path: '/home', component: HomePageVue },
    { path: '/team', component: TeamPageVue },
    { path: '/questions', component: QuestionsPageVue },
    { path: '/gallery', component: GalleryPageVue },

  ]
})

export default router
