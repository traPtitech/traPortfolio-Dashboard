<template>
  <div :class="$style.container">
    <div>Logo</div>
    <search-input />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchInput from '/@/components/UI/SearchInput.vue'

export default defineComponent({
  name: 'Header',
  components: { SearchInput },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  height: 5rem;
  padding: 0 3rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 0.1rem $color-secondary;
}
</style>
