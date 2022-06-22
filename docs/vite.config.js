import path from "path";
import { defineConfig } from "vitepress";
export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, "../dist"),
  },
  publicDir: path.resolve(__dirname, "./.vitepress/public"),
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "./.vitepress/src")}/`,
    },
  },
  // plugins: [
  //   AutoImport({
  //     resolvers: [ElementPlusResolver()],
  //   }),
  //   Components({
  //     resolvers: [ElementPlusResolver()],
  //   }),
  //   Icons({
  //     compiler: 'vue3',
  //     customCollections: {
  //       app: FileSystemIconLoader(
  //         path.resolve(__dirname, './.vitepress/src/assets/svg-icons')
  //       ),
  //     },
  //   }),
  // ],
  //server: {
  //  https: true,
  //   proxy: {
  //     '/zh/query': {
  //       target: 'https://openlookengindextool.test.osinfra.cn/',
  //       changeOrigin: true,
  //       // rewrite: (path) => {
  //       //   return path.replace(/\/(zh|en)/, '');
  //       // },
  //     },
  //   },
  //},
});
