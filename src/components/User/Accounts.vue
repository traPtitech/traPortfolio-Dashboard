<template>
  <div>
    <div :class="$style.header">
      <div>
        <h2 :class="$style.title">アカウント</h2>
        <p :class="$style.detail">
          traPでの広報にて言及してもよいかを変更します
        </p>
      </div>
      <NormalButtom color="primary" label="アカウント" :class="$style.button">
        <Icon name="mdi:plus" :class="$style.icon" />
      </NormalButtom>
    </div>
    <service
      v-for="service in accountsCollectedByService"
      :key="service.type"
      :account-type="service.type"
      :accounts="service.Accounts"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import Service from './Service.vue'
import { Account, AccountType } from '/@/lib/apis'
import NormalButtom from '../UI/NormalButtom.vue'
import Icon from '../UI/Icon.vue'

export default defineComponent({
  components: { Service, NormalButtom, Icon },
  props: {
    accounts: {
      type: Object as PropType<Account[]>,
      default: undefined
    }
  },
  setup(props) {
    type Service = { type: AccountType; Accounts: Account[] }

    const accountsCollectedByService = computed<Service[]>(() => {
      if (props.accounts === undefined) {
        return []
      } else {
        return props.accounts
          .reduce((acc: Service[], account: Account): Service[] => {
            if (acc.filter(elem => elem.type == account.type).length) {
              acc.forEach(service => {
                if (service.type == account.type) {
                  service.Accounts.push(account)
                }
              })
              return acc
            } else {
              acc.push({
                type: account.type,
                Accounts: [account]
              })
              return acc
            }
          }, [])
          .sort((a, b) => a.type - b.type)
      }
    })
    return { accountsCollectedByService }
  }
})
</script>

<style lang="scss" module>
.title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.detail {
  color: $color-secondary;
  font-size: 0.875rem;
}

.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $color-background-dim;
}
.button {
  margin: auto 0;
}
</style>
