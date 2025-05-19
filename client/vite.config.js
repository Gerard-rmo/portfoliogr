import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.PNG", "**/*.png"],
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    port: 5170, // <-- Ici tu changes le port
  },
});
