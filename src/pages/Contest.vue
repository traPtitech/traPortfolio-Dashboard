<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'

import apis, { ContestDetail, ContestTeam } from '/@/lib/apis'
import { RouterLink } from 'vue-router'
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
      <router-link
        :to="{ name: 'ContestEdit', params: { contestId: contestId } }"
        :class="$style.link"
      >
        <base-button type="primary" icon="mdi:pencil">Edit</base-button>
      </router-link>
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

    <router-link :to="{ name: 'Contests' }" :class="$style.link">
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
  margin-bottom: 2rem;
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
