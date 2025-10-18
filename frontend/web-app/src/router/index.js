import { createWebHashHistory, createRouter } from 'vue-router'
import { authGuard } from "@auth0/auth0-vue";

import dashboard from '../views/dashboard/Index.vue'
import { userRoutes } from './user.js'

const routes = [
  { path: '/', component: dashboard, beforeEnter: authGuard,},
  ...userRoutes,
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})