import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3500,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  root:'.',
  build: {
    // sourcemap: true, 
    outDir: 'dist',
     
  },
});
