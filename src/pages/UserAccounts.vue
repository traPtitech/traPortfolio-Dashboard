<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'

import type { Account } from '/@/lib/apis'
import AccountItem from '/@/components/UserAccounts/AccountItem.vue'

const accounts: Account[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    displayName: 'mehm8128',
    type: 5,
    prPermitted: true,
    url: 'https://github.com/mehm8128'
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
    displayName: 'mehm8128',
    type: 8,
    prPermitted: false,
    url: 'https://atcoder.jp/users/mehm8128'
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
    displayName: 'mehm8128',
    type: 1,
    prPermitted: true,
    url: 'https://trap.jp/author/mehm8128/'
  }
]
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:account-circle-outline"
        :header-texts="[
          { title: 'Profile', url: '/user' },
          { title: 'Accounts', url: '/user/accounts' }
        ]"
        detail="アカウント情報を変更します。"
        :class="$style.header"
      />
      <router-link to="/user/accounts/new" :class="$style.link">
        <BaseButton type="primary" icon="mdi:account">New</BaseButton>
      </router-link>
    </div>
    <ul :class="$style.accountList">
      <li v-for="account in accounts" :key="account.id">
        <account-item :account="account" />
      </li>
    </ul>

    <router-link to="/user" :class="$style.link">
      <BaseButton
        :class="$style.backButton"
        type="secondary"
        icon="mdi:arrow-left"
      >
        Back
      </BaseButton>
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
  padding: 8px 0;
  li {
    border: 1px solid $color-primary-text;
    border-radius: 8px;
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      background-color: $color-background-dim;
    }
  }
}
.backButton {
  margin-top: 32px;
}
</style>
