<template>
  <page-container>
    <div :class="$style.titleContainer">
      <page-title>{{ name }}</page-title>
      <external-link :href="link" :class="$style.link">
        紹介ページ
      </external-link>
    </div>
    <member-list v-if="fetcherState === 'loaded'" :members="members" />
    <p v-else>{{ fetcherState }}</p>
  </page-container>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '/@/store'
import useFetcher from '/@/use/fetcher'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import PageTitle from '/@/components/Layout/PageTitle.vue'
import ExternalLink from '/@/components/UI/ExternalLink.vue'
import useParam from '/@/use/param'
import MemberList from '/@/components/Group/MemberList.vue'

export default defineComponent({
  name: 'Group',
  components: {
    PageContainer,
    PageTitle,
    ExternalLink,
    MemberList
  },
  setup() {
    const store = useStore()
    const groupId = useParam('groupId')

    const groups = computed(() => store.state.groups)
    const { fetcherState } = useFetcher(groups, () =>
      store.dispatch.fetchGroups()
    )
    const group = computed(() =>
      groups.value?.find(g => g.id === groupId.value)
    )

    const name = computed(() => group.value?.name ?? 'Loading... 班')
    const link = 'https://trap.jp' // TODO
    const members = computed(() => group.value?.members)

    return { fetcherState, name, link, members }
  }
})
</script>

<style lang="scss" module>
.titleContainer {
  margin: 4rem 0;
}
.link {
  color: $color-secondary-text;
}
</style>
