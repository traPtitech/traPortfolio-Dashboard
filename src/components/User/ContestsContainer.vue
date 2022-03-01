<template>
  <div>
    <div :class="$style.title">実績</div>
    <p v-for="contest in contests" :key="contest.id">{{ contest.name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ContestTeamWithContestName } from '/@/lib/apis'

export default defineComponent({
  name: 'ContestsContainer',
  props: {
    contests: {
      type: Array as PropType<ContestTeamWithContestName[]>,
      default: []
    }
  },
  setup() {
    return
  }
})
</script>

<style lang="scss" module>
.title {
  color: $color-text;
  font-size: 2.25rem;
}
</style>
