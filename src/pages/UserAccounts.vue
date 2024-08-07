<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'

import AccountItem from '/@/components/UserAccounts/AccountItem.vue'
import apis from '/@/lib/apis'
import { RouterLink } from 'vue-router'

const me = (await apis.getMe()).data
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:account-circle-outline"
        :header-texts="[
          { title: 'Profile', path: { name: 'Profile' } },
          { title: 'Accounts', path: { name: 'UserAccounts' } }
        ]"
        detail="アカウント情報を変更します。"
        :class="$style.header"
      />
      <router-link :to="{ name: 'UserAccountsNew' }" :class="$style.link">
        <base-button type="primary" icon="mdi:account">New</base-button>
      </router-link>
    </div>
    <ul :class="$style.accountList">
      <li v-for="account in me.accounts" :key="account.id">
        <account-item :account="account" />
      </li>
    </ul>

    <router-link :to="{ name: 'Profile' }" :class="$style.link">
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
  margin-bottom: 2rem;
}
.link {
  text-decoration: none;
  color: inherit;
}
.accountList {
  list-style: none;
  padding: 0.5rem 0;
  li {
    margin-bottom: 0.5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.backButton {
  margin-top: 2rem;
}
</style>
