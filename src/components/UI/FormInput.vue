<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  limit?: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const isExceeded = computed(
  () => props.limit && props.modelValue.length > props.limit
)
</script>

<template>
  <div :class="$style.inputContainer">
    <input
      :class="$style.input"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <div v-if="limit" :class="$style.count" :data-exceeded="isExceeded">
      {{ props.modelValue.length }}/{{ props.limit }}
    </div>
  </div>
</template>

<style module lang="scss">
.inputContainer {
  display: flex;
  align-items: center;
  width: fit-content;
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

.count {
  margin-left: 4px;
  font-size: 12px;
  &[data-exceeded='true'] {
    color: $color-danger;
  }
}
</style>
