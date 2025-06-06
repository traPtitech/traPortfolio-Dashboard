<script lang="ts" setup>
import { computed, toRef } from 'vue'
import { useRoute, RouteLocationNamedRaw } from 'vue-router'
import AIcon from '/@/components/UI/AIcon.vue'
import useRouteInfo from '/@/lib/routeInfo'
import { routes } from '/@/router/index'

interface Props {
  name: string
  path: RouteLocationNamedRaw
}

const currentRoute = useRoute()

const props = defineProps<Props>()

const routeInfo = useRouteInfo(toRef(props, 'name'))

const isActive = computed(() => {
  const path = routes.find(route => route.name === props.path.name)?.path
  if (path === undefined) {
    return false
  }
  return (
    currentRoute.name === props.path.name ||
    currentRoute.path.startsWith(`${path}/`)
  )
})
</script>

<template>
  <li>
    <router-link
      :to="path"
      :class="$style.container"
      :data-is-selected="isActive"
      :aria-current="isActive ? 'page' : null"
    >
      <a-icon
        :class="$style.icon"
        :name="routeInfo.icon"
        :size="30"
      />
      <p :class="$style.name">
        {{ name }}
      </p>
    </router-link>
  </li>
</template>

<style lang="scss" module>
.container {
  display: flex;
  align-items: center;
  color: $color-secondary;

  text-decoration: none;

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
