<template>
  <section :class="$style.container">
    <member-list-item
      v-for="member in members"
      :key="member.id"
      :member="member"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ProjectMember } from '/@/lib/apis'
import MemberListItem from './MemberListItem.vue'

export default defineComponent({
  name: 'MemberList',
  components: {
    MemberListItem
  },
  props: {
    members: {
      type: Array as PropType<Array<ProjectMember>>,
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
