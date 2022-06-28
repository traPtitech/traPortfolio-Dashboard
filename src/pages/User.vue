<template>
  <page-container>
    <content-header
      :title="routeInfo.name"
      :description="routeInfo.description"
    />
    <user-name :user-detail="userDetail" />
    <allow-real-name :user-detail="userDetail" />
    <edit-self-introduction :user-detail="userDetail" />
    <service
      v-for="accounts in accountsCollectedByService"
      :key="accounts.type"
      :account-type="accounts.type"
      :accounts="accounts.Accounts"
    />
  </page-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
import ContentHeader from '../components/UI/ContentHeader.vue'
import PageContainer from '../components/Layout/PageContainer.vue'
import useRouteInfo from '../use/routeInfo'
import UserName from '../components/User/UserName.vue'
import apis, { Account, AccountType, UserDetail } from '../lib/apis'
import AllowRealName from '../components/User/AllowRealName.vue'
import EditSelfIntroduction from '../components/User/EditSelfIntroduction.vue'
import Service from '../components/User/Service.vue'

export default defineComponent({
  name: 'User',
  components: {
    PageContainer,
    ContentHeader,
    UserName,
    AllowRealName,
    EditSelfIntroduction,
    Service
  },
  setup() {
    const routeInfo = useRouteInfo(ref('Profile'))
    const userDetail = ref<UserDetail>()

    watchEffect(async () => {
      // /users/me的なやつができると信じてる
      userDetail.value = (
        await apis.getUser('dc7c2fc7-e477-5b73-c9b0-5cb701488a86')
      ).data
    })

    type Service = { type: AccountType; Accounts: Account[] }

    const accountsCollectedByService = computed<Service[]>(() => {
      if (userDetail.value === undefined) {
        return []
      } else {
        return userDetail.value.accounts
          .reduce((acc: Service[], account: Account): Service[] => {
            if (acc.filter(elem => elem.type == account.type).length) {
              acc.forEach(service => {
                if (service.type == account.type) {
                  service.Accounts.push(account)
                }
              })
              return acc
            } else {
              acc.push({ type: account.type, Accounts: [account] })
              return acc
            }
          }, [])
          .sort((a, b) => a.type - b.type)
      }
    })
    return { routeInfo, userDetail, accountsCollectedByService }
  }
})
</script>

<style lang="scss" module></style>
