<script lang="ts" setup>
import NavigationLinksItem from './NavigationLinksItem.vue'
import { routes } from '/@/lib/routeInfo'
</script>

<template>
  <ul :class="$style.list">
    <navigation-links-item
      v-for="route in routes"
      :key="route.name"
      :name="route.name"
      :path="route.path"
    />
  </ul>
</template>

<style lang="scss" module>
.list {
  list-style: none;

  li {
    margin: 0.5rem 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
