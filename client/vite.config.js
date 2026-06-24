import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0'
  }
})

// "scripts": {
//     "dev": "vite",
//     "build": "vite build",
//     "lint": "eslint .",
//     "preview": "vite preview"
//   },