<script lang="ts" setup>
import NavigationContent from './NavigationContent.vue'
</script>

<template>
  <div :class="$style.container">
    <navigation-content />
  </div>
</template>

<style lang="scss" module>
.container {
  background-color: $color-background-dim;
}
</style>
