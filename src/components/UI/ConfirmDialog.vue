<script lang="ts" setup>
import { ref } from 'vue'
import BaseButton from '/@/components/UI/BaseButton.vue'

const dialogRef = ref<HTMLDialogElement>()

const open = () => {
  dialogRef.value?.showModal()
  dialogRef.value?.addEventListener('click', listener)
}

const close = () => {
  dialogRef.value?.close()
  dialogRef.value?.removeEventListener('click', listener)
}

const listener = (e: Event) => {
  if (dialogRef.value === undefined) return
  if (e.target === dialogRef.value) {
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
  <dialog ref="dialogRef" :class="$style.modal">
    <div :class="$style.container">
      <h1 :class="$style.header">コンテストの削除</h1>
      <p :class="$style.body">
        コンテンストと、コンテストに含まれるチームをすべて削除します。この操作は取り消せません。
      </p>
      <div :class="$style.buttonContent">
        <base-button
          type="secondary"
          icon="mdi:arrow-left"
          @click="() => emit('close')"
          >Back</base-button
        >
        <base-button
          type="warning"
          icon="mdi:close"
          @click="() => emit('remove')"
          >Remove</base-button
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
  margin: 1rem 1.5rem;
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
