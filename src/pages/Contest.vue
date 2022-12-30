<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'

import apis, { ContestDetail, ContestTeam } from '/@/lib/apis'
import { RouterLink } from 'vue-router'
import { getDisplayDuration } from '/@/lib/date'
import useParam from '/@/use/param'
import useFetcher from '/@/use/fetcher'
import ContestTeams from '/@/components/Contest/ContestTeams.vue'

const contestId = useParam('id')
const { data: contest } = useFetcher<ContestDetail>(contestId, () =>
  apis.getContest(contestId.value)
)
const { data: contestTeams } = useFetcher<ContestTeam[]>(contestId, () =>
  apis.getContestTeams(contestId.value)
)

const reFetch = (serachQuery: string) => {
  console.log(serachQuery)
}
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:trophy-outline"
        :header-texts="[
          { title: 'Contests', url: '/contests' },
          { title: contest?.name ?? '', url: `/contests/${contestId}` }
        ]"
        detail="コンテストの詳細です。"
        :class="$style.header"
      />
      <router-link :to="`/contests/${contestId}/edit`" :class="$style.link">
        <base-button type="primary" icon="mdi:pencil">Edit</base-button>
      </router-link>
    </div>
    <div v-if="contest !== undefined">
      <h2>コンテスト名</h2>
      <p :class="$style.p">{{ contest.name }}</p>
      <h2>日時</h2>
      <p :class="$style.p">{{ getDisplayDuration(contest.duration) }}</p>
      <h2>リンク</h2>
      <p :class="$style.p">
        <a>{{ contest.link }}</a>
      </p>
      <h2>説明</h2>
      <p :class="$style.p">{{ contest.description }}</p>
    </div>
    <h2>チーム</h2>
    <ContestTeams
      v-if="contestTeams !== undefined"
      :contest-id="contestId"
      :contest-teams="contestTeams"
      @input="reFetch($event)"
    />

    <router-link to="/contests" :class="$style.link">
      <base-button
        :class="$style.backButton"
        type="secondary"
        icon="mdi:arrow-left"
      >
        Back
      </base-button>
    </router-link>
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
.link {
  text-decoration: none;
  color: inherit;
}
h2 {
  font-weight: bold;
  font-size: 20px;
}
.p {
  padding-left: 0.5rem;
  margin: 0.5rem 0 2rem;
}
.backButton {
  margin-top: 2rem;
}
</style>
