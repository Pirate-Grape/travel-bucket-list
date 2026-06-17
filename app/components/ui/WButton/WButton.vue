<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'primary' | 'secondary'
  disabled?: boolean
}>(), {
  type: 'primary',
  disabled: false
})
</script>

<template>
    <button :class="type" :disabled="disabled">
      <slot>Button</slot>
    </button>
</template>

<style lang="scss" scoped>
button {
  font-size: 14px;
  padding: 10px 22px;
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
  transition: background 0.12s;
  cursor: pointer;
  border-radius: 8px;

  &.primary {
    color: color(background, surface);
    background: color(action, primary-bg);
    border: transparent;

    &:hover:not(:disabled) {
      background: color(action, primary-hover-bg);
    }
  }

  &.secondary {
    color: color(text, primary);
    background: color(background, page);
    border: .5px solid color(border, default);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>