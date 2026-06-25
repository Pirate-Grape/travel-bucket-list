<script setup lang="ts">
import WButton from "../components/ui/WButton.vue";
import WLoader from "../components/ui/WLoader.vue";
import WInput from "../components/ui/WInput.vue";
import WDateInput from "~/components/ui/WDateInput.vue";

definePageMeta({
  layout: 'default',
})

const textValue = ref('')
const numberValue = ref('')
const dateValue = ref(new Date(0).toISOString())
const dateTimeValue = ref(new Date(0).toISOString())
</script>

<template>
<div class="ui-test-page">
  <header>
    ui-test
  </header>
  Primary btn:
  <div class="ui-test-container">
    <WButton
        v-for="condition of [false, true]"
        :key="`primary-disabled-${condition}`"
        :disabled="condition"
    >
      Start my list
    </WButton>
    <WButton
        is-loading
    >
      Start my list
    </WButton>
  </div>
  Secondary btn:
  <div class="ui-test-container">
    <WButton
        v-for="condition of [false, true]"
        :key="`secondary-disabled-${condition}`"
        type="secondary"
        :disabled="condition"
    >
      Browse public lists
    </WButton>
    <WButton
        type="secondary"
        is-loading
    >
    </WButton>
  </div>
  Ghost btn:
  <div class="ui-test-container">
    <WButton
        v-for="condition of [false, true]"
        :key="`ghost-disabled-${condition}`"
        type="ghost"
        :disabled="condition"
    >
      X
    </WButton>
    <WButton
        type="ghost"
        is-loading
    >
    </WButton>
  </div>
  Loader:
  <div class="ui-test-container">
    <WLoader v-for="size of [24, 32, 64]" class="loader" :size-px="size" />
  </div>

  <div class="ui-test-container">
    <WInput
        v-model="textValue"
        placeholder="Введите тестовый текст"
        label="Тестовый инпут"
        error="Тестовая ошибка"
    />
    <WInput
        v-model="numberValue"
        type="number"
        placeholder="Введите тестовое число"
        label="Тестовый инпут с числом"
        error="Тестовая ошибка"
    />
    <WDateInput
        v-model="dateValue"
        type="date"
        placeholder="Введите тестовое число"
        label="Тестовый инпут с датой"
        error="Тестовая ошибка"
    />
    <WDateInput
        v-model="dateTimeValue"
        type="datetime"
        placeholder="Введите тестовое число"
        label="Тестовый инпут с датой и временем"
        error="Тестовая ошибка"
    />
  </div>
</div>
</template>

<style lang="scss" scoped>
header {
  font-size: 24px;
  margin-bottom: 18px;
}

.ui-test-container {
  display: flex;
  gap: 16px;

  margin: 8px 0;

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>