<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'

import AccountItem from '/@/components/UserAccounts/AccountItem.vue'
import { ref } from 'vue'
import apis from '/@/lib/apis'
import useUserDataFetcher from '/@/use/userDataFetcher'

const userId = ref('c714a848-2886-4c10-a313-de9bc61cb2bb')
// todo: get meが実装されたらそれを使う

const { data: accounts, fetcherState } = useUserDataFetcher(userId, userId =>
  apis.getUserAccounts(userId)
)
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:account-circle-outline"
        :header-texts="[
          { title: 'Profile', url: '/users' },
          { title: 'Accounts', url: '/users/accounts' }
        ]"
        detail="アカウント情報を変更します。"
        :class="$style.header"
      />
      <router-link to="/users/accounts/new" :class="$style.link">
        <base-button type="primary" icon="mdi:account">New</base-button>
      </router-link>
    </div>
    <ul v-if="fetcherState === 'loaded'" :class="$style.accountList">
      <li v-for="account in accounts" :key="account.id">
        <account-item :account="account" />
      </li>
    </ul>
    <p v-else-if="fetcherState === 'loading'">ローディング中...</p>
    <p v-else-if="fetcherState === 'error'">エラーが発生しました</p>

    <router-link to="/users" :class="$style.link">
      <base-button
        :class="$style.backButton"
        type="secondary"
        icon="mdi:arrow-left"
      >
        Back
      </base-button>
    </router-link>
  </page-container>
</template>

<style lang="scss" module>
.headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  margin: 4rem 0 2rem;
}
.link {
  text-decoration: none;
  color: inherit;
}
.accountList {
  list-style: none;
  padding: 0.5rem 0;
  li {
    border: 1px solid $color-primary-text;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      background-color: $color-background-dim;
    }
  }
}
.backButton {
  margin-top: 2rem;
}
</style>
