<script lang="ts" setup>
interface Props {
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="$style.container">
    <input
      type="number"
      :class="$style.input"
      :value="props.modelValue"
      @input="handleInput"
    />
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid $color-secondary;
  border-radius: 6px;
  position: relative;

  &:focus-within {
    border-color: $color-primary;
  }

  &:before {
    content: url('/icons/chevron-up.svg');
    position: absolute;
    display: block;
    top: 1px;
    right: 4px;
    color: $color-text;
    width: 24px;
    height: 24px;
  }

  &:after {
    content: url('/icons/chevron-up.svg');
    transform: rotate(180deg);
    position: absolute;
    display: block;
    bottom: 1px;
    right: 4px;
    color: $color-text;
    width: 24px;
    height: 24px;
  }
}
.input {
  flex-grow: 1;
  width: 100%;
  position: relative;

  &::placeholder {
    color: $color-secondary;
  }

  &::-webkit-inner-spin-button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    z-index: 10;
    cursor: pointer;
  }
}
</style>
