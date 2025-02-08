<script setup lang="ts">
// 按需引入-2、导入对应组件和样式
// import { TkButton } from 'tusk-common/dist/es/index.js';   // 指定组件，为es下的button
import { TkButton, TkIcon } from 'tusk-common';
</script>

<template>
  <tk-button type="primary" size="large" icon="search"
    >Click me</tk-button
  >
  <tk-icon icon="search"></tk-icon>
</template>

<style></style>
