<template>
  <button :class="$style.container" :data-color="color">
    <slot />
    <p>
      {{ label }}
    </p>
  </button>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    color: {
      type: String as PropType<'primary' | 'secondary' | 'caution'>,
      required: true
    }
  },
  setup() {
    return
  }
})
</script>
<style lang="scss" module>
.container {
  display: flex;
  padding: 0.1rem 1rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 5px;
  color: white;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[data-color='primary'] {
    background-color: $color-primary;
    &:hover:not(:disabled) {
      color: $color-primary;
      background-color: $color-background;
      border: solid 1px $color-primary;
    }
  }

  &[data-color='caution'] {
    background-color: $color-caution;
    &:hover:not(:disabled) {
      color: $color-caution;
      background-color: $color-background;
      border: solid 1px $color-caution;
    }
  }
}
</style>
