<template>
  <a :class="$style.container">
    <icon name="mdi:open-in-new" :class="$style.icon" />
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/UI/Icon.vue'

export default defineComponent({
  name: 'LinkWithIcon',
  components: {
    Icon
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
}
.icon {
  margin-right: 0.25rem;
}
</style>
