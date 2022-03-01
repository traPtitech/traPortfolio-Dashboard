<template>
  <page-container>
    <page-title :class="$style.title">イベント一覧</page-title>
    <event-list v-if="fetcherState === 'loaded'" :events="events" />
    <p v-else>{{ fetcherState }}</p>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '/@/store'
import useFetcher from '/@/use/fetcher'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import PageTitle from '/@/components/Layout/PageTitle.vue'
import EventList from '/@/components/Events/EventList.vue'

export default defineComponent({
  name: 'Events',
  components: {
    PageContainer,
    PageTitle,
    EventList
  },
  setup() {
    const store = useStore()

    const events = computed(() => store.state.events)
    const { fetcherState } = useFetcher(events, () =>
      store.dispatch.fetchEvents()
    )

    return { events, fetcherState }
  }
})
</script>

<style lang="scss" module>
.title {
  margin: 4rem 0;
}
</style>
