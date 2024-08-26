<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import LinkButton from '/@/components/UI/LinkButton.vue'

import AccountItem from '/@/components/UserAccounts/AccountItem.vue'
import apis from '/@/lib/apis'

const me = (await apis.getMe()).data
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
      <link-button
        :to="{ name: 'UserAccountsNew' }"
        type="primary"
        icon="mdi:account"
        >New</link-button
      >
    </div>
    <ul :class="$style.accountList">
      <li v-for="account in me.accounts" :key="account.id">
        <account-item :account="account" />
      </li>
    </ul>

    <link-button
      :to="{ name: 'Profile' }"
      :class="$style.backButton"
      type="secondary"
      icon="mdi:arrow-left"
      >Back</link-button
    >
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
