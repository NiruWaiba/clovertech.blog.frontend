import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})



// import path from "path";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://blog.hamrosystem.com", // Use the environment variable
//         changeOrigin: true, // Needed for virtual hosted sites
//         secure: false, // Set to `true` if using HTTPS
//         timeout: 20000,
//       },
//     },
//   },
// });
