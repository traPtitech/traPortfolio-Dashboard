<script lang="ts" setup>
import {
  nextTick,
  watch,
  defineProps,
  onMounted,
  ref,
  toRef,
  withDefaults
} from 'vue'

interface Props {
  modelValue: string
  placeholder?: string
  rows?: number
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  rows: undefined,
  readonly: false
})

const textareaEle = ref<HTMLTextAreaElement | null>(null)

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: string): void
}>()

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const calculateInputHeight = () => {
  if (textareaEle.value === null) return

  textareaEle.value.style.height = `${textareaEle.value.scrollHeight}px`
}

onMounted(() => {
  calculateInputHeight()
})

watch(toRef(props, 'modelValue'), async () => {
  await nextTick()
  calculateInputHeight()
})
</script>

<template>
  <textarea
    ref="textareaEle"
    :vale="props.modelValue"
    :placeholder="props.placeholder"
    :rows="props.rows"
    @input="handleInput"
  />
</template>
