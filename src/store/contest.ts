import { defineStore } from 'pinia'
import { ref } from 'vue'

import apis, { Contest } from '/@/lib/apis'

export const useContestStore = defineStore('contest', () => {
  const contests = ref<Contest[] | null>(null)
  const isDirty = ref(false)

  const fetchContests = async () => {
    if (contests.value !== null && !isDirty.value) {
      return contests.value
    }

    const res = await apis.getContests()
    contests.value = res.data
    isDirty.value = false
    return res.data
  }

  const mutate = () => {
    isDirty.value = true

    void fetchContests()
  }

  return {
    contests,
    fetchContests,
    mutate
  }
})
