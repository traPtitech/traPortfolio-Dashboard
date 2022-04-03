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
import { computed, defineComponent, ref, watchEffect } from 'vue'
import apis, { UserDetail } from '/@/lib/apis'

export default defineComponent({
  setup() {
    const iconSrc = computed(
      () =>
        `https://q.trap.jp/api/v3/public/icon/${
          /*userDetail.value.name*/ 'sappi_red'
        }`
    )
    const userDetail = ref<UserDetail>()
    watchEffect(async () => {
      // /users/me的なやつができると信じてる
      userDetail.value = (
        await apis.getUser('dc7c2fc7-e477-5b73-c9b0-5cb701488a86')
      ).data
    })
    return { iconSrc, userDetail }
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
}
</style>
