<script lang="ts" setup>
import { defineModel } from 'vue'
import NavigationLinks from './NavigationLinks.vue'
import { useResponsiveStore } from '/@/store/responsive'
import NavigationBarFooter from './NavigationBarFooter.vue'
import Icon from '../UI/Icon.vue'
import { storeToRefs } from 'pinia'

const isSidebarOpen = defineModel<boolean>({ required: true })
const { isMobile } = storeToRefs(useResponsiveStore())
</script>

<template>
  <nav :class="$style.container">
    <button
      v-if="isMobile"
      style="width: fit-content"
      @click="isSidebarOpen = false"
    >
      <div :class="$style.closeContainer">
        <icon name="mdi:chevron-left" />
        <p>閉じる</p>
      </div>
    </button>
    <navigation-links />
    <navigation-bar-footer />
  </nav>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  background-color: $color-background-dim;
  padding: 1rem 0;
  gap: 1rem;
}
.closeContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  gap: 16px;
  color: $color-secondary;
}
</style>
