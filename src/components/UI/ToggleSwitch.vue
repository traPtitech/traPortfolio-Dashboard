<script lang="ts" setup>
withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {
    disabled: false
  }
)

const model = defineModel<boolean>({ required: true })
</script>

<template>
  <label :class="$style.container">
    <input
      v-model="model"
      type="checkbox"
      :disabled="disabled"
      :class="$style.input"
    >
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
  cursor: pointer;
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
    cursor: not-allowed;
  }
  .container:hover & {
    filter: brightness(0.95);
  }
}
</style>
