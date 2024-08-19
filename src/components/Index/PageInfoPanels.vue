<script lang="ts" setup>
import PageInfoPanel from '/@/components/Index/PageInfoPanel.vue'
import { routes } from '/@/lib/routeInfo'

const pages = routes.filter(route => route.name != 'Top')
</script>

<template>
  <ul :class="$style.list">
    <page-info-panel
      v-for="page in pages"
      :key="page.name"
      :name="page.name"
      :path="{ name: page.name }"
    />
  </ul>
</template>

<style lang="scss" module>
.list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  gap: 1rem;
}
</style>
