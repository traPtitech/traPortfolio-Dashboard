<script lang="ts" setup>
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import LinkButton from '/@/components/UI/LinkButton.vue'
import apis, { ProjectMember as ProjectMemberType } from '/@/lib/apis'
import type { EditProjectRequest, ProjectDetail } from '/@/lib/apis'
import { useRouter } from 'vue-router'
import useParam from '/@/lib/param'
import FormTextArea from '/@/components/UI/FormTextArea.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import { computed, ref } from 'vue'
import LabeledForm from '/@/components/Form/LabeledForm.vue'
import {
  isValidLength,
  isValidOptionalUrl,
  isValidYearWithSemesterDuration
} from '/@/lib/validate'
import { useToast } from 'vue-toastification'
import FormProjectDuration from '/@/components/UI/FormProjectDuration.vue'
import { useProjectStore } from '/@/store/project'
import MemberInput from '/@/components/UI/MemberInput.vue'
import ProjectMember from '/@/components/Projects/ProjectMember.vue'
import { useUserStore } from '/@/store/user'
import FieldErrorMessage from '/@/components/UI/FieldErrorMessage.vue'

const router = useRouter()
const toast = useToast()
const { mutate } = useProjectStore()

const projectId = useParam('projectId')
const projectDetail: ProjectDetail = (await apis.getProject(projectId.value))
  .data
const projectMembers: ProjectMemberType[] = (
  await apis.getProjectMembers(projectId.value)
).data

const formValues = ref<Required<EditProjectRequest>>({
  name: projectDetail.name,
  link: projectDetail.link,
  description: projectDetail.description,
  duration: projectDetail.duration
})

const isSending = ref(false)
const canSubmit = computed(
  () =>
    !isSending.value &&
    isValidLength(formValues.value.name, 1, 32) &&
    isValidYearWithSemesterDuration(formValues.value.duration) &&
    isValidOptionalUrl(formValues.value.link) &&
    isValidLength(formValues.value.description, 1, 256) &&
    members.value.every(member =>
      isValidYearWithSemesterDuration(member.duration)
    )
)

const shouldShowDurationError = computed(
  () => !isValidYearWithSemesterDuration(formValues.value.duration)
)

const updateProject = async () => {
  isSending.value = true
  try {
    const requestData: EditProjectRequest = {
      ...formValues.value,
      link: formValues.value.link || undefined
    }
    const promises = [
      apis.editProject(projectId.value, requestData),
      apis.editProjectMembers(projectId.value, {
        members: members.value.map(member => ({
          userId: member.id,
          duration: member.duration
        }))
      })
    ]
    await Promise.all(promises)
    mutate()

    toast.success('プロジェクト情報を更新しました')
    router.push('/projects')
  } catch {
    toast.error('プロジェクト情報の更新に失敗しました')
  }
  isSending.value = false
}

const userStore = useUserStore()
const users = await userStore.fetchUsers()

const userWithDurations = computed<ProjectMemberType[]>(() =>
  users.map(user => ({
    ...user,
    duration: {
      since: {
        year: new Date().getFullYear(),
        semester: 0
      },
      until: undefined
    }
  }))
)
const members = ref<ProjectMemberType[]>(projectMembers)

const handleDelete = (id: string) => {
  members.value = members.value.filter(member => member.id !== id)
}
</script>

<template>
  <page-container>
    <div :class="$style.headerContainer">
      <content-header
        icon-name="mdi:clipboard-file-outline"
        :header-texts="[
          { title: 'Projects', path: { name: 'Projects' } },
          {
            title: projectDetail.name,
            path: { name: 'Project', params: { projectId: projectId } }
          },
          {
            title: 'Edit',
            path: { name: 'Project', params: { projectId: projectId } }
          }
        ]"
        detail="プロジェクトの情報を変更します。"
        :class="$style.header"
      />
    </div>
    <form>
      <labeled-form required label="プロジェクト名" :class="$style.labeledForm">
        <form-input v-model="formValues.name" :limit="32" />
      </labeled-form>
      <labeled-form label="期間" :class="$style.labeledForm">
        <form-project-duration v-model="formValues.duration" />
        <field-error-message v-if="shouldShowDurationError">
          開始期間は終了期間よりも前に指定してください。
        </field-error-message>
      </labeled-form>
      <labeled-form label="リンク" :class="$style.labeledForm">
        <form-input
          v-model="formValues.link"
          has-anchor
          placeholder="https://"
        />
      </labeled-form>
      <labeled-form required label="説明" :class="$style.labeledForm">
        <form-text-area
          v-model="formValues.description"
          :limit="256"
          :rows="3"
        />
      </labeled-form>
      <labeled-form label="メンバー" :class="$style.labeledForm">
        <member-input
          v-model="members"
          :class="$style.memberInput"
          :users="userWithDurations"
          :is-disabled="false"
        />
        <div v-for="member in members" :key="member.id">
          <project-member
            v-model="member.duration"
            :user="member"
            :class="$style.projectMember"
            @delete="handleDelete"
          />
        </div>
      </labeled-form>
    </form>

    <div :class="$style.buttonContainer">
      <link-button
        :to="{ name: 'Projects' }"
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
        @click="updateProject"
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

.memberInput {
  margin-bottom: 1rem;
}

.projectMember {
  margin-bottom: 0.5rem;
}
</style>
