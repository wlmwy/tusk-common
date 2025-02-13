import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      include: ["./**/*.ts"],
      exclude: ["./vite.config.ts"]
    }),
  ],
  build: {
    minify: false,
    outDir: ".dist",  // 加.是为了不被git忽略
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "vitePlugins",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["shelljs", "lodash-es"],
    },
  },
});