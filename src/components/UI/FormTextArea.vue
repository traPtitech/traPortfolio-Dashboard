<script lang="ts" setup>
import AutoResizeTextArea from '/@/components/UI/AutoResizeTextArea.vue'
import { computed } from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  limit?: number
  rows?: number
  maxHeight?: number
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  limit: undefined,
  rows: 1,
  maxHeight: undefined,
  name: undefined
})

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

const isExceeded = computed(
  () => props.limit && [...props.modelValue].length > props.limit
)
</script>

<template>
  <div :class="$style.container">
    <auto-resize-text-area
      v-model="value"
      :placeholder="props.placeholder"
      :class="$style.textarea"
      :rows="props.rows"
      :max-height="props.maxHeight"
      :name="props.name"
    />
    <div v-if="props.limit" :class="$style.count" :data-exceeded="isExceeded">
      {{ [...props.modelValue].length }}/{{ props.limit }}
    </div>
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;

  padding: 8px;

  border: 1px solid $color-secondary;
  border-radius: 8px;

  &:focus-within {
    border-color: $color-primary;
  }
}

.textarea {
  flex-grow: 1;
  color: inherit;
}

.count {
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  &[data-exceeded='true'] {
    color: $color-danger;
  }
}
</style>
