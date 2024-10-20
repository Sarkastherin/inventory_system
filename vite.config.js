import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:'https://Sarkastherin.github.io/inventory_system/'
})
//https://<USERNAME>.github.io/<REPO>/
//https://github.com/Sarkastherin/inventory_system