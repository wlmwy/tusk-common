import { defineConfig } from 'vite';
import { readdirSync, readdir } from 'fs';
import { defer, delay, filter, map } from 'lodash-es';
import { resolve } from 'path';
import terser from '@rollup/plugin-terser'; // 压缩js
import { visualizer } from "rollup-plugin-visualizer";
// 使打包文件有类型文件提示
import dts from 'vite-plugin-dts';

import shell from 'shelljs';
import vue from '@vitejs/plugin-vue';
import { hooksPlugin } from "@tusk-common/vite-plugins";

const TRY_MOVE_STYLES_DELAY = 800 as const;

const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

function moveStyles() {
  readdir("./dist/es/theme", (err) => {
    if(err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY);
    defer(() => shell.mv('./dist/es/theme', './dist'))
  })
}

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: '../tsconfig.build.json',
      outDir: 'dist/types',
    }),
    hooksPlugin({
      rmFiles: ['./dist/es', './dist/theme', './dist/types', './dist/stats.es.html'],
      afterBuild: moveStyles,
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ["log"],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          // 条件编译
          "@DEV": JSON.stringify(isDev),
          "@PROD": JSON.stringify(isProd),
          "@TEST": JSON.stringify(isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd,
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev,
      },
    }),
    visualizer({
      filename: "dist/stats.es.html"
    })
  ],
  build: {
    outDir: 'dist/es',
    minify: false, // 关闭默认压缩，使用插件压缩
    cssCodeSplit: true, // 开启css代码分割
    sourcemap: !isProd,
    lib: {
      entry: resolve(__dirname, './index.ts'),
      name: 'TuskCommon',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      // 引入包时的外部依赖
      external: [
        'vue',
        '@fontawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@popperjs/core',
        'async-validator',
      ],
      output: {
        assetFileNames: (assetInfo) => {
          // css文件重命名
          if (assetInfo.name === 'style.css') {
            return 'index.css';
          }
          // css文件放到theme文件夹下
          if (
            assetInfo.type === 'asset' &&
            /\.(css)$/i.test(assetInfo.name as string)
          ) {
            return `theme/[name].[ext]`;
          }
          return assetInfo.name as string;
        },
        // 分包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('/packages/hooks')) {
            return 'hooks';
          }
          if (
            id.includes('/packages/utils') ||
            id.includes('plugin-vue:export-helper')
          ) {
            return 'utils';
          }
          for (const compName of getDirectoriesSync('../packages/components')) {
            if (id.includes(`/packages/components/${compName}`)) {
              return compName;
            }
          }
        },
      },
    },
  },
});
