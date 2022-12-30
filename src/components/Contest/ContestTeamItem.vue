<script lang="ts" setup>
import type { ContestTeam } from '/@/lib/apis'

interface Props {
  contestId: string
  contestTeam: ContestTeam
}

defineProps<Props>()
</script>

<template>
  <router-link :to="`/contests/${contestTeam.id}`" :class="$style.link">
    <div :class="$style.container">
      <p :class="$style.name">{{ contestTeam.name }}</p>
      <p :class="$style.result">{{ contestTeam.result }}</p>
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
</style>
