import { createMemoryHistory, createRouter } from 'vue-router'
import { authGuard } from "@auth0/auth0-vue";

import dashboard from '../views/dashboard/Index.vue'

const routes = [
  { path: '/', component: dashboard, beforeEnter: authGuard,}
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})