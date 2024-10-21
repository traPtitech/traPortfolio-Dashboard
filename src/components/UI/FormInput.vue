<script lang="ts" setup>
import { computed } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { isValidUrl } from '/@/lib/validate'

interface Props {
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

const model = defineModel<string>({ required: true })

//Unicode Codepoint数でカウント
const textLength = computed(() => [...model.value].length)

const isExceeded = computed(() => props.limit && textLength.value > props.limit)

const isValidLink = computed(() => isValidUrl(model.value))

const handleInput = (event: Event) => {
  model.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <div
    :class="$style.container"
    :data-has-anchor="props.hasAnchor"
  >
    <div
      v-if="props.icon !== undefined"
      :class="$style.iconContainer"
    >
      <icon :name="`mdi:${props.icon}`" />
    </div>
    <input
      :class="$style.input"
      :placeholder="props.placeholder"
      :value="model"
      @input="handleInput"
    >
    <div
      v-if="limit"
      :class="$style.count"
      :data-exceeded="isExceeded"
    >
      {{ textLength }}/{{ props.limit }}
    </div>
    <div
      v-if="props.hasAnchor"
      :class="$style.externalLink"
    >
      <a
        :href="model"
        :data-is-invalid-link="!isValidLink"
        target="_blank"
        rel="noopener noreferrer"
        :tabindex="isValidLink ? 0 : -1"
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
  &:has([data-is-invalid-link='true']) {
    cursor: not-allowed;
  }

  a {
    padding: 8px 16px;
    color: $color-text;
    &[data-is-invalid-link='true'] {
      pointer-events: none;
      color: $color-secondary;
    }
    &:focus {
      color: $color-primary;
    }
  }
}
</style>
