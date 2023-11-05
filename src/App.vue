<script lang="ts" setup>
import NavigationBar from '/@/components/NavigationBar/NavigationBar.vue'
import PageHeader from '/@/components/Layout/PageHeader.vue'
import Loading from '/@/pages/Loading.vue'
</script>

<template>
  <div :class="$style.container">
    <page-header :class="$style.header" />
    <navigation-bar :class="$style.navigationBar" />
    <div :class="$style.content">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <suspense>
            <template #default>
              <component :is="Component" />
            </template>
            <template #fallback>
              <loading />
            </template>
          </suspense>
        </template>
      </router-view>
    </div>
  </div>
</template>

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

@media (width <= 768px) {
  .navigationBar {
    display: none;
  }
  .container {
    grid-template-columns: 1fr;
  }
}

.content {
  overflow: {
    x: hidden;
    y: scroll;
  }
}
</style>
