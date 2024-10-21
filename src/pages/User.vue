<script setup lang="ts">
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import UserProfileEdit from '/@/components/User/UserProfileEdit.vue'
import apis from '/@/lib/apis'
import UserProfileMobile from '/@/components/User/UserProfileMobile.vue'
import UserProfileDesktop from '/@/components/User/UserProfileDesktop.vue'
import { useResponsiveStore } from '/@/store/responsive'
import { storeToRefs } from 'pinia'

const me = (await apis.getMe()).data

const { isMobile } = storeToRefs(useResponsiveStore())
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:account-circle-outline"
        :header-texts="[{ title: 'Profile', path: { name: 'Profile' } }]"
        detail="プロフィールを変更します。"
        :class="$style.header"
      />
      <!-- todo:プレビューボタンの追加 -->
    </div>
    <user-profile-mobile v-if="isMobile" :user="me" />
    <user-profile-desktop v-else :user="me" />
    <user-profile-edit :user="me" :class="$style.userProfileEdit" />
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
