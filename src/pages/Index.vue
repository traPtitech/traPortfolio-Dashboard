<template>
  <page-container>
    <search-input
      size="large"
      placeholder="ユーザー検索"
      :class="$style.search"
    />
    <group-name-list
      v-if="fetcherStateGroups === 'loaded'"
      :groups="groups"
      :class="$style.groupName"
    />
    <p v-else>{{ fetcherStateGroups }}</p>
    <div :class="$style.container">
      <recent-list
        v-if="fetcherStateContests === 'loaded'"
        :items="contests"
        title="実績"
        path="contests"
      />
      <p v-else>{{ fetcherStateContests }}</p>
      <recent-list
        v-if="fetcherStateProjects === 'loaded'"
        :items="projects"
        title="プロジェクト"
        path="projects"
      />
      <p v-else>{{ fetcherStateProjects }}</p>
      <recent-list
        v-if="fetcherStateProjects"
        :items="events"
        title="イベント"
        path="events"
      />
      <p v-else>{{ fetcherStateEvents }}</p>
    </div>
  </page-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '/@/store'
import useFetcher from '/@/use/fetcher'
import PageContainer from '../components/Layout/PageContainer.vue'
import SearchInput from '/@/components/UI/SearchInput.vue'
import GroupNameList from '/@/components/Index/GroupNameList.vue'
import RecentList from '/@/components/Index/RecentList.vue'

export default defineComponent({
  name: 'Index',
  components: {
    SearchInput,
    PageContainer,
    GroupNameList,
    RecentList
  },
  setup() {
    const store = useStore()

    const groups = computed(() => store.state.groups)
    const { fetcherState: fetcherStateGroups } = useFetcher(groups, () =>
      store.dispatch.fetchGroups()
    )

    const contests = computed(() => store.state.contests)
    const { fetcherState: fetcherStateContests } = useFetcher(contests, () =>
      store.dispatch.fetchContests()
    )
    const projects = computed(() => store.state.projects)
    const { fetcherState: fetcherStateProjects } = useFetcher(projects, () =>
      store.dispatch.fetchProjects()
    )
    const events = computed(() => store.state.events)
    const { fetcherState: fetcherStateEvents } = useFetcher(events, () =>
      store.dispatch.fetchEvents()
    )

    return {
      groups,
      fetcherStateGroups,
      contests,
      fetcherStateContests,
      projects,
      fetcherStateProjects,
      events,
      fetcherStateEvents
    }
  }
})
</script>

<style lang="scss" module>
.search {
  margin: 4rem auto;
  width: 55%;
}
.group-name {
  margin: 4rem 0;
}
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
  gap: 1rem;
  margin: 4rem 0;
}
</style>
