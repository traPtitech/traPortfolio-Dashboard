<template>
  <div :class="$style.container">
    <icon :class="$style.icon" :name="$props.icon" :size="28" />
    <input v-model="inputValue" type="text" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useModelValueSyncer } from '/@/use/modelSyncer'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'InputWithIcon',
  components: { Icon },
  props: {
    icon: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: '検索'
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_v: string) => true
  },
  setup(props, { emit }) {
    const inputValue = useModelValueSyncer(props, emit)
    return { inputValue }
  }
})
</script>

<style lang="scss" module>
.container {
  display: flex;
  border: solid 1px $color-secondary;
  border-radius: 4px;
  color: $color-secondary;
  height: 30px;

  input {
    width: 100%;
    color: $color-text;
    &::placeholder {
      color: $color-secondary;
    }
    &:focus {
      outline: none;
    }
  }
}
.icon {
  margin: auto 4px;
  display: inline-flex;
  justify-content: center;
}
</style>
