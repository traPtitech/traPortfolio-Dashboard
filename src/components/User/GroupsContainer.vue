<template>
  <div>
    <div :class="$style.title">traPでの所属</div>
    <belongs-list :groups="groups" :projects="projects" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UserGroup, UserProject } from '/@/lib/apis'
import BelongsList from './BelongsList.vue'

export default defineComponent({
  name: 'GroupsContainer',
  components: {
    BelongsList
  },
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

<style lang="scss" module>
.title {
  color: $color-text;
  font-size: 2.25rem;
}
</style>
