<script setup lang="ts">
import { ref } from 'vue'
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import UserProfileEdit from '/@/components/Users/UserProfileEdit.vue'
import apis, { UserDetail } from '/@/lib/apis'
import UserProfileMobile from '/@/components/Users/UserProfileMobile.vue'
import UserProfileDesktop from '/@/components/Users/UserProfileDesktop.vue'
import { useResponsiveStore } from '/@/store/responsive'
import { storeToRefs } from 'pinia'

const userId = ref('c714a848-2886-4c10-a313-de9bc61cb2bb')
// todo: get meが実装されたらそれを使う

const { isMobile } = storeToRefs(useResponsiveStore())

const user: UserDetail = (await apis.getUser(userId.value)).data
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
    <user-profile-mobile v-if="isMobile" :user="user" />
    <user-profile-desktop v-else :user="user" />
    <user-profile-edit :user="user" :class="$style.userProfileEdit" />
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
.userProfileEdit {
  margin-top: 2rem;
}
</style>
