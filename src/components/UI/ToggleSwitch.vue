<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
  }>(),
  {
    modelValue: false,
    disabled: false
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>

<template>
  <label :class="$style.container">
    <input
      type="checkbox"
      :checked="props.modelValue"
      :disabled="props.disabled"
      :class="$style.input"
      @change="toggle"
    />
    <div :class="$style.switch" />
  </label>
</template>

<style lang="scss" module>
.input {
  display: none;
}

.container {
  position: relative;
  display: block;
  width: 50px;
  height: 30px;
  cursor: pointer;
  .input:disabled + & {
    pointer-events: none;
    cursor: not-allowed;
  }
}

.switch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 5px solid $color-secondary;
  border-radius: 15px;
  transition: all 0.2s ease;
  &::after {
    content: '';
    position: absolute;
    top: 2.5px;
    left: 2.5px;
    width: 15px;
    height: 15px;
    background-color: $color-secondary;
    border-radius: 50%;
    transition: all 0.25s ease;
  }
  .input:checked + & {
    background-color: $color-primary;
    border-color: $color-primary;
  }
  .input:checked + &::after {
    left: calc(100% - 17.5px);
    background-color: $color-background;
  }
  .input:disabled + & {
    opacity: 0.5;
  }
  .container:hover & {
    filter: brightness(0.95);
  }
}
</style>
