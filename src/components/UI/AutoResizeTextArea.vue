<script lang="ts" setup>
import {
  nextTick,
  watch,
  defineProps,
  onMounted,
  ref,
  toRef,
  withDefaults,
  computed,
  onBeforeUnmount
} from 'vue'

import autosize from 'autosize'

interface Props {
  modelValue: string
  placeholder?: string
  rows?: number
  readonly?: boolean
  maxHeight?: number
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  rows: undefined,
  readonly: false,
  maxHeight: undefined,
  name: undefined
})

const textareaEle = ref<HTMLTextAreaElement | null>(null)

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const style = computed(() => ({ maxHeight: `${props.maxHeight}px` }))

onMounted(() => {
  if (textareaEle.value === null) return
  autosize(textareaEle.value)
})

watch(toRef(props, 'modelValue'), async () => {
  await nextTick()
  if (textareaEle.value === null) return
  autosize.update(textareaEle.value)
})

onBeforeUnmount(() => {
  if (textareaEle.value === null) return
  autosize.destroy(textareaEle.value)
})
</script>

<template>
  <textarea
    ref="textareaEle"
    :class="$style.textarea"
    :value="modelValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :rows="rows"
    :name="name"
    :style="style"
    @input="handleInput"
  />
</template>

<style lang="scss" module>
.textarea {
  resize: none;
}
</style>
