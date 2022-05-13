<template>
  <div>
    <p :class="$style.label">検索</p>
    <input-with-icon v-model="name" icon="mdi:magnify" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useModelObjectSyncer } from '/@/use/vModel'

import { FilterData } from './filterData'
import InputWithIcon from '../InputWithIcon.vue'

export default defineComponent({
  name: 'FilterForm',
  components: { InputWithIcon },
  props: {
    modelValue: {
      type: Object as PropType<FilterData>,
      required: true
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_v: FilterData) => true
  },
  setup(props, { emit }) {
    const datas = useModelObjectSyncer(props, emit)
    return { ...datas }
  }
})
</script>

<style lang="scss" module>
.label {
  font-size: 0.875rem;
  color: $color-secondary;
}
</style>
