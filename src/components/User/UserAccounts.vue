<script setup lang="ts">
import { computed } from 'vue'
import AIcon from '/@/components/UI/AIcon.vue'
import { serviceArray, type ServiceWithName } from '/@/consts/services'
import type { Account } from '/@/lib/apis'

interface Service extends ServiceWithName {
  url: string | null
  displayName: string | null
}

interface Props {
  accounts: Account[]
}

const props = defineProps<Props>()

const shownServices = computed((): Service[] =>
  serviceArray.map(service => {
    const account = props.accounts.find(
      account => account.type === service.type
    )
    return {
      ...service,
      url: account?.url ?? null,
      displayName: account?.displayName ?? null
    }
  })
)
</script>

<template>
  <div :class="$style.container">
    <a
      v-for="service in shownServices"
      :key="service.name"
      :href="service.url ?? undefined"
      :title="
        service.name && service.displayName
          ? `${service.name} : ${service.displayName}`
          : undefined
      "
      :class="$style.anchor"
      :data-has-account="service.url !== null"
    >
      <img
        v-if="service.notIcon"
        :alt="service.name"
        :src="service.icon"
        :class="$style.icon"
        width="24"
        height="24"
      />
      <a-icon
        v-else
        :name="service.icon"
        :class="$style.icon"
      />
    </a>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.anchor {
  text-decoration: none;
  color: $color-secondary-text;

  &[data-has-account='false'] {
    opacity: 0.2;
    pointer-events: none;
  }
}
</style>
