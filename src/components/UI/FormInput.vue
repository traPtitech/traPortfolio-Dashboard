<script lang="ts" setup>
import { computed } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

interface Props {
  modelValue: string
  placeholder?: string
  limit?: number
  hasAtmark?: boolean
  hasAnchor?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  limit: undefined,
  hasAtmark: false,
  hasAnchor: false
})
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const isExceeded = computed(
  () => props.limit && [...props.modelValue].length > props.limit
)
const isValidLink = computed(() => {
  let url
  try {
    url = new URL(props.modelValue)
  } catch {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
})

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="$style.container" :data-has-anchor="props.hasAnchor">
    <span v-if="props.hasAtmark" :class="$style.atmark"> @ </span>
    <input
      :class="$style.input"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="handleInput"
    />
    <div v-if="limit" :class="$style.count" :data-exceeded="isExceeded">
      {{ [...props.modelValue].length }}/{{ props.limit }}
    </div>
    <div v-if="props.hasAnchor" :class="$style.externalLink">
      <a :href="props.modelValue" :data-valid-link="isValidLink">
        <Icon name="mdi:open-in-new" :class="$style.icon" />
      </a>
    </div>
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
  &[data-has-anchor='true'] {
    padding: 0 0 0 8px;
  }
}
.input {
  flex-grow: 1;
}

.atmark {
  margin-right: 4px;
  color: $color-secondary;
  .container:focus-within & {
    color: $color-primary;
  }
}

.count {
  margin-left: 4px;
  font-size: 0.75rem;
  &[data-exceeded='true'] {
    color: $color-danger;
  }
  .container[data-has-anchor='true'] & {
    margin-right: 8px;
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
    &[data-valid-link='false'] {
      pointer-events: none;
      color: $color-danger;
    }
  }
}

.icon {
  display: flex;
}
</style>
