<template>
  <label :class="$style.label" @click="toggle">
    <icon
      v-show="modelValue"
      :class="$style.icon"
      name="mdi:checkbox-outline"
    />
    <icon
      v-show="!modelValue"
      :class="$style.icon"
      name="mdi:checkbox-blank-outline"
    />
    <span>{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'CheckBox',
  components: { Icon },
  props: {
    label: {
      type: String,
      default: ''
    },

    modelValue: {
      type: Boolean
    }
  },
  emits: { 'update:modelValue': (_val: boolean) => _val },
  setup(props, { emit }) {
    const toggle = () => {
      emit('update:modelValue', !props.modelValue)
    }
    return { toggle }
  }
})
</script>

<style lang="scss" module>
.checkbox {
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0;
  pointer-events: none;
}
.label {
  display: flex;
}

.icon {
  margin-right: 0.25rem;
}
</style>
