<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'

import apis, { ContestDetail, ContestTeam } from '/@/lib/apis'
import { RouterLink } from 'vue-router'
import { getDisplayDuration } from '/@/lib/date'
import Icon from '/@/components/UI/Icon.vue'
import useParam from '/@/use/param'
import { useDataFetcher } from '/@/use/fetcher'
import ContestTeamsComponent from '/@/components/Contest/ContestTeams.vue'

const contestId = useParam('id')
const { data: contest } = useDataFetcher<ContestDetail>(() =>
  apis.getContest(contestId.value)
)
const { data: contestTeams, fetcherState } = useDataFetcher<ContestTeam[]>(() =>
  apis.getContestTeams(contestId.value)
)
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
    <div v-if="contest !== undefined && fetcherState === 'loaded'">
      <section :class="$style.section">
        <h2 :class="$style.h2">コンテスト名</h2>
        <p :class="$style.content">{{ contest.name }}</p>
      </section>
      <section :class="$style.section">
        <h2 :class="$style.h2">日時</h2>
        <p :class="$style.content">
          {{ getDisplayDuration(contest.duration) }}
        </p>
      </section>
      <section :class="$style.section">
        <h2 :class="$style.h2">リンク</h2>
        <p :class="[$style.content, $style.contestLinkContainer]">
          <icon name="mdi:open-in-new" />
          <a :class="$style.contestLink" :href="contest.link">
            {{ contest.link }}
          </a>
        </p>
      </section>
      <section :class="$style.section">
        <h2 :class="$style.h2">説明</h2>
        <p :class="$style.content">{{ contest.description }}</p>
      </section>
      <section :class="$style.section">
        <h2 :class="$style.h2">チーム</h2>
        <contest-teams-component
          v-if="contestTeams !== undefined"
          :class="$style.content"
          :contest-id="contestId"
          :contest-teams="contestTeams"
        />
      </section>
    </div>
    <p v-else-if="fetcherState === 'loading'">ローディング中...</p>
    <p v-else-if="fetcherState === 'error'">エラーが発生しました</p>

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
.section {
  margin-bottom: 2rem;
}
.h2 {
  font-weight: bold;
  font-size: 1.25rem;
}
.content {
  margin-top: 0.5rem;
  padding-left: 0.5rem;
}
.contestLinkContainer {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.contestLink {
  color: $color-text;
}
.backButton {
  margin-top: 2rem;
}
</style>
