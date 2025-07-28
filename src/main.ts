import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Toast, { type PluginOptions } from "vue-toastification";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const options: PluginOptions = {
    // You can set your default options here
};

app.use(Toast, options);
app.use(router);
app.use(pinia);

app.mount('#app');
