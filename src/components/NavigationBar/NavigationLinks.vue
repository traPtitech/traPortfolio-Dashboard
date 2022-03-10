<template>
  <ul>
    <navigation-links-item
      v-for="route in routes"
      :key="route.name"
      :name="route.name"
      :icon="route.icon"
      :path="route.path"
      :class="$style.item"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationLinksItem from './NavigationLinksItem.vue'

interface Route {
  name: string
  icon: string
  path: string
}

export default defineComponent({
  name: 'NavigationLinks',
  components: { NavigationLinksItem },
  setup() {
    const routes: Route[] = [
      { name: 'Top', icon: 'mdi:apps', path: '/' },
      { name: 'Profile', icon: 'mdi:account-circle-outline', path: '/user' },
      { name: 'Events', icon: 'mdi:calendar', path: '/events' },
      { name: 'Contests', icon: 'mdi:trophy-outline', path: '/contests' },
      {
        name: 'Projects',
        icon: 'mdi:clipboard-file-outline',
        path: '/projects'
      }
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
