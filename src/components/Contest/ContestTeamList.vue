<template>
  <section>
    <section-title>チーム</section-title>
    <div :class="$style.container">
      <contest-team-list-item
        v-for="contestTeam in contestTeams"
        :key="contestTeam.id"
        :contest-team="contestTeam"
        :contest-id="contestId"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ContestTeam } from '/@/lib/apis'
import ContestTeamListItem from './ContestTeamListItem.vue'
import SectionTitle from '/@/components/Layout/SectionTitle.vue'

export default defineComponent({
  name: 'ContestTeamList',
  components: {
    ContestTeamListItem,
    SectionTitle
  },
  props: {
    contestTeams: {
      type: Array as PropType<ContestTeam[]>,
      default: []
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
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 2rem;
}
</style>
