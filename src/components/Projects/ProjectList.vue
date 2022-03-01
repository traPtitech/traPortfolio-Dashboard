<template>
  <section :class="$style.container">
    <project-list-item
      v-for="project in projects"
      :key="project.id"
      :project="project"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Project } from '/@/lib/apis'
import ProjectListItem from './ProjectListItem.vue'

export default defineComponent({
  name: 'ProjectList',
  components: {
    ProjectListItem
  },
  props: {
    projects: {
      type: Array as PropType<Project[]>,
      default: []
    }
  }
})
</script>

<style lang="scss" module>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
}
</style>
