import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: "/frontend-mentor-todo-app/", // Set the base to match your repository name
  plugins: [react()], // React plugin, still needed for your project
  build: {
    outDir: "dist", // Vite will output the build files to the 'dist' folder
  },
});
