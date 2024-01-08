<template>
  <li :class="$style.outer">
    <router-link :to="path" :class="$style.link">
      <div :class="$style.container">
        <icon :name="routeInfo.icon" :class="$style.icon" :size="72" />
        <div>
          <h2 :class="$style.name">{{ name }}</h2>
          <p :class="$style.detail">{{ routeInfo.description }}</p>
        </div>
      </div>
    </router-link>
  </li>
</template>
<script lang="ts">
import { defineComponent, toRef } from 'vue'
import Icon from '/@/components/UI/Icon.vue'
import useRouteInfo from '/@/lib/routeInfo'
export default defineComponent({
  name: 'PageInfoPanel',
  components: {
    Icon
  },
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
    const routeInfo = useRouteInfo(toRef(props, 'name'))
    return { routeInfo }
  }
})
</script>

<style lang="scss" module>
.outer {
  flex: 1 0 20rem;
}

.link {
  display: block;
  text-decoration: none;
}

.container {
  align-items: center;
  border: 1px solid $color-primary-text;
  border-radius: 6px;
  color: $color-secondary-text;
  display: flex;
  transition: 0.2s all ease-in-out;
  &:hover {
    border-color: $color-primary;
  }
}

.icon {
  color: $color-secondary;
  margin: 0.75rem;
  transition: 0.2s all ease-in-out;
  .container:hover & {
    color: $color-primary;
  }
}

.name {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.detail {
  font-size: 0.875rem;
}
</style>
