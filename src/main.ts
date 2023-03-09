import { createApp } from 'vue';
import { createPinia } from 'pinia';
import GlobalComponents from './globals.js';
import App from './App.vue';
import LogRocket from 'logrocket';
import './assets/base.css';

LogRocket.init('m9fwpv/real-pokedex');
const pinia = createPinia();
const app = createApp(App);

app.use(GlobalComponents);
app.use(pinia);
app.mount('#app');
