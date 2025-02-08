import { createApp } from 'vue';
import App from './App.vue';
// 方式1：全局导入tusk-common（为core里的包）
import TuskCommon from 'tusk-common';    // 全局组件
// import 'tusk-common/dist/index.css';  // 全局样式

// 方式2：按需引入-1、先导入全局样式
import 'tusk-common/dist/index.css';  // 全局样式

const app = createApp(App)
// app.use(TuskCommon);
app.mount('#app');
