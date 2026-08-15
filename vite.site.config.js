import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  publicDir: false,
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    modulePreload: false,
    sourcemap: false,
    rollupOptions: {
      input: resolve(process.cwd(), "index.html"),
      output: {
        manualChunks(id) {
          if (id.includes("three") || id.includes("@react-three")) return "webgl";
          if (id.includes("gsap") || id.includes("lenis")) return "motion";
          if (id.includes("react") || id.includes("zustand")) return "runtime";
          return undefined;
        },
      },
    },
  },
});
