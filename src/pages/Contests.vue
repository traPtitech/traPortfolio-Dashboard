<script lang="ts" setup>
import { computed, ref } from 'vue'

import { useContestStore } from '/@/store/contest'

import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import LinkButton from '/@/components/UI/LinkButton.vue'
import ContestItem from '/@/components/Contests/ContestItem.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import { searchListCaseInsensitive } from '/@/lib/search'

const contestStore = useContestStore()
const contests = await contestStore.fetchContests()

const searchQuery = ref('')
const filteredContests = computed(() =>
  searchListCaseInsensitive(contests, searchQuery.value, v => v.name)
)
</script>

<template>
  <page-container>
    <content-header
      icon-name="mdi:trophy-outline"
      :header-texts="[{ title: 'Contests', path: { name: 'Contests' } }]"
      detail="コンテスト情報を変更します。"
      :class="$style.header"
    />
    <div :class="$style.searchFormContainer">
      <div :class="$style.searchForm">
        <form-input
          v-model="searchQuery"
          placeholder="コンテスト名で検索"
          icon="magnify"
        />
      </div>
      <div>
        <link-button
          :to="{ name: 'ContestNew' }"
          type="primary"
          icon="mdi:trophy"
        >
          New
        </link-button>
      </div>
    </div>
    <ul :class="$style.contestList">
      <li
        v-for="contest in filteredContests"
        :key="contest.id"
      >
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
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.searchForm {
  flex-grow: 1;
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
