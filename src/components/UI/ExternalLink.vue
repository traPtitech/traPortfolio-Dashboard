<template>
  <a :class="$style.container">
    <a-icon
      name="mdi:open-in-new"
      :class="$style.icon"
    />
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AIcon from '/@/components/UI/AIcon.vue'

export default defineComponent({
  name: 'LinkWithIcon',
  components: {
    AIcon
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
