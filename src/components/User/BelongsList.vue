<template>
  <section>
    <group-list-item v-for="group in groups" :key="group.id" :group="group" />
    <project-list-item
      v-for="project in projects"
      :key="project.id"
      :project="project"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import GroupListItem from './GroupListItem.vue'
import ProjectListItem from './ProjectListItem.vue'
import { UserGroup, UserProject } from '/@/lib/apis'

export default defineComponent({
  name: 'BelongsList',
  components: { GroupListItem, ProjectListItem },
  props: {
    groups: {
      type: Array as PropType<UserGroup[]>,
      default: []
    },
    projects: {
      type: Array as PropType<UserProject[]>,
      default: []
    }
  }
})
</script>
