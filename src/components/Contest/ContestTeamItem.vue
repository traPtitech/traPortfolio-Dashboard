<script lang="ts" setup>
import { computed } from 'vue'
import UserIcons from '/@/components/UI/UserIcons.vue'
import type { ContestTeam } from '/@/lib/apis'

interface Props {
  contestId: string
  contestTeam: ContestTeam
}

const props = defineProps<Props>()

const userIds = computed(() =>
  props.contestTeam.members.map(member => member.name)
)
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
      <user-icons :user-ids="userIds" />
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
  border: 1px solid $color-primary-text;
  border-radius: 8px;

  &:hover {
    background-color: $color-background-dim;
  }
}
.name {
  color: $color-primary;
  font-size: 1.125rem;
}
.result {
  margin-top: 2rem;
}
</style>
