<script lang="ts" setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useContestStore } from '/@/store/contest'

import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import ContestItem from '/@/components/Contests/ContestItem.vue'
import FormInput from '/@/components/UI/FormInput.vue'

const contestStore = useContestStore()
const contests = await contestStore.fetchContests()

const searchQuery = ref('')
const filteredContests = computed(() =>
  contests.filter(contest => contest.name.includes(searchQuery.value))
)
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
        <p :class="$style.body2">検索</p>
        <form-input
          v-model="searchQuery"
          placeholder="コンテスト名"
          icon="magnify"
        />
      </div>
      <div>
        <p :class="$style.body2">コンテスト作成</p>
        <router-link to="/contests/new" :class="$style.link">
          <base-button type="primary" icon="mdi:trophy">New</base-button>
        </router-link>
      </div>
    </div>
    <ul :class="$style.contestList">
      <li v-for="contest in filteredContests" :key="contest.id">
        <contest-item :contest="contest" />
      </li>
    </ul>
  </page-container>
</template>

<style lang="scss" module>
.header {
  margin-bottom: 2rem;
}

.searchFormContainer {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.searchForm {
  flex-grow: 1;
}

.body2 {
  font-size: 0.875rem;
  color: $color-secondary;
}

.link {
  text-decoration: none;
  color: inherit;
}

.contestList {
  list-style: none;
  li {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
