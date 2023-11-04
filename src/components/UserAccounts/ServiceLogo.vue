<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'
import type { AccountType } from '/@/lib/apis'
import { services, serviceTypeToNameMap } from '/@/consts/services'
import { computed } from 'vue'

interface Props {
  service: AccountType
}

const props = defineProps<Props>()

const serviceName = computed(() => serviceTypeToNameMap[props.service])
</script>

<template>
  <div :class="$style.logo">
    <icon :name="services[serviceName].icon" />
    {{ serviceName }}
  </div>
</template>

<style lang="scss" module>
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
