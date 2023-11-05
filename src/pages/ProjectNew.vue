<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis, { CreateProjectRequest } from '/@/lib/apis'
import { RouterLink } from 'vue-router'
import { reactive, ref } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import FormTextArea from '/@/components/UI/FormTextArea.vue'
import { useToast } from 'vue-toastification'
import FormProjectDuration from '/@/components/UI/FormProjectDuration.vue'
import { useProjectStore } from '/@/store/project'

const toast = useToast()
const { mutate } = useProjectStore()

const formValues = reactive<Required<CreateProjectRequest>>({
  name: '',
  link: '',
  description: '',
  duration: {
    since: {
      year: new Date().getFullYear(),
      semester: 0
    },
    until: {
      year: new Date().getFullYear(),
      semester: 0
    }
  }
})

const isSending = ref(false)
const createProject = async () => {
  isSending.value = true
  try {
    await apis.createProject(formValues)
    mutate()
    toast.success('プロジェクトを追加しました')
  } catch {
    toast.error('プロジェクトの追加に失敗しました')
  }
  isSending.value = false
}
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:clipboard-file-outline"
        :header-texts="[
          { title: 'Projects', url: '/projects' },
          { title: 'New', url: '/projects/new' }
        ]"
        detail="プロジェクトを作成します。"
        :class="$style.header"
      />
    </div>
    <form>
      <labeled-form label="プロジェクト名" required :class="$style.labeledForm">
        <form-input
          v-model="formValues.name"
          placeholder="プロジェクト名を入力"
        />
      </labeled-form>
      <labeled-form label="期間" :class="$style.labeledForm">
        <form-project-duration v-model="formValues.duration" since-required />
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
      <router-link to="/projects" :class="$style.link">
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
        :class="$style.createButton"
        type="primary"
        icon="mdi:plus"
        @click="createProject"
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
.prPermittedForm {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
'
