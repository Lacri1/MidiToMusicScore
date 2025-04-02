// Composables
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "../views/HomePage.vue" // 파일명 변경

const routes = [
  {
    path: "/",
    name: "home-page", // name도 변경
    component: HomePage,
    meta: {
      title: 'MP3 To Midi'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
