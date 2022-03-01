<template>
  <div>
    <img :class="$style.icon" :src="iconSrc" />
    <div>
      <div :class="$style.nameContainer">
        <div :class="$style.name">{{ userDetail?.name ?? 'Loading ...' }}</div>
        <div :class="$style.realName">
          {{ userDetail?.realName ?? 'Loading ...' }}
        </div>
      </div>
      <account-list :accounts="userDetail?.accounts" :class="$style.accounts" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import AccountList from './AccountList.vue'
import { UserDetail } from '/@/lib/apis'

export default defineComponent({
  name: 'UserDetailContainer',
  components: { AccountList },
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
  color: $color-primary;
  font-size: 3rem;
  margin-right: 2rem;
}

.realName {
  color: $color-text;
  font-size: 1.5rem;
  margin-right: 2rem;
}

.accounts {
  margin-top: 1rem;
}

.nameContainer {
  display: flex;
  align-items: center;
}
</style>
