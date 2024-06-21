import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    
    include: ['**/*.test.{js,jsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.js',
    
    
  },
  define: {
    'process.env': process.env
  }
})
