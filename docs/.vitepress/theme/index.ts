import DefaultTheme from "vitepress/theme";
import { type App } from "vue";

import { ElementPlusContainer } from "@vitepress-demo-preview/component";
import TuskCommon from "tusk-common";

import '@vitepress-demo-preview/component/dist/style.css'
import "tusk-common/dist/index.css";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component("demo-preview", ElementPlusContainer);
    app.use(TuskCommon);
  },
};