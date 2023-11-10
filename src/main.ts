import './assets/main.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import Vuetify from './vuetify';

const app = createApp(App);

app.use(Vuetify);
app.use(router);

app.mount('#app');
