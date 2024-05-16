import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3500,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  build: {
    sourcemap: true, 
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }

    
  },
});
