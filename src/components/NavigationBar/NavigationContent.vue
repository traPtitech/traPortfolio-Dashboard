<script setup lang="ts">
import NavigationLinks from '/@/components/NavigationBar/NavigationLinks.vue'
</script>

<template>
  <navigation-links :class="$style.container" />
</template>

<style lang="scss" module>
.container {
  margin-top: 1rem;
}
</style>
