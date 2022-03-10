<template>
  <navigation-links :class="$style.container" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationLinks from './NavigationLinks.vue'

export default defineComponent({
  name: 'NavigationContent',
  components: { NavigationLinks }
})
</script>

<style lang="scss" module>
.container {
  margin-top: 1rem;
}
</style>
