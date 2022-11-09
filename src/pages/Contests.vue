<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import ContestItem from '/@/components/Contests/ContestItem.vue'

import { ref } from 'vue'
import FormInput from '/@/components/UI/FormInput.vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useContestStore } from '/@/store/contest'

const contestStore = useContestStore()
const { contests } = storeToRefs(contestStore)

const searchQuery = ref('')

contestStore.fetchContests()
</script>

<template>
  <page-container>
    <content-header
      icon-name="mdi:trophy-outline"
      :header-texts="[{ title: 'Contests', url: '/contests' }]"
      detail="コンテスト情報を変更します。"
      :class="$style.header"
    />
    <div :class="$style.searchFormContainer">
      <div :class="$style.searchForm">
        <p :class="$style.searchFormDescriptionText">検索</p>
        <FormInput
          v-model="searchQuery"
          placeholder="コンテスト名"
          icon="magnify"
        />
      </div>
      <div :class="$style.newContestLink">
        <p :class="$style.searchFormDescriptionText">コンテスト作成</p>
        <router-link to="/contests/new" :class="$style.link">
          <BaseButton type="primary" icon="mdi:trophy">New</BaseButton>
        </router-link>
      </div>
    </div>
    <ul :class="$style.contestList">
      <li v-for="contest in contests" :key="contest.id">
        <contest-item :contest="contest" />
      </li>
    </ul>
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
.searchFormDescriptionText {
  color: $color-secondary;
  font-size: 0.875rem;
}
.searchForm {
  flex-grow: 1;
}
.newContestLink {
  margin-left: 0.5rem;
}
.link {
  text-decoration: none;
  color: inherit;
}
.contestList {
  list-style: none;
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
