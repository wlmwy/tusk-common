## node版本限制
已在.nvmrc限制，苹果系统可直接使用`nvm use`命令，window系统`nvm use $(cat .nvmrc)`

## 打包
打包格式：esModule、umd
-umd：后缀为cjs，用户引入时只需要引入vue即可，包体积会较大
-esModule：后缀为js，用户需安装对应依赖，包体积会较小
package.json： "type": "module", 让打包文件后缀为umd为cjs，esModule为js

### 打包插件
move-file-cli
  move-file oldFilePath newFilePath 移动打包后的文件位置

npm-run-all
  run-p 并行执行script命令
  run-s 串行执行script命令

rimraf
  rimraf fileNamePath 删除文件

vite-plugin-compression2
  压缩打包文件，具体参考`vite.config.umd.ts`
  压缩文件`.gz`，给服务端ngingx和cdn使用


# 问题
1、组件是基于element组件库进行二次封装，还是原生封装？


2、兼容问题：
- 组件库基于vue3，vue2项目如何使用？

- 基于elementplus时，如何兼容elementUI、elementPlus？
