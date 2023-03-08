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
      :class="$style.input"
      :data-is-blank="props.modelValue === ''"
      type="datetime-local"
      :value="props.modelValue"
      @input="handleInput"
    />
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid $color-secondary;
  border-radius: 6px;
  &:focus-within {
    border-color: $color-primary;
  }
}
.input {
  flex-grow: 1;
  &[data-is-blank='true'] {
    color: $color-secondary;
  }
  &::-webkit-calendar-picker-indicator {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    background-image: url('/icons/calendar-clock.svg');
  }
  &:focus::-webkit-calendar-picker-indicator {
    background-image: url('/icons/calendar-clock_focus.svg');
  }
}
.icon {
  margin-right: 0.25rem;
  color: $color-secondary;
  .container:focus-within & {
    color: $color-primary;
  }
}
</style>
