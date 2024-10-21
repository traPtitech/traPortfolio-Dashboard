<script lang="ts" setup>
const model = defineModel<string>({ required: true })

const handleInput = (event: Event) => {
  model.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <div :class="$style.container">
    <input
      :class="$style.input"
      :data-is-blank="model === ''"
      type="datetime-local"
      :value="model"
      @input="handleInput"
    >
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
