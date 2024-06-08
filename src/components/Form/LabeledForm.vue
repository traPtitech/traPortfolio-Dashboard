<script lang="ts" setup>
import RequiredChip from '/@/components/UI/RequiredChip.vue'

interface Props {
  label: string
  description?: string
  required?: boolean
}
defineProps<Props>()
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.labelContainer">
      <label :class="$style.label">{{ label }}</label>
      <required-chip v-if="required" />
    </div>
    <p v-if="!!description" :class="$style.description">
      {{ description }}
    </p>
    <div :class="$style.form">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.labelContainer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.label {
  font-weight: bold;
  font-size: 1.25rem;
}
.description {
  font-size: 0.875rem;
  margin-left: 0.5rem;
}
.form {
  margin-left: 0.5rem;
}
</style>
