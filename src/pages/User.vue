<template>
  <page-container :class="$style.container">
    <content-header
      :title="routeInfo.name"
      :description="routeInfo.description"
    />
    <user-name :user-detail="userDetail" />
    <allow-real-name :user-detail="userDetail" />
    <edit-self-introduction :bio="userDetail" />
    <accounts :accounts="userDetail?.accounts" />
    <normal-buttom color="primary" label="更新" :class="$style.button" />
  </page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ContentHeader from '../components/UI/ContentHeader.vue'
import PageContainer from '../components/Layout/PageContainer.vue'
import useRouteInfo from '../use/routeInfo'
import UserName from '../components/User/UserName.vue'
import apis, { UserDetail } from '../lib/apis'
import AllowRealName from '../components/User/AllowRealName.vue'
import EditSelfIntroduction from '../components/User/EditSelfIntroduction.vue'
import Accounts from '../components/User/Accounts.vue'
import NormalButtom from '../components/UI/NormalButtom.vue'

export default defineComponent({
  name: 'User',
  components: {
    PageContainer,
    ContentHeader,
    UserName,
    AllowRealName,
    EditSelfIntroduction,
    Accounts,
    NormalButtom
  },
  setup() {
    const routeInfo = useRouteInfo(ref('Profile'))
    const userDetail = ref<UserDetail>()

    // watchEffect(async () => {
    //   // /users/me的なやつができると信じてる
    //   userDetail.value = (
    //     await apis.getUser('dc7c2fc7-e477-5b73-c9b0-5cb701488a86')
    //   ).data
    // })

    ;(async () => {
      try {
        userDetail.value = (
          await apis.getUser('dc7c2fc7-e477-5b73-c9b0-5cb701488a86')
        ).data
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    })()

    return { routeInfo, userDetail }
  }
})
</script>

<style lang="scss" module>
.icon {
  display: flex;
  align-items: center;
}
.button {
  margin: 0 auto 2rem;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
}
</style>
