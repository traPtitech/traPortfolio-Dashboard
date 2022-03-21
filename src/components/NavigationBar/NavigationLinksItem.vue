<template>
  <router-link :to="route" :class="$style.link">
    <li :class="$style.container" :data-is-selected="isActive">
      <div :class="$style.pin" :data-is-selected="isActive"></div>
      <icon :class="$style.icon" :name="routeInfo.icon" :size="30" />
      <div>{{ name }}</div>
    </li>
  </router-link>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { useLink } from 'vue-router'
import Icon from '../UI/Icon.vue'
import useRouteInfo from '/@/use/routeInfo'

export default defineComponent({
  name: 'NavigationLinksItem',
  components: { Icon },
  props: {
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const routeInfo = useRouteInfo(toRef(props, 'name').value)
    const { isActive, route } = useLink({ to: toRef(props, 'path') })
    return { routeInfo, isActive, route }
  }
})
</script>

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
