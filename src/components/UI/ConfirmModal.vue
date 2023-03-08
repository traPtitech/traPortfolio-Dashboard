<script lang="ts" setup>
import { ref } from 'vue'
import BaseButton from '/@/components/UI/BaseButton.vue'

interface Props {
  title: string
  body: string
}
defineProps<Props>()

const modalRef = ref<HTMLDialogElement>()

const open = () => {
  if (modalRef.value === undefined) return
  modalRef.value.showModal()
  modalRef.value.addEventListener('click', listener)
}

const close = () => {
  if (modalRef.value === undefined) return
  modalRef.value.close()
  modalRef.value.removeEventListener('click', listener)
}

const listener = (e: Event) => {
  if (modalRef.value === undefined) return
  if (e.target === modalRef.value) {
    emit('close')
  }
}

defineExpose({
  open,
  close
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'remove'): void
}>()
</script>

<template>
  <dialog ref="modalRef" :class="$style.modal">
    <div :class="$style.container">
      <h1 :class="$style.header">{{ title }}</h1>
      <p :class="$style.body">
        {{ body }}
      </p>
      <div :class="$style.buttonContent">
        <base-button
          type="secondary"
          icon="mdi:arrow-left"
          @click="emit('close')"
          >Back</base-button
        >
        <base-button type="warning" icon="mdi:close" @click="emit('remove')"
          >Delete</base-button
        >
      </div>
    </div>
  </dialog>
</template>

<style lang="scss" module>
.modal {
  margin: auto;
  max-width: 400px;

  border: 1px solid $color-primary-text;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.container {
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header {
  font-size: 1.5rem;
  color: $color-warning;
}

.body {
  font-weight: 1rem;
}

.buttonContent {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
