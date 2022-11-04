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
