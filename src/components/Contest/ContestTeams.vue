<script lang="ts" setup>
import LinkButton from '/@/components/UI/LinkButton.vue'

import FormInput from '/@/components/UI/FormInput.vue'
import ContestTeamItem from '/@/components/Contest/ContestTeamItem.vue'
import { ContestTeam } from '/@/lib/apis'
import { computed, ref } from 'vue'
import { searchListCaseInsensitive } from '/@/lib/search'

interface Props {
  contestId: string
  contestTeams: ContestTeam[]
}

const props = defineProps<Props>()
const searchQuery = ref('')
const filteredContestTeams = computed(() =>
  searchListCaseInsensitive(props.contestTeams, searchQuery.value, 'name')
)
</script>

<template>
  <div>
    <div :class="$style.searchFormContainer">
      <div :class="$style.searchForm">
        <form-input
          v-model="searchQuery"
          placeholder="チーム名で検索"
          icon="magnify"
        />
      </div>
      <link-button
        :to="{ name: 'ContestTeamNew', params: { contestId: contestId } }"
        type="primary"
        icon="mdi:plus"
      >
        New
      </link-button>
    </div>
    <ul :class="$style.teamList">
      <li v-for="contestTeam in filteredContestTeams" :key="contestTeam.id">
        <contest-team-item
          :contest-id="contestId"
          :contest-team="contestTeam"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" module>
.searchFormContainer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.searchForm {
  flex-grow: 1;
}
.teamList {
  list-style: none;
  padding: 0.5rem 0;
  li {
    margin-bottom: 0.5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
