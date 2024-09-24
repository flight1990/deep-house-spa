import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from "./router/index.js";
import store from "./store/index.js";

import PrimeVue from 'primevue/config';
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
// import Aura from '@/presets/aura';
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Tooltip from 'primevue/tooltip';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from 'primevue/button';
import Card from "primevue/card";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

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
        // formField: {
        //     paddingX: "0.5rem",
        //     paddingY: "0.35rem",
        // }
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
    .use(ConfirmationService)
    .use(ToastService)
    .directive('tooltip', Tooltip)
    .component('Toast', Toast)
    .component('ConfirmDialog', ConfirmDialog)
    .component('DataTable', DataTable)
    .component('Column', Column)
    .component('Button', Button)
    .component('Card', Card)
    .component('InputText', InputText)
    .component('Textarea', Textarea)
    .mount('#app')
