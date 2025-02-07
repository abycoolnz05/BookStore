import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import BookDetails from '../components/BookDetails.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/book/:id', component: BookDetails }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router