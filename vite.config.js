import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cmsPlugin from './cms-server.js'

export default defineConfig({
  plugins: process.env.NODE_ENV === 'production' ? [react()] : [react(), cmsPlugin()],
  appType: 'spa',
})
