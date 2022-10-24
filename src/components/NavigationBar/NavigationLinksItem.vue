<script lang="ts" setup>
import { toRef } from 'vue'
import { useLink } from 'vue-router'
import Icon from '../UI/Icon.vue'
import useRouteInfo from '/@/use/routeInfo'

interface Props {
  name: string
  path: string
}

const props = defineProps<Props>()

const routeInfo = useRouteInfo(toRef(props, 'name'))
const { isActive, route } = useLink({ to: toRef(props, 'path') })
</script>
<template>
  <router-link :to="route" :class="$style.link">
    <li :class="$style.container" :data-is-selected="isActive">
      <div :class="$style.pin" :data-is-selected="isActive"></div>
      <icon :class="$style.icon" :name="routeInfo.icon" :size="30" />
      <div>{{ name }}</div>
    </li>
  </router-link>
</template>

<style lang="scss" module>
.link {
  display: block;
  text-decoration: none;
}

.container {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: $color-secondary;

  &[data-is-selected='true'] {
    color: $color-primary;
    font-weight: bold;
  }
}

.pin {
  width: 5px;
  height: 30px;
  background-color: transparent;

  &[data-is-selected='true'] {
    color: $color-primary;
    font-weight: bold;
    background-color: $color-primary;
  }
}

.icon {
  display: flex;
  margin: auto 0.5rem;
}
</style>
