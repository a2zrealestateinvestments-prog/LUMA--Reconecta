import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/LUMA--Reconecta/', // <--- Asegúrate de que esto tenga el nombre de tu repositorio
})
