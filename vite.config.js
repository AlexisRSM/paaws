import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
/* I dont know what to do to deploy */
// https://vitejs.dev/config/
export default defineConfig({
  base:"/paaws/",
  plugins: [react()],
})
