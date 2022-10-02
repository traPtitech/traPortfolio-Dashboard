<script lang="ts" setup>
import { computed, ref } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

interface Props {
  modelValue: string
  placeholder?: string
  limit?: number
  withAtmark?: boolean
  withLink?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  limit: undefined,
  withAtmark: false,
  withLink: false
})
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const isExceeded = computed(
  () => props.limit && props.modelValue.length > props.limit
)
const isInvalidLink = computed(
  () => props.withLink && !props.modelValue.startsWith('http')
)
const isFocused = ref(false)
const onFocus = () => {
  isFocused.value = true
}
const onBlur = () => {
  isFocused.value = false
}
const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="$style.inputContainer">
    <span
      v-if="props.withAtmark"
      :class="$style.atmark"
      :data-focused="isFocused"
    >
      @
    </span>
    <input
      :class="$style.input"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="handleInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div v-if="limit" :class="$style.count" :data-exceeded="isExceeded">
      {{ props.modelValue.length }}/{{ props.limit }}
    </div>
    <div v-if="props.withLink" :class="$style.externalLink">
      <a :href="props.modelValue" :data-invalid-link="isInvalidLink">
        <Icon name="mdi:open-in-new" :class="$style.icon" />
      </a>
    </div>
  </div>
</template>

<style module lang="scss">
.inputContainer {
  display: flex;
  align-items: center;
  padding: 0 0 0 8px;
  border: 1px solid $color-secondary;
  border-radius: 6px;
  &:focus-within {
    border-color: $color-primary;
  }
}
.input {
  margin: 8px 0;
  flex-grow: 1;
}

.atmark {
  margin-right: 4px;
  color: $color-secondary;
  &[data-focused='true'] {
    color: $color-primary;
  }
}

.count {
  margin-right: 8px;
  font-size: 12px;
  &[data-exceeded='true'] {
    color: $color-danger;
  }
}

.externalLink {
  display: flex;
  align-items: center;
  background-color: $color-background-dim;
  border-left: 1px solid $color-secondary;
  border-radius: 0 6px 6px 0;
  a {
    padding: 8px 16px;
    color: $color-text;
    &[data-invalid-link='true'] {
      pointer-events: none;
      color: $color-danger;
    }
  }
}

.icon {
  display: flex;
}
</style>
