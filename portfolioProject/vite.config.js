import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Set the chunk size warning limit to 1000 kB
  },
})
