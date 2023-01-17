<template>
  <ul :class="$style.list">
    <page-info-panel
      v-for="page in pages"
      :key="page.name"
      :name="page.name"
      :path="page.path"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageInfoPanel from '/@/components/Index/PageInfoPanel.vue'
import { routes } from '/@/use/routeInfo'

export default defineComponent({
  name: 'PageInfoPanels',
  components: { PageInfoPanel },
  setup() {
    const pages = routes.filter(route => route.name != 'Top')
    return { pages }
  }
})
</script>

<style lang="scss" module>
.list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  gap: 1rem;
}
</style>
