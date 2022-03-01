<template>
  <h1 :class="$style.title"><slot /></h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageTitle'
})
</script>

<style lang="scss" module>
.title {
  color: $color-primary;
  font-size: 4rem;
}
</style>
