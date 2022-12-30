<script lang="ts" setup>
import BaseButton from '/@/components/UI/BaseButton.vue'

import FormInput from '/@/components/UI/FormInput.vue'
import ContestTeamItem from '/@/components/Contest/ContestTeamItem.vue'
import { RouterLink } from 'vue-router'
import { ContestTeam } from '/@/lib/apis'
import { ref } from 'vue'

interface Props {
  contestId: string
  contestTeams: ContestTeam[]
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'input', value: string): void
}>()

const searchQuery = ref('')
</script>

<template>
  <div :class="$style.searchFormContainer">
    <div :class="$style.searchForm">
      <p :class="$style.searchFormDescriptionText">検索</p>
      <form-input
        :model-value="searchQuery"
        placeholder="チーム名"
        icon="magnify"
        @update:model-value="emit('input', $event)"
      />
    </div>
    <div :class="$style.newTeamLink">
      <p :class="$style.searchFormDescriptionText">チーム作成</p>
      <router-link to="/contests/new" :class="$style.link">
        <base-button type="primary" icon="mdi:plus">New</base-button>
      </router-link>
    </div>
  </div>
  <ul :class="$style.teamList">
    <li v-for="contestTeam in contestTeams" :key="contestTeam.id">
      <contest-team-item :contest-id="contestId" :contest-team="contestTeam" />
    </li>
  </ul>
</template>

<style lang="scss" module>
.searchFormContainer {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
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
.newTeamLink {
  margin-left: 0.5rem;
}
.link {
  text-decoration: none;
  color: inherit;
}
.teamList {
  list-style: none;
  margin-left: 0.5rem;
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
