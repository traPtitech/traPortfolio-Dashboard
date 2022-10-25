<script lang="ts" setup>
import type { ContestTeamWithContestName } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'

interface Props {
  contest: ContestTeamWithContestName
}

defineProps<Props>()
</script>

<template>
  <router-link :to="`/contests/${contest.id}/edit`" :class="$style.link">
    <div :class="$style.container">
      <p :class="$style.displayName">{{ contest.name }}</p>
      <p :class="$style.duration"><icon name="mdi:calendar" />2020/12/30</p>
      <p :class="$style.teams"><icon name="mdi:account-group" />23チーム</p>
    </div>
  </router-link>
</template>

<style lang="scss" module>
.link {
  color: inherit;
  text-decoration: none;
}
.container {
  padding: 0.5rem;
}

.displayName {
  color: $color-primary;
  font-size: 1.125rem;
}
.duration {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.teams {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
