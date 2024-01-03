<script lang="ts" setup>
import { computed } from 'vue'
import BaseSelect from '/@/components/UI/BaseSelect.vue'
import { EventLevel } from '/@/lib/apis'
import {
  eventLevelValueMap,
  getEventLevelFromValue
} from '/@/consts/eventLevel'

enum All {
  All = 3
}

type EventLevelWithAll = EventLevel | All

interface Props {
  modelValue: EventLevelWithAll
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: EventLevelWithAll): void
}>()

const value = computed({
  get() {
    if (
      props.modelValue === 1 ||
      props.modelValue === 2 ||
      props.modelValue === 0
    ) {
      return eventLevelValueMap[props.modelValue]
    } else return 'all'
  },
  set(v) {
    if (v === 'all') emit('update:modelValue', 3)
    else emit('update:modelValue', getEventLevelFromValue(v))
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
