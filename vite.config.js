import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/inventory_system/',
  define: {
    'process.env': {}
  },
  define: {
    'process.env.VITE_PROYECT_URL': JSON.stringify(process.env.VITE_PROYECT_URL),
    'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
  },
})
//https://<USERNAME>.github.io/<REPO>/
//https://github.com/Sarkastherin/inventory_system