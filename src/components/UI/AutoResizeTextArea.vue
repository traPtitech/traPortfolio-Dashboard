<script lang="ts" setup>
import { nextTick, watch, onMounted, ref, computed, onBeforeUnmount } from 'vue'

import autosize from 'autosize'

interface Props {
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

const model = defineModel<string>({ required: true })

const handleInput = (event: Event) => {
  model.value = (event.target as HTMLInputElement).value
}

const style = computed(() => ({ maxHeight: `${props.maxHeight}px` }))

onMounted(() => {
  if (textareaEle.value === null) return
  autosize(textareaEle.value)
})

watch(model, async () => {
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
    :value="model"
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
