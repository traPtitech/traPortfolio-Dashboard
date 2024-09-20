<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import LinkButton from '/@/components/UI/LinkButton.vue'

import apis, { ContestDetail, ContestTeam } from '/@/lib/apis'
import { getDisplayDuration } from '/@/lib/date'
import Icon from '/@/components/UI/Icon.vue'
import useParam from '/@/lib/param'
import ContestTeamsComponent from '/@/components/Contest/ContestTeams.vue'

const contestId = useParam('contestId')
const contestDetail: ContestDetail = (await apis.getContest(contestId.value))
  .data

const contestTeams: ContestTeam[] = (
  await apis.getContestTeams(contestId.value)
).data
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:trophy-outline"
        :header-texts="[
          { title: 'Contests', path: { name: 'Contests' } },
          {
            title: contestDetail.name,
            path: { name: 'Contest', params: { contestId: contestId } }
          }
        ]"
        detail="コンテストの詳細です。"
        :class="$style.header"
      />
      <link-button
        :to="{ name: 'ContestEdit', params: { contestId: contestId } }"
        type="primary"
        icon="mdi:pencil"
        >Edit</link-button
      >
    </div>
    <div>
      <section :class="$style.section">
        <h2 :class="$style.h2">コンテスト名</h2>
        <p :class="$style.content">{{ contestDetail.name }}</p>
      </section>
      <section :class="$style.section">
        <h2 :class="$style.h2">日時</h2>
        <p :class="$style.content">
          {{ getDisplayDuration(contestDetail.duration) }}
        </p>
      </section>
      <section :class="$style.section">
        <h2 :class="$style.h2">リンク</h2>
        <p v-if="contestDetail.link === ''">未設定</p>
        <p v-else :class="[$style.content, $style.contestLinkContainer]">
          <icon name="mdi:open-in-new" />
          <a :class="$style.contestLink" :href="contestDetail.link">
            {{ contestDetail.link }}
          </a>
        </p>
      </section>
      <section :class="$style.section">
        <h2 :class="$style.h2">説明</h2>
        <p :class="$style.content">{{ contestDetail.description }}</p>
      </section>
      <section :class="$style.section">
        <h2 :class="$style.h2">チーム</h2>
        <contest-teams-component
          :class="$style.content"
          :contest-id="contestId"
          :contest-teams="contestTeams"
        />
      </section>
    </div>

    <link-button
      :to="{ name: 'Contests' }"
      :class="$style.backButton"
      type="secondary"
      icon="mdi:arrow-left"
    >
      Back
    </link-button>
  </page-container>
</template>

<style lang="scss" module>
.headerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  margin-bottom: 2rem;
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
