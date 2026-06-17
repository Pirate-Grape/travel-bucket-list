<script setup lang="ts">
import WButton from "../components/ui/WButton/WButton.vue";

definePageMeta({
  layout: 'default',
})
</script>

<template>
<div class="ui-test-page">
  <header>
    ui-test
  </header>
  Primary btn:
  <div class="btn-container">
    <WButton
        v-for="condition of [false, true]"
        :key="`primary-disabled-${condition}`"
        :disabled="condition"
    >
      Start my list
    </WButton>
  </div>
  Secondary btn:
  <div class="btn-container">
    <WButton
        v-for="condition of [false, true]"
        :key="`secondary-disabled-${condition}`"
        type="secondary"
        :disabled="condition"
    >
      Browse public lists
    </WButton>
  </div>
</div>
</template>

<style lang="scss" scoped>
header {
  font-size: 24px;
  margin-bottom: 18px;
}

.btn-container {
  display: flex;
  gap: 16px;

  margin: 8px 0;

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>