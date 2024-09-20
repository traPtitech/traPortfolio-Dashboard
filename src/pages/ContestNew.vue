<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import LinkButton from '/@/components/UI/LinkButton.vue'
import apis, { CreateContestRequest } from '/@/lib/apis'
import { useRouter } from 'vue-router'
import { computed, reactive, ref } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import FormTextArea from '/@/components/UI/FormTextArea.vue'
import FormDuration from '/@/components/UI/FormDuration.vue'
import {
  isValidDuration,
  isValidLength,
  isValidOptionalUrl
} from '/@/lib/validate'
import { useToast } from 'vue-toastification'
import { useContestStore } from '/@/store/contest'
import FieldErrorMessage from '/@/components/UI/FieldErrorMessage.vue'

const router = useRouter()
const toast = useToast()
const { mutate } = useContestStore()

const formValues = reactive<Required<CreateContestRequest>>({
  name: '',
  link: '',
  description: '',
  duration: {
    since: '',
    until: ''
  }
})
const isSending = ref(false)
const canSubmit = computed(
  () =>
    !isSending.value &&
    isValidLength(formValues.name, 1, 32) &&
    isValidOptionalUrl(formValues.link) &&
    isValidDuration(formValues.duration) &&
    isValidLength(formValues.description, 1, 256)
)

const shouldShowDurationError = computed(
  () =>
    formValues.duration.since !== '' &&
    formValues.duration.until !== '' &&
    !isValidDuration(formValues.duration)
)

const createContest = async () => {
  isSending.value = true
  try {
    const requestData: CreateContestRequest = {
      ...formValues,
      link: formValues.link || undefined,
      duration: {
        since: formValues.duration.since + ':00Z',
        until: formValues.duration.until + ':00Z'
      }
    }
    const res = await apis.createContest(requestData)
    mutate()
    toast.success('コンテストを追加しました')
    router.push(`/contests/${res.data.id}`)
  } catch {
    toast.error('コンテストの追加に失敗しました')
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
          { title: 'New', path: { name: 'ContestNew' } }
        ]"
        detail="コンテストを作成します。"
        :class="$style.header"
      />
    </div>
    <form>
      <labeled-form label="コンテスト名" required :class="$style.labeledForm">
        <form-input
          v-model="formValues.name"
          placeholder="コンテスト名を入力"
          :limit="32"
        />
      </labeled-form>
      <labeled-form label="開催日時" required :class="$style.labeledForm">
        <form-duration v-model="formValues.duration" />
        <field-error-message v-if="shouldShowDurationError">
          開始日時は終了日時よりも前に指定してください。
        </field-error-message>
      </labeled-form>
      <labeled-form label="リンク" :class="$style.labeledForm">
        <form-input
          v-model="formValues.link"
          placeholder="https://"
          has-anchor
        />
      </labeled-form>
      <labeled-form label="説明" required :class="$style.labeledForm">
        <form-text-area
          v-model="formValues.description"
          placeholder="説明を入力"
          :rows="3"
          :limit="256"
        />
      </labeled-form>
    </form>
    <div :class="$style.buttonContainer">
      <link-button
        :to="{ name: 'Contests' }"
        :class="$style.backButton"
        type="secondary"
        icon="mdi:arrow-left"
        >Back</link-button
      >
      <base-button
        :is-disabled="!canSubmit"
        type="primary"
        icon="mdi:plus"
        @click="createContest"
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
.backButton {
  margin-left: 0.5rem;
}
</style>
