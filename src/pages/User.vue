<template>
  <page-container>
    <content-header
      :title="routeInfo.name"
      :description="routeInfo.description"
    />
    <user-name :user-detail="userDetail" />
    <allow-real-name :user-detail="userDetail" />
  </page-container>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import ContentHeader from '../components/UI/ContentHeader.vue'
import PageContainer from '../components/Layout/PageContainer.vue'
import useRouteInfo from '../use/routeInfo'
import UserName from '../components/User/UserName.vue'
import apis, { UserDetail } from '../lib/apis'
import AllowRealName from '../components/User/AllowRealName.vue'

export default defineComponent({
  name: 'User',
  components: { PageContainer, ContentHeader, UserName, AllowRealName },
  setup() {
    const routeInfo = useRouteInfo(ref('Profile'))
    const userDetail = ref<UserDetail>()

    watchEffect(async () => {
      // /users/me的なやつができると信じてる
      userDetail.value = (
        await apis.getUser('dc7c2fc7-e477-5b73-c9b0-5cb701488a86')
      ).data
    })
    return { routeInfo, userDetail }
  }
})
</script>

<style lang="scss" module></style>
