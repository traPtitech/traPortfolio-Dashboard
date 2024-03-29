<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  modelValue: string
  label: string
  value: string
  description?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const vModelValue = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
</script>

<template>
  <label :class="$style.container">
    <input
      v-model="vModelValue"
      :value="value"
      type="radio"
      :class="$style.input"
    />
    <span :class="$style.label">{{ label }}</span>
    <span v-if="description" :class="$style.description">
      {{ description }}
    </span>
  </label>
</template>

<style lang="scss" module>
.container {
  display: grid;
  align-items: center;
  gap: 12px;
  grid-template-columns: auto minmax(0, 0.5fr) 1fr;
  cursor: pointer;
}
.input {
  appearance: none;
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: all 0.1s ease-in-out;
  border: 2px solid $color-secondary;

  &:checked {
    border: 2px solid $color-primary;
  }

  &::after {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    margin: auto;
    inset: 0;
    background-color: $color-primary;
  }

  &:not(:checked)::after {
    display: none;
  }

  &:hover:not(:checked)::after {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    margin: auto;
    inset: 0;
    background-color: $color-secondary;
  }
}
.label {
  color: $color-primary;
  font-weight: bold;

  .input:not(:checked) ~ & {
    color: $color-secondary;
  }
}
.description {
  color: $color-text;
  font-size: 12px;

  .input:not(:checked) ~ & {
    color: $color-secondary;
  }
}
</style>
