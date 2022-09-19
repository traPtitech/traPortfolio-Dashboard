<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 24
  }
})
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
