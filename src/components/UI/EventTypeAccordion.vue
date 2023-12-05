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
  set: v =>
    emit('update:modelValue', getEventLevelFromValue(v) ?? EventLevel.Anonymous)
})

const options = [
  {
    label: eventLevelValueMap[EventLevel.Anonymous],
    value: eventLevelValueMap[EventLevel.Anonymous]
  },
  {
    label: eventLevelValueMap[EventLevel.Private],
    value: eventLevelValueMap[EventLevel.Private]
  },
  {
    label: eventLevelValueMap[EventLevel.Public],
    value: eventLevelValueMap[EventLevel.Public]
  }
]
</script>

<template>
  <base-select v-model="value" :options="options" searchable />
</template>
