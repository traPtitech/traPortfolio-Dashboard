import { defineStore } from 'pinia'
import { ref } from 'vue'

// https://github.com/traPtitech/traQ_S-UI/blob/master/src/store/ui/responsive.ts
export const useResponsiveStore = defineStore('responsive', () => {
  const queryList = window.matchMedia(`(width <= 768px)`)

  const isMobile = ref(queryList.matches)

  queryList.addEventListener('change', (event: MediaQueryListEvent) => {
    isMobile.value = event.matches
  })

  return { isMobile }
})
