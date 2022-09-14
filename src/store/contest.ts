import { defineStore } from 'pinia'
import { ref } from 'vue'

import apis, { Contest } from '/@/lib/apis'

export const useContestStore = defineStore('contest', () => {
  const contests = ref<Contest[] | null>(null)

  const fetchContests = async () => {
    if (contests.value !== null) {
      return contests.value
    }

    contests.value = (await apis.getContests()).data
  }

  return {
    contests,
    fetchContests
  }
})
