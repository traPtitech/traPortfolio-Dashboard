<script lang="ts" setup>
import { computed } from 'vue'
import BaseSelect from '/@/components/UI/BaseSelect.vue'
import { services, serviceNameToType, serviceArray } from '/@/consts/services'
import { AccountType } from '/@/lib/apis'

interface Props {
  modelValue: AccountType
  registered?: AccountType[]
}
const props = withDefaults(defineProps<Props>(), {
  registered: () => Array<AccountType>()
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: AccountType): void
}>()

const value = computed({
  get: () => services.get(props.modelValue)?.name ?? '',
  set: v =>
    emit('update:modelValue', serviceNameToType(v) ?? AccountType.homepage)
})

const options = computed(() =>
  serviceArray
    .filter(s => !props.registered.includes(s.type))
    .map(s => ({ label: s.name, value: s.name }))
)
</script>

<template>
  <base-select v-model="value" :options="options" searchable />
</template>
