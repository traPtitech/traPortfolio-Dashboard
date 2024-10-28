<script lang="ts" setup>
import AutoResizeTextArea from '/@/components/UI/AutoResizeTextArea.vue'
import { computed } from 'vue'

interface Props {
  readonly?: boolean
  placeholder?: string
  limit?: number
  rows?: number
  maxHeight?: number
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false,
  placeholder: '',
  limit: undefined,
  rows: 1,
  maxHeight: undefined,
  name: undefined
})

const model = defineModel<string>({ required: true })

const isExceeded = computed(
  () => props.limit && [...model.value].length > props.limit
)

const wordCount = computed(() => [...model.value].length)
</script>

<template>
  <div :class="$style.container">
    <auto-resize-text-area
      v-model="model"
      :readonly="readonly"
      :placeholder="placeholder"
      :class="$style.textarea"
      :rows="rows"
      :max-height="maxHeight"
      :name="name"
    />
    <div
      v-if="limit"
      :class="$style.count"
      :data-exceeded="isExceeded"
    >
      {{ wordCount }}/{{ limit }}
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
  color: $color-secondary;
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  &[data-exceeded='true'] {
    color: $color-warning;
  }
}
</style>
