<template>
  <page-container>
    <content-header
      :title="routeInfo.name"
      :description="routeInfo.description"
    />
  </page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ContentHeader from '../components/UI/ContentHeader.vue'
import PageContainer from '../components/Layout/PageContainer.vue'
import useRouteInfo from '../use/routeInfo'

export default defineComponent({
  name: 'User',
  components: { PageContainer, ContentHeader },
  setup() {
    const routeInfo = useRouteInfo(ref('Profile'))
    return { routeInfo }
  }
})
</script>
