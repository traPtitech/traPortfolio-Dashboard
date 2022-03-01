<template>
  <page-header />
  <div :class="$style.container">
    <page-sidebar />
    <Suspense>
      <template #default>
        <router-view :class="$style.main" />
      </template>
      <template #fallback>
        <loading />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from '/@/components/Layout/PageHeader.vue'
import PageSidebar from '/@/components/Layout/PageSidebar.vue'
import Loading from '/@/pages/Loading.vue'

export default defineComponent({
  name: 'App',
  components: {
    PageHeader,
    Loading,
    PageSidebar
  }
})
</script>

<style lang="scss" module>
.main {
  flex: 1;
  padding-bottom: 1rem;
}
.container {
  display: flex;
  align-items: stretch;
  height: calc(100vh - 5rem);
}
</style>
