<template>
  <div>
    <router-link :class="$style.link" :to="`/contests/${contest.id}`">
      <span :class="$style.name">{{ contest.name }}</span>
      <span :class="$style.date">({{ date }})</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Contest } from '/@/lib/apis'
import { getFullDayString } from '/@/lib/date'

export default defineComponent({
  name: 'ContestListItem',
  props: {
    contest: {
      type: Object as PropType<Contest>,
      required: true
    }
  },
  setup(props) {
    const date = computed(() =>
      getFullDayString(new Date(props.contest.duration.since))
    )
    return { date }
  }
})
</script>

<style lang="scss" module>
.link {
  text-decoration: none;
}
.name {
  color: $color-text;
  font-size: 3rem;
}
.date {
  color: $color-text;
  font-size: 1.5rem;
  margin: 0 0.5em;
}
</style>
