<template>
  <div :class="$style.container">
    <icon :class="$style.icon" :name="$props.icon" :size="28" />
    <input v-model="valueComputed" type="text" :placeholder="placeholder" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
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
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const valueComputed = computed({
      get: () => props.modelValue,
      set: (value: string) => {
        emit('update:modelValue', value)
      }
    })
    return { valueComputed }
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
