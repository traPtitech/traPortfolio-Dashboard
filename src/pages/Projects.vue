<script lang="ts" setup>
import { computed, ref } from 'vue'

import { useProjectStore } from '/@/store/project'

import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import ProjectItem from '/@/components/Projects/ProjectItem.vue'
import LinkButton from '/@/components/UI/LinkButton.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import { searchListCaseInsensitive } from '/@/lib/search'

const projectStore = useProjectStore()
const projects = await projectStore.fetchProjects()

const searchQuery = ref('')
const filteredProjects = computed(() =>
  searchListCaseInsensitive(projects, searchQuery.value, 'name')
)
</script>

<template>
  <page-container>
    <content-header
      icon-name="mdi:clipboard-file-outline"
      :header-texts="[{ title: 'Projects', path: { name: 'Projects' } }]"
      detail="プロジェクトを変更します"
      :class="$style.header"
    />
    <div :class="$style.searchFormContainer">
      <div :class="$style.searchForm">
        <form-input
          v-model="searchQuery"
          placeholder="プロジェクト名で検索"
          icon="magnify"
        />
      </div>
      <link-button
        :to="{ name: 'ProjectNew' }"
        type="primary"
        icon="mdi:clipboard-file"
        >New</link-button
      >
    </div>
    <ul :class="$style.projectList">
      <li v-for="project in filteredProjects" :key="project.id">
        <project-item :project="project" />
      </li>
    </ul>
  </page-container>
</template>

<style lang="scss" module>
.header {
  margin-bottom: 2rem;
}

.searchFormContainer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.searchForm {
  flex-grow: 1;
}

.projectList {
  list-style: none;
  li {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
