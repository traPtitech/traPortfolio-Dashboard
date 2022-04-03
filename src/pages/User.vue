<template>
  <page-container>
    <content-header
      :title="routeInfo.name"
      :description="routeInfo.description"
    />
    <user-name />
  </page-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ContentHeader from '../components/UI/ContentHeader.vue'
import PageContainer from '../components/Layout/PageContainer.vue'
import useRouteInfo from '../use/routeInfo'
import UserName from '../components/User/UserName.vue'

export default defineComponent({
  name: 'User',
  components: { PageContainer, ContentHeader, UserName },
  setup() {
    const routeInfo = useRouteInfo(ref('Profile'))

    return { routeInfo }
  }
})
</script>

<style lang="scss" module></style>
