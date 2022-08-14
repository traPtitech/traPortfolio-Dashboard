<template>
  <div>
    <div :class="$style.titleContainer">
      <icon :class="$style.icon" name="mdi:apps" :size="36" />
      <h1 :class="$style.title">{{ $props.title }}</h1>
    </div>
    <p :class="$style.detail">{{ $props.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '../UI/Icon.vue'

export default defineComponent({
  name: 'Header',
  components: {
    Icon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" module>
.titleContainer {
  display: flex;
  align-items: center;
  color: $color-primary;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.5rem;
}

.icon {
  display: flex;
  margin-right: 0.25rem;
}

.detail {
  color: $color-secondary;
  font-size: 0.875rem;
}
</style>
