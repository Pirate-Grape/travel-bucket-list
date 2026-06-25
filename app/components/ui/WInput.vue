<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'text' | 'number'
  error?: string
  label?: string
  disabled?: boolean
  placeholder?: string
}>(), {
  type: 'text',
})

const modelValue = defineModel()
</script>

<template>
  <label>
    <span v-if="props.label" class="label" data-test="input-label">
      {{ props.label }}
    </span>
    <input v-model="modelValue" :type="props.type" :placeholder="props.placeholder" data-test="input" :disabled="props.disabled">
    <span v-if="props.error" class="error" data-test="input-error">
      {{ props.error }}
    </span>
  </label>
</template>

<style scoped lang="scss">
label {
  position: relative;
  width: 100%;
  height: 78px;
  font-weight: 500;
  font-size: 12px;
  display: inline-block;
  margin-bottom: 5px;

  .label {
    font-weight: 500;
    font-size: 12px;
    display: inline-block;
    margin-bottom: 5px;
  }

  .error {
    position: absolute;
    bottom: 0;
    left: 5px;
    margin-top: 5px;
    font-size: 11px;
    color: color(text, danger);
  }

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 0 12px;
    border-radius: 8px;
    border: 0.5px solid color(border, subtle);
    background: color(background, surface);
    height: 36px;
    outline: none;
  }
}
</style>