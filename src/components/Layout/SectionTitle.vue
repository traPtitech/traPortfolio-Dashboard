<template>
  <h2 :class="$style.sectionTitle"><slot /></h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SectionTitle'
})
</script>

<style lang="scss" module>
.sectionTitle {
  color: $color-text;
  font-size: 2.3rem;
  font-weight: normal;
}
</style>
