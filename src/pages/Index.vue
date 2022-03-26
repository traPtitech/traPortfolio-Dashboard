<template>
  <page-container>
    <content-header />
    <page-info-panels />
  </page-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentHeader from '../components/Index/ContentHeader.vue'
import PageInfoPanels from '../components/Index/PageInfoPanels.vue'
import PageContainer from '../components/Layout/PageContainer.vue'

export default defineComponent({
  name: 'Index',
  components: {
    PageContainer,
    ContentHeader,
    PageInfoPanels
  }
})
</script>
