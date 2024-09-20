import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from "./router/index.js";
import store from "./store/index.js";

import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
import Button from 'primevue/button';

const Preset = definePreset(Aura, {
    semantic: {
        primary: {
            '50': '#fff8eb',
            '100': '#feeac7',
            '200': '#fdd28a',
            '300': '#fcbb4d',
            '400': '#fbab24',
            '500': '#f59e0b',
            '600': '#d98b06',
            '700': '#b47409',
            '800': '#92610e',
            '900': '#78510f',
            '950': '#452c03',
        },
    }
});

createApp(App)
    .use(router)
    .use(store)

    .use(PrimeVue, {
        theme: {
            preset: Preset,
            options: {
                darkModeSelector: '.dark',

            },
        },
    })

    .component('Button', Button)
    .mount('#app')
