import path from "path";
import { defineConfig } from "vitepress";
export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, "../dist"),
  },
  publicDir: path.resolve(__dirname, "./.vitepress/public"),
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "./.vitepress/docs-theme")}/`,
    },
  },
});
