import { createApp } from 'vue';
import { createPinia } from 'pinia';
import GlobalComponents from './globals.js';
import App from './App.vue';
import LogRocket from 'logrocket';
import './assets/base.css';

const pinia = createPinia();
const app = createApp(App);

const isProd = import.meta.env.PROD;
if (!isProd) LogRocket.init('m9fwpv/real-pokedex');

app.use(GlobalComponents);
app.use(pinia);
app.mount('#app');
