<script lang="ts" setup>
interface Props {
  name: string
}
defineProps<Props>()
</script>

<template>
  <img
    alt="icon"
    :class="$style.icon"
    :src="'https://q.trap.jp/api/v3/public/icon/toshi00'"
  />
</template>

<style lang="scss" module>
.icon {
  border-radius: 50%;
  height: 100%;
}
</style>
