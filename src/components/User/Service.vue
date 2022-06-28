<template>
  <div :class="$style.header" :data-is-open="isOpen" @click="open">
    <service-icon :class="$style.icon" :account-type="accountType" :size="30" />
    <div :class="$style.name">{{ name }}</div>
  </div>
  <div v-if="isOpen">
    <account-setting
      v-for="account in accounts"
      :key="account.id"
      :account="account"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'
import { Account, AccountType } from '/@/lib/apis'
import AccountSetting from './AccountSetting.vue'
import ServiceIcon from '../UI/ServiceIcon.vue'

export default defineComponent({
  components: { AccountSetting, ServiceIcon },
  props: {
    accountType: {
      type: Number as PropType<AccountType>,
      required: true
    },
    accounts: {
      type: Object as PropType<Account[]>,
      default: undefined
    }
  },
  setup(props) {
    const isOpen = ref<boolean>()
    const open = () => {
      isOpen.value = !isOpen.value
    }
    const name = computed(() => {
      switch (props.accountType) {
        case AccountType.homepage:
          return 'Home Page'
        case AccountType.blog:
          return 'Blog'
        case AccountType.twitter:
          return 'Twitter'
        case AccountType.facebook:
          return 'Facebook'
        case AccountType.pixiv:
          return 'pixiv'
        case AccountType.github:
          return 'Github'
        case AccountType.qiita:
          return 'Qiita'
        case AccountType.atcoder:
          return 'AtCoder'
        case AccountType.soundcloud:
          return 'SoundCloud'
      }
    })
    return { isOpen, open, name }
  }
})
</script>

<style lang="scss" module>
.header {
  display: flex;
  background-color: $color-background;
  cursor: pointer;
  text-decoration: none;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  &[data-is-open='true'] {
    background-color: $color-background-dim;
  }
}

.name {
  font-size: 1.25rem;
}

.icon {
  display: flex;
  margin-right: 0.5rem;
  margin-left: 0.25rem;
}
</style>
