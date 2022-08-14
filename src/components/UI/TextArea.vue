<template>
  <textarea :value="value" :class="$style.textarea" @input="onInput"></textarea>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const value = computed(() => props.modelValue)
    const onInput = (e: Event) => {
      const text = (e.target as HTMLInputElement | HTMLTextAreaElement).value
      emit('update:modelValue', text)
    }
    return { value, onInput }
  }
})
</script>

<style lang="scss" module>
.textarea {
  resize: none;
}
</style>
