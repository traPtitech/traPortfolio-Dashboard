<script lang="ts" setup>
import type { UserContest } from '/@/lib/apis'
import Icon from '/@/components/UI/Icon.vue'
import { getFullDayString } from '/@/lib/date'

interface Props {
  contest: UserContest
}

defineProps<Props>()
</script>

<template>
  <router-link :to="`/contests/${contest.id}/edit`" :class="$style.link">
    <div :class="$style.container">
      <p :class="$style.name">{{ contest.name }}</p>
      <p :class="$style.duration">
        <icon name="mdi:calendar" />
        {{ getFullDayString(new Date(contest.duration.since)) }}
      </p>
      <p :class="$style.teams">
        <icon name="mdi:account-group" />
        {{ contest.teamCount }} チーム
      </p>
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

.name {
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
