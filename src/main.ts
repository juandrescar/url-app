import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
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
    theme: {
      defaultTheme: 'myDarkTheme',
      themes: {
        myDarkTheme: {
          dark: false,
          colors: {
            primary: '#6200EE',
            secondary: '#03DAC6',
            background: '#121212',
            surface: '#1E1E1E',
            error: '#CF6679',
            success: '#4CAF50',
            warning: '#FB8C00',
            info: '#2196F3'
          }
        }
      }
    }
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');


