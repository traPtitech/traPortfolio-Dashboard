<template>
  <teleport to="#dialog">
    <div :class="$style.container">
      <div :class="$style.dialog">
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'DialogTemplate',
  emits: ['close'],
  setup(props, { emit }) {
    const close = () => {
      emit('close')
    }
    return { close }
  }
})
</script>

<style lang="scss" module>
.container {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: rgb(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
}

.dialog {
  color: $color-text;
  z-index: 2;
  background-color: $color-background;
  min-width: min(300px, 100%);
  margin: auto;
  border-radius: 6px;
}
</style>
