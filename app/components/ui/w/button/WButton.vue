<script setup lang="ts">
defineProps<{
  type: 'primary' | 'secondary'
  disabled?: boolean
}>()
</script>

<template>
    <button>
      <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
button {
  background: color(text, danger);
}
</style>