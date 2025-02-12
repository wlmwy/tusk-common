# node版本
已在.nvmrc限制。macOS系统`nvm use`命令，Windows系统`nvm use $(cat .nvmrc)`

# 安装依赖
```
pnpm install
```

# 运行
- 运行Play项目，查看组件效果
```
pnpm dev
```
- 运行Docs项目，查看文档
```
pnpm docs:dev
```
- 运行测试用例项目
```
pnpm docs:dev
```
**注意：初次下载本项目后，必须要先`pnpm build`打包一次后，再执行以上命令**

# 打包
```
pnpm build
```

# 发布npm包
包版本管理与发布可手动也可自动，自动可以借助lerna、changeset等工具，本项目使用lerna。

版本号遵循语义化版本号规则，具体可查看[note.md](core/note.md)

前置操作
- 确保本地仓库已提交所有内容、确保在指定源已注册账号、确保已登录指定源`npm adduser`、`npm login`
- `nrm use 指定源` 将npm切换到指定源，如发布到npm上，则为`nrm use npm`

手动模式
- 修改core/package.json的版本号
- `cd core` 切换到core目录下（仅发布core下的dist产物）
- `npm publish` 发布tusk-common包

自动模式
- 根目录下，`lerna publish`
- 选择本次发布版本号，输入`y`确认即可

# 使用npm包
本部分内容后续可移到组件文档中

- 全局引入
```
// main.ts
import TuskCommon from 'tusk-common';    // 全局组件
import 'tusk-common/dist/index.css';  // 全局样式

const app = createApp(App)
app.use(TuskCommon);
app.mount('#app');
```

- 按需引入
```
// main.ts
import 'tusk-common/dist/index.css';  // 全局样式

// componentName.vue，默认<script setup lang="ts">写法
import { TkButton, TkIcon } from 'tusk-common';

<tk-icon icon="search"></tk-icon>
```

# 打包配置
打包格式：esModule、umd

- umd：后缀为cjs，用户引入时只需要引入vue即可，包体积会较大，require
- esModule：后缀为js，用户需安装对应依赖，包体积会较小，import

# 打包插件
- npm-run-all
  run-p 并行执行script命令
  run-s 串行执行script命令

- vite-plugin-compression2
  压缩打包文件，具体参考`vite.config.umd.ts`
  压缩文件`.gz`，给服务端ngingx和cdn使用

# 后续注意问题
1、兼容问题：
- 组件库基于vue3，vue2项目如何使用？

- 基于elementplus进行二次封装，elementUI项目如何使用？
