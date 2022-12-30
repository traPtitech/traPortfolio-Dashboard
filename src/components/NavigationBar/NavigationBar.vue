<script lang="ts" setup>
import NavigationLinks from './NavigationLinks.vue'
import NavigationBarFooter from './NavigationBarFooter.vue'
</script>

<template>
  <nav :class="$style.container">
    <navigation-links />
    <navigation-bar-footer />
  </nav>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $color-background-dim;
  padding: 1rem 0;
}
</style>
