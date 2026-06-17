<script setup lang="ts">
import WLoader from "~/components/ui/WLoader/WLoader.vue";

const props = withDefaults(defineProps<{
  type?: 'primary' | 'secondary'
  disabled?: boolean
  isLoading?: boolean
}>(), {
  type: 'primary',
  disabled: false,
  isLoading: false,
})

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
    <button
        :class="[props.type, props.isLoading ? 'loading' : '']"
        :disabled="props.disabled"
        data-test="button"
        @click="$emit('click')"
    >
      <slot v-if="!props.isLoading"></slot>
      <WLoader v-if="props.isLoading" :size-px="24" :type="props.type" class="loader" />
    </button>
</template>

<style lang="scss" scoped>
button {
  font-size: 14px;
  padding: 10px 22px;
  font-weight: 500;
  font-family: DM Sans, sans-serif;
  transition: background 0.12s;
  cursor: pointer;
  border-radius: 8px;
  height: 44px;

  &.loading {
    pointer-events: none;
  }

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