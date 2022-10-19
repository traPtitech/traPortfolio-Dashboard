<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'
import type { AccountType } from '/@/lib/apis'
import { validateService } from '/@/use/validateService'
import { serviceArray } from '/@/consts/services'

interface Props {
  service: AccountType
}

const props = defineProps<Props>()
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
