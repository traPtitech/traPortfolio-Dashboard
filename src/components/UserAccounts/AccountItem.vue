<script lang="ts" setup>
import type { Account } from '/@/lib/apis'
import ServiceLogo from '/@/components/UserAccounts/ServiceLogo.vue'
import AIcon from '/@/components/UI/AIcon.vue'

interface Props {
  account: Account
}

defineProps<Props>()
</script>

<template>
  <router-link
    :to="{ name: 'UserAccountsEdit', params: { accountId: account.id } }"
    :class="$style.link"
  >
    <div :class="$style.container">
      <div :class="$style.displayNameContainer">
        <p :class="$style.displayName">
          {{ account.displayName }}
        </p>
        <service-logo :service="account.type" />
      </div>
      <p :class="$style.url"><a-icon name="mdi:link" />{{ account.url }}</p>
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
  border: 1px solid $color-primary-text;
  border-radius: 8px;

  &:hover {
    background-color: $color-background-dim;
  }
}
.displayNameContainer {
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.displayName {
  color: $color-primary;
  font-size: 1.125rem;
}
.url {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
