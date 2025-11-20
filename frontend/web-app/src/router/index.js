import { createWebHashHistory, createRouter } from 'vue-router'
import { authGuard } from "@auth0/auth0-vue";

import dashboard from '../views/dashboard/Index.vue'
import { userRoutes } from './user.js'
import { clubRoutes } from './club.js'



const routes = [
	{
		path: "/",
		component: dashboard,
		beforeEnter: authGuard,
	},
	...userRoutes,
	...clubRoutes
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})