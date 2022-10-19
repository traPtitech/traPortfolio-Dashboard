<script lang="ts" setup>
import FormInput from '/@/components/UI/FormInput.vue'

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
  <form-input
    icon="magnify"
    :model-value="props.modelValue"
    @input="handleInput"
  />
</template>

<style module lang="scss"></style>
