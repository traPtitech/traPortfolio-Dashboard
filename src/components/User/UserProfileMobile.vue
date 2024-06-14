<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseButton from '/@/components/UI/BaseButton.vue'
import UserIcon from '/@/components/UI/UserIcon.vue'
import UserAccounts from '/@/components/User/UserAccounts.vue'
import type { UserDetail } from '/@/lib/apis'

interface Props {
  user: UserDetail
}

defineProps<Props>()
</script>

<template>
  <div>
    <div :class="$style.iconAndNameContainer">
      <user-icon :user-id="user.name" :size="64" />
      <div :class="$style.nameContainer">
        <p :class="$style.name">{{ user.name }}</p>
        <!-- <p :class="$style.realName">{{ user.realName }}</p> -->
      </div>
    </div>
    <div :class="$style.accounts">
      <user-accounts :accounts="user.accounts" />
      <router-link to="/user/accounts" :class="$style.link">
        <base-button icon="mdi:account">Edit</base-button>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" module>
.iconAndNameContainer {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.nameContainer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 1rem;
}
.name {
  color: $color-primary;
  font-size: 1.5rem;
  word-break: break-all;
}
.realName {
  font-size: 1.25rem;
}
.accounts {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1rem;
}
.link {
  text-decoration: none;
  color: inherit;
}
</style>
