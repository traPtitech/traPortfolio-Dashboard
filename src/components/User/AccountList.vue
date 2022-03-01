<template>
  <div :class="$style.accounts">
    <account-list-item
      v-for="account in accounts"
      :key="account.id"
      :account="account"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AccountListItem from './AccountListItem.vue'
import { Account } from '/@/lib/apis'

export default defineComponent({
  name: 'AccountsContainer',
  components: { AccountListItem },
  props: {
    accounts: {
      type: Array as PropType<Account[]>,
      default: []
    }
  },
  setup() {
    return
  }
})
</script>

<style lang="scss" module>
.accounts {
  display: flex;
}
</style>
