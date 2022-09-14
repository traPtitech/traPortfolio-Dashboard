import { defineStore } from 'pinia'
import { ref } from 'vue'

import apis, { Contest } from '/@/lib/apis'

export const useContestStore = defineStore('contest', () => {
  const contests = ref<Contest[] | null>(null)

  const fetchContests = async () => {
    if (contests.value !== null) {
      return contests.value
    }

    const res = await apis.getContests()
    contests.value = res.data
    return res.data
  }

  return {
    contests,
    fetchContests
  }
})
