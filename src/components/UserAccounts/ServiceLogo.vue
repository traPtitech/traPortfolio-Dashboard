<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'
import type { AccountType } from '/@/lib/apis'
import { services } from '/@/consts/services'

interface Props {
  service: AccountType
}

defineProps<Props>()
</script>

<template>
  <div :class="$style.logo">
    <Icon :name="services[service].icon" />
    {{ services[service].name }}
  </div>
</template>

<style lang="scss" module>
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
