import { authGuard } from "@auth0/auth0-vue";
import club from '../views/club/Index.vue'

const clubRoutes = [
	{ path: '/club', component: club, beforeEnter: authGuard,}
]

export { clubRoutes };