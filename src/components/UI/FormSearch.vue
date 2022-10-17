<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'

interface Props {
  modelValue: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: ''
})
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.searchIcon">
      <icon name="mdi:magnify" :class="$style.icon" />
    </div>
    <input
      :class="$style.input"
      :placeholder="props.placeholder"
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
  &::placeholder {
    color: $color-secondary;
  }
}

.searchIcon {
  margin-right: 4px;
  color: $color-secondary;
  .container:focus-within & {
    color: $color-primary;
  }
}

.icon {
  display: flex;
}
</style>
