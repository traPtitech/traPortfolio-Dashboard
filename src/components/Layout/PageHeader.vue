<script lang="ts" setup>
import SearchInput from '/@/components/UI/SearchInput.vue'
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
    <div :class="$style.leftContainer">
      <button v-if="isMobile" @click="emit('toggleNavigationBar')">
        <icon name="mdi:menu" />
      </button>
      <div>Logo</div>
    </div>
    <search-input />
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  height: 5rem;
  padding: 0 3rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 0.1rem $color-secondary;
}

.leftContainer {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (width <= 768px) {
  .container {
    padding: 0 1rem;
  }
}
</style>
