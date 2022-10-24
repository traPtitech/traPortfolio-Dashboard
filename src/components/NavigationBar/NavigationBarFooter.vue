<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'
</script>

<template>
  <div :class="$style.container">
    <p :class="$style.serviceName">traPortfolio</p>
    <icon name="mdi:help" />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $color-secondary;
  padding: 0 1rem;
}
</style>
