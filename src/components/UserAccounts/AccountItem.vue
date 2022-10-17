<script lang="ts" setup>
import type { Account } from '/@/lib/apis'
import ServiceLogo from '/@/components/UserAccounts/ServiceLogo.vue'
import Icon from '/@/components/UI/Icon.vue'

interface Props {
  account: Account
}

const props = defineProps<Props>()
</script>

<template>
  <router-link
    :to="`/user/accounts/${props.account.id}/edit`"
    :class="$style.link"
  >
    <div :class="$style.container">
      <div :class="$style.displayNameContainer">
        <p :class="$style.displayName">{{ props.account.displayName }}</p>
        <service-logo :service="props.account.type" />
      </div>
      <p :class="$style.url"><icon name="mdi:link" />{{ props.account.url }}</p>
      <p :class="$style.prPermittion">
        <icon v-if="props.account.prPermitted" name="mdi:advertisements" />
        <icon v-else name="mdi:advertisements-off" />
        <span>
          traP広報にて言及を許可{{
            props.account.prPermitted ? 'する' : 'しない'
          }}
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
  padding: 8px;
}
.displayNameContainer {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.displayName {
  color: $color-primary;
  font-size: 18px;
}
.url {
  display: flex;
  align-items: center;
  gap: 8px;
}
.prPermittion {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}
</style>
