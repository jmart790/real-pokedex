import { createApp } from 'vue';
import { createPinia } from 'pinia';
import GlobalComponents from './globals.js';
import App from './App.vue';
import './assets/base.css';

const pinia = createPinia();
const app = createApp(App);

app.use(GlobalComponents);
app.use(pinia);
app.mount('#app');
