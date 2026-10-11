import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs so the build works at a domain root (Netlify/Vercel)
  // and under a subpath (GitHub Pages project site).
  base: './',
  plugins: [react()],
})
