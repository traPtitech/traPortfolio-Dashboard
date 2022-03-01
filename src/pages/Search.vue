<template>
  <page-container>
    <page-title :class="$style.title">検索結果: {{ search }}</page-title>
    <member-list :members="users" />
  </page-container>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import PageTitle from '/@/components/Layout/PageTitle.vue'

// TODO: 詳細ページの共通コンポーネント #8
// https://github.com/traPtitech/traPortfolio-UI/issues/8
import MemberList from '/@/components/ContestTeam/MemberList.vue'
import useQuery from '/@/use/query'
import apis, { User } from '/@/lib/apis'

export default defineComponent({
  name: 'Search',
  components: { PageContainer, PageTitle, MemberList },
  setup() {
    const search = useQuery('q')
    const users = ref<User[]>()
    watchEffect(async () => {
      users.value = (await apis.getUsers(false, search.value)).data
    })
    return { search, users }
  }
})
</script>

<style lang="scss" module>
.title {
  margin: 4rem 0;
}
</style>
