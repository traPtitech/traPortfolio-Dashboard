<template>
  <div :class="$style.container">
    <div>Top</div>
    <div>Top</div>
    <div>Top</div>
    <div>Top</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageSidebar'
})
</script>

<style lang="scss" module>
.container {
  background-color: $color-secondary;
  width: 260px;
}
</style>
