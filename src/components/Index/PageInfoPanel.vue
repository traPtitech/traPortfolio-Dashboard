<template>
  <li :class="$style.outer">
    <router-link :to="path" :class="$style.link">
      <div :class="$style.container">
        <icon :name="icon" :class="$style.icon" :size="72" />
        <div>
          <h2 :class="$style.name">{{ name }}</h2>
          <p :class="$style.detail">{{ description }}</p>
        </div>
      </div>
    </router-link>
  </li>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '../UI/Icon.vue'
import useDescription from '/@/use/description'
import useIcon from '/@/use/icon'
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
    const icon = useIcon(props.name)
    const description = useDescription(props.name)
    return { icon, description }
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
  display: flex;
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
