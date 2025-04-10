import { createApp } from 'vue'
import App from './App.vue'
// import './style.css'
import { createVuetify } from 'vuetify';
// import 'vuetify/styles';
// import 'vuetify/styles';
// import 'vuetify/dist/vuetify.min.css';
import 'vuetify/dist/vuetify.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css';
import router from './router';

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },
      },
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');


