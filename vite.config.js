import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // three.js only ships to visitors whose browser actually reaches the
        // hero capsule, so keep it out of the main chunk.
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          motion: ["motion", "framer-motion"],
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
