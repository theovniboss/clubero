import { createApp } from "vue";
import { createAuth0 } from "@auth0/auth0-vue";
import { createPinia } from 'pinia'
import { router } from "./router/index.js";

import "./css/app.css";
import App from "./App.vue";


/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import all the icons in Free Solid, Free Regular, and Brands styles */
//import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
//import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(far)

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(
    createAuth0({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        authorizationParams: {
            redirect_uri: window.location.origin,
        },
    })
);

app.component("font-awesome-icon", FontAwesomeIcon)

app.mount("#app");
