import { defineStore } from 'pinia'
import { ref } from 'vue'

import apis, { Project } from '/@/lib/apis'

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[] | null>(null)
  const isDirty = ref(false)

  const fetchProjects = async () => {
    if (projects.value !== null && !isDirty.value) {
      return projects.value
    }

    const res = await apis.getProjects()
    projects.value = res.data
    isDirty.value = false
    return res.data
  }

  const mutate = () => {
    isDirty.value = true

    void fetchProjects()
  }

  return {
    projects,
    fetchProjects,
    mutate
  }
})
