<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis from '/@/lib/apis'
import type { ContestDetail, ContestTeam, User } from '/@/lib/apis'
import { RouterLink } from 'vue-router'
import useParam from '/@/use/param'
import useFetcher from '/@/use/fetcher'
import MemberInput from '/@/components/UI/MemberInput.vue'
import FormTextArea from '/@/components/UI/FormTextArea.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import { ref } from 'vue'

const contestId = useParam('contestId')
const contestTeamId = useParam('teamId')
const { data: contest } = useFetcher<ContestDetail>(() =>
  apis.getContest(contestId.value)
)
const { data: contestTeam } = useFetcher<ContestTeam>(() =>
  apis.getContestTeam(contestId.value, contestTeamId.value)
)

const name = ref('')
const result = ref('')
const link = ref('')
const description = ref('')
const members = ref<User[]>([])
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:trophy-outline"
        :header-texts="[
          { title: 'Contests', url: '/contests' },
          { title: contest?.name ?? '', url: `/contests/${contestId}` },
          {
            title: contestTeam?.name ?? '',
            url: `/contests/${contestId}/teams/${contestTeamId}`
          }
        ]"
        detail="コンテストチームの情報を変更します。"
        :class="$style.header"
      />
    </div>
    <form v-if="contestTeam !== undefined">
      <div :class="$style.section">
        <label :class="$style.label">チーム名</label>
        <form-input v-model="name" :limit="32" />
      </div>
      <div :class="$style.section">
        <label :class="$style.label">結果</label>
        <form-input v-model="result" :limit="32" />
      </div>
      <div :class="$style.section">
        <label :class="$style.label">リンク</label>
        <form-input v-model="link" has-anchor />
      </div>
      <div :class="$style.section">
        <label :class="$style.label">メンバー</label>
        <member-input v-model="members" />
      </div>
      <div :class="$style.section">
        <label :class="$style.label">説明</label>
        <form-text-area v-model="description" :limit="256" :rows="3" />
      </div>
    </form>
    <router-link :to="`/contests/${contestId}`" :class="$style.link">
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
  font-size: 20px;
}
.content {
  margin-top: 0.5rem;
  padding-left: 0.5rem;
}
.backButton {
  margin-top: 2rem;
}
</style>
