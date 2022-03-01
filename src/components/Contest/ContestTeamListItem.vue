<template>
  <div>
    <router-link
      :class="$style.link"
      :to="`/contests/${contestId}/${contestTeam.id}`"
    >
      <span :class="$style.name">{{ contestTeam.name }}</span>
      <span v-if="contestTeam.result" :class="$style.result"
        >({{ contestTeam.result }})</span
      >
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ContestTeam } from '/@/lib/apis'

export default defineComponent({
  name: 'ContestTeamListItem',
  props: {
    contestTeam: {
      type: Object as PropType<ContestTeam>,
      required: true
    },
    contestId: {
      type: String,
      require: true,
      default: ''
    }
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
.result {
  color: $color-text;
  font-size: 1.5rem;
  margin: 0 0.5em;
}
</style>
