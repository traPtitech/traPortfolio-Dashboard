<script lang="ts" setup>
import {
  nextTick,
  watch,
  defineProps,
  onMounted,
  ref,
  toRef,
  withDefaults,
  computed
} from 'vue'

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

const calculateInputHeight = () => {
  if (textareaEle.value === null) return
  textareaEle.value.style.height = '0px'
  textareaEle.value.style.height = `${textareaEle.value.scrollHeight}px`
}

const style = computed(() => ({ maxHeight: `${props.maxHeight}px` }))

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
    :class="$style.textarea"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :rows="props.rows"
    :name="props.name"
    :style="style"
    @input="handleInput"
  />
</template>

<style lang="scss" module>
.textarea {
  resize: none;
}
</style>
