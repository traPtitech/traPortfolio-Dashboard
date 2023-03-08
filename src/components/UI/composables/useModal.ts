import { ref } from 'vue'

const useModal = () => {
  const modalRef = ref()

  const open = () => {
    if (modalRef.value === undefined) return
    modalRef.value.open()
  }
  const close = () => {
    if (modalRef.value === undefined) return
    modalRef.value.close()
  }
  return { modalRef, open, close }
}

export default useModal
