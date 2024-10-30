<script lang="ts" setup>
import { Icon } from '@iconify/vue'

interface Props {
  name: string
  size?: number
}
withDefaults(defineProps<Props>(), { size: 24 })
</script>

<template>
  <icon
    :icon="name"
    :height="size"
    :width="size"
    :class="$style.icon"
  />
</template>

<style lang="scss" module>
.icon {
  display: flex;
}
</style>
