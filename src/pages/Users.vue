<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import UserAccounts from '/@/components/Users/UserAccounts.vue'
import apis from '/@/lib/apis'
import useUserDataFetcher from '/@/use/userDataFetcher'

const userId = ref('c714a848-2886-4c10-a313-de9bc61cb2bb')
// todo: get meが実装されたらそれを使う

const { data: user, fetcherState } = useUserDataFetcher(userId, userId =>
  apis.getUser(userId)
)
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:account-circle-outline"
        :header-texts="[{ title: 'Profile', url: '/users' }]"
        detail="プロフィールを変更します。"
        :class="$style.header"
      />
      <!-- todo:プレビューボタンの追加 -->
    </div>
    <div v-if="user !== undefined" :class="$style.profileContainer">
      <user-icon :user-id="user.id" :size="128" />
      <div>
        <div :class="$style.nameContainer">
          <p :class="$style.name">{{ user.name }}</p>
          <p :class="$style.realName">{{ user.realName }}</p>
        </div>
        <div :class="$style.accounts">
          <user-accounts :accounts="user.accounts.slice(0, 5)" />
          <router-link to="/user/accounts" :class="$style.link">
            <base-button icon="mdi:account">Edit</base-button>
          </router-link>
        </div>
      </div>
    </div>
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

.profileContainer {
  display: flex;
  align-items: center;
  gap: 4rem;
}
.profiles {
}
.nameContainer {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.name {
  color: $color-primary;
  font-size: 3rem;
}
.realName {
  font-size: 1.5rem;
}
.accounts {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.link {
  text-decoration: none;
  color: inherit;
}
</style>
