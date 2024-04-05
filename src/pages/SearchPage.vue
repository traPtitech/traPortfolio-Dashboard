<script lang="ts" setup>
import PageContainer from '/@/components/Layout/PageContainer.vue'
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
// import MemberList from '/@/components/ContestTeam/MemberList.vue'
// import useQuery from '/@/lib/query'
// import apis from '/@/lib/apis'

// const search = useQuery('q')
// const users = (await apis.getUsers(false, search.value)).data
</script>

<template>
  <page-container>
    <content-header
      icon-name="mdi:account-search"
      :header-texts="[{ title: '検索結果', url: '/search' }]"
      detail="検索結果を表示します"
      :class="$style.header"
    />
    <!-- <member-list :members="users" /> -->
  </page-container>
</template>

<style lang="scss" module>
.title {
  margin: 4rem 0;
}
</style>
