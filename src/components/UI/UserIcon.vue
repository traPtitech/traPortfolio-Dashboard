<script lang="ts" setup>
import { computed } from 'vue'
interface Props {
  userId: string
  size?: number
}
const props = withDefaults(defineProps<Props>(), { size: 24 })
const src = computed(
  () =>
    // TODO: userIdから画像を読み込む `https://q.trap.jp/api/v3/public/icon/${props.userId}`
    `https://q.trap.jp/api/v3/public/icon/toshi00`
)

const styles = computed(() => ({
  height: `${props.size}px`,
  width: `${props.size}px`
}))
</script>

<template>
  <img :class="$style.icon" :src="src" :style="styles" />
</template>

<style lang="scss" module>
.icon {
  border-radius: 50%;
}
</style>
