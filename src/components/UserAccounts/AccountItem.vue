<script lang="ts" setup>
import type { Account } from '/@/lib/apis'
import ServiceLogo from '/@/components/UserAccounts/ServiceLogo.vue'
import Icon from '/@/components/UI/Icon.vue'

interface Props {
  account: Account
}

defineProps<Props>()
</script>

<template>
  <router-link :to="`/users/accounts/${account.id}/edit`" :class="$style.link">
    <div :class="$style.container">
      <div :class="$style.displayNameContainer">
        <p :class="$style.displayName">{{ account.displayName }}</p>
        <service-logo :service="account.type" />
      </div>
      <p :class="$style.url"><icon name="mdi:link" />{{ account.url }}</p>
      <p :class="$style.prPermission">
        <icon v-if="account.prPermitted" name="mdi:advertisements" />
        <icon v-else name="mdi:advertisements-off" />
        <span>
          traP広報にて言及を許可{{ account.prPermitted ? 'する' : 'しない' }}
        </span>
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
.prPermission {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
