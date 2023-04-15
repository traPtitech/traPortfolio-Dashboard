<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis, { CreateContestRequest } from '/@/lib/apis'
import { RouterLink, useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import FormTextArea from '/@/components/UI/FormTextArea.vue'
import FormDuration from '/@/components/UI/FormDuration.vue'

const router = useRouter()

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
    //eslint-disable-next-line no-console
    console.log('追加しました') // todo:トーストとかに変えたい
    router.push(`/contests/${res.data.id}`)
  } catch {
    //eslint-disable-next-line no-console
    console.log('追加に失敗しました')
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
          { title: 'New', url: '/contests/new' }
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
      </labeled-form>
      <labeled-form label="リンク" :class="$style.labeledForm">
        <form-input
          v-model="formValues.link"
          placeholder="https://"
          has-anchor
        />
      </labeled-form>
      <labeled-form label="説明" :class="$style.labeledForm">
        <form-text-area
          v-model="formValues.description"
          placeholder="説明を入力"
          :rows="3"
          :limit="256"
        />
      </labeled-form>
    </form>
    <div :class="$style.buttonContainer">
      <router-link to="/contests" :class="$style.link">
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
