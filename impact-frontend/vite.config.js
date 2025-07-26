import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // Development proxy - Vercel production will call BACKEND origin directly
    proxy: {
      '/ws': {
        target: 'http://localhost:8000',
        ws: true, // Required for WebSocket proxying
        changeOrigin: true,
      },
      '/snapshot': 'http://localhost:8000',
    }
  }
}) 