<template>
  <page-container>
    <content-header
      :title="routeInfo.name"
      :description="routeInfo.description"
    />
    <page-info-panels />
  </page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ContentHeader from '../components/UI/ContentHeader.vue'
import PageInfoPanels from '../components/Index/PageInfoPanels.vue'
import PageContainer from '../components/Layout/PageContainer.vue'
import useRouteInfo from '../use/routeInfo'

export default defineComponent({
  name: 'Index',
  components: {
    PageContainer,
    ContentHeader,
    PageInfoPanels
  },
  setup() {
    const routeInfo = useRouteInfo(ref('Top'))
    return { routeInfo }
  }
})
</script>
