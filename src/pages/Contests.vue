<template>
  <page-container>
    <page-title :class="$style.title">コンテスト一覧</page-title>
    <contest-list v-if="fetcherState === 'loaded'" :contests="contests" />
    <p v-else>{{ fetcherState }}</p>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '/@/store'
import useFetcher from '/@/use/fetcher'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import PageTitle from '/@/components/Layout/PageTitle.vue'
import ContestList from '/@/components/Contests/ContestList.vue'

export default defineComponent({
  name: 'Contests',
  components: {
    PageContainer,
    PageTitle,
    ContestList
  },
  setup() {
    const store = useStore()

    const contests = computed(() => store.state.contests)
    const { fetcherState } = useFetcher(contests, () =>
      store.dispatch.fetchContests()
    )

    return { contests, fetcherState }
  }
})
</script>

<style lang="scss" module>
.title {
  margin: 4rem 0;
}
</style>
