

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/articulos-regionales/api': {
        target: 'http://localhost:3000', // URL del backend
        changeOrigin: true,
      },
    },
  },
});