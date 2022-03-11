import { computed, ComputedRef } from 'vue'

const useIcon = (name: string): ComputedRef<string | undefined> => {
  const icon: ComputedRef<string | undefined> = computed(() => {
    switch (name) {
      case 'Top':
        return 'mdi:apps'
      case 'Profile':
        return 'mdi:account-circle-outline'
      case 'Events':
        return 'mdi:calendar'
      case 'Contests':
        return 'mdi:trophy-outline'
      case 'Projects':
        return 'mdi:clipboard-file-outline'
    }
  })
  return icon
}

export default useIcon
