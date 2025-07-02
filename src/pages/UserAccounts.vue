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
          { title: 'Profile', path: { name: 'Profile' } },
          { title: 'Accounts', path: { name: 'UserAccounts' } }
        ]"
      />
    </div>
    <div :class="$style.subHeaderContainer">
      <p :class="$style.detailText">アカウント情報を変更します。</p>
      <link-button
        :to="{ name: 'UserAccountsNew' }"
        type="primary"
        icon="mdi:account"
      >
        New
      </link-button>
    </div>
    <ul :class="$style.accountList">
      <li
        v-for="account in me.accounts"
        :key="account.id"
      >
        <account-item :account="account" />
      </li>
    </ul>
    <link-button
      :to="{ name: 'Profile' }"
      :class="$style.backButton"
      type="secondary"
      icon="mdi:arrow-left"
    >
      Back
    </link-button>
  </page-container>
</template>

<style lang="scss" module>
.headerContainer {
  display: flex;
  align-items: center;
}
.subHeaderContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detailText {
  font-size: 0.875rem;
  color: $color-secondary;
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
