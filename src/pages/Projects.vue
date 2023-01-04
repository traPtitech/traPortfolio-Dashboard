<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useProjectStore } from '/@/store/project'

import ContentHeader from '/@/components/Layout/ContentHeader.vue'
import PageContainer from '/@/components/Layout/PageContainer.vue'
import ProjectItem from '/@/components/Projects/ProjectItem.vue'
import BaseButton from '/@/components/UI/BaseButton.vue'
import FormInput from '/@/components/UI/FormInput.vue'

const projectStore = useProjectStore()
const { projects } = storeToRefs(projectStore)

const searchQuery = ref('')

projectStore.fetchProjects()
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
        <p :class="$style.body2">検索</p>
        <form-input
          v-model="searchQuery"
          placeholder="プロジェクト名"
          icon="magnify"
        />
      </div>
      <div>
        <p :class="$style.body2">プロジェクト作成</p>
        <router-link to="/projects/new" :class="$style.link">
          <base-button type="primary" icon="mdi:clipboard-file">
            New</base-button
          >
        </router-link>
      </div>
    </div>
    <ul :class="$style.projectList">
      <li v-for="project in projects" :key="project.id">
        <project-item :project="project" />
      </li>
    </ul>
  </page-container>
</template>

<style lang="scss" module>
.header {
  margin: 4rem 0 2rem;
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

.body2 {
  font-size: 0.875rem;
  color: $color-secondary;
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

    &:hover {
      background-color: $color-background-dim;
    }
  }
}
</style>
