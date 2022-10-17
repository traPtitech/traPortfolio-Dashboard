<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <auto-resize-text-area v-model="value" />
</template>
