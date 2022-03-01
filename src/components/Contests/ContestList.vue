<template>
  <section :class="$style.container">
    <contest-list-item
      v-for="contest in contests"
      :key="contest.id"
      :contest="contest"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Contest } from '/@/lib/apis'
import ContestListItem from './ContestListItem.vue'

export default defineComponent({
  name: 'ContestList',
  components: {
    ContestListItem
  },
  props: {
    contests: {
      type: Array as PropType<Contest[]>,
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
