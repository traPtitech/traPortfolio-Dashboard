<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'
import type { AccountType } from '/@/lib/apis'
import type { Service } from '/@/consts/services'
import { serviceArray } from '/@/consts/services'

interface Props {
  service: AccountType
}

const props = defineProps<Props>()

const validateService = (service: Service | undefined) => {
  if (service === undefined) {
    return {
      name: 'Unknown',
      icon: 'mdi:help-circle'
    }
  }
  return service
}
</script>

<template>
  <div :class="$style.logo">
    <Icon
      :name="validateService(serviceArray[props.service]).icon"
      :class="$style.icon"
    />
    {{ validateService(serviceArray[props.service]).name }}
  </div>
</template>

<style lang="scss" module>
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.icon {
  display: flex;
}
</style>
