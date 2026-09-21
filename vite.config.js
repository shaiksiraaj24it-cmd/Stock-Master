import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Forward /api/* to the StockMaster backend (server/), so the React app
    // can call fetch("/api/stocks") without any CORS setup during development.
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
