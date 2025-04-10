import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ 
      // styles: { configFile: 'src/styles/settings.scss' },
      autoImport: true 
    }),
  ],
  server: {
    host: '0.0.0.0', // Permite acceso desde el host
    port: 5173, // Asegúrate de que este puerto esté expuesto en Docker
    strictPort: true, 
    watch: {
      usePolling: true, // Activa la detección de cambios en Docker
      interval: 100
    }
  },
});