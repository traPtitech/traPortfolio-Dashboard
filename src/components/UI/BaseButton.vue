<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'

type ButtonType = 'primary' | 'secondary' | 'danger'

interface Props {
  type?: ButtonType
  icon?: string
  text: string
  isDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  icon: '',
  isDisabled: false
})
</script>

<template>
  <button
    :class="$style.button"
    :button-type="props.type"
    :disabled="props.isDisabled"
  >
    <Icon v-if="props.icon" :name="props.icon" :class="$style.icon" />
    {{ props.text }}
  </button>
</template>

<style lang="scss" module>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 24px;
  border-radius: 5px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1);
  transition: 0.2s ease-in-out;

  &[button-type='primary'] {
    color: $color-primary-text;
    background-color: $color-primary;
  }
  &[button-type='secondary'] {
    color: $color-primary;
    background-color: $color-background;
    border: 1px solid $color-primary;
  }
  &[button-type='danger'] {
    color: $color-primary-text;
    background-color: $color-danger;
  }

  &:hover {
    opacity: 0.8;
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.icon {
  display: flex;
}
</style>
