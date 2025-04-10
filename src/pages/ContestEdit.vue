<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import LinkButton from '/@/components/UI/LinkButton.vue'
import apis, { EditContestRequest } from '/@/lib/apis'
import type { ContestDetail } from '/@/lib/apis'
import { useRouter } from 'vue-router'
import useParam from '/@/lib/param'
import FormTextArea from '/@/components/UI/FormTextArea.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import { computed, ref } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import DeleteForm from '/@/components/Form/DeleteForm.vue'
import FormDuration from '/@/components/UI/FormDuration.vue'
import {
  isValidDuration,
  isValidLength,
  isValidOptionalUrl
} from '/@/lib/validate'
import useModal from '/@/components/UI/composables/useModal'
import ConfirmModal from '/@/components/UI/ConfirmModal.vue'
import { useContestStore } from '/@/store/contest'
import { useToast } from 'vue-toastification'
import FieldErrorMessage from '/@/components/UI/FieldErrorMessage.vue'

const router = useRouter()
const toast = useToast()
const { modalRef, open, close } = useModal()
const { mutate } = useContestStore()

const contestId = useParam('contestId')
const contestDetail: ContestDetail = (await apis.getContest(contestId.value))
  .data

const formValues = ref<Required<EditContestRequest>>({
  ...contestDetail,
  duration: {
    since: contestDetail.duration.since.slice(0, 16),
    until: contestDetail.duration.until?.slice(0, 16) ?? ''
  }
})

const isSending = ref(false)
const isDeleting = ref(false)
const canSubmit = computed(
  () =>
    !isSending.value &&
    isValidLength(formValues.value.name, 1, 32) &&
    isValidDuration(formValues.value.duration) &&
    isValidOptionalUrl(formValues.value.link) &&
    isValidLength(formValues.value.description, 1, 256)
)

const shouldShowDurationError = computed(
  () =>
    formValues.value.duration.since !== '' &&
    formValues.value.duration.until !== '' &&
    !isValidDuration(formValues.value.duration)
)

const updateContest = async () => {
  isSending.value = true
  try {
    const requestData: EditContestRequest = {
      ...formValues.value,
      link: formValues.value.link || undefined,
      duration: {
        since: formValues.value.duration.since + ':00Z',
        until: formValues.value.duration.until + ':00Z'
      }
    }
    await apis.editContest(contestId.value, requestData)
    mutate()
    toast.success('コンテスト情報を更新しました')
    router.push(`/contests/${contestId.value}`)
  } catch {
    toast.error('コンテスト情報の更新に失敗しました')
  }
  isSending.value = false
}

const deleteContest = async () => {
  isDeleting.value = true
  try {
    await apis.deleteContest(contestId.value)
    mutate()
    toast.success('コンテスト情報を削除しました')
    router.push('/contests')
  } catch {
    toast.error('コンテスト情報の削除に失敗しました')
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
          { title: 'Contests', path: { name: 'Contests' } },
          {
            title: contestDetail.name,
            path: { name: 'Contest', params: { contestId: contestId } }
          },
          {
            title: 'Edit',
            path: { name: 'ContestEdit', params: { contestId: contestId } }
          }
        ]"
        detail="コンテストの情報を変更します。"
        :class="$style.header"
      />
    </div>
    <form>
      <labeled-form
        required
        label="コンテスト名"
        :class="$style.labeledForm"
      >
        <form-input
          v-model="formValues.name"
          :limit="32"
        />
      </labeled-form>
      <labeled-form
        label="開催日時"
        :class="$style.labeledForm"
      >
        <form-duration
          v-model="formValues.duration"
          since-required
        />
        <field-error-message v-if="shouldShowDurationError">
          開始日時は終了日時よりも前に指定してください。
        </field-error-message>
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
    <delete-form
      target="コンテスト"
      @delete="open"
    />

    <div :class="$style.buttonContainer">
      <link-button
        :to="{ name: 'Contest', params: { contestId: contestId } }"
        :class="$style.backButton"
        type="secondary"
        icon="mdi:arrow-left"
      >
        Back
      </link-button>
      <base-button
        :is-disabled="!canSubmit"
        type="primary"
        icon="mdi:update"
        @click="updateContest"
      >
        Update
      </base-button>
    </div>

    <confirm-modal
      ref="modalRef"
      title="コンテストの削除"
      body="コンテストと、コンテストに含まれるチームをすべて削除します。この操作は取り消せません。"
      :is-disabled="isDeleting"
      @cancel="close"
      @delete="deleteContest"
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
.buttonContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;
}
.backButton {
  margin-left: 0.5rem;
}
</style>
