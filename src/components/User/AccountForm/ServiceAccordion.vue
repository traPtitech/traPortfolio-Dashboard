<template>
  <div>
    <h2>サービス名</h2>
    <div v-if="isOpen">
      <p>{{}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const isOpen = true
    return { isOpen }
  }
})
</script>
