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
import PageInfoPanel from './PageInfoPanel.vue'

const pages = [
  { name: 'Profile', path: '/user' },
  { name: 'Events', path: '/events' },
  { name: 'Contests', path: '/contests' },
  { name: 'Projects', path: '/projects' }
]

export default defineComponent({
  name: 'PageInfoPanels',
  components: { PageInfoPanel },
  setup() {
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
