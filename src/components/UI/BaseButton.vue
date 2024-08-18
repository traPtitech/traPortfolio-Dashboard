<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'

import { RouteLocationRaw } from 'vue-router'

type ButtonType = 'primary' | 'secondary' | 'warning'

interface Props {
  to?: RouteLocationRaw
  type?: ButtonType
  icon?: string
  isDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  type: 'primary',
  icon: undefined,
  isDisabled: false
})
</script>

<template>
  <router-link
    v-if="props.to"
    :to="props.to"
    :class="[$style.button, $style.link]"
    :data-button-type="props.type"
  >
    <icon v-if="props.icon" :name="props.icon" />
    <slot />
  </router-link>

  <button
    v-else
    :class="$style.button"
    :data-button-type="props.type"
    :disabled="props.isDisabled"
  >
    <icon v-if="props.icon" :name="props.icon" />
    <slot />
  </button>
</template>

<style lang="scss" module>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 24px;
  border-radius: 6px; // todo:%で指定に変えるかも
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1);
  transition: 0.2s ease-in-out;

  &[data-button-type='primary'] {
    color: $color-primary-text;
    background-color: $color-primary;
  }
  &[data-button-type='secondary'] {
    color: $color-primary;
    background-color: $color-background;
    border: 1px solid $color-primary;
  }
  &[data-button-type='warning'] {
    color: $color-primary-text;
    background-color: $color-warning;
  }

  &:hover {
    opacity: 0.8;
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.link {
  text-decoration: none;
  color: inherit;
}
</style>
