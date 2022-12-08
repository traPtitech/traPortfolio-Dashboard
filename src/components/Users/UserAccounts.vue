<script setup lang="ts">
import { computed } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import { serviceArray, type ServiceWithType } from '/@/consts/services'
import type { Account } from '/@/lib/apis'

interface Service extends ServiceWithType {
  url: string
  displayName: string
}

interface Props {
  accounts: Account[]
}

const props = defineProps<Props>()

const shownServices = computed((): Service[] => {
  //各serviceに対するaccountの配列たちが入っている配列をflatする
  return serviceArray.flatMap(service =>
    props.accounts
      .filter(account => account.type === service.type)
      .map(account => ({
        ...service,
        url: account.url,
        displayName: account.displayName
      }))
  )
})
</script>

<template>
  <div :class="$style.container">
    <a
      v-for="service in shownServices"
      :key="service.name"
      :href="service.url"
      :title="service.displayName"
      :class="$style.anchor"
    >
      <icon :name="service.icon" :class="$style.icon" />
    </a>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.anchor {
  text-decoration: none;
  color: $color-secondary-text;
}
</style>
