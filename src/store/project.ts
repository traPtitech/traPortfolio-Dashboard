import { defineStore } from 'pinia'
import { ref } from 'vue'

import apis, { Project } from '/@/lib/apis'

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[] | null>(null)

  const fetchProjects = async () => {
    if (projects.value !== null) {
      return projects.value
    }

    const res = await apis.getProjects()
    projects.value = res.data
    return res.data
  }

  return {
    projects,
    fetchProjects
  }
})
