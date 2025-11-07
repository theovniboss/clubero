import { createApp } from "vue";
import { createPinia } from 'pinia'
import { router } from "./router/index.js";

import "./css/app.css";
import App from "./App.vue";
import { auth0 } from "./utils/auth0.js";
import { vClickOutside } from "./utils/directives.js";
import { FontAwesomeIcon } from './utils/fontawesome.js';

import { useUserStore } from './store/user.store.js';


const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(auth0);
app.component("font-awesome-icon", FontAwesomeIcon)
app.directive("click-outside", vClickOutside);
app.mount("#app");

const userStore = useUserStore();
await userStore.init(auth0);




