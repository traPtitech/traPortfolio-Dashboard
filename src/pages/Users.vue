<script setup lang="ts">
import { ref } from 'vue'
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import UserProfile from '/@/components/Users/UserProfile.vue'
import UserProfileEdit from '/@/components/Users/UserProfileEdit.vue'
import apis from '/@/lib/apis'
import { useDataFetcher } from '/@/use/fetcher'

const userId = ref('c714a848-2886-4c10-a313-de9bc61cb2bb')
// todo: get meが実装されたらそれを使う

const { data: user, fetcherState } = useDataFetcher(() =>
  apis.getUser(userId.value)
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
    <user-profile v-if="user !== undefined" :user="user" />
    <user-profile-edit
      v-if="user !== undefined"
      :user="user"
      :class="$style.userProfileEdit"
    />
    <p v-else-if="fetcherState === 'loading'">ローディング中...</p>
    <p v-else-if="fetcherState === 'error'">エラーが発生しました</p>
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
.userProfileEdit {
  margin-top: 2rem;
}
</style>
