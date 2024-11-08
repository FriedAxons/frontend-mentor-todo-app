import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // React plugin, still needed for your project
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`,
      },
    },
  },
  base: "/frontend-mentor-todo-app/", // Set the base to match your repository name
  build: {
    outDir: "dist", // Vite will output the build files to the 'dist' folder
  },
});
