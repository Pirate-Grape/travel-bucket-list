<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'primary' | 'secondary',
  sizePx?: number
}>(), {
  type: 'primary',
  sizePx: 32,
})

const size = computed(() => `${props.sizePx}px`)
</script>

<template>
<span class="loader" :class="props.type"></span>
</template>

<style scoped lang="scss">
.loader {
  width: v-bind(size);
  height: v-bind(size);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &.primary {
    border: 5px solid color(action, primary-hover-bg);
    border-bottom-color: #FFF;
  }

  &.secondary {
    border: 5px solid #FFF;
    border-bottom-color: color(action, primary-hover-bg);
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>