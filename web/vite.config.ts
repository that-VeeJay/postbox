import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactScan from '@react-scan/vite-plugin-react-scan';

// https://vite.dev/config/
export default defineConfig({
   plugins: [
      react({
         babel: {
            plugins: [['babel-plugin-react-compiler', { target: '19' }]],
         },
      }),
      tailwindcss(),
      reactScan({
         enable: true,
         autoDisplayNames: true,
      }),
    ],
    base: process.env.VITE_BASE_PATH || "/postbox",
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
   server: {
      proxy: {
         '/api': {
            target: 'http://127.0.0.1:8000',
            changeOrigin: true,
            headers: {
               Accept: 'application/json',
            },
         },
      },
   },
});
