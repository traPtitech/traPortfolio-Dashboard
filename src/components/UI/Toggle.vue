<template>
  <div :class="$style.container" :aria-checked="modelValue" @click="toggle">
    <div :class="$style.background"></div>
    <div :class="$style.knob"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
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
.container {
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 22px;
  cursor: pointer;
  overflow: hidden;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $color-secondary;

  .container[aria-checked='true'] & {
    background-color: $color-primary;
  }
}

.knob {
  position: absolute;
  top: 4px;
  left: 6px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: $color-background;
  transition: all 0.2s ease;
  .container[aria-checked='true'] & {
    transform: translateX(16px);
  }
}
</style>
