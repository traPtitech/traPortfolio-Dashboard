<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import LinkButton from '/@/components/UI/LinkButton.vue'
import apis from '/@/lib/apis'
import type { AddContestTeamRequest, ContestDetail, User } from '/@/lib/apis'
import { useRouter } from 'vue-router'
import useParam from '/@/lib/param'
import MemberInput from '/@/components/UI/MemberInput.vue'
import FormTextArea from '/@/components/UI/FormTextArea.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import { computed, ref } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import { isValidLength, isValidOptionalUrl } from '/@/lib/validate'
import { useToast } from 'vue-toastification'
import { useUserStore } from '/@/store/user'

const router = useRouter()
const toast = useToast()

const contestId = useParam('contestId')
const contest: ContestDetail = (await apis.getContest(contestId.value)).data

const userStore = useUserStore()
const users = await userStore.fetchUsers()

const formValues = ref<Required<AddContestTeamRequest>>({
  name: '',
  result: '',
  link: '',
  description: ''
})
const members = ref<User[]>([])

const isSending = ref(false)
const canSubmit = computed(
  () =>
    !isSending.value &&
    isValidLength(formValues.value.name, 1, 32) &&
    isValidLength(formValues.value.result, 0, 32) &&
    isValidOptionalUrl(formValues.value.link) &&
    isValidLength(formValues.value.description, 1, 256) &&
    members.value.length > 0
)

const createContestTeam = async () => {
  isSending.value = true
  try {
    const requestData: AddContestTeamRequest = {
      ...formValues.value,
      result: formValues.value.result || undefined,
      link: formValues.value.link || undefined
    }
    const res = (await apis.addContestTeam(contestId.value, requestData)).data
    await apis.editContestTeamMembers(contestId.value, res.id, {
      members: members.value.map(member => member.id)
    })
    toast.success('コンテストチ－ムを追加しました')
    router.push(`/contests/${contestId.value}`)
  } catch {
    toast.error('コンテストチームの追加に失敗しました')
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
          { title: 'Contests', path: { name: 'Contests' } },
          {
            title: contest.name,
            path: { name: 'Contest', params: { contestId: contestId } }
          },
          {
            title: 'Teams',
            path: { name: 'Contest', params: { contestId: contestId } }
          },
          {
            title: 'New',
            path: { name: 'ContestTeamNew', params: { contestId: contestId } }
          }
        ]"
        detail="コンテストチームを追加します。"
        :class="$style.header"
      />
    </div>
    <form>
      <labeled-form
        required
        label="チーム名"
        :class="$style.labeledForm"
      >
        <form-input
          v-model="formValues.name"
          :limit="32"
        />
      </labeled-form>
      <labeled-form
        label="結果"
        :class="$style.labeledForm"
      >
        <form-input
          v-model="formValues.result"
          :limit="32"
        />
      </labeled-form>
      <labeled-form
        label="リンク"
        :class="$style.labeledForm"
      >
        <form-input
          v-model="formValues.link"
          has-anchor
          placeholder="https://"
        />
      </labeled-form>
      <labeled-form
        required
        label="メンバー"
        :class="$style.labeledForm"
      >
        <member-input
          v-model="members"
          :users="users"
          :is-disabled="false"
        />
      </labeled-form>
      <labeled-form
        required
        label="説明"
        :class="$style.labeledForm"
      >
        <form-text-area
          v-model="formValues.description"
          :limit="256"
          :rows="3"
        />
      </labeled-form>
    </form>

    <div :class="$style.buttonContainer">
      <link-button
        :to="{ name: 'Contest', params: { contestId: contestId } }"
        type="secondary"
        icon="mdi:arrow-left"
      >
        Back
      </link-button>
      <base-button
        :is-disabled="!canSubmit"
        type="primary"
        icon="mdi:plus"
        @click="createContestTeam"
      >
        Create
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
  margin-bottom: 2rem;
}
.labeledForm {
  margin-bottom: 2rem;
}
.buttonContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;
}
</style>
