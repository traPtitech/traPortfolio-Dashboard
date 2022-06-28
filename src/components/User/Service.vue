<template>
  <div :class="$style.header" :data-is-open="isOpen" @click="open">
    <icon :class="$style.icon" name="simple-icons:qiita" :size="30" />
    <div :class="$style.name">Qiita</div>
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
import { defineComponent, PropType, ref } from 'vue'
import { Account, AccountType } from '/@/lib/apis'
import AccountSetting from './AccountSetting.vue'
import Icon from '../UI/Icon.vue'

export default defineComponent({
  components: { AccountSetting, Icon },
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
  setup() {
    const isOpen = ref<boolean>()
    const open = () => {
      isOpen.value = !isOpen.value
    }
    return { isOpen, open }
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
