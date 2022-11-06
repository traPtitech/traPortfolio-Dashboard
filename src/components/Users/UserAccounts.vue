<script setup lang="ts">
import { computed } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { serviceArray, type ServiceWithType } from '/@/consts/services'
import type { Account } from '/@/lib/apis'

interface Service extends ServiceWithType {
  hasAccount: boolean
}

interface Props {
  accounts: Account[]
}

const props = defineProps<Props>()

const shownServices = computed((): Service[] => {
  return serviceArray.map(service => {
    return {
      ...service,
      hasAccount: props.accounts.some(account => account.type === service.type)
    }
  })
})
</script>

<template>
  <div :class="$style.container">
    <icon
      v-for="service in shownServices"
      :key="service.name"
      :name="service.icon"
      :class="$style.icon"
      :data-has-account="service.hasAccount"
    />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.icon {
  &[data-has-account='false'] {
    opacity: 0.2;
  }
}
</style>
