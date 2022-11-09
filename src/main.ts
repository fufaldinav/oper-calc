import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/main.scss';

import { Quasar } from 'quasar';
import quasarLang from 'quasar/lang/ru';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

const app = createApp(App);

app.use(router);

app.use(Quasar, {
  plugins: {},
  lang: quasarLang,
});

app.mount('#app');
