<script lang="ts" setup>
import RequiredChip from '/@/components/UI/Required.vue'
interface Props {
  label: string
  required?: boolean
}
defineProps<Props>()
</script>

<template>
  <div>
    <div :class="$style.labelContainer">
      <label :class="$style.label">{{ label }}</label>
      <required-chip v-if="required" />
    </div>
    <div :class="$style.form">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
.labelContainer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.label {
  font-weight: bold;
  font-size: 20px;
}
.form {
  margin-left: 0.5rem;
}
</style>
