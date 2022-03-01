<template>
  <page-container>
    <div>Index</div>
  </page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContainer from '../components/Layout/PageContainer.vue'

export default defineComponent({
  name: 'Index',
  components: {
    PageContainer
  },
  setup() {
    return {}
  }
})
</script>
