<script lang="ts" setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useProjectStore } from '/@/store/project'

import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import ProjectItem from '/@/components/Projects/ProjectItem.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import FormInput from '/@/components/UI/FormInput.vue'
import { searchListCaseInsensitive } from '/@/lib/search'

const projectStore = useProjectStore()
const projects = await projectStore.fetchProjects()

const searchQuery = ref('')
const filteredProjects = computed(() =>
  searchListCaseInsensitive(projects, searchQuery.value, v => v.name)
)
</script>

<template>
  <page-container>
    <content-header
      icon-name="mdi:clipboard-file-outline"
      :header-texts="[{ title: 'Projects', url: '/projects' }]"
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
      <div>
        <router-link to="/projects/new" :class="$style.link">
          <base-button type="primary" icon="mdi:clipboard-file">
            New</base-button
          >
        </router-link>
      </div>
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
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

.searchForm {
  flex-grow: 1;
}

.link {
  text-decoration: none;
  color: inherit;
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
