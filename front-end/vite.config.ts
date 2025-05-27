import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@views': path.resolve(__dirname, 'src/views'),
    },
  },
})

