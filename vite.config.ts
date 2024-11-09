import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // Add alias for src folder
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`, // Corrected import
        api: "modern", // Optional: Using the modern API
      },
    },
  },
  base: "/frontend-mentor-todo-app/", // Set the base to match your repository name
  build: {
    outDir: "dist", // Vite will output the build files to the 'dist' folder
  },
});
