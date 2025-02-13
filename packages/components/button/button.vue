<script setup lang="ts">
import { ref, computed } from 'vue';
import { throttle } from 'lodash-es';
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types';
import TkIcon from '../icon/icon.vue';
defineOptions({
  name: 'TkButton',
});

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: true,
  throttleDuration: 500,
});
const emits = defineEmits<ButtonEmits>();

const slots = defineSlots();

const _ref = ref<HTMLButtonElement>();

const iconStyle = computed(() => ({
  marginRight: slots.default ? '6px' : void 0,
}));

const hanldeBtnClick = (e: MouseEvent) => emits('click', e);
const handleBtnClickThrottle = throttle(hanldeBtnClick, props.throttleDuration, { trailing: false });

defineExpose<ButtonInstance>({
  ref: _ref
});
</script>

<template>
  <component
    :is="tag"
    ref="_refs"
    class="tk-button"
    :autofocus="autofocus"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? true : void 0"
    :class="{
      [`tk-button--${type}`]: type,
      [`tk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    @click="(e: MouseEvent) => useThrottle ? handleBtnClickThrottle(e) : hanldeBtnClick(e)"
  >
    <template v-if="loading">
      <slot name="loading">
        <tk-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <tk-icon
      v-if="icon && !loading"
      :icon="icon"
      :style="iconStyle"
      size="1x"
    />
    <slot></slot>
  </component>
</template>

<style scoped>
@import './style.css';
</style>
