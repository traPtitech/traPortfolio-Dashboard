<script lang="ts" setup>
import NavigationBar from '/@/components/NavigationBar/NavigationBar.vue'
import PageHeader from '/@/components/Layout/PageHeader.vue'
import Loading from '/@/pages/Loading.vue'
import { useResponsiveStore } from '/@/store/responsive'
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const route = useRoute()
const { isMobile } = storeToRefs(useResponsiveStore())

const isOpenNavigationBar = ref(!isMobile.value)
const showCover = computed(() => isMobile.value && isOpenNavigationBar.value)

watch(
  () => route.fullPath,
  () => {
    isOpenNavigationBar.value = false
  }
)
</script>

<template>
  <div :class="$style.container">
    <page-header
      :class="$style.header"
      :is-open-navigation-bar="isOpenNavigationBar"
      @toggle-navigation-bar="isOpenNavigationBar = !isOpenNavigationBar"
    />
    <div
      v-if="showCover"
      :class="$style.navigationBarCover"
      @click="isOpenNavigationBar = false"
    />
    <navigation-bar v-if="isOpenNavigationBar" :class="$style.navigationBar" />
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
  .navigationBarCover {
    position: absolute;
    z-index: --z-index-navigationBarCover;
    top: 5rem;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: $color-background-dim;
    opacity: 0.5;
  }
  .navigationBar {
    position: absolute;
    z-index: --z-index-navigationBar;
    top: 5rem;
    left: 0;
    height: 100%;
    width: 260px;
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
