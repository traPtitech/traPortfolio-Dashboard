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
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import DeleteForm from '/@/components/Form/DeleteForm.vue'

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

const isSending = ref(false)

const updateContestTeam = async () => {
  isSending.value = true
  try {
    await apis.editContestTeam(contestId.value, contestTeamId.value, {
      name: name.value,
      result: result.value,
      link: link.value,
      description: description.value
    })
    await apis.editContestTeamMembers(contestId.value, contestTeamId.value, {
      members: members.value.map(member => member.id)
    })
    //eslint-disable-next-line no-console
    console.log('更新しました') // todo:トーストとかに変えたい
  } catch {
    //eslint-disable-next-line no-console
    console.log('更新に失敗しました')
  }
  isSending.value = false
}
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
      <labeled-form required label="チーム名" :class="$style.labeledForm">
        <form-input v-model="name" :limit="32" />
      </labeled-form>
      <labeled-form label="結果" :class="$style.labeledForm">
        <form-input v-model="result" :limit="32" />
      </labeled-form>
      <labeled-form label="リンク" :class="$style.labeledForm">
        <form-input v-model="link" has-anchor />
      </labeled-form>
      <labeled-form required label="メンバー" :class="$style.labeledForm">
        <member-input v-model="members" />
      </labeled-form>
      <labeled-form required label="説明" :class="$style.labeledForm">
        <form-text-area v-model="description" :limit="256" :rows="3" />
      </labeled-form>
    </form>
    <delete-form target="コンテストチーム" />

    <div :class="$style.buttonContainer">
      <router-link :to="`/contests/${contestId}`" :class="$style.link">
        <base-button
          :class="$style.backButton"
          type="secondary"
          icon="mdi:arrow-left"
        >
          Back
        </base-button>
      </router-link>
      <base-button
        :is-disabled="isSending"
        :class="$style.updateButton"
        type="primary"
        icon="mdi:update"
        @click="updateContestTeam"
      >
        Update
      </base-button>
    </div>
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
.labeledForm {
  margin-bottom: 2rem;
}
.link {
  text-decoration: none;
  color: inherit;
}
.buttonContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;
}
</style>
