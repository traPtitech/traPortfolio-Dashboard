<script lang="ts" setup>
import BaseSelect from '/@/components/UI/BaseSelect.vue'
import type { EventLevelValueWithAll } from '/@/consts/eventLevel'

const model = defineModel<EventLevelValueWithAll>({ required: true })

const options = [
  {
    label: 'すべて',
    value: 'all'
  },
  {
    label: '公開',
    value: 'public'
  },
  {
    label: '匿名公開',
    value: 'anonymous'
  },
  {
    label: '非公開',
    value: 'private'
  }
]
</script>

<template>
  <base-select v-model="model" :options="options" searchable />
</template>
