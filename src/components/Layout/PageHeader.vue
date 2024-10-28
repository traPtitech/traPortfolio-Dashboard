<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'
import { storeToRefs } from 'pinia'
import { useResponsiveStore } from '/@/store/responsive'

interface Props {
  isOpenNavigationBar: boolean
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggleNavigationBar'): void
}>()

const { isMobile } = storeToRefs(useResponsiveStore())
</script>

<template>
  <div :class="$style.container">
    <button
      v-if="isMobile"
      @click="emit('toggleNavigationBar')"
    >
      <icon name="mdi:menu" />
    </button>
    <router-link :to="{ name: 'Index' }">
      <img
        src="/@/assets/traP_logo_blue.svg"
        alt="traP"
        :width="!isMobile ? '343' : '240'"
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
