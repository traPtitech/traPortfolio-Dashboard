<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  name: string
  size?: number
}
const props = withDefaults(defineProps<Props>(), { size: 24 })

const styles = computed(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`
}))
</script>

<template>
  <div :class="$style.container">
    <span class="iconify" :data-icon="name" :style="styles" />
  </div>
</template>

<style lang="scss" module>
.icon {
  contain: strict;
}
</style>
