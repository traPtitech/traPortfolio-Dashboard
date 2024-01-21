<script lang="ts" setup>
import { computed } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { isValidUrl } from '/@/lib/validate'

interface Props {
  modelValue: string
  placeholder?: string
  limit?: number
  icon?: 'magnify' | 'at'
  hasAnchor?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  limit: undefined,
  icon: undefined,
  hasAnchor: false
})
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

//Unicode Codepoint数でカウント
const textLength = computed(() => [...props.modelValue].length)

const isExceeded = computed(() => props.limit && textLength.value > props.limit)

const isValidLink = computed(() => isValidUrl(props.modelValue))

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="$style.container" :data-has-anchor="props.hasAnchor">
    <div v-if="typeof props.icon !== 'undefined'" :class="$style.iconContainer">
      <icon :name="`mdi:${props.icon}`" :icon="$style.icon" />
    </div>
    <input
      :class="$style.input"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="handleInput"
    />
    <div v-if="limit" :class="$style.count" :data-exceeded="isExceeded">
      {{ textLength }}/{{ props.limit }}
    </div>
    <div
      v-if="props.hasAnchor"
      :class="$style.externalLink"
      :data-valid-link="isValidLink"
    >
      <a
        :href="props.modelValue"
        :data-valid-link="isValidLink"
        target="_blank"
      >
        <icon name="mdi:open-in-new" />
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
  &::placeholder {
    color: $color-secondary;
  }
}

.iconContainer {
  display: flex;
  margin-right: 4px;
  color: $color-secondary;
  .container:focus-within & {
    color: $color-primary;
  }
}

.count {
  color: $color-secondary;
  margin-left: 4px;
  font-size: 0.75rem;
  &[data-exceeded='true'] {
    color: $color-warning;
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
  .container:focus-within & {
    border-left: 1px solid $color-primary;
  }
  &[data-valid-link='false'] {
    cursor: not-allowed;
  }
  a {
    padding: 8px 16px;
    color: $color-text;
    &[data-valid-link='false'] {
      pointer-events: none;
      color: $color-secondary;
    }
  }
}
</style>
