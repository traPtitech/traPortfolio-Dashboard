<template>
  <div :class="$style.container">
    <navigation-content />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationContent from './NavigationContent.vue'

export default defineComponent({
  name: 'NavigationBar',
  components: { NavigationContent }
})
</script>

<style lang="scss" module>
.container {
  background-color: $color-background-dim;
}
</style>
