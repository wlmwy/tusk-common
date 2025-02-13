import { defineConfig } from 'vitepress';
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tusk-Common",
  description: "基于Vue3的Tusk组件库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide' },
      { text: '组件', link: '/components/button' }
    ],

    search: {
      provider: "local",
    },

    sidebar: [
      {
        text: '指南',
        items: [{ text: '快速开始', link: '/guide' }]
      }, {
        text: '组件',
        items: [{ text: 'Button 按钮', link: '/components/button' }]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  }
})
