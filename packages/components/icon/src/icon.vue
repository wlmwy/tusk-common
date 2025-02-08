<script setup lang="ts">
import type { IconProps } from './icon.ts';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { omit } from 'lodash-es';
import { computed } from 'vue';
defineOptions({
  name: 'TkIcon',
  inheritAttrs: false,
});

const props = defineProps<IconProps>();
const filterProps = computed(() => omit(props, ['type', 'color'])); // 去除自定义属性
const customStyle = computed(() => ({
  color: props.color ?? void 0,
}));
</script>

<template>
  <i
    class="tk-icon"
    :class="[`tk-icon--${props.type}`]"
    :style="customStyle"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style scoped>
@import '../style/style.css';
</style>
