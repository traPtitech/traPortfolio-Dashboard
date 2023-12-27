<script lang="ts" setup>
import { computed } from 'vue'
import BaseSelect from '/@/components/UI/BaseSelect.vue'
import { EventLevel } from '/@/lib/apis'
import {
  eventLevelValueMap,
  getEventLevelFromValue
} from '/@/consts/eventLevel'

interface Props {
  modelValue: EventLevel
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: EventLevel): void
}>()

const value = computed({
  get: () => eventLevelValueMap[props.modelValue],
  set: v => emit('update:modelValue', getEventLevelFromValue(v) ?? '匿名公開')
})

const options = [
  {
    label: '匿名公開',
    value: "anonymous"
  },
  {
    label: '非公開',
    value: "private"
  },
  {
    label: '公開',
    value: "public"
  }
]
</script>

<template>
  <base-select v-model="value" :options="options" searchable />
</template>
