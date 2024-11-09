import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // React plugin, still needed for your project
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/variables.scss" as *;`,
        api: "modern", // or 'modern-compiler'
      },
    },
  },
  base: "/frontend-mentor-todo-app/", // Set the base to match your repository name
  build: {
    outDir: "dist", // Vite will output the build files to the 'dist' folder
  },
});
