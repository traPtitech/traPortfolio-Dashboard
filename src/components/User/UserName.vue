<template>
  <div :class="$style.container">
    <img :src="iconSrc" :class="$style.icon" />
    <div>
      <div :class="$style.name">{{ userDetail?.name }}</div>
      <div :class="$style.realName">{{ userDetail?.realName }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { UserDetail } from '/@/lib/apis'

export default defineComponent({
  props: {
    userDetail: {
      type: Object as PropType<UserDetail>,
      default: undefined
    }
  },
  setup() {
    const iconSrc = computed(
      () =>
        `https://q.trap.jp/api/v3/public/icon/${
          /*userDetail.value.name*/ 'sappi_red'
        }`
    )
    return { iconSrc }
  }
})
</script>

<style lang="scss" module>
.icon {
  height: 8rem;
  width: 8rem;
  margin-right: 2rem;
  border-radius: 50%;
}
.name {
  word-break: break-all;
  font-size: 3rem;
}

.realName {
  font-size: 1.5rem;
}
.container {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}
</style>
