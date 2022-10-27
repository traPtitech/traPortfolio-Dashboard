<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import ContestItem from '/@/components/Contests/ContestItem.vue'

import { ref } from 'vue'
import apis from '/@/lib/apis'
import useUserDataFetcher from '/@/use/userDataFetcher'
import FormInput from '/@/components/UI/FormInput.vue'

const userId = ref('c714a848-2886-4c10-a313-de9bc61cb2bb')
// todo: get meが実装されたらそれを使う

const { data: contests, fetcherState } = useUserDataFetcher(userId, userId =>
  apis.getUserContests(userId)
)
const searchQuery = ref('')
</script>

<template>
  <page-container>
    <content-header
      icon-name="mdi:trophy"
      :header-texts="[{ title: 'Contests', url: '/contests' }]"
      detail="コンテスト情報を変更します。"
      :class="$style.header"
    />
    <div :class="$style.searchFormContainer">
      <FormInput
        v-model="searchQuery"
        placeholder="コンテスト名"
        icon="magnify"
        :class="$style.searchForm"
      />
      <router-link to="/contests/new" :class="$style.link">
        <BaseButton type="primary" icon="mdi:trophy">New</BaseButton>
      </router-link>
    </div>
    <ul v-if="fetcherState === 'loaded'" :class="$style.contestList">
      <li v-for="contest in contests" :key="contest.id">
        <contest-item :contest="contest" />
      </li>
    </ul>
    <p v-else-if="fetcherState === 'loading'">ローディング中...</p>
    <p v-else-if="fetcherState === 'error'">エラーが発生しました</p>
  </page-container>
</template>

<style lang="scss" module>
.searchFormContainer {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.header {
  margin: 4rem 0 2rem;
}
.searchForm {
  flex-grow: 1;
}
.link {
  text-decoration: none;
  color: inherit;
  margin-left: 0.5rem;
}
.contestList {
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
</style>
