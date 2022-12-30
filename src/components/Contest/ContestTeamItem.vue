<script lang="ts" setup>
import UserIcons from '/@/components/UI/UserIcons.vue'
import type { ContestTeam } from '/@/lib/apis'

interface Props {
  contestId: string
  contestTeam: ContestTeam
}

defineProps<Props>()
const userIds = ['sapphi_red', 'toshi00', 'tesso', 'mehm8128']
</script>

<template>
  <router-link
    :to="`/contests/${contestId}/teams/${contestTeam.id}/edit`"
    :class="$style.link"
  >
    <div :class="$style.container">
      <div>
        <p :class="$style.name">{{ contestTeam.name }}</p>
        <p :class="$style.result">{{ contestTeam.result }}</p>
      </div>
      <UserIcons :user-ids="userIds" />
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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.name {
  color: $color-primary;
  font-size: 1.125rem;
}
.result {
  margin-top: 2rem;
}
</style>
