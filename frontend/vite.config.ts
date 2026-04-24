import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // We are not doing proxy from here, instead we will do it from backend using cors
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:5000',
  //     '/auth': 'http://localhost:5000'   // better-auth uses /auth routes
  //   }
  // }
})
