<template>
  <page-container>
    <content-header />
    <div>Index</div>
  </page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentHeader from '../components/Index/ContentHeader.vue'
import PageContainer from '../components/Layout/PageContainer.vue'

export default defineComponent({
  name: 'Index',
  components: {
    PageContainer,
    ContentHeader
  }
})
</script>
