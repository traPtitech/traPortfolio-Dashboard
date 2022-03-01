<template>
  <section :class="$style.container">
    <group-list-item v-for="group in groups" :key="group.id" :group="group" />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Group } from '/@/lib/apis'
import GroupListItem from './GroupListItem.vue'

export default defineComponent({
  name: 'GroupList',
  components: {
    GroupListItem
  },
  props: {
    groups: {
      type: Array as PropType<Group[]>,
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
