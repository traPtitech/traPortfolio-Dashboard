<template>
  <page-header />
  <Suspense>
    <template #default>
      <router-view :class="$style.main" />
    </template>
    <template #fallback>
      <loading />
    </template>
  </Suspense>
  <page-footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageHeader from '/@/components/Layout/PageHeader.vue'
import Loading from '/@/pages/Loading.vue'
import PageFooter from '/@/components/Layout/PageFooter.vue'

export default defineComponent({
  name: 'App',
  components: {
    PageHeader,
    Loading,
    PageFooter
  }
})
</script>

<style lang="scss" module>
.main {
  flex: 1;
  padding-bottom: 1rem;
}
</style>
