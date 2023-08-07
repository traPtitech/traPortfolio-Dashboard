<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis, { EditContestRequest } from '/@/lib/apis'
import type { ContestDetail } from '/@/lib/apis'
import { RouterLink, useRouter } from 'vue-router'
import useParam from '/@/use/param'
import { useDataFetcher } from '/@/use/fetcher'
import FormTextArea from '/@/components/UI/FormTextArea.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import { computed, ref, watch } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import DeleteForm from '/@/components/Form/DeleteForm.vue'
import FormDuration from '/@/components/UI/FormDuration.vue'
import { isValidDuration, isValidLength, isValidUrl } from '/@/use/validate'
import useModal from '/@/components/UI/composables/useModal'
import ConfirmModal from '/@/components/UI/ConfirmModal.vue'

const router = useRouter()
const { modalRef, open, close } = useModal()

const contestId = useParam('contestId')
const { data: contest } = useDataFetcher<ContestDetail>(() =>
  apis.getContest(contestId.value)
)
const formValues = ref<Required<EditContestRequest>>({
  name: '',
  duration: {
    since: '',
    until: ''
  },
  link: '',
  description: ''
})

const isSending = ref(false)
const isDeleting = ref(false)
const canSubmit = computed(
  () =>
    !isSending.value &&
    isValidLength(formValues.value.name, 1, 32) &&
    isValidDuration(formValues.value.duration) &&
    (formValues.value.link !== '' ? isValidUrl(formValues.value.link) : true) &&
    isValidLength(formValues.value.description, 1, 256)
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
    //eslint-disable-next-line no-console
    console.log('更新しました') // todo:トーストとかに変えたい
    router.push(`/contests/${contestId.value}`)
  } catch {
    //eslint-disable-next-line no-console
    console.log('更新に失敗しました')
  }
  isSending.value = false
}
const deleteContest = async () => {
  isDeleting.value = true
  try {
    await apis.deleteContest(contestId.value)
    //eslint-disable-next-line no-console
    console.log('削除しました')
    router.push('/contests')
  } catch {
    //eslint-disable-next-line no-console
    console.log('削除に失敗しました')
  }
  isDeleting.value = false
}

watch(contest, () => {
  if (contest.value) {
    formValues.value = {
      name: contest.value.name,
      duration: {
        since: contest.value.duration.since.slice(0, 16),
        until: contest.value.duration.until?.slice(0, 16) ?? ''
      },
      link: contest.value.link,
      description: contest.value.description
    }
  }
})
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:trophy-outline"
        :header-texts="[
          { title: 'Contests', url: '/contests' },
          { title: contest?.name ?? '', url: `/contests/${contestId}` },
          { title: 'Edit', url: `/contests/${contestId}/edit` }
        ]"
        detail="コンテストの情報を変更します。"
        :class="$style.header"
      />
    </div>
    <form v-if="contest !== undefined">
      <labeled-form required label="コンテスト名" :class="$style.labeledForm">
        <form-input v-model="formValues.name" :limit="32" />
      </labeled-form>
      <labeled-form label="開催日時" :class="$style.labeledForm">
        <form-duration v-model="formValues.duration" since-required />
      </labeled-form>
      <labeled-form label="リンク" :class="$style.labeledForm">
        <form-input v-model="formValues.link" has-anchor />
      </labeled-form>
      <labeled-form required label="説明" :class="$style.labeledForm">
        <form-text-area
          v-model="formValues.description"
          :limit="256"
          :rows="3"
        />
      </labeled-form>
    </form>
    <delete-form target="コンテスト" @delete="open" />

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
.backButton {
  margin-left: 0.5rem;
}
</style>
