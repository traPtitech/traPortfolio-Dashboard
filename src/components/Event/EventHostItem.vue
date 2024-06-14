<script lang="ts" setup>
import { User } from '/@/lib/apis'
import UserIcon from '/@/components/UI/UserIcon.vue'

interface Props {
  host: User
}

defineProps<Props>()
</script>

<template>
  <div :class="$style.container">
    <user-icon :user-name="host.name" :size="48" />
    <p :class="$style.name">{{ host.name }}</p>
  </div>
</template>

<style lang="scss" module>
.container {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  border: 1px solid $color-primary-text;
  border-radius: 8px;
}

.name {
  font-size: 1.125rem;
}
</style>
