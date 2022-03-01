<template>
  <div :class="$style.container">
    <page-header :class="$style.header" />
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
.header {
  grid-row: 1;
  grid-column: 1 / 3;
}
.main {
  flex: 1;
  padding-bottom: 1rem;
}
.container {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 5rem 1fr;
  align-items: stretch;
  height: 100vh;
}
</style>
