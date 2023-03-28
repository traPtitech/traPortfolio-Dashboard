<script lang="ts" setup>
import UserIcon from '/@/components/UI/UserIcon.vue'
interface Props {
  userIds: string[]
}

defineProps<Props>()
</script>

<template>
  <div :class="$style.userIcons">
    <user-icon
      v-for="(userId, i) in userIds.slice(0, 3)"
      :key="userId"
      :user-id="userId"
      :class="$style.userIcon"
      :style="{ left: `${i * 16}px` }"
    />
    <span v-if="userIds.length > 3">+{{ userIds.length - 3 }}</span>
  </div>
</template>

<style lang="scss" module>
.userIcons {
  width: 80px;
  position: relative;
  text-align: right;
}
.userIcon {
  position: absolute;
}
</style>
