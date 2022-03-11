<template>
  <ul>
    <navigation-links-item
      v-for="route in routes"
      :key="route.name"
      :name="route.name"
      :path="route.path"
      :class="$style.item"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationLinksItem from './NavigationLinksItem.vue'

export default defineComponent({
  name: 'NavigationLinks',
  components: { NavigationLinksItem },
  setup() {
    const routes = [
      { name: 'Top', path: '/' },
      { name: 'Profile', path: '/user' },
      { name: 'Events', path: '/events' },
      { name: 'Contests', path: '/contests' },
      { name: 'Projects', path: '/projects' }
    ]
    return { routes }
  }
})
</script>

<style lang="scss" module>
.item {
  margin: 0.25rem 0;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
