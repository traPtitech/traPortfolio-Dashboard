<script lang="ts" setup>
import { computed } from 'vue'
import BaseSelect from '/@/components/UI/BaseSelect.vue'
import type { EventLevelValueWithAll } from '/@/consts/eventLevel'

interface Props {
  modelValue: EventLevelValueWithAll
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: EventLevelValueWithAll): void
}>()

const value = computed({
  get: () => props.modelValue,
  set(v: EventLevelValueWithAll) {
    emit('update:modelValue', v)
  }
})

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
  <base-select v-model="value" :options="options" searchable />
</template>
