import { authGuard } from "@auth0/auth0-vue";
import club from "../views/club/Index.vue";
import cashFlow from "../views/club/CashFlow.vue";

const clubRoutes = [
	{ path: "/club", component: club, beforeEnter: authGuard },
	{ path: "/club/cash-flow", component: cashFlow, beforeEnter: authGuard },
];

export { clubRoutes };
