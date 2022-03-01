<template>
  <div>
    <div :class="$style.title">自己紹介文</div>
    <p>{{ bio }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BioContainer',
  props: {
    bio: {
      type: String,
      default: 'Loading'
    }
  },
  setup() {
    return
  }
})
</script>

<style lang="scss" module>
.title {
  color: $color-text;
  font-size: 2.25rem;
}
</style>
