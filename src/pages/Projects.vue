<template>
  <page-container>
    <page-title :class="$style.title">Project一覧</page-title>
    <project-list v-if="fetcherState === 'loaded'" :projects="projects" />
    <p v-else>{{ fetcherState }}</p>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '/@/store'
import useFetcher from '/@/use/fetcher'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import PageTitle from '/@/components/Layout/PageTitle.vue'
import ProjectList from '/@/components/Projects/ProjectList.vue'

export default defineComponent({
  name: 'Projects',
  components: {
    PageContainer,
    PageTitle,
    ProjectList
  },
  setup() {
    const store = useStore()

    const projects = computed(() => store.state.projects)
    const { fetcherState } = useFetcher(projects, () =>
      store.dispatch.fetchProjects()
    )

    return { projects, fetcherState }
  }
})
</script>

<style lang="scss" module>
.title {
  margin: 4rem 0;
}
</style>
