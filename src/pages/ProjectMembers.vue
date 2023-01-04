<script lang="ts" setup>
import PageContainer from '/@/components/Layout/PageContainer.vue'
import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import useParam from '/@/use/param'
import MemberInput from '/@/components/UI/MemberInput.vue'
import { ref, watchEffect, computed } from 'vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import apis, { ProjectDetail } from '/@/lib/apis'

const projectId = useParam('id')
const projectDetail = ref<ProjectDetail>()

watchEffect(async () => {
  if (projectId.value) {
    projectDetail.value = (await apis.getProject(projectId.value)).data
  }
})
const members = computed(() => projectDetail.value?.members ?? [])
const name = computed(() => projectDetail.value?.name ?? 'Loading... ')

const fetchState = computed(() => projectDetail.value !== undefined)
</script>

<template>
  <page-container>
    <content-header
      icon-name="mdi:clipboard-file-outline"
      :header-texts="[
        { title: 'Projects', url: '/projects' },
        { title: `${name}`, url: `/projects/${projectId}` },
        { title: 'Members', url: '/projects/${projectId}/members' }
      ]"
      detail="プロジェクトを変更します"
      :class="$style.header"
    />
    <h2 :class="$style.memberText">メンバー</h2>
    <member-input
      v-model="members"
      :class="$style.memberInput"
      :is-disabled="!fetchState"
    />
    <div :class="$style.buttonContainer">
      <router-link :to="`/projects/${projectId}`" :class="$style.link">
        <base-button icon="mdi:arrow-left" type="secondary">Back</base-button>
      </router-link>
      <router-link :to="`/projects/${projectId}/edit`" :class="$style.link">
        <base-button
          icon="mdi:arrow-right"
          type="primary"
          :is-disabled="!fetchState"
          >Next</base-button
        >
      </router-link>
    </div>
  </page-container>
</template>

<style lang="scss" module>
.header {
  margin: 4rem 0 2rem;
}

.memberText {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.memberInput {
  margin-bottom: 2rem;
  margin-left: 0.5rem;
}

.buttonContainer {
  display: flex;
  gap: 1rem;
}

.link {
  text-decoration: none;
  color: inherit;
}
</style>
