import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from "./router/index.js";
import store from "./store/index.js";

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

createApp(App)
    .use(router)
    .use(store)

    .use(PrimeVue, {
        theme: {
            preset: Aura
        }
    })

    .mount('#app')
