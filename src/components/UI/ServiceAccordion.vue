<script lang="ts" setup>
import { computed } from 'vue'
import BaseSelect from '/@/components/UI/BaseSelect.vue'
import { services, serviceNameToType } from '/@/consts/services'
import { AccountType } from '/@/lib/apis'

const options = Array.from(services.values()).map(service => service.name)

interface Props {
  modelValue: AccountType
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: AccountType): void
}>()

const value = computed({
  get: () => services.get(props.modelValue)?.name ?? '',
  set: v =>
    emit('update:modelValue', serviceNameToType(v) ?? AccountType.homepage)
})
</script>

<template>
  <base-select v-model="value" :options="options" searchable />
</template>
