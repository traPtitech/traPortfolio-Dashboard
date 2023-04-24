<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis, { ContestTeamDetail, EditContestTeamRequest } from '/@/lib/apis'
import type { ContestDetail, User } from '/@/lib/apis'
import { RouterLink, useRouter } from 'vue-router'
import useParam from '/@/use/param'
import { useDataFetcher } from '/@/use/fetcher'
import MemberInput from '/@/components/UI/MemberInput.vue'
import FormTextArea from '/@/components/UI/FormTextArea.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import { computed, ref, watch } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import DeleteForm from '/@/components/Form/DeleteForm.vue'
import { isValidLength, isValidUrl } from '/@/use/validate'

const router = useRouter()

const contestId = useParam('contestId')
const contestTeamId = useParam('teamId')
const { data: contest } = useDataFetcher<ContestDetail>(() =>
  apis.getContest(contestId.value)
)
const { data: contestTeam } = useDataFetcher<ContestTeamDetail>(() =>
  apis.getContestTeam(contestId.value, contestTeamId.value)
)

const formValues = ref<Required<EditContestTeamRequest>>({
  name: '',
  result: '',
  link: '',
  description: ''
})
const members = ref<User[]>(contestTeam.value?.members ?? [])

watch([contestTeam, members], () => {
  if (contestTeam.value) {
    formValues.value = contestTeam.value
  }
  members.value = contestTeam.value?.members ?? []
})

const isSending = ref(false)
const canSubmit = computed(
  () =>
    !isSending.value &&
    isValidLength(formValues.value.name, 1, 32) &&
    isValidLength(formValues.value.result, 0, 32) &&
    (formValues.value.link !== '' ? isValidUrl(formValues.value.link) : true) &&
    isValidLength(formValues.value.description, 1, 256) &&
    members.value.length > 0
)

const updateContestTeam = async () => {
  isSending.value = true
  try {
    const requestData: EditContestTeamRequest = {
      ...formValues.value,
      result: formValues.value.result || undefined,
      link: formValues.value.link || undefined
    }
    await apis.editContestTeam(
      contestId.value,
      contestTeamId.value,
      requestData
    )
    await apis.editContestTeamMembers(contestId.value, contestTeamId.value, {
      members: members.value.map(member => member.id)
    })
    //eslint-disable-next-line no-console
    console.log('更新しました') // todo:トーストとかに変えたい
    router.push(`/contests/${contestId.value}/teams/${contestTeamId.value}`)
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
          },
          {
            title: 'Edit',
            url: `/contests/${contestId}/teams/${contestTeamId}/edit`
          }
        ]"
        detail="コンテストチームの情報を変更します。"
        :class="$style.header"
      />
    </div>
    <form v-if="contestTeam !== undefined">
      <labeled-form required label="チーム名" :class="$style.labeledForm">
        <form-input v-model="formValues.name" :limit="32" />
      </labeled-form>
      <labeled-form label="結果" :class="$style.labeledForm">
        <form-input v-model="formValues.result" :limit="32" />
      </labeled-form>
      <labeled-form label="リンク" :class="$style.labeledForm">
        <form-input
          v-model="formValues.link"
          has-anchor
          placeholder="https://"
        />
      </labeled-form>
      <labeled-form required label="メンバー" :class="$style.labeledForm">
        <member-input v-model="members" />
      </labeled-form>
      <labeled-form required label="説明" :class="$style.labeledForm">
        <form-text-area
          v-model="formValues.description"
          :limit="256"
          :rows="3"
        />
      </labeled-form>
    </form>
    <!--todo: モーダルの実装待ち-->
    <delete-form target="コンテストチーム" />

    <div :class="$style.buttonContainer">
      <router-link :to="`/contests/${contestId}`" :class="$style.link">
        <base-button type="secondary" icon="mdi:arrow-left">Back</base-button>
      </router-link>
      <base-button
        :is-disabled="!canSubmit"
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
