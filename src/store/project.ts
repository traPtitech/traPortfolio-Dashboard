import { defineStore } from 'pinia'
import { ref } from 'vue'

import apis, { Project } from '/@/lib/apis'

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[] | null>(null)

  const fetchProjects = async () => {
    if (projects.value !== null) {
      return projects.value
    }

    projects.value = (await apis.getProjects()).data
  }

  return {
    projects,
    fetchProjects
  }
})
