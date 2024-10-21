<script lang="ts" setup>
import { computed } from 'vue'
interface Props {
  userName: string
  size?: number
}
const props = withDefaults(defineProps<Props>(), { size: 24 })
const src = computed(
  () => `https://q.trap.jp/api/v3/public/icon/${props.userName}`
)

const styles = computed(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`
}))
</script>

<template>
  <img
    :class="$style.icon"
    :src="src"
    :style="styles"
    :width="size"
    :height="size"
    :alt="userName"
  >
</template>

<style lang="scss" module>
.icon {
  border-radius: 50%;
}
</style>
