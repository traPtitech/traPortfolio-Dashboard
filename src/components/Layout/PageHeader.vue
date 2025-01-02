<script lang="ts" setup>
import AIcon from '/@/components/UI/AIcon.vue'
import { storeToRefs } from 'pinia'
import { useResponsiveStore } from '/@/store/responsive'
import pcLogo from '/@/assets/traPortfolio_dashboard_logo_full.svg'
import spLogo from '/@/assets/traPortfolio_dashboard_logo_icon.svg'

interface Props {
  isOpenNavigationBar: boolean
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle-navigation-bar'): void
}>()

const { isMobile } = storeToRefs(useResponsiveStore())
</script>

<template>
  <div :class="$style.container">
    <button
      v-if="isMobile"
      @click="emit('toggle-navigation-bar')"
    >
      <a-icon name="mdi:menu" />
    </button>
    <router-link :to="{ name: 'Index' }">
      <img
        :src="isMobile ? spLogo : pcLogo"
        alt="traPortfolio"
        :width="isMobile ? '48' : '248'"
        height="48"
      />
    </router-link>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  padding: 1rem;
  align-items: center;
  border-bottom: solid 0.1rem $color-secondary;
  gap: 1rem;
}

@media (width <= 768px) {
  .container {
    padding: 0.25rem 1rem;
  }
}
</style>
