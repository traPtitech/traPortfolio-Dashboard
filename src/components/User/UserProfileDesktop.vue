<script setup lang="ts">
import LinkButton from '/@/components/UI/LinkButton.vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import UserAccounts from '/@/components/User/UserAccounts.vue'
import type { UserDetail } from '/@/lib/apis'

interface Props {
  user: UserDetail
}

defineProps<Props>()
</script>

<template>
  <div :class="$style.profileContainer">
    <user-icon :user-name="user.name" :size="128" />
    <div>
      <div :class="$style.nameContainer">
        <p :class="$style.name">
          {{ user.name }}
        </p>
        <!-- <p :class="$style.realName">{{ user.realName }}</p> -->
      </div>
      <div :class="$style.accounts">
        <user-accounts :accounts="user.accounts" />
        <link-button :to="{ name: 'UserAccounts' }" icon="mdi:account">
          Edit
        </link-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.profileContainer {
  display: flex;
  align-items: center;
  gap: 4rem;
}
.nameContainer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0 2rem;
}
.name {
  color: $color-primary;
  font-size: 3rem;
  word-break: break-all;
}
.realName {
  font-size: 1.5rem;
}
.accounts {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 1rem;
}
</style>
