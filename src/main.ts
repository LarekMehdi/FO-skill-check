import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Toast, { POSITION, type PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';

import Aura from '@primeuix/themes/aura';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const options: PluginOptions = {
    position: POSITION.TOP_CENTER
};

app.use(Toast, options);
app.use(router);
app.use(pinia);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app');
