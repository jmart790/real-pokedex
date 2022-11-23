import { createApp } from 'vue'
import { createPinia } from 'pinia';
import GlobalComponents from './globals.js';
import axios from './plugins/axios';
import App from './App.vue'
import './assets/base.css'

const pinia = createPinia()
const app = createApp(App)

app.use(GlobalComponents);
app.use(pinia);
app.use(axios);
app.mount('#app');
