<script lang="ts" setup>
import { computed, toRef } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '/@/components/UI/Icon.vue'
import useRouteInfo from '/@/use/routeInfo'

interface Props {
  name: string
  path: string
}

const currentRoute = useRoute()

const props = defineProps<Props>()

const routeInfo = useRouteInfo(toRef(props, 'name'))

const isActive = computed(() => {
  if (props.path === '/') return currentRoute.path === props.path
  return currentRoute.path.startsWith(props.path)
})
</script>

<template>
  <router-link :to="path" :class="$style.link">
    <li :class="$style.container" :data-is-selected="isActive">
      <icon :class="$style.icon" :name="routeInfo.icon" :size="30" />
      <p :class="$style.name">{{ name }}</p>
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

  &::before {
    content: '';
    width: 5px;
    height: 30px;
    background-color: transparent;
  }

  &[data-is-selected='true'] {
    color: $color-primary;
    &::before {
      background-color: $color-primary;
    }
  }
}

.icon {
  margin: auto 0.5rem;
}

.name {
  font-size: 1.25rem;
}
</style>
