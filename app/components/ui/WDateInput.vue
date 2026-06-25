<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'date' | 'datetime'
  error?: string
  label?: string
  disabled?: boolean
  placeholder?: string
}>(), {
  type: 'date',
})

const modelValue = defineModel<string | undefined>()
const inputEl = ref<HTMLInputElement | null>(null)

const inputType = computed(() => props.type === 'datetime' ? 'datetime-local' : 'date')

function toDisplayValue(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  if (props.type === 'date') {
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`
  }
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// Prevents the watch from overwriting the input while the user is mid-edit
let pendingFromUser = false

onMounted(() => {
  if (inputEl.value && modelValue.value) {
    inputEl.value.value = toDisplayValue(modelValue.value)
  }
})

watch(() => modelValue.value, (iso) => {
  if (pendingFromUser || !inputEl.value) return
  inputEl.value.value = iso ? toDisplayValue(iso) : ''
})

function handleChange(event: Event) {
  pendingFromUser = true
  try {
    const value = (event.target as HTMLInputElement).value
    if (!value) {
      modelValue.value = undefined
      return
    }
    const d = new Date(value)
    if (!isNaN(d.getTime())) {
      modelValue.value = d.toISOString()
    }
  } finally {
    nextTick(() => { pendingFromUser = false })
  }
}
</script>

<template>
  <label>
    <span v-if="props.label" class="label" data-test="input-label">
      {{ props.label }}
    </span>
    <input ref="inputEl" :type="inputType" :placeholder="props.placeholder" :disabled="props.disabled" data-test="input" @change="handleChange">
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
