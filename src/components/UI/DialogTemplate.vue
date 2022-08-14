<template>
  <teleport to="#diaglog">
    <div>
      <div></div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, defineEmit } from '@vue/runtime-core'

export default defineComponent({
  name: 'DialogTemplate',
  emits: {},
  setup() {
    const emit = defineEmit<{ (e: 'close'): void }>()
    const close = () => {
      emit('close')
    }
    return { close }
  }
})
</script>
