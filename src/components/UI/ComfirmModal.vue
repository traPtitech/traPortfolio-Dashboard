<script lang="ts" setup>
import { ref } from 'vue'

const modalRef = ref<HTMLDialogElement>()

const open = () => {
  modalRef.value?.showModal()
  modalRef.value?.addEventListener('click', listener)
}

const close = () => {
  modalRef.value?.close()
  modalRef.value?.removeEventListener('click', listener)
}

const listener = (e: Event) => {
  if (modalRef.value === undefined) return
  if (e.target === modalRef.value) {
    close()
  }
}
</script>

<template>
  <button @click="open">おせ</button>
  <dialog ref="modalRef" :class="$style.content">
    <div id="#dialog-container">
      <p>Hello World</p>
      <button @click="close">Close Modal</button>
    </div>
  </dialog>
</template>

<style lang="scss" module>
.content {
  margin: auto;
}
</style>
