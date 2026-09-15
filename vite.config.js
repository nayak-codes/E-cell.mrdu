import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cmsPlugin from './cms-server.js'

export default defineConfig({
  plugins: [react(), cmsPlugin()],
  appType: 'spa',
})
