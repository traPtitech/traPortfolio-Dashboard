<script lang="ts" setup>
import Icon from '/@/components/UI/Icon.vue'

import { RouteLocationRaw } from 'vue-router'

type ButtonType = 'primary' | 'secondary' | 'warning'

interface Props {
  to: RouteLocationRaw
  type?:ButtonType
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  icon: undefined,
})
</script>

<template>
  <router-link
    :to="props.to"
    :class="$style.linkButton"
    :data-button-type="props.type"
  >
    <icon v-if="props.icon" :name="props.icon" />
    <slot />
  </router-link>
</template>

<style lang="scss" module>
.linkButton {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  padding: 8px 24px;
  border-radius: 6px;
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.1);
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: inherit;

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
}
</style>