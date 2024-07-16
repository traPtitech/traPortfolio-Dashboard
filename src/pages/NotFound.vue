<script setup lang="ts">
import PageContainer from '/@/components/Layout/PageContainer.vue'
</script>

<template>
  <page-container>
    <h1 :class="$style.h1">404 Not Found</h1>
  </page-container>
</template>

<style lang="scss" module>
.h1 {
  color: $color-primary;
}
</style>
