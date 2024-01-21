<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis, { ContestTeamDetail, EditContestTeamRequest } from '/@/lib/apis'
import type { ContestDetail, User } from '/@/lib/apis'
import { RouterLink, useRouter } from 'vue-router'
import useParam from '/@/lib/param'
import MemberInput from '/@/components/UI/MemberInput.vue'
import FormTextArea from '/@/components/UI/FormTextArea.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import { computed, ref } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import DeleteForm from '/@/components/Form/DeleteForm.vue'
import { isValidLength, isValidOptionalUrl } from '/@/lib/validate'
import useModal from '/@/components/UI/composables/useModal'
import ConfirmModal from '/@/components/UI/ConfirmModal.vue'
import { useToast } from 'vue-toastification'
import { useUserStore } from '/@/store/user'

const router = useRouter()
const toast = useToast()
const { modalRef, open, close } = useModal()

const contestId = useParam('contestId')
const contestTeamId = useParam('teamId')
const contest: ContestDetail = (await apis.getContest(contestId.value)).data
const contestTeam: ContestTeamDetail = (
  await apis.getContestTeam(contestId.value, contestTeamId.value)
).data

const formValues = ref<Required<EditContestTeamRequest>>(contestTeam)
const members = ref<User[]>(contestTeam.members)

const userStore = useUserStore()
const users = await userStore.fetchUsers()

const isSending = ref(false)
const isDeleting = ref(false)
const canSubmit = computed(
  () =>
    !isSending.value &&
    isValidLength(formValues.value.name, 1, 32) &&
    isValidLength(formValues.value.result, 0, 32) &&
    isValidOptionalUrl(formValues.value.link) &&
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
    toast.success('コンテストチ－ム情報を更新しました')
    router.push(`/contests/${contestId.value}/teams/${contestTeamId.value}`)
  } catch {
    toast.error('コンテストチーム情報の更新に失敗しました')
  }
  isSending.value = false
}

const deleteContestTeam = async () => {
  isDeleting.value = true
  try {
    await apis.deleteContestTeam(contestId.value, contestTeamId.value)
    toast.success('コンテストチーム情報を削除しました')
    router.push(`/contests/${contestId.value}`)
  } catch {
    toast.error('コンテストチ－ム情報の削除に失敗しました')
  }
  isDeleting.value = false
}
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:trophy-outline"
        :header-texts="[
          { title: 'Contests', url: '/contests' },
          { title: contest.name, url: `/contests/${contestId}` },
          {
            title: 'Teams',
            url: `/contests/${contestId}`
          },
          {
            title: contestTeam.name,
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
    <form>
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
        <member-input v-model="members" :users="users" :is-disabled="false" />
      </labeled-form>
      <labeled-form required label="説明" :class="$style.labeledForm">
        <form-text-area
          v-model="formValues.description"
          :limit="256"
          :rows="3"
        />
      </labeled-form>
    </form>
    <delete-form target="コンテストチーム" @delete="open" />

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

    <confirm-modal
      ref="modalRef"
      title="コンテストチームの削除"
      body="コンテストチームを削除します。この操作は取り消せません。"
      :is-disabled="isDeleting"
      @cancel="close"
      @delete="deleteContestTeam"
    />
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
