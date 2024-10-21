<script lang="ts" setup>
import { computed } from 'vue'
import BaseSelect from '/@/components/UI/BaseSelect.vue'
import {
  serviceNameToType,
  serviceArray,
  serviceTypeToNameMap
} from '/@/consts/services'
import { AccountType } from '/@/lib/apis'

interface Props {
  registered?: AccountType[]
}
const props = withDefaults(defineProps<Props>(), {
  registered: () => Array<AccountType>()
})

const model = defineModel<AccountType>({ required: true })

const value = computed({
  get: () => serviceTypeToNameMap[model.value],
  set: v => (model.value = serviceNameToType(v) ?? AccountType.homepage)
})

const options = computed(() =>
  serviceArray
    .filter(s => !props.registered.includes(s.type))
    // TODO: blogは https://github.com/traPtitech/traPortfolio-Dashboard/issues/283 のための暫定的な対応
    // ctftimeはロゴを追加したら戻す
    .filter(s => s.type !== AccountType.blog && s.type !== AccountType.ctftime)
    .map(s => ({ label: s.name, value: s.name }))
)
</script>

<template>
  <base-select v-model="value" :options="options" searchable />
</template>
