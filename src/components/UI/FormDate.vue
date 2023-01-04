<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'

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
    <icon name="mdi:calendar-clock" :class="$style.icon" />
    <input
      :class="$style.input"
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
  padding: 8px;
  border: 1px solid $color-secondary;
  border-radius: 6px;
  &:focus-within {
    border-color: $color-primary;
  }
}
.input {
  flex-grow: 1;
}
.icon {
  color: $color-secondary;
  .container:focus-within & {
    color: $color-primary;
  }
}
</style>
