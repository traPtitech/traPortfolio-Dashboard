<script lang="ts" setup>
import { User } from '/@/lib/apis'
import UserIcon from '/@/components/UI/UserIcon.vue'
import FormProjectDuration from '/@/components/UI/FormProjectDuration.vue'
import Icon from '/@/components/UI/Icon.vue'
import { ref } from 'vue'
interface Props {
  user: User
}

defineProps<Props>()
const duration = ref({
  since: {
    year: 2021,
    semester: 1
  },
  until: undefined
})

const emit = defineEmits<{
  (e: 'delete', value: string): void
}>()
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <user-icon :user-id="user.id" :size="48" />
      <p :class="$style.name">{{ user.name }}</p>
      <form-project-duration v-model="duration" since-required />
    </div>
    <div @click="emit('delete', user.id)">
      <icon :size="32" name="mdi:delete" :class="$style.icon" />
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;

  border: 1px solid $color-primary-text;
  border-radius: 8px;
}

.content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.icon {
  color: $color-secondary;
  &:hover {
    opacity: 0.8;
  }
}
</style>
