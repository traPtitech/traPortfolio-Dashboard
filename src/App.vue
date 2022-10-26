<template>
  <div :class="$style.container">
    <page-header :class="$style.header" />
    <navigation-bar :class="$style.navigationBar" />
    <main :class="$style.content">
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <loading />
        </template>
      </Suspense>
    </main>
  </div>
</template>

<script lang="ts" setup>
import NavigationBar from './components/NavigationBar/NavigationBar.vue'
import PageHeader from '/@/components/Layout/PageHeader.vue'
import Loading from '/@/pages/Loading.vue'
</script>

<style lang="scss" module>
.header {
  grid-row: 1;
  grid-column: 1 / 3;
}

.container {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: min-content 1fr;
  height: 100%;
}

.content {
  flex-grow: 1;
  overflow: {
    x: hidden;
    y: scroll;
  }
}
</style>
