import { authGuard } from "@auth0/auth0-vue";
import user from '../views/user/Index.vue'

const userRoutes = [
  	{ path: '/user', component: user, beforeEnter: authGuard,}
]

export { userRoutes };