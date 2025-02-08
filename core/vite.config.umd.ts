import { defineConfig } from 'vite';
import { readFile } from 'fs';
import { resolve } from 'path';
import { defer, delay } from 'lodash-es';
import { compression } from 'vite-plugin-compression2';
import { visualizer } from "rollup-plugin-visualizer";

import shell from 'shelljs';
import vue from '@vitejs/plugin-vue';
import hooksPlugin from './hooksPlugin';
import terser from "@rollup/plugin-terser";

const TRY_MOVE_STYLES_DELAY = 800 as const;

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

function moveStyles() {
  readFile("./dist/umd/index.css.gz", (err) => {
    if(err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.cp("./dist/umd/index.css", "./dist/index.css"))  // 后续引入时，只需引入index.css即可
  })
}

export default defineConfig({
  plugins: [
    vue(),
    compression({
      include: /.(cjs|css)$/i,
    }),
    hooksPlugin({
      rmFiles: ['./dist/umd', './dist/index.css'],
      afterBuild: moveStyles,
    }),
    terser({
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
    }),
    visualizer({
      filename: "dist/stats.es.html"
    })
  ],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'TuskCommon',
      fileName: 'index',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'index.css';
          }
          return assetInfo.name as string;
        },
      },
    },
  },
});
