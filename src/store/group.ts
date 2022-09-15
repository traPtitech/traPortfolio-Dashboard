import { defineStore } from 'pinia'
import { ref } from 'vue'

import apis, { Group } from '/@/lib/apis'

export const useGroupStore = defineStore('group', () => {
  const groups = ref<Group[] | null>(null)

  const fetchGroups = async () => {
    if (groups.value !== null) {
      return groups.value
    }

    const res = await apis.getGroups()
    groups.value = res.data
    return res.data
  }

  return {
    groups,
    fetchGroups
  }
})
