<template>
  <page-container>
    <page-title :class="$style.title">班一覧</page-title>
    <group-list v-if="fetcherState === 'loaded'" :groups="groups" />
    <p v-else>{{ fetcherState }}</p>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '/@/store'
import useFetcher from '/@/use/fetcher'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import PageTitle from '/@/components/Layout/PageTitle.vue'
import GroupList from '/@/components/Groups/GroupList.vue'

export default defineComponent({
  name: 'Groups',
  components: {
    PageContainer,
    PageTitle,
    GroupList
  },
  setup() {
    const store = useStore()

    const groups = computed(() => store.state.groups)
    const { fetcherState } = useFetcher(groups, () =>
      store.dispatch.fetchGroups()
    )

    return { groups, fetcherState }
  }
})
</script>

<style lang="scss" module>
.title {
  margin: 4rem 0;
}
</style>
