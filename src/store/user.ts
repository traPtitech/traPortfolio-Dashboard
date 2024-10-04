import { defineStore } from 'pinia'
import { ref } from 'vue'

import apis, { User } from '/@/lib/apis'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[] | null>(null)

  const fetchUsers = async () => {
    if (users.value !== null) {
      return users.value
    }

    const includeSuspended = true
    const res = await apis.getUsers(includeSuspended)
    users.value = res.data
    return res.data
  }

  return {
    users,
    fetchUsers
  }
})
