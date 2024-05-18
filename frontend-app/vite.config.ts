import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import dotenv from 'dotenv';


dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  server: {
    port: 3500,
    proxy: {
      '/api':{ 
      target: process.env.VITE_API_URL,
      changeOrigin: true,
      secure: false
    }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true, // Useful for debugging in production, you can set this to false for production builds to reduce the build size
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      },
    },
    chunkSizeWarningLimit: 1000 // Adjust this as needed
  },
  root: '.', // Ensure root is properly set, but this is the default
});
